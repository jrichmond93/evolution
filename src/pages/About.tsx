import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const About: React.FC = () => (
  <>
    <SEO 
      title="About Us & Careers - Evolution Explorer"
      description="Learn about Evolution Explorer, our mission to make evolutionary science accessible and engaging. Join our remote team! We're hiring developers, researchers, content writers, and more."
      keywords="about, mission, team, evolution education, science outreach, educational platform, careers, jobs, remote work, hiring, employment opportunities"
      canonicalUrl="https://aievolutionexplorer.com/about"
    />
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Evolution Explorer",
        "url": "https://www.aievolutionexplorer.com",
        "logo": "https://www.aievolutionexplorer.com/logo.jpg",
        "description": "Making evolutionary science accessible and engaging through interactive technology and AI-powered educational tools.",
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Customer Service",
          "email": "info@aisuretech.com"
        }
      })}
    </script>
    <script type="application/ld+json">
      {JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": "Senior Full-Stack Developer",
          "description": "Build and maintain our React/Node.js platform, integrate AI APIs, and optimize performance.",
          "datePosted": "2026-01-17",
          "employmentType": "FULL_TIME",
          "hiringOrganization": {
            "@type": "Organization",
            "name": "Evolution Explorer",
            "sameAs": "https://www.aievolutionexplorer.com"
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            }
          },
          "applicantLocationRequirements": {
            "@type": "Country",
            "name": "USA"
          },
          "jobLocationType": "TELECOMMUTE"
        },
        {
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": "AI/ML Engineer",
          "description": "Develop and fine-tune language models for educational content generation and user interaction.",
          "datePosted": "2026-01-17",
          "employmentType": "FULL_TIME",
          "hiringOrganization": {
            "@type": "Organization",
            "name": "Evolution Explorer",
            "sameAs": "https://www.aievolutionexplorer.com"
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            }
          },
          "applicantLocationRequirements": {
            "@type": "Country",
            "name": "USA"
          },
          "jobLocationType": "TELECOMMUTE"
        },
        {
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": "DevOps Engineer",
          "description": "Manage cloud infrastructure, CI/CD pipelines, and ensure scalability and reliability.",
          "datePosted": "2026-01-17",
          "employmentType": "FULL_TIME",
          "hiringOrganization": {
            "@type": "Organization",
            "name": "Evolution Explorer",
            "sameAs": "https://www.aievolutionexplorer.com"
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            }
          },
          "applicantLocationRequirements": {
            "@type": "Country",
            "name": "USA"
          },
          "jobLocationType": "TELECOMMUTE"
        },
        {
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": "UI/UX Designer",
          "description": "Create intuitive, engaging interfaces and visual experiences for diverse learners.",
          "datePosted": "2026-01-17",
          "employmentType": "FULL_TIME",
          "hiringOrganization": {
            "@type": "Organization",
            "name": "Evolution Explorer",
            "sameAs": "https://www.aievolutionexplorer.com"
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            }
          },
          "applicantLocationRequirements": {
            "@type": "Country",
            "name": "USA"
          },
          "jobLocationType": "TELECOMMUTE"
        },
        {
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": "Evolutionary Biology Researcher",
          "description": "Research and verify evolutionary timelines, write scientifically accurate content, and fact-check AI-generated materials.",
          "datePosted": "2026-01-17",
          "employmentType": "FULL_TIME",
          "hiringOrganization": {
            "@type": "Organization",
            "name": "Evolution Explorer",
            "sameAs": "https://www.aievolutionexplorer.com"
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            }
          },
          "applicantLocationRequirements": {
            "@type": "Country",
            "name": "USA"
          },
          "jobLocationType": "TELECOMMUTE"
        },
        {
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": "Content Writer & Editor",
          "description": "Create engaging educational articles, guides, and multimedia content about evolution and natural history.",
          "datePosted": "2026-01-17",
          "employmentType": "FULL_TIME",
          "hiringOrganization": {
            "@type": "Organization",
            "name": "Evolution Explorer",
            "sameAs": "https://www.aievolutionexplorer.com"
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            }
          },
          "applicantLocationRequirements": {
            "@type": "Country",
            "name": "USA"
          },
          "jobLocationType": "TELECOMMUTE"
        },
        {
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": "Scientific Fact Checker",
          "description": "Review content for accuracy, source citations, and alignment with current scientific consensus.",
          "datePosted": "2026-01-17",
          "employmentType": ["FULL_TIME", "PART_TIME"],
          "hiringOrganization": {
            "@type": "Organization",
            "name": "Evolution Explorer",
            "sameAs": "https://www.aievolutionexplorer.com"
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            }
          },
          "applicantLocationRequirements": {
            "@type": "Country",
            "name": "USA"
          },
          "jobLocationType": "TELECOMMUTE"
        },
        {
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": "Community Manager",
          "description": "Engage with users, manage social media, respond to inquiries, and build our educational community.",
          "datePosted": "2026-01-17",
          "employmentType": "FULL_TIME",
          "hiringOrganization": {
            "@type": "Organization",
            "name": "Evolution Explorer",
            "sameAs": "https://www.aievolutionexplorer.com"
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            }
          },
          "applicantLocationRequirements": {
            "@type": "Country",
            "name": "USA"
          },
          "jobLocationType": "TELECOMMUTE"
        },
        {
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": "Digital Marketing Specialist",
          "description": "Drive growth through SEO, content marketing, partnerships with educational institutions, and outreach campaigns.",
          "datePosted": "2026-01-17",
          "employmentType": "FULL_TIME",
          "hiringOrganization": {
            "@type": "Organization",
            "name": "Evolution Explorer",
            "sameAs": "https://www.aievolutionexplorer.com"
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            }
          },
          "applicantLocationRequirements": {
            "@type": "Country",
            "name": "USA"
          },
          "jobLocationType": "TELECOMMUTE"
        },
        {
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": "Project Coordinator",
          "description": "Coordinate cross-functional teams, manage timelines, track deliverables, and ensure smooth operations.",
          "datePosted": "2026-01-17",
          "employmentType": "FULL_TIME",
          "hiringOrganization": {
            "@type": "Organization",
            "name": "Evolution Explorer",
            "sameAs": "https://www.aievolutionexplorer.com"
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "US"
            }
          },
          "applicantLocationRequirements": {
            "@type": "Country",
            "name": "USA"
          },
          "jobLocationType": "TELECOMMUTE"
        }
      ])}
    </script>
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
        
        <h2 className="h5 fw-bold mt-5 mb-3">Join Our Team - Careers at Evolution Explorer</h2>
        <p className="mb-3">
          We're growing! Evolution Explorer is looking for passionate individuals to help us make science education more accessible. All positions are <strong>100% remote</strong>.
        </p>
        
        <h3 className="h6 fw-semibold mt-4 text-primary">Technical Positions</h3>
        <ul className="mb-3">
          <li><strong>Senior Full-Stack Developer</strong> - Build and maintain our React/Node.js platform, integrate AI APIs, and optimize performance.</li>
          <li><strong>AI/ML Engineer</strong> - Develop and fine-tune language models for educational content generation and user interaction.</li>
          <li><strong>DevOps Engineer</strong> - Manage cloud infrastructure, CI/CD pipelines, and ensure scalability and reliability.</li>
          <li><strong>UI/UX Designer</strong> - Create intuitive, engaging interfaces and visual experiences for diverse learners.</li>
        </ul>
        
        <h3 className="h6 fw-semibold mt-4 text-info">Research & Content Positions</h3>
        <ul className="mb-3">
          <li><strong>Evolutionary Biology Researcher</strong> - Research and verify evolutionary timelines, write scientifically accurate content, and fact-check AI-generated materials.</li>
          <li><strong>Content Writer & Editor</strong> - Create engaging educational articles, guides, and multimedia content about evolution and natural history.</li>
          <li><strong>Scientific Fact Checker</strong> - Review content for accuracy, source citations, and alignment with current scientific consensus.</li>
        </ul>
        
        <h3 className="h6 fw-semibold mt-4 text-warning">Administrative & Operations Positions</h3>
        <ul className="mb-3">
          <li><strong>Community Manager</strong> - Engage with users, manage social media, respond to inquiries, and build our educational community.</li>
          <li><strong>Digital Marketing Specialist</strong> - Drive growth through SEO, content marketing, partnerships with educational institutions, and outreach campaigns.</li>
          <li><strong>Project Coordinator</strong> - Coordinate cross-functional teams, manage timelines, track deliverables, and ensure smooth operations.</li>
        </ul>
        
        <p className="mt-4 mb-3">
          <strong>Interested?</strong> We'd love to hear from you! Please visit our <Link to="/contact" className="text-success fw-semibold">Contact page</Link> to send us an email with your resume and a brief introduction about why you're excited to join Evolution Explorer.
        </p>
        
        <div className="text-muted text-center mt-4" style={{ fontSize: '1.05rem' }}>
          Website by <a href="https://aisuretech.com/" target="_blank" rel="noopener noreferrer" className="text-success fw-semibold">AI Sure Tech</a>
        </div>
      </Card.Body>
    </Card>
  </main>
  </>
);

export default About;
