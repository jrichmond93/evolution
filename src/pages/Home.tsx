

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
// Short intro for the home page card (from intro.md)
const introMd = `Have you ever wondered why there are so many different kinds of animals on Earth? Or how humans came to be? The theory of evolution provides answers to these questions. Evolution is the process by which living organisms change over time, leading to the diversity of life we see today.\n\nAt its core, evolution explains how species adapt to their environments, how new species form, and how all life is connected through common ancestors. This essay will explore the history of the theory, its key principles, the evidence supporting it, and some common misconceptions. By the end, you'll have a solid understanding of one of the most important ideas in biology.`;
const darwinIntroMd = `**Meet Charles Darwin and His Era**  \nEver wondered about the man behind the theory of evolution? Explore the life of Charles Darwin, his groundbreaking voyage on the HMS Beagle, and the scientists who shaped his ideas. Learn how Darwin wrestled with his discoveries challenging his religious beliefs and how his work revolutionized science. Perfect for high school students, this engaging guide brings history to life!`;

const Home: React.FC = () => {

  const [animals, setAnimals] = useState<Array<{ id: string; common_name: string; scientific_name: string; category: string; popularity?: number }>>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null);
  const [error, setError] = useState("");
  const [animalImageUrl, setAnimalImageUrl] = useState<string | undefined>(undefined);
  const [imageAttribution, setImageAttribution] = useState<{ title?: string; pageid?: number } | undefined>(undefined);
  // Pick a random placeholder image on load
  const [randomPlaceholder, setRandomPlaceholder] = useState<string>('/images/placeholder1.png');
  useEffect(() => {
    const n = Math.floor(Math.random() * 9) + 1;
    setRandomPlaceholder(`/images/placeholder${n}.png`);
  }, []);
  const placeholderUrl = randomPlaceholder;
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showPopular, setShowPopular] = useState(true); // Default to Most Popular
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setError("");
    fetch(import.meta.env.VITE_API_BASE + "/animals")
      .then((res) => res.json())
      .then((data) => {
        setAnimals(data);
        setCategories(Array.from(new Set(data.map((a: any) => String(a.category)))).sort() as string[]);
      })
      .catch(() => {
        setError("Failed to load animals");
      });
    // Dropdown close on outside click
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  let filteredAnimals = animals;
  if (showPopular) {
    filteredAnimals = [...filteredAnimals]
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .slice(0, 50);
  }
  if (selectedCategory) {
    filteredAnimals = filteredAnimals.filter(a => a.category === selectedCategory);
  }
  if (searchTerm) {
    filteredAnimals = filteredAnimals.filter(
      animal =>
        animal.common_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.scientific_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  const showAnimalDropdown = showDropdown && (searchTerm.length > 0 || selectedCategory || showPopular);


  // Build Unsplash image URL for the selected animal

  // Wikimedia Commons image search
  useEffect(() => {
    if (!selectedAnimal) {
      setAnimalImageUrl(undefined);
      setImageAttribution(undefined);
      return;
    }
    const query = encodeURIComponent(selectedAnimal.common_name || selectedAnimal.scientific_name || "animal");
    // Wikimedia Commons API for images
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
  }, [selectedAnimal]);

  function generateSessionId() {
    // Simple random session id: SESSION-<timestamp>-<random>
    return `SESSION-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
  }
  const handleStart = () => {
    if (selectedAnimal) {
      const sessionId = generateSessionId();
      navigate("/explore", { state: { animal: selectedAnimal, user_session_id: sessionId } });
    }
  };

  return (
    <main className="container py-5 flex-grow-1 d-flex flex-column align-items-center justify-content-center">
      {/* Welcome header and intro spanning 2 columns */}
      <div className="row w-100 justify-content-center mb-4" style={{ maxWidth: 900 }}>
        <div className="col-12 col-md-12">
          <div className="text-center mb-3">
            <h1 className="display-5 fw-bold text-success mb-2" style={{ fontFamily: 'Inter, Roboto, Arial, sans-serif' }}>Welcome to Evolution Explorer</h1>
            <p className="lead text-secondary mb-0" style={{ maxWidth: 700, margin: '0 auto' }}>
              Discover the evolutionary history of animals, explore fascinating facts, and learn about the diversity of life on Earth. Start by selecting an animal or searching for your favorite species.
            </p>
          </div>
        </div>
      </div>
      <div className="row w-100 justify-content-center" style={{ maxWidth: 900 }}>
        {/* Animal selection and info */}
        <div className="col-12 col-md-7 mb-4">
          <div className="card shadow-lg border-0 h-100">
            <div className="card-body d-flex flex-column align-items-center">
              <div className="w-100 text-center mb-2" style={{ paddingBottom: '0.5rem' }}>
                <span className="fw-semibold text-success" style={{ fontSize: '1.15rem' }}>All life is connected! Start exploring now</span>
              </div>
              <div className="d-flex flex-wrap gap-2 mb-3 justify-content-center w-100">
                <button
                  className={`btn btn-outline-success btn-sm rounded-pill px-4 py-2 ${showPopular ? 'active text-white bg-success border-success' : ''}`}
                  style={{ minWidth: 90 }}
                  onClick={() => { setShowPopular(true); setSelectedCategory(""); }}
                >Most Popular</button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`btn btn-outline-success btn-sm rounded-pill px-4 py-2 ${selectedCategory === cat ? 'active text-white bg-success border-success' : ''}`}
                    style={{ minWidth: 90 }}
                    onClick={() => { setSelectedCategory(cat); setShowPopular(false); }}
                  >{cat}</button>
                ))}
                <button
                  className={`btn btn-outline-success btn-sm rounded-pill px-4 py-2 ${!showPopular && !selectedCategory ? 'active text-white bg-success border-success' : ''}`}
                  style={{ minWidth: 90 }}
                  onClick={() => { setShowPopular(false); setSelectedCategory(""); }}
                >All</button>
              </div>
              <div className="w-100 position-relative mb-3" ref={dropdownRef}>
              <label htmlFor="animal-search" className="form-label fw-semibold mb-1">Search or select an animal</label>
              <input
                id="animal-search"
                type="text"
                value={searchTerm}
                onFocus={() => setShowDropdown(true)}
                onChange={e => { setSearchTerm(e.target.value); setShowDropdown(true); }}
                className="form-control bg-light"
                placeholder="Type a name..."
                autoComplete="off"
              />
              {showAnimalDropdown && (
                <div className="position-absolute w-100 bg-white border rounded shadow mt-1" style={{ zIndex: 20, maxHeight: 224, overflowY: 'auto' }}>
                  <ul className="list-unstyled mb-0">
                    {filteredAnimals.map(animal => (
                      <li
                        key={animal.id}
                        className={`px-3 py-2 cursor-pointer d-flex justify-content-between align-items-center ${selectedAnimal && selectedAnimal.id === animal.id ? 'bg-success text-white fw-bold' : 'hover-bg-light'}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => { setSelectedAnimal(animal); setShowDropdown(false); setSearchTerm(animal.common_name); }}
                      >
                        <span>{animal.common_name} <span className="text-muted small">({animal.scientific_name})</span></span>
                      </li>
                    ))}
                    {filteredAnimals.length === 0 && <li className="px-3 py-2 text-muted">No animals found.</li>}
                  </ul>
                </div>
              )}
            </div>
              {error && <div className="alert alert-danger w-100 mb-2 py-2 px-3">{error}</div>}
              <button
                className="btn btn-primary w-100 mt-2 fs-5 fw-semibold rounded-pill shadow"
                disabled={!selectedAnimal}
                onClick={handleStart}
              >
                {selectedAnimal ? `Explore ${selectedAnimal.common_name}` : 'Start Exploring'}
              </button>
            </div>
          </div>
        </div>
        {/* Animal image card */}
        <div className="col-12 col-md-5 mb-4 d-flex align-items-center justify-content-center">
          <div className="card shadow-lg border-0 h-100 d-flex flex-column align-items-center justify-content-center" style={{ maxWidth: 500, minHeight: 420 }}>
            <div className="card-body w-100 d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex align-items-center justify-content-center w-100" style={{ minHeight: 213, minWidth: 320 }}>
                <img
                  src={animalImageUrl || placeholderUrl}
                  alt={selectedAnimal ? selectedAnimal.common_name : 'Animal placeholder'}
                  className="rounded shadow-sm border bg-light"
                  style={{ width: 300, height: 200, objectFit: 'contain', background: '#f8f9fa', aspectRatio: '3/2' }}
                  onError={e => { (e.target as HTMLImageElement).src = placeholderUrl; }}
                />
              </div>
              <div className="mt-2 text-muted text-center" style={{ fontSize: '0.95rem' }}>
                {animalImageUrl && imageAttribution && imageAttribution.title && imageAttribution.pageid ? (
                  <span>
                    Image: <a href={`https://commons.wikimedia.org/?curid=${imageAttribution.pageid}`} target="_blank" rel="noopener noreferrer">{imageAttribution.title.replace('File:', '')}</a> via Wikimedia Commons
                  </span>
                ) : (
                  'Explore animal evolution, fun facts, and Earths biodiversity—just pick or search a species to begin'
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Evolution Guide Card */}
      <div className="row w-100 justify-content-center mt-4" style={{ maxWidth: 900 }}>
        <div className="col-12">
          <Card className="shadow border-0 mb-4">
            <Card.Body>
              <h2 className="h4 fw-bold mb-2 text-success">Learn About Evolution</h2>
              <div className="mb-3">
                <ReactMarkdown>{introMd}</ReactMarkdown>
              </div>
              <Button variant="primary" className="rounded-pill px-4 fw-semibold" onClick={() => navigate("/evolution-guide")}>Read the Evolution Primer</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
      {/* Charles Darwin Card */}
      <div className="row w-100 justify-content-center mt-2" style={{ maxWidth: 900 }}>
        <div className="col-12">
          <Card className="shadow border-0 mb-4">
            <Card.Body>
              <h2 className="h4 fw-bold mb-2 text-primary">Meet Charles Darwin</h2>
              <div className="mb-3">
                <ReactMarkdown>{darwinIntroMd}</ReactMarkdown>
              </div>
              <Button variant="outline-primary" className="rounded-pill px-4 fw-semibold" onClick={() => navigate("/charles-darwin")}>Discover Darwin & His Era</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Home;
