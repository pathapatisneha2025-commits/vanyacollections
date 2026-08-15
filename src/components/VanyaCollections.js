import React from 'react';

const VanyaCollections = () => {
  const collections = [
    { title: 'Silk Sarees', designs: '48 designs', image: '/silksaree.jpg', alt: 'Silk Saree' },
    { title: 'Cotton Sarees', designs: '36 designs', image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=500', alt: 'Cotton Saree' },
    { title: 'Wedding Collection', designs: '22 designs', image: '/festivalsaree.jpg', alt: 'Wedding Saree' },
    { title: 'Designer Sarees', designs: '29 designs', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=500', alt: 'Designer Saree' },
  ];

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <header style={styles.header}>
        <p style={styles.subHeader}>✦ BROWSE BY CATEGORY ✦</p>
        <h1 style={styles.mainTitle}>Our Exquisite Collections</h1>
        <div style={styles.underline}></div>
        <p style={styles.headerDesc}>Immerse yourself in our royal handloom masterpieces tailored for elegance.</p>
      </header>

      {/* Grid Section */}
      <div style={styles.grid} className="collections-grid">
        {collections.map((item, index) => (
          <div key={index} style={styles.card} className="collection-card">
            <img src={item.image} alt={item.alt} style={styles.image} className="card-image" />
            <div style={styles.cardOverlay}>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p style={styles.cardSub}>{item.designs}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive Styles, Royal Gradients & Web Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;600&display=swap');

          .collection-card {
            transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          }

          .collection-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(92, 53, 102, 0.2), 0 0 25px rgba(212, 175, 55, 0.3) !important;
            border-color: rgba(212, 175, 55, 0.6);
          }

          .collection-card:hover .card-image {
            transform: scale(1.06);
          }

          .card-image {
            transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
          }

          @media (max-width: 768px) {
            .collections-grid {
              grid-template-columns: 1fr !important;
              padding: 0 20px 40px 20px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: '"Playfair Display", serif',
    // Soft, luxurious light purple and pastel lavender gradient matching brand identity
    background: 'radial-gradient(circle at 50% 0%, #fbf5fc 0%, #f3e9f5 50%, #eadcf0 100%)',
    minHeight: '100vh',
    paddingBottom: '60px',
  },
  header: {
    textAlign: 'center',
    padding: '60px 20px 30px 20px',
  },
  subHeader: {
    fontFamily: '"Montserrat", sans-serif',
    color: '#bfa136', // Sophisticated deep gold accent for light background
    fontSize: '12px',
    letterSpacing: '4px',
    marginBottom: '12px',
    fontWeight: '600',
  },
  mainTitle: {
    fontSize: 'clamp(2.3rem, 4vw, 3.4rem)',
    color: '#43204a', // Deep royal purple for high contrast text readability
    margin: '0',
    fontWeight: '700',
  },
  underline: {
    width: '80px',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
    margin: '18px auto',
  },
  headerDesc: {
    fontFamily: '"Montserrat", sans-serif',
    color: '#715378', // Muted purple-gray secondary text
    fontSize: '15px',
    maxWidth: '550px',
    margin: '0 auto',
    letterSpacing: '0.5px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
    padding: '20px 50px 60px 50px',
    maxWidth: '1300px',
    margin: '0 auto',
  },
  card: {
    position: 'relative',
    borderRadius: '18px',
    overflow: 'hidden',
    height: '430px',
    // Elegant soft border and refined light purple shadow
    border: '1px solid rgba(212, 175, 55, 0.35)',
    boxShadow: '0 12px 30px rgba(92, 53, 102, 0.12)',
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    padding: '30px',
    // Rich royal gradient fade for crisp readability over imagery
    background: 'linear-gradient(to top, rgba(45, 18, 51, 0.95) 0%, rgba(45, 18, 51, 0.5) 65%, transparent 100%)',
    color: '#fff',
  },
  cardTitle: {
    margin: '0',
    fontSize: '23px',
    color: '#f3c653', // Luminous gold title matching logo accents
    fontWeight: '600',
    letterSpacing: '0.5px',
  },
  cardSub: {
    fontFamily: '"Montserrat", sans-serif',
    margin: '8px 0 0',
    fontSize: '13px',
    color: 'rgba(253, 248, 242, 0.85)',
    letterSpacing: '1.2px',
    textTransform: 'uppercase',
  },
};

export default VanyaCollections;