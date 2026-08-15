import React, { useState, useEffect } from "react";
import { Heart, ShieldCheck, Leaf, Star } from "lucide-react";

const AboutPage = () => {
  const [screen, setScreen] = useState(window.innerWidth);

  useEffect(() => {
    const resize = () => {
      setScreen(window.innerWidth);
    };

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const isMobile = screen <= 768;
  const isTablet = screen <= 1024;

  const styles = {
    pageContainer: {
      backgroundColor: "#f8f4fa",
      fontFamily: "'Playfair Display', serif",
      color: "#2c2c2c",
      width: "100%",
      maxWidth: "100vw",
      overflowX: "hidden",
      boxSizing: "border-box"
    },

    container: {
      width: "100%",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isMobile ? "0 16px" : "0 25px",
      boxSizing: "border-box",
      overflow: "hidden"
    },

    containerCenter: {
      width: "100%",
      maxWidth: "900px",
      margin: "0 auto",
      textAlign: "center",
      padding: isMobile ? "0 16px" : "0 25px",
      boxSizing: "border-box",
      overflow: "hidden"
    },

    sectionPadding: {
      padding: isMobile ? "50px 0" : "100px 0",
      width: "100%",
      overflow: "hidden"
    },

    heroBanner: {
      height: isMobile ? "280px" : "450px",
      width: "100%",
      maxWidth: "100%",
      backgroundImage:
        'url("https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=2000")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden"
    },

    heroOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(99, 56, 120, 0.75)"
    },

    heroContent: {
      position: "relative",
      zIndex: 2,
      textAlign: "center",
      color: "#fbd349",
      padding: "20px",
      width: "100%",
      maxWidth: "100%",
      boxSizing: "border-box"
    },

    heroSubtitle: {
      fontSize: "12px",
      letterSpacing: "4px",
      margin: 0,
      fontWeight: "600"
    },

    heroTitle: {
      fontSize: isMobile ? "34px" : isTablet ? "45px" : "56px",
      fontWeight: "700",
      margin: 0,
      lineHeight: "1.2",
      wordBreak: "break-word"
    },

    introGrid: {
      display: "grid",
      gridTemplateColumns: isTablet ? "1fr" : "repeat(2,minmax(0,1fr))",
      gap: isMobile ? "40px" : "60px",
      alignItems: "center",
      width: "100%"
    },

    overline: {
      color: "#74418c",
      fontSize: "11px",
      letterSpacing: "2px",
      fontWeight: "700"
    },

    heading: {
      fontSize: isMobile ? "28px" : isTablet ? "34px" : "42px",
      lineHeight: "1.25",
      marginBottom: "25px",
      fontWeight: "700",
      color: "#633878",
      wordBreak: "break-word"
    },

    paragraph: {
      color: "#555",
      lineHeight: "1.8",
      fontSize: isMobile ? "15px" : "16px",
      marginBottom: "20px",
      wordBreak: "break-word"
    },

    missionCard: {
      position: "relative",
      width: "100%",
      maxWidth: "100%"
    },

    missionImageContainer: {
      height: isMobile ? "350px" : isTablet ? "420px" : "500px",
      borderRadius: "8px",
      overflow: "hidden",
      width: "100%",
      maxWidth: "100%",
      position: "relative",
      boxShadow: "0 6px 20px rgba(99, 56, 120, 0.08)",
      border: "1px solid #e6d8ed"
    },

    missionImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      maxWidth: "100%"
    },

    missionOverlayCard: {
      position: "absolute",
      bottom: 0,
      left: 0,
      width: isMobile ? "85%" : "45%",
      maxWidth: isMobile ? "85%" : "45%",
      backgroundColor: "#633878",
      padding: isMobile ? "20px" : "30px",
      borderTopRightRadius: "8px",
      color: "#fff",
      boxSizing: "border-box",
      overflow: "hidden",
      wordBreak: "break-word",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
    },

    missionTitle: {
      color: "#fbd349",
      fontSize: "20px",
      marginTop: 0,
      fontWeight: "700"
    },

    missionText: {
      fontSize: "14px",
      lineHeight: "1.5",
      marginBottom: 0,
      color: "#f5e6b8"
    },

    statsSection: {
      padding: "50px 0",
      borderTop: "1px solid #e6d8ed",
      borderBottom: "1px solid #e6d8ed",
      backgroundColor: "#ffffff",
      width: "100%",
      overflow: "hidden"
    },

    statsGrid: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: isMobile ? "30px" : "100px",
      flexWrap: "wrap",
      textAlign: "center",
      width: "100%"
    },

    statNumber: {
      display: "block",
      fontSize: isMobile ? "32px" : "42px",
      color: "#633878",
      fontWeight: "700"
    },

    statLabel: {
      fontSize: "14px",
      color: "#666",
      fontWeight: "600",
      letterSpacing: "1px",
      textTransform: "uppercase"
    },

    valuesSection: {
      padding: isMobile ? "50px 0" : "100px 0",
      backgroundColor: "#f3ebf6",
      width: "100%",
      overflow: "hidden"
    },

    headingCenter: {
      textAlign: "center",
      fontSize: isMobile ? "30px" : "40px",
      marginBottom: "40px",
      fontWeight: "700",
      color: "#633878",
      wordBreak: "break-word"
    },

    valuesGrid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(4,minmax(0,1fr))",
      gap: "25px",
      width: "100%"
    },

    valueCard: {
      background: "#fff",
      padding: isMobile ? "25px" : "30px",
      borderRadius: "8px",
      border: "1px solid #e6d8ed",
      height: "100%",
      boxSizing: "border-box",
      overflow: "hidden",
      boxShadow: "0 4px 15px rgba(99, 56, 120, 0.05)",
      transition: "transform 0.3s, box-shadow 0.3s"
    },

    valueIcon: {
      color: "#633878",
      marginBottom: "15px",
      fontSize: "24px"
    },

    valueTitle: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#2c2c2c",
      marginBottom: "10px",
      wordBreak: "break-word"
    },

    valueDesc: {
      color: "#666",
      lineHeight: "1.6",
      fontSize: "14px",
      wordBreak: "break-word"
    },

    quoteSection: {
      padding: isMobile ? "60px 0" : "120px 0",
      backgroundColor: "#633878",
      color: "#fbd349",
      textAlign: "center",
      width: "100%",
      overflow: "hidden",
      backgroundImage: "radial-gradient(circle, #74418c 1px, transparent 1px)",
      backgroundSize: "20px 20px"
    },

    quoteIconCircle: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 25px",
      border: "2px solid #fbd349",
      color: "#fbd349",
      fontWeight: "700",
      background: "rgba(251, 211, 73, 0.1)"
    },

    quoteText: {
      fontSize: isMobile ? "18px" : isTablet ? "24px" : "28px",
      fontStyle: "italic",
      lineHeight: "1.6",
      padding: "0 10px",
      maxWidth: "100%",
      overflowWrap: "break-word",
      color: "#ffffff",
      marginBottom: "20px"
    },

    quoteAuthor: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#fbd349"
    },

    quoteSubtext: {
      fontSize: "12px",
      color: "#f5e6b8",
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      marginTop: "4px"
    },

    teamGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : isTablet
        ? "repeat(2,minmax(0,1fr))"
        : "repeat(3,minmax(0,1fr))",
      gap: "40px",
      textAlign: "center",
      width: "100%"
    },

    teamCircle: {
      width: isMobile ? "100px" : "120px",
      height: isMobile ? "100px" : "120px",
      borderRadius: "50%",
      backgroundColor: "#633878",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 25px",
      fontSize: "28px",
      color: "#fbd349",
      border: "2px solid #fbd349",
      boxShadow: "0 6px 15px rgba(99, 56, 120, 0.2)",
      fontWeight: "700"
    },

    teamName: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#2c2c2c",
      marginBottom: "5px",
      wordBreak: "break-word"
    },

    teamRole: {
      color: "#74418c",
      fontSize: "14px",
      fontWeight: "600",
      letterSpacing: "1px",
      textTransform: "uppercase"
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* HERO */}
      <div style={styles.heroBanner}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <p style={styles.heroSubtitle}>OUR STORY</p>
          <h1 style={styles.heroTitle}>About Vanya Collections</h1>
        </div>
      </div>

      {/* INTRO */}
      <div style={styles.sectionPadding}>
        <div style={styles.container}>
          <div style={styles.introGrid}>
            <div>
              <p style={styles.overline}>WHO WE ARE</p>
              <h2 style={styles.heading}>
                Born from a Passion for India's Textile Heritage
              </h2>
              <p style={styles.paragraph}>
                Vanya Collections was born in 2018 when our founder, Priya Vanya,
                traveled across India's most celebrated weaving centers.
              </p>
              <p style={styles.paragraph}>
                We connect India's gifted weavers with women who appreciate true
                artistry.
              </p>
            </div>

            <div style={styles.missionCard}>
              <div style={styles.missionImageContainer}>
                <img
                  src="https://images.unsplash.com/photo-1610030469668-93510ef2d32e"
                  style={styles.missionImage}
                  alt="Mission Vanya"
                />
                <div style={styles.missionOverlayCard}>
                  <h3 style={styles.missionTitle}>Our Mission</h3>
                  <p style={styles.missionText}>
                    To preserve India's weaving heritage while empowering
                    artisan communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={styles.statsSection}>
        <div style={styles.container}>
          <div style={styles.statsGrid}>
            <div>
              <span style={styles.statNumber}>6+</span>
              <span style={styles.statLabel}>Years</span>
            </div>
            <div>
              <span style={styles.statNumber}>10K+</span>
              <span style={styles.statLabel}>Customers</span>
            </div>
            <div>
              <span style={styles.statNumber}>500+</span>
              <span style={styles.statLabel}>Designs</span>
            </div>
          </div>
        </div>
      </div>

      {/* VALUES */}
      <div style={styles.valuesSection}>
        <div style={styles.container}>
          <h2 style={styles.headingCenter}>Our Values</h2>
          <div style={styles.valuesGrid}>
            {[
              ["⭐", "Uncompromising Quality"],
              ["❤️", "Artisan Empowerment"],
              ["🌿", "Sustainable Practices"],
              ["🛡", "Authenticity Guaranteed"]
            ].map((item, index) => (
              <div key={index} style={styles.valueCard}>
                <div style={styles.valueIcon}>{item[0]}</div>
                <h4 style={styles.valueTitle}>{item[1]}</h4>
                <p style={styles.valueDesc}>
                  Every saree is carefully selected with quality and
                  authenticity.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QUOTE */}
      <div style={styles.quoteSection}>
        <div style={styles.containerCenter}>
          <div style={styles.quoteIconCircle}>PV</div>
          <p style={styles.quoteText}>
            "I wanted to build a bridge between extraordinary artisans of India
            and women who cherish their work."
          </p>
          <p style={styles.quoteAuthor}>Priya Vanya</p>
          <p style={styles.quoteSubtext}>Founder & Creative Director</p>
        </div>
      </div>

      {/* TEAM */}
      <div style={styles.sectionPadding}>
        <div style={styles.container}>
          <h2 style={styles.headingCenter}>Meet Our Team</h2>
          <div style={styles.teamGrid}>
            {[
              ["PV", "Priya Vanya"],
              ["AS", "Ananya Sharma"],
              ["KR", "Kavitha Rajan"]
            ].map((member, index) => (
              <div key={index}>
                <div style={styles.teamCircle}>{member[0]}</div>
                <h4 style={styles.teamName}>{member[1]}</h4>
                <p style={styles.teamRole}>Creative Team</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;