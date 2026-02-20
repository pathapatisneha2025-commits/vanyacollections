import React from "react";

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
      <div style={styles.greenBlur}></div>

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
          <div style={styles.buttonGroup}>
            <button style={styles.primaryBtn}>✦ Explore Collections</button>
            <button style={styles.secondaryBtn}>Shop All Sarees →</button>
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

      {/* NEW: Scrolling Yellow Line */}
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

        /* Animation for the yellow ticker */
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
    backgroundImage:
      "url('https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=2000&q=80')",
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
    background: "linear-gradient(to bottom, rgba(6,45,29,0.6), rgba(6,45,29,0.85))",
    zIndex: 1,
  },
  goldBlur: {
    position: "absolute",
    width: "500px",
    height: "500px",
    background: "rgba(212,175,55,0.25)",
    filter: "blur(160px)",
    top: "-100px",
    right: "-100px",
    zIndex: 1,
  },
  greenBlur: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "rgba(0,80,50,0.4)",
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
    background: "#041f14",
    color: "#d4af37",
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
    flex: 1, // Let content take remaining space
  },
  logoContainer: { paddingTop: "40px" },
  logoMain: {
    fontSize: "30px",
    letterSpacing: "6px",
    fontWeight: "700",
    background: "linear-gradient(90deg,#d4af37,#f5e6a8,#d4af37)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  logoSub: { fontSize: "12px", letterSpacing: "3px", opacity: 0.8 },
  heroText: {
    maxWidth: "850px",
    animation: "fadeUp 1.2s ease forwards",
  },
  topLabel: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "14px",
    letterSpacing: "8px",
    color: "#d4af37",
    marginBottom: "25px",
    fontWeight: "500",
  },
  mainHeading: {
    fontSize: "clamp(3rem, 8vw, 6.5rem)",
    lineHeight: "1.05",
    fontWeight: "400",
    color: "#e6c266",
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
  buttonGroup: { display: "flex", gap: "20px", flexWrap: "wrap" },
  primaryBtn: {
    padding: "18px 40px",
    borderRadius: "40px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    background: "linear-gradient(90deg,#d4af37,#f5e6a8,#d4af37)",
    backgroundSize: "200% auto",
    animation: "shimmer 4s linear infinite",
  },
  secondaryBtn: {
    padding: "18px 40px",
    borderRadius: "40px",
    border: "1px solid rgba(255,255,255,0.6)",
    background: "transparent",
    color: "#fff",
    cursor: "pointer",
  },
  stats: {
    display: "flex",
    gap: "60px",
    paddingBottom: "40px",
    fontFamily: "'Montserrat', sans-serif",
    zIndex: 2,
  },
  // STYLES FOR THE NEW YELLOW TICKER
  tickerBanner: {
    position: "relative",
    zIndex: 10,
    background: "#d4af37", // The solid yellow/gold color
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
    color: "#041f14", // Deep green text on yellow
    letterSpacing: "2px",
    padding: "0 40px",
    whiteSpace: "nowrap",
  },
};

export default HeroSection;