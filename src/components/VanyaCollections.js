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
        <p style={styles.subHeader}>BROWSE BY CATEGORY</p>
        <h1 style={styles.mainTitle}>Our Collections</h1>
        <div style={styles.underline}></div>
      </header>

      {/* Grid Section */}
      <div style={styles.grid}>
        {collections.map((item, index) => (
          <div key={index} style={styles.card}>
            <img src={item.image} alt={item.alt} style={styles.image} />
            <div style={styles.cardOverlay}>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p style={styles.cardSub}>{item.designs}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive Styles (Inline Media Query Simulation) */}
      <style>
        {`
          @media (max-width: 768px) {
            nav { flex-direction: column; padding: 10px; }
            .nav-links { display: none; } /* Simplified for brevity */
            .grid-container { grid-template-columns: 1fr !important; padding: 10px !important; }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: '"Playfair Display", serif',
    backgroundColor: '#fff',
    minHeight: '100vh',
  },
  navbar: {
    backgroundColor: '#1a3a32',
    color: '#d4af37',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 50px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    lineHeight: '0.8',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '14px',
    letterSpacing: '1px',
  },
  header: {
    textAlign: 'center',
    padding: '40px 20px',
  },
  subHeader: {
    color: '#d4af37',
    fontSize: '12px',
    letterSpacing: '3px',
    marginBottom: '10px',
  },
  mainTitle: {
    fontSize: '36px',
    color: '#111',
    margin: '0',
  },
  underline: {
    width: '60px',
    height: '2px',
    backgroundColor: '#d4af37',
    margin: '10px auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    padding: '0 50px 50px 50px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    position: 'relative',
    borderRadius: '15px',
    overflow: 'hidden',
    height: '400px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
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
    padding: '20px',
    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
    color: '#fff',
  },
  cardTitle: {
    margin: '0',
    fontSize: '20px',
    color: '#f3e5ab',
  },
  cardSub: {
    margin: '5px 0 0',
    fontSize: '14px',
    opacity: '0.8',
  }
};

export default VanyaCollections;