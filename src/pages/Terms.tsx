import React from "react";
import { Card } from "react-bootstrap";

const Terms: React.FC = () => (
  <main className="container py-5 flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <Card className="shadow-lg border-0 w-100" style={{ maxWidth: 700 }}>
      <Card.Body>
        <h1 className="display-5 fw-bold text-success mb-4 text-center">Terms of Service</h1>
        <p className="lead text-secondary mb-4 text-center">By using Evolution Explorer, you agree to these terms. Please read them carefully.</p>
        <h2 className="h5 fw-bold mt-4">1. Acceptance of Terms</h2>
        <ul>
          <li>By accessing or using Evolution Explorer, you agree to be bound by these Terms of Service and our Privacy Policy.</li>
          <li>If you do not agree to these terms, please do not use the site.</li>
        </ul>
        <h2 className="h5 fw-bold mt-4">2. Use of Content</h2>
        <ul>
          <li>All content is for educational and informational purposes only.</li>
          <li>You may use the site for personal, non-commercial use. For other uses, please contact us for permission.</li>
          <li>Do not copy, reproduce, or distribute content without proper attribution.</li>
        </ul>
        <h2 className="h5 fw-bold mt-4">3. User Conduct</h2>
        <ul>
          <li>Do not use the site for unlawful, harmful, or abusive purposes.</li>
          <li>Do not attempt to disrupt or compromise the security or integrity of the site.</li>
        </ul>
        <h2 className="h5 fw-bold mt-4">4. Disclaimer of Warranties</h2>
        <ul>
          <li>Content is provided "as is" without warranties of any kind. We do not guarantee accuracy, completeness, or reliability.</li>
          <li>We are not responsible for errors, omissions, or any losses resulting from use of the site.</li>
        </ul>
        <h2 className="h5 fw-bold mt-4">5. Limitation of Liability</h2>
        <ul>
          <li>To the fullest extent permitted by law, Evolution Explorer and its team are not liable for any damages arising from your use of the site.</li>
        </ul>
        <h2 className="h5 fw-bold mt-4">6. Third-Party Links</h2>
        <ul>
          <li>The site may contain links to third-party websites. We are not responsible for their content or privacy practices.</li>
        </ul>
        <h2 className="h5 fw-bold mt-4">7. Changes to Terms</h2>
        <ul>
          <li>We may update these Terms of Service at any time. Changes will be posted on this page with an updated date.</li>
        </ul>
        <h2 className="h5 fw-bold mt-4">8. Governing Law</h2>
        <ul>
          <li>These terms are governed by the laws of your jurisdiction, without regard to conflict of law principles.</li>
        </ul>
        <h2 className="h5 fw-bold mt-4">9. Contact Us</h2>
        <ul>
          <li>If you have questions about these terms, please contact us at <a href="mailto:info@aisuretech.com">info@aisuretech.com</a>.</li>
        </ul>
        <div className="text-muted text-center mt-4" style={{ fontSize: '1.05rem' }}>
          Last updated: October 25, 2025
        </div>
      </Card.Body>
    </Card>
  </main>
);

export default Terms;
