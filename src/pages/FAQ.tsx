import React from "react";
import { Card, Accordion } from "react-bootstrap";

const faqs = [
  {
    q: "What is Evolution Explorer?",
    a: "Evolution Explorer is an interactive website for exploring animal evolution, timelines, and fascinating facts about the diversity of life on Earth."
  },
  {
    q: "How does the AI work?",
    a: "Our AI uses advanced language models to help generate educational content, answer questions, and suggest animal facts. It combines information from scientific sources and patterns learned from large datasets, but always check with trusted references for critical information."
  },
  {
    q: "Is the information accurate?",
    a: "We strive for accuracy and use reputable scientific sources, but some content is AI-generated and may not be perfect. If you spot an error, please let us know!"
  },
  {
    q: "Can I suggest an animal or feature?",
    a: "Absolutely! We welcome suggestions. Please contact us with your ideas."
  },
  {
    q: "Where do the animal images come from?",
    a: "Images are sourced from Wikimedia Commons and other open resources. If no image is found, a fun placeholder is shown."
  },
  {
    q: "Is this site free to use?",
    a: "Yes, Evolution Explorer is completely free for educational and personal use."
  },
  {
    q: "Can I use the information for my school project?",
    a: "Yes! Please cite Evolution Explorer and any original sources listed."
  },
  {
    q: "How do I contact the team?",
    a: "You can email us at info@aievolutionexplorer.com. We love hearing from users!"
  },
  {
    q: "Will you add more animals or features?",
    a: "We are always working to expand the site. Stay tuned for updates and new content!"
  },
  {
    q: "Is my data private?",
    a: "We respect your privacy and do not collect personal information beyond basic analytics. See our Privacy Policy for details."
  },
  {
    q: "Who created Evolution Explorer?",
    a: "A small team of educators, developers, and AI enthusiasts passionate about science and learning."
  },
];

const FAQ: React.FC = () => (
  <main className="container py-5 flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <Card className="shadow-lg border-0 w-100" style={{ maxWidth: 700 }}>
      <Card.Body>
        <h1 className="display-5 fw-bold text-success mb-4 text-center">Frequently Asked Questions</h1>
        <Accordion defaultActiveKey="0" flush>
          {faqs.map((faq, idx) => (
            <Accordion.Item eventKey={String(idx)} key={idx}>
              <Accordion.Header>{faq.q}</Accordion.Header>
              <Accordion.Body>{faq.a}</Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Card.Body>
    </Card>
  </main>
);

export default FAQ;
