import React from "react";
import { Card } from "react-bootstrap";

const Contact: React.FC = () => (
  <main className="container py-5 flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <Card className="shadow-lg border-0 w-100" style={{ maxWidth: 600 }}>
      <Card.Body className="d-flex flex-column align-items-center">
        <h1 className="display-5 fw-bold text-success mb-3">Contact Us</h1>
        <p className="lead text-secondary text-center mb-4">
          We love hearing from fellow explorers! If you have a question, suggestion, or just want to say hello, please email us.<br />
          <a href="mailto:info@aisuretech.com" className="fw-semibold text-primary">info@aisuretech.com</a>
        </p>
        <div className="text-muted text-center" style={{ fontSize: '1.05rem' }}>
          Our small team will do our best to respond promptly. Thank you for helping us make Evolution Explorer even better!
        </div>
      </Card.Body>
    </Card>
  </main>
);

export default Contact;
