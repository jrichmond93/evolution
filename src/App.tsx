// ...existing imports...
import OriginOfLife from "./pages/discussions/OriginOfLife";
// ...existing imports...
import CambrianExplosion from "./pages/discussions/CambrianExplosion";
// ...existing imports...
import IrreducibleComplexity from "./pages/discussions/IrreducibleComplexity";
// ...existing imports...
import DNAInformation from "./pages/discussions/DNAInformation";
// ...existing imports...
import PrivilegedPlanet from "./pages/discussions/PrivilegedPlanet";
import TheisticDesign from "./pages/discussions/TheisticDesign";
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
import CellComplexity from "./pages/CellComplexity";
import IntelligentDesign from "./pages/IntelligentDesign";
import HistoricalFoundations from "./pages/discussions/HistoricalFoundations";
import ScientificMaterialism from "./pages/discussions/ScientificMaterialism";
import UniverseOrigin from "./pages/discussions/UniverseOrigin";
import FineTuning from "./pages/discussions/FineTuning";
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
          <Route path="/explore/:animalSlug?" element={<Layout><Explore /></Layout>} />
          <Route path="/evolution-guide" element={<Layout><EvolutionGuide /></Layout>} />
          <Route path="/charles-darwin" element={<Layout><CharlesDarwin /></Layout>} />
          <Route path="/cell-complexity" element={<Layout><CellComplexity /></Layout>} />
                    <Route path="/intelligent-design" element={<Layout><IntelligentDesign /></Layout>} />
                    <Route path="/discussions/historical-foundations" element={<Layout><HistoricalFoundations /></Layout>} />
                    <Route path="/discussions/scientific-materialism" element={<Layout><ScientificMaterialism /></Layout>} />
                    <Route path="/discussions/universe-origin" element={<Layout><UniverseOrigin /></Layout>} />
                    <Route path="/discussions/fine-tuning" element={<Layout><FineTuning /></Layout>} />
                    <Route path="/discussions/theistic-design" element={<Layout><TheisticDesign /></Layout>} />
          <Route path="/login" element={<Layout><LoginPage /></Layout>} />
          <Route path="/resources" element={<Layout><Resources /></Layout>} />
                    <Route path="/discussions/privileged-planet" element={<Layout><PrivilegedPlanet /></Layout>} />
                    <Route path="/discussions/dna-information" element={<Layout><DNAInformation /></Layout>} />
                    <Route path="/discussions/irreducible-complexity" element={<Layout><IrreducibleComplexity /></Layout>} />
                    <Route path="/discussions/cambrian-explosion" element={<Layout><CambrianExplosion /></Layout>} />
                    <Route path="/discussions/origin-of-life" element={<Layout><OriginOfLife /></Layout>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;

