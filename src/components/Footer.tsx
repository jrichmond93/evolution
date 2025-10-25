
import { Link } from "react-router-dom";



const Footer: React.FC = () => (
  <footer className="bg-success text-white mt-auto py-3 shadow">
    <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
      <div className="d-flex flex-column flex-md-row gap-2 gap-md-4 align-items-center small">
        <span>&copy; {new Date().getFullYear()} Evolution Explorer</span>
        <span>All rights reserved.</span>
        <a href="/sitemap.xml" className="link-light text-decoration-underline ms-md-3" target="_blank" rel="noopener noreferrer">Sitemap</a>
      </div>
      <div className="d-flex flex-column flex-md-row align-items-center gap-2 gap-md-4">
        <a href="https://aisuretech.com/" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none fw-semibold mx-md-3" style={{ fontSize: '1.05rem' }}>Website by AI Sure Tech</a>
      </div>
      <div className="d-flex gap-3 align-items-center">
        <Link to="/evolution-guide" className="link-light text-decoration-none fw-semibold">Primer</Link>
        <Link to="/charles-darwin" className="link-light text-decoration-none fw-semibold">Darwin</Link>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="link-light text-decoration-none" style={{ fontSize: '0.95rem' }}>Twitter</a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="link-light text-decoration-none" style={{ fontSize: '0.95rem' }}>Facebook</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="link-light text-decoration-none" style={{ fontSize: '0.95rem' }}>Instagram</a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="link-light text-decoration-none" style={{ fontSize: '0.95rem' }}>YouTube</a>
      </div>
    </div>
  </footer>
);

export default Footer;
