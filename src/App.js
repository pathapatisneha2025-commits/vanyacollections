import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import VanyaCollections from "./components/VanyaCollections";
import NewArrivals from "./components/NewArrivals";
import VanyaCta from "./components/Vanyacta";
import VanyaBestSellers from "./components/VanyaBestSellers";
import Testimonials from "./components/Testimonals";
import AboutOurStory from "./components/Aboutus";
import InstagramGallery from "./components/InstagramGallery";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import CollectionPage from "./pages/CollectioPage";
import ShopPage from "./pages/ShopPage";

// Example pages (uncomment or replace with your own)
// import LandingPage from "./pages/LandingPage";
// import ShopPage from "./pages/ShopPage";
// import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <Router>
      {/* Navbar visible on all pages */}
      <Navbar />

      <Routes>
        {/* Home/Landing Page */}
        <Route path="/" element={
          <>
          <HeroSection />
          <VanyaCollections/>
          <NewArrivals/>
          <VanyaCta/>
          <VanyaBestSellers/>
          <Testimonials/>
          <AboutOurStory/>
          <InstagramGallery/>
          <Footer/>
          </>
      } 
      />

        {/* Other Pages */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
                <Route path="/collection" element={<CollectionPage />} />
                                <Route path="/shop" element={<ShopPage />} />


      </Routes>

      {/* Footer visible on all pages */}
      <Footer />
    </Router>
  );
}

export default App;