import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";


const Header: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  return (
    <Navbar bg="success" variant="dark" expand="md" sticky="top" className="shadow">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/images/logo.jpg"
            alt="Evolution Explorer Logo"
            width={40}
            height={40}
            className="me-2 rounded-circle bg-white"
            style={{ objectFit: "cover" }}
          />
          <span className="fw-bold fs-4 ms-1 align-middle">Evolution Explorer</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/about" className="fw-bold text-warning nav-bright">About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="fw-bold text-warning nav-bright">Contact</Nav.Link>
            <Nav.Link as={Link} to="/faq" className="fw-bold text-warning nav-bright">FAQ</Nav.Link>
            <Nav.Link as={Link} to="/privacy" className="fw-bold text-warning nav-bright">Privacy Policy</Nav.Link>
            <Nav.Link as={Link} to="/terms" className="fw-bold text-warning nav-bright">Terms of Service</Nav.Link>
            <Nav.Link as={Link} to="/login" className="fw-bold text-warning nav-bright">
              {isLoading ? '...' : isAuthenticated && user ? (
                <span className="d-inline-flex align-items-center">
                  {user.picture && <img src={user.picture} alt="avatar" className="rounded-circle me-2" style={{ width: 28, height: 28, objectFit: 'cover' }} />}
                  {user.name || user.email}
                </span>
              ) : (
                'Log In / Sign Up'
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};


// Improved nav-bright style: clean, bold yellow, subtle shadow only on hover/focus
const style = document.createElement('style');
style.innerHTML = `
  .nav-bright {
    color: #ffe066 !important;
    font-weight: bold;
    text-shadow: none;
    transition: color 0.2s, text-shadow 0.2s;
  }
  .nav-bright:hover, .nav-bright:focus {
    color: #fff !important;
    text-shadow: 0 2px 6px #ffc10744;
  }
`;
document.head.appendChild(style);

export default Header;
