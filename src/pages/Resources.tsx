import React from "react";
import { Card } from "react-bootstrap";

const resources = [
  {
    section: "AI-Powered Websites",
    items: [
      {
        name: "Grok",
        url: "https://grok.com/",
        desc: "An AI assistant built by xAI, offering witty, insightful responses to queries across topics, accessible via web, apps, and integrated experiences for everyday curiosity and problem-solving."
      },
      {
        name: "Alternate History AI",
        url: "https://althistai.com/",
        desc: "Interactive AI-powered platform for exploring alternate historical timelines, analyzing real events, simulating outcomes by changing key decisions, and visualizing cause and effect."
      },
      {
        name: "AI Stock Tickers",
        url: "https://aistocktickers.com/",
        desc: "Stock analysis, trading, and AI-powered insights, featuring current market data, interactive charts, personalized investment tools, and comprehensive research."
      },
      {
        name: "Finster Chat",
        url: "https://www.finsterchat.com/",
        desc: "AI financial assistant providing 24/7 personalized guidance on wealth management, investment strategies, debt management, and retirement planning."
      },
      {
        name: "ChatGPT",
        url: "https://chat.openai.com/",
        desc: "OpenAI's conversational AI model for generating human-like text, brainstorming ideas, coding assistance, and answering complex questions."
      },
      {
        name: "Google Gemini",
        url: "https://gemini.google.com/",
        desc: "Google's multimodal AI for creative tasks, productivity boosts, and information synthesis, integrating text, images, and code."
      },
      {
        name: "Microsoft Copilot",
        url: "https://copilot.microsoft.com/",
        desc: "AI companion embedded in Microsoft tools, helping with email drafting, data analysis, image generation, and workflow automation."
      },
      {
        name: "Synthesia",
        url: "https://www.synthesia.io/",
        desc: "AI video generation platform that creates professional videos from text scripts using realistic avatars."
      },
      {
        name: "Perplexity AI",
        url: "https://www.perplexity.ai/",
        desc: "AI-driven search engine delivering concise, accurate answers with cited sources, combining web search with natural language processing."
      },
      {
        name: "Runway",
        url: "https://runwayml.com/",
        desc: "A suite of AI tools for video editing, generation, and effects, enabling creators to produce cinematic content, remove backgrounds, or animate scenes effortlessly."
      }
    ]
  },
  {
    section: "Evolution and Nature Resources",
    items: [
      {
        name: "National Center for Science Education",
        url: "https://ncse.ngo/",
        desc: "Information and resources on teaching biological evolution, including legislation, school board activities, and debunking intelligent design arguments."
      },
      {
        name: "Understanding Evolution",
        url: "https://evolution.berkeley.edu/",
        desc: "Comprehensive educational resource from UC Berkeley, offering interactive modules, teaching tools, and materials on evolution topics."
      },
      {
        name: "UC Berkeley Museum of Paleontology",
        url: "https://ucmp.berkeley.edu/exhibit/exhibits.html",
        desc: "Online source of information on evolution, geology, and phylogeny, with exhibits and resources."
      },
      {
        name: "PBS Evolution",
        url: "https://www.pbs.org/wgbh/evolution/",
        desc: "Educational resource complementing the PBS series, with interactive features, articles, and materials on adaptation, natural selection, and human evolution."
      },
      {
        name: "DNA Interactive",
        url: "https://www.dnaftb.org/",
        desc: "Resources focused on human evolution and DNA, including a section on human origins."
      },
      {
        name: "HHMI BioInteractive",
        url: "https://www.biointeractive.org/",
        desc: "Animations and resources on the evolution of the Y chromosome and other biology topics."
      }
    ]
  },
  {
    section: "AI Resources",
    items: [
      {
        name: "aiEDU: The AI Education Project",
        url: "https://www.aiedu.org/",
        desc: "Curriculum with low-tech lessons and high-interest projects to help students explore AI concepts."
      },
      {
        name: "Code.org",
        url: "https://code.org/",
        desc: "Free coding resources and lessons, including AI-related activities for K–12 students."
      },
      {
        name: "Machine Learning for Kids",
        url: "https://machinelearningforkids.co.uk/",
        desc: "Introductory tool to machine learning and AI that doesn’t require coding, suitable for grades 3–12."
      },
      {
        name: "Teachable Machine",
        url: "https://teachablemachine.withgoogle.com/",
        desc: "Family-focused, classroom-friendly tool for learning AI and machine learning concepts."
      },
      {
        name: "MIT Scratch",
        url: "https://scratch.mit.edu/",
        desc: "Block-based programming platform for kids, with creative projects and AI extensions."
      }
    ]
  }
];

const Resources: React.FC = () => (
  <main className="container py-5 flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div className="row w-100 justify-content-center" style={{ maxWidth: 900 }}>
      <div className="col-12">
        <Card className="shadow border-0 mb-4">
          <Card.Body>
            <h1 className="h3 fw-bold mb-3 text-success">Recommended Resources</h1>
            <p className="mb-4">Explore these trusted resources to learn more about evolution, nature, and artificial intelligence. These links are curated for students, educators, and curious minds of all ages.</p>
            {resources.map(section => (
              <div key={section.section} className="mb-4">
                <h2 className="h5 fw-semibold mb-3">{section.section}</h2>
                <ul className="list-unstyled">
                  {section.items.map(item => (
                    <li key={item.url} className="mb-3">
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="fw-semibold text-primary" style={{ fontSize: '1.08rem' }}>{item.name}</a>
                      <div className="text-muted small ms-2">{item.desc}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Card.Body>
        </Card>
      </div>
    </div>
  </main>
);

export default Resources;
