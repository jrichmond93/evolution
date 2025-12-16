import { Link } from "react-router-dom";



const Footer: React.FC = () => (
  <footer className="bg-success text-white py-3 mt-auto">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-12 col-md-4 text-center text-md-start mb-2 mb-md-0">
          © {new Date().getFullYear()} Evolution Explorer<br className="d-md-none" />
          <span className="d-none d-md-inline">All rights reserved.</span>
        </div>
        <div className="col-12 col-md-4 text-center mb-2 mb-md-0">
          <a
            href="https://aisuretech.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white fw-semibold text-decoration-none"
          >
            Website by AI Sure Tech
          </a>
        </div>
        <div className="col-12 col-md-4">
          <div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-end align-items-center gap-2 gap-md-3">
            <Link to="/evolution-guide" className="text-white small text-decoration-none">Primer</Link>
            <Link to="/resources" className="text-white small text-decoration-none">Resources</Link>
            <a href="/sitemap.xml" className="text-white small text-decoration-none">Sitemap</a>
            <a href="https://www.facebook.com/aisuretech/" className="text-white small text-decoration-none" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.instagram.com/aisuretech" className="text-white small text-decoration-none" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.tiktok.com/@aisuretech" className="text-white small text-decoration-none" target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href="https://www.linkedin.com/company/aisuretech" className="text-white small text-decoration-none" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://x.com/aisuretech" className="text-white small text-decoration-none" target="_blank" rel="noopener noreferrer">X</a>
            <a href="https://www.youtube.com/@AISureTech" className="text-white small text-decoration-none" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
