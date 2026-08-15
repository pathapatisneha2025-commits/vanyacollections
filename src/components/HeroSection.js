import React from "react";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  // Items for the ticker line
  const tickerItems = [
    "BANARASI SILK",
    "KANJEEVARAM",
    "PURE HANDLOOM",
    "BRIDAL COLLECTION",
    "DESIGNER SAREES",
    "FREE SHIPPING OVER ₹5000",
  ];

  return (
    <div style={styles.heroWrapper}>
      {/* Announcement */}
      <div style={styles.announcementBar}>
        ✦ FREE SHIPPING ABOVE ₹5000 ✦ USE CODE VANYA10 ✦ LUXURY HANDLOOMS ✦
      </div>

      <div style={styles.overlay}></div>
      <div style={styles.goldBlur}></div>
      <div style={styles.purpleBlur}></div>

      <div style={styles.content}>
        {/* Logo */}
        <div style={styles.logoContainer}>
          <div style={styles.logoMain}>VANYA</div>
          <div style={styles.logoSub}>Luxury Saree House</div>
        </div>

        {/* Hero Text */}
        <div style={styles.heroText}>
          <p style={styles.topLabel}>2018 · INDIA'S FINEST</p>
          <h1 style={styles.mainHeading}>
            Elegance Woven <br />
            in Every Thread
          </h1>
          <p style={styles.description}>
            Discover handcrafted silk and designer sarees from India's master weavers.
            Each piece tells a story of tradition, artistry, and timeless beauty.
          </p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <Link to="/collection" style={{ textDecoration: 'none' }}>
              <button style={styles.primaryBtn}>✦ Explore Collections</button>
            </Link>

            <Link to="/shop" style={{ textDecoration: 'none' }}>
              <button style={styles.secondaryBtn}>Shop All Sarees →</button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div style={styles.stats}>
          <div>
            <h3>10,000+</h3>
            <span>Happy Clients</span>
          </div>
          <div>
            <h3>500+</h3>
            <span>Exclusive Designs</span>
          </div>
          <div>
            <h3>100%</h3>
            <span>Authentic Weaves</span>
          </div>
        </div>
      </div>

      {/* Scrolling Yellow Line */}
      <div style={styles.tickerBanner}>
        <div style={styles.tickerTrack}>
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span key={index} style={styles.tickerItem}>
              ✦ {item}
            </span>
          ))}
        </div>
      </div>

      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;600&display=swap');

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(40px); }
          to { opacity:1; transform:translateY(0); }
        }

        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width:768px){
          h1 { font-size: 2.5rem !important; }
          .stats { gap: 20px !important; flex-wrap: wrap; }
        }
      `}
      </style>
    </div>
  );
};

const styles = {
  heroWrapper: {
    position: "relative",
    minHeight: "100vh",
    fontFamily: "'Playfair Display', serif",
    backgroundImage: "url('/herosection.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#fff",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, rgba(74, 38, 93, 0.75), rgba(51, 23, 66, 0.9))", // Updated to Deep Purple gradient
    zIndex: 1,
  },
  goldBlur: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background: "rgba(244,196,48,0.2)", // Logo matching gold/yellow
    filter: "blur(160px)",
    top: "-100px",
    right: "-100px",
    zIndex: 1,
  },
  purpleBlur: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "rgba(90, 40, 115, 0.5)", // Rich purple blur
    filter: "blur(140px)",
    bottom: "-100px",
    left: "-100px",
    zIndex: 1,
  },
  announcementBar: {
    textAlign: "center",
    padding: "12px 0",
    fontSize: "11px",
    letterSpacing: "3px",
    background: "#2a1236", // Deep royal purple shade
    color: "#f4c430", // Logo gold
    zIndex: 3,
    position: "relative",
  },
  content: {
    position: "relative",
    zIndex: 2,
    padding: "0 8%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  logoContainer: { paddingTop: "40px" },
  logoMain: {
    fontSize: "30px",
    letterSpacing: "6px",
    fontWeight: "700",
    background: "linear-gradient(90deg,#f4c430,#ffe885,#f4c430)", // Bright gold logo gradient
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroText: {
    maxWidth: "850px",
    animation: "fadeUp 1.2s ease forwards",
  },
  topLabel: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "14px",
    letterSpacing: "8px",
    color: "#f4c430",
    marginBottom: "25px",
    fontWeight: "500",
  },
  mainHeading: {
    fontSize: "clamp(3rem, 8vw, 6.5rem)",
    lineHeight: "1.05",
    fontWeight: "400",
    color: "#fceea7", // Soft warm gold
    marginBottom: "30px",
  },
  description: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "1.1rem",
    lineHeight: "1.9",
    maxWidth: "600px",
    color: "rgba(255,255,255,0.85)",
    marginBottom: "45px",
  },
  primaryBtn: {
    padding: "18px 40px",
    borderRadius: "40px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    background: "linear-gradient(90deg,#f4c430,#ffe885,#f4c430)",
    color: "#2a1236", // Deep purple text for contrast on gold button
    backgroundSize: "200% auto",
    animation: "shimmer 4s linear infinite",
  },
  secondaryBtn: {
    padding: "18px 40px",
    borderRadius: "40px",
    border: "1px solid rgba(244,196,48,0.6)",
    background: "transparent",
    color: "#fceea7",
    cursor: "pointer",
  },
  stats: {
    display: "flex",
    gap: "60px",
    paddingBottom: "40px",
    fontFamily: "'Montserrat', sans-serif",
    zIndex: 2,
  },
  tickerBanner: {
    position: "relative",
    zIndex: 10,
    background: "#f4c430", // Solid logo gold ticker
    padding: "15px 0",
    width: "100%",
    overflow: "hidden",
    borderTop: "1px solid rgba(0,0,0,0.1)",
  },
  tickerTrack: {
    display: "flex",
    width: "max-content",
    animation: "scroll 30s linear infinite",
  },
  tickerItem: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "13px",
    fontWeight: "700",
    color: "#2a1236", // Deep royal purple text matching the brand background
    letterSpacing: "2px",
    padding: "0 40px",
    whiteSpace: "nowrap",
  },
};

export default HeroSection;