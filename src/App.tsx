import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import FAQ from "./pages/FAQ";
import Explore from "./pages/Explore";
import EvolutionGuide from "./pages/EvolutionGuide";
import CharlesDarwin from "./pages/CharlesDarwin";
import LoginPage from "./pages/LoginPage";
import Resources from "./pages/Resources";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>{children}</>
);

const App: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <ScrollToTop />
      <Header />
      <main className="flex-fill">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
          <Route path="/terms" element={<Layout><Terms /></Layout>} />
          <Route path="/faq" element={<Layout><FAQ /></Layout>} />
          <Route path="/explore" element={<Layout><Explore /></Layout>} />
          <Route path="/evolution-guide" element={<Layout><EvolutionGuide /></Layout>} />
          <Route path="/charles-darwin" element={<Layout><CharlesDarwin /></Layout>} />
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/resources" element={<Layout><Resources /></Layout>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;

