import React from "react";
import { Card } from "react-bootstrap";
import SEO from "../components/SEO";

const Privacy: React.FC = () => (
  <>
    <SEO 
      title="Privacy Policy - Evolution Explorer"
      description="Evolution Explorer privacy policy. Learn how we protect your data and respect your privacy while you explore the animal kingdom."
      keywords="privacy policy, data protection, user privacy, GDPR, security"
      canonicalUrl="https://aievolutionexplorer.com/privacy"
    />
    <main className="container py-5 flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <Card className="shadow-lg border-0 w-100" style={{ maxWidth: 700 }}>
      <Card.Body>
        <h1 className="display-5 fw-bold text-success mb-4 text-center">Privacy Policy</h1>
        <p className="lead text-secondary mb-4 text-center">Your privacy is important to us. This policy explains how we collect, use, and protect your information when you use Evolution Explorer.</p>
        <h2 className="h5 fw-bold mt-4">1. Information We Collect</h2>
        <ul>
          <li>We do <strong>not</strong> require you to create an account or provide personal information to use the site.</li>
          <li>We may collect non-personal information such as browser type, device, and usage data for analytics and site improvement.</li>
          <li>If you contact us by email, we will use your email address only to respond to your inquiry.</li>
        </ul>
        <h2 className="h5 fw-bold mt-4">2. How We Use Information</h2>
        <ul>
          <li>To improve site performance, content, and user experience.</li>
          <li>To respond to your questions or feedback if you contact us.</li>
          <li>To analyze site usage trends using analytics tools (such as Google Analytics).</li>
        </ul>
        <h2 className="h5 fw-bold mt-4">3. Cookies and Analytics</h2>
        <ul>
          <li>We use cookies and similar technologies to understand how visitors use our site and to improve functionality.</li>
          <li>Third-party analytics providers (like Google Analytics) may collect anonymized usage data. You can opt out of Google Analytics by visiting <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">this page</a>.</li>
        </ul>
        <h2 className="h5 fw-bold mt-4">4. Data Sharing</h2>
        <ul>
          <li>We do <strong>not</strong> sell, trade, or rent your personal information to third parties.</li>
          <li>We may share anonymized, aggregated data for research or reporting purposes.</li>
          <li>We may disclose information if required by law or to protect our rights and users.</li>
        </ul>
        <h2 className="h5 fw-bold mt-4">5. Children's Privacy</h2>
        <ul>
          <li>Evolution Explorer is intended for general audiences, including students. We do not knowingly collect personal information from children under 13.</li>
        </ul>
        <h2 className="h5 fw-bold mt-4">6. Data Security</h2>
        <ul>
          <li>We use reasonable measures to protect your information from unauthorized access or disclosure.</li>
        </ul>
        <h2 className="h5 fw-bold mt-4">7. Changes to This Policy</h2>
        <ul>
          <li>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date.</li>
        </ul>
        <h2 className="h5 fw-bold mt-4">8. Contact Us</h2>
        <ul>
          <li>If you have questions about this policy, please contact us at <a href="mailto:info@aisuretech.com">info@aisuretech.com</a>.</li>
        </ul>
        <div className="text-muted text-center mt-4" style={{ fontSize: '1.05rem' }}>
          Last updated: October 25, 2025
        </div>
      </Card.Body>
    </Card>
  </main>
  </>
);

export default Privacy;
