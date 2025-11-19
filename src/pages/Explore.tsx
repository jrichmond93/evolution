

import React, { useEffect, useState, useRef } from "react";
import SEO from "../components/SEO";
// Easily extendable list of fun evolution/animal facts
const DID_YOU_KNOW_FACTS = [
  "The blue whale is the largest animal to have ever lived on Earth!",
  "Birds are actually living dinosaurs—descendants of theropods!",
  "The coelacanth, a 'living fossil' fish, was thought extinct until 1938.",
  "Some crocodile species have remained nearly unchanged for 200 million years.",
  "Horses, rhinos, and tapirs are all part of the odd-toed ungulate family.",
  "The platypus is one of the few mammals that lay eggs.",
  "Octopuses have three hearts and blue blood!",
  "The earliest known fossils are over 3.5 billion years old.",
  "Butterflies taste with their feet!",
  "Sharks existed before trees—by about 200 million years.",
  "Giraffes have the same number of neck vertebrae as humans: seven.",
  "A group of flamingos is called a 'flamboyance'.",
  "Tardigrades (water bears) can survive in space and extreme environments.",
  "The axolotl can regrow entire limbs and even parts of its brain.",
  "Antarctica is the only continent without reptiles or snakes.",
  "The cheetah is the fastest land animal, reaching speeds up to 70 mph (113 km/h).",
  "Bats are the only mammals capable of true flight.",
  "The mimic octopus can impersonate more than 15 different marine species.",
  "Some frogs can be frozen solid and survive the winter, thawing out in spring."
];

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ReactMarkdown from "react-markdown";


