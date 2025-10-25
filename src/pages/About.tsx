import React from "react";
import { Card } from "react-bootstrap";

const About: React.FC = () => (
  <main className="container py-5 flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <Card className="shadow-lg border-0 w-100" style={{ maxWidth: 700 }}>
      <Card.Body>
        <h1 className="display-5 fw-bold text-success mb-4 text-center">About Evolution Explorer</h1>
        <p className="lead text-secondary mb-4 text-center">
          Evolution Explorer is dedicated to making the story of life on Earth accessible and engaging for everyone. Our mission is to provide accurate, interactive, and visually appealing evolutionary timelines and facts for animals across the tree of life.
        </p>
        <h2 className="h5 fw-bold mt-4">How the Website Works</h2>
        <p>
          Evolution Explorer brings together data from scientific sources and presents it in a user-friendly, interactive format. You can search for animals by name or filter by category, then explore their evolutionary history, timelines, and fun facts. Our site is designed for students, teachers, and anyone curious about the diversity of life.
        </p>
        <h2 className="h5 fw-bold mt-4">How AI is Used</h2>
        <p>
          We use advanced AI language models to help generate educational content, answer your questions, and suggest interesting animal facts. The AI draws on a wide range of scientific knowledge and patterns from large datasets, but we always encourage users to consult trusted sources for critical information. AI also helps us keep the site up-to-date and engaging.
        </p>
        <h2 className="h5 fw-bold mt-4">How We Enable You to Learn About Evolution</h2>
        <p>
          Our platform is built to make learning about evolution fun and accessible. You can:
          <ul>
            <li>Explore evolutionary timelines and relationships for hundreds of animals</li>
            <li>Read guides and primers on key concepts in evolution</li>
            <li>Discover how scientists like Charles Darwin shaped our understanding of life</li>
            <li>Ask questions and get AI-powered answers</li>
            <li>Access resources for students and educators</li>
          </ul>
          Whether you're a student, teacher, or lifelong learner, Evolution Explorer is your gateway to the wonders of evolution.
        </p>
        <div className="text-muted text-center mt-4" style={{ fontSize: '1.05rem' }}>
          Website by <a href="https://aisuretech.com/" target="_blank" rel="noopener noreferrer" className="text-success fw-semibold">AI Sure Tech</a>
        </div>
      </Card.Body>
    </Card>
  </main>
);

export default About;