const Explore: React.FC = () => {
  const { isAuthenticated, user } = useAuth0();
  const [animal, setAnimal] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]); // Card list of timelines/follow-ups
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [animalImageUrl, setAnimalImageUrl] = useState<string | undefined>(undefined);
  const [imageAttribution, setImageAttribution] = useState<{ title?: string; pageid?: number } | undefined>(undefined);
  const placeholderUrl = '/images/placeholder.svg';
  const location = useLocation();
  const navigate = useNavigate();
  // Get session id from navigation state
  const [userSessionId, setUserSessionId] = useState<string | null>(null);

  // Fact rotator state (must be after loading is declared)
  const [factIdx, setFactIdx] = useState(0);
  const factIntervalRef = useRef<number | null>(null);
  useEffect(() => {
    if (loading) {
      // Start at a random fact index for more variety
      const randomStart = Math.floor(Math.random() * DID_YOU_KNOW_FACTS.length);
      setFactIdx(randomStart);
      factIntervalRef.current = window.setInterval(() => {
        setFactIdx(idx => (idx + 1) % DID_YOU_KNOW_FACTS.length);
      }, 10000);
    } else {
      setFactIdx(0);
      if (factIntervalRef.current) window.clearInterval(factIntervalRef.current);
    }
    return () => {
      if (factIntervalRef.current) window.clearInterval(factIntervalRef.current);
    };
  }, [loading]);

  // Fetch Wikimedia image for current animal/species (updates on animal or follow-up)
  useEffect(() => {
    // Use the most recent animal/species from history[0] if available, else initial animal
    const current = history[0]?.species_or_group_name || animal?.common_name || animal?.scientific_name;
    if (!current) {
      setAnimalImageUrl(undefined);
      setImageAttribution(undefined);
      return;
    }
    const query = encodeURIComponent(current);
    fetch(`https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&piprop=original&generator=search&gsrsearch=${query}&gsrlimit=1`)
      .then(res => res.json())
      .then(data => {
        const pages = data?.query?.pages;
        if (pages) {
          const firstPage = Object.values(pages)[0] as any;
          if (firstPage && firstPage.original && firstPage.original.source) {
            setAnimalImageUrl(firstPage.original.source);
            setImageAttribution({ title: firstPage.title, pageid: firstPage.pageid });
            return;
          }
        }
        setAnimalImageUrl(undefined);
        setImageAttribution(undefined);
      })
      .catch(() => {
        setAnimalImageUrl(undefined);
        setImageAttribution(undefined);
      });
  }, [animal, history]);

  useEffect(() => {
    if (location.state && location.state.animal) {
      setAnimal(location.state.animal);
      setUserSessionId(location.state.user_session_id || null);
    } else {
      setAnimal(null);
      setUserSessionId(null);
    }
  }, [location.state]);

  useEffect(() => {
    if (animal) {
      fetchTimeline(animal.common_name);
    }
    // eslint-disable-next-line
  }, [animal]);

  function fetchTimeline(species: string) {
    setLoading(true);
    setError("");
    fetch(import.meta.env.VITE_API_BASE + "/timeline", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        species_or_group_name: species,
        context: { focus: "evolutionary history" },
        ui_preferences: { display_hint: "timeline", max_events: 8 },
        user_session_id: userSessionId || "SESSION-UNKNOWN",
        question_context: "Create a evolutionary timeline highlighting key stages",
        user_id: isAuthenticated && user && user.sub ? user.sub : "notauthenticated"
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setHistory([{ ...data, question: `Timeline for ${species}` }]);
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(() => {
        setError("Failed to load timeline");
        setShowToast(true);
        setLoading(false);
      });
  }

  function handleFollowUp(q: any) {
    setLoading(true);
    setError("");
    fetch(import.meta.env.VITE_API_BASE + `/${q.template}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        template_type: q.template,
        species_or_group_name: q.species,
        focus: q.focus,
        era: history[0]?.related_eras && history[0].related_eras.length > 0 ? history[0].related_eras[0] : undefined,
        display_hint: `${q.template.charAt(0).toUpperCase() + q.template.slice(1)}View`,
        user_session_id: userSessionId || "SESSION-UNKNOWN",
        question_context: q.question,
        user_id: isAuthenticated && user && user.sub ? user.sub : "notauthenticated",
        ...(q.template === "timeline" ? { ui_preferences: { display_hint: "timeline", max_events: 8 } } : {})
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setHistory(prev => [{ ...data, question: q.question }, ...prev]);
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(() => {
        setError("Failed to load follow-up");
        setShowToast(true);
        setLoading(false);
      });
  }

  if (!animal) {
    return (
      <main className="container py-5 flex-grow-1 d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '60vh' }}>
        <h1 className="display-6 fw-bold text-success mb-3">No Animal Selected</h1>
        <div className="mb-4 text-secondary">Please go back and select an animal to explore its evolutionary timeline.</div>
        <button className="btn btn-success px-4 py-2 rounded-pill" onClick={() => navigate("/")}>Back to Home</button>
      </main>
    );
  }

  return (
    <>
      <SEO 
        title={animal ? `Explore ${animal.common_name} - Evolution Timeline` : "Explore Animals - Interactive Evolution Timelines"}
        description={animal ? `Discover the evolutionary history of ${animal.common_name} (${animal.scientific_name}) with AI-generated timelines, fun facts, and detailed information about adaptation and natural selection.` : "Explore individual animals and their evolutionary history with AI-generated timelines, fun facts, and detailed information about adaptation and natural selection."}
        keywords="explore animals, evolutionary timeline, animal history, species, biodiversity, natural selection, adaptation"
        canonicalUrl="https://aievolutionexplorer.com/explore"
      />
      <main className="container py-5 flex-grow-1 d-flex flex-column align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: 1100 }}>
        <h1 className="display-6 fw-bold text-success text-center mb-2">Evolution Timeline for {animal.common_name}</h1>
        <div className="mb-3 text-secondary text-center">Scientific name: <span className="font-monospace">{animal.scientific_name}</span></div>
        {loading && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(255,255,255,0.85)',
              zIndex: 2000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.3s',
            }}
          >
            <span className="spinner-border text-success mb-3" style={{ width: 48, height: 48 }} role="status" aria-hidden="true"></span>
            <div className="fw-semibold mb-2" style={{ fontSize: '1.15rem' }}>The AI is researching the evolutionary history...</div>
            <div className="text-muted fst-italic text-center" style={{ minHeight: 32, transition: 'opacity 0.5s' }}>
              <span key={factIdx}><strong>Did you know?</strong> <strong>{DID_YOU_KNOW_FACTS[factIdx]}</strong></span>
            </div>
          </div>
        )}
        <div className="row g-4">
          {/* Timeline cards */}
          <div className="col-12 col-lg-7">
            <div className="d-flex flex-column gap-4">
              {history.map((item, idx) => (
                <React.Fragment key={idx}>
                  <div
                    className="card shadow border-0"
                    style={idx !== 0 ? { background: '#fffbe6' } : {}}
                  >
                    <div className="card-body">
                      <div className="mb-2"><span className="badge bg-primary me-2">{item.question}</span></div>
                      <h2 className="h5 fw-bold mb-2">{item.title}</h2>
                      <div className="mb-3 text-dark">
                        <ReactMarkdown>{item.summary_md}</ReactMarkdown>
                      </div>
                      {Array.isArray(item.key_points) && item.key_points.length > 0 && (
                        <div className="mb-3">
                          <h3 className="fw-semibold mb-2">Key Points</h3>
                          <ul className="ps-4">
                            {item.key_points.map((point: string, i: number) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {Array.isArray(item.related_eras) && item.related_eras.length > 0 && (
                        <div className="mb-3">
                          <h3 className="fw-semibold mb-2">Related Eras</h3>
                          <ul className="ps-4">
                            {item.related_eras.map((era: string, i: number) => (
                              <li key={i}>{era}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {/* Raw JSON for development/debugging (hidden in production) */}
                      {import.meta.env.MODE !== "production" && (
                        <details className="mt-3">
                          <summary>Show raw JSON</summary>
                          <pre className="bg-light border rounded p-2 small mt-2"><code>{JSON.stringify(item, null, 2)}</code></pre>
                        </details>
                      )}
                    </div>
                  </div>
                  {/* Show image card only for the very first post (mobile only), and follow-up questions only on mobile (not desktop) */}
                  {idx === 0 && (
                    <>
                      {/* Image card: only show if this is the first and only history item, and only on mobile */}
                      {history.length === 1 && (
                        <div className="d-block d-lg-none mt-3">
                          <div className="card shadow-lg border-0 w-100 mb-4 d-flex flex-column align-items-center justify-content-center" style={{ maxWidth: 500, minHeight: 420 }}>
                            <div className="card-body w-100 d-flex flex-column align-items-center justify-content-center">
                              <div className="d-flex align-items-center justify-content-center w-100" style={{ minHeight: 240 }}>
                                <img
                                  src={animalImageUrl || placeholderUrl}
                                  alt={history[0]?.species_or_group_name || 'Animal placeholder'}
                                  className="rounded shadow-sm border bg-light"
                                  style={{ width: 320, height: 240, objectFit: 'contain', background: '#f8f9fa' }}
                                  onError={e => { (e.target as HTMLImageElement).src = placeholderUrl; }}
                                />
                              </div>
                              <div className="mt-2 text-muted text-center" style={{ fontSize: '0.95rem' }}>
                                {animalImageUrl && imageAttribution && imageAttribution.title && imageAttribution.pageid ? (
                                  <span>
                                    Image: <a href={`https://commons.wikimedia.org/?curid=${imageAttribution.pageid}`} target="_blank" rel="noopener noreferrer">{imageAttribution.title.replace('File:', '')}</a> via Wikimedia Commons
                                  </span>
                                ) : (
                                  'No image found, showing placeholder.'
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {/* Follow-up buttons: only show on mobile (not desktop) for the first history item if available */}
                      <div className="d-block d-lg-none">
                        {history[0] && Array.isArray(history[0].follow_up_questions) && history[0].follow_up_questions.length > 0 && (
                          <div className="mb-2 w-100" style={{ marginTop: 32 }}>
                            <h3 className="fw-semibold mb-2 text-center">Follow-Up Questions</h3>
                            <div className="d-flex flex-wrap gap-2 justify-content-center">
                              {history[0].follow_up_questions.map((q: any, i: number) => (
                                <button
                                  key={i}
                                  className="btn btn-outline-primary btn-sm rounded-pill border-1"
                                  onClick={() => handleFollowUp(q)}
                                >
                                  {q.question}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>
            {error && (
              <div className="alert alert-danger w-100 mt-3">{error}</div>
            )}
          </div>
          {/* On desktop, keep image card only for the very first post, and follow-up questions only in the right column (not below main card) */}
          <div className="d-none d-lg-flex col-lg-5 flex-column align-items-center">
            {history.length === 1 && (
              <div className="card shadow-lg border-0 w-100 mb-4 d-flex flex-column align-items-center justify-content-center" style={{ maxWidth: 500, minHeight: 420 }}>
                <div className="card-body w-100 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex align-items-center justify-content-center w-100" style={{ minHeight: 240 }}>
                    <img
                      src={animalImageUrl || placeholderUrl}
                      alt={history[0]?.species_or_group_name || 'Animal placeholder'}
                      className="rounded shadow-sm border bg-light"
                      style={{ width: 320, height: 240, objectFit: 'contain', background: '#f8f9fa' }}
                      onError={e => { (e.target as HTMLImageElement).src = placeholderUrl; }}
                    />
                  </div>
                  <div className="mt-2 text-muted text-center" style={{ fontSize: '0.95rem' }}>
                    {animalImageUrl && imageAttribution && imageAttribution.title && imageAttribution.pageid ? (
                      <span>
                        Image: <a href={`https://commons.wikimedia.org/?curid=${imageAttribution.pageid}`} target="_blank" rel="noopener noreferrer">{imageAttribution.title.replace('File:', '')}</a> via Wikimedia Commons
                      </span>
                    ) : (
                      'No image found, showing placeholder.'
                    )}
                  </div>
                </div>
              </div>
            )}
            {/* Follow-up buttons: only show in right column (not below main card) for the first history item if available */}
            {history[0] && Array.isArray(history[0].follow_up_questions) && history[0].follow_up_questions.length > 0 && (
              <div className="mb-2 w-100" style={{ marginTop: 32 }}>
                <h3 className="fw-semibold mb-2 text-center">Follow-Up Questions</h3>
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                  {history[0].follow_up_questions.map((q: any, i: number) => (
                    <button
                      key={i}
                      className="btn btn-outline-primary btn-sm rounded-pill border-1"
                      onClick={() => handleFollowUp(q)}
                    >
                      {q.question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Toast for errors */}
      {showToast && (
        <div className="position-fixed bottom-0 start-50 translate-middle-x bg-danger text-white px-4 py-3 rounded shadow-lg mb-4" style={{ zIndex: 1050 }}>
          {error}
          <button className="btn btn-link btn-sm text-white ms-3 p-0 align-baseline" onClick={() => setShowToast(false)}>Dismiss</button>
        </div>
      )}
    </main>
    </>
  );
};

export default Explore;
