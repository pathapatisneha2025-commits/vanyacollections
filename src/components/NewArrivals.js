import React from 'react';

const NewArrivals = () => {
  const products = [
    {
      id: 1,
      name: 'Royal Blue Kanjeevaram',
      category: 'SILK SAREES',
      price: '₹11,999',
      oldPrice: '₹16,999',
      discount: '-29%',
      rating: 5,
      reviews: 96,
      image: '/silksaree.jpg',
    },
    {
      id: 2,
      name: 'Emerald Garden Silk',
      category: 'SILK SAREES',
      price: '₹7,499',
      oldPrice: '₹9,999',
      discount: '-25%',
      rating: 4,
      reviews: 87,
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=500',
    },
    {
      id: 3,
      name: 'Rose Petal Designer Silk',
      category: 'DESIGNER SAREES',
      price: '₹6,999',
      oldPrice: '₹9,499',
      discount: '-26%',
      rating: 4,
      reviews: 73,
      image: '/designersaree.jpg',
    }
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <span style={styles.tagline}>JUST IN</span>
          <h2 style={styles.title}>New Arrivals</h2>
        </div>
        <a href="#" style={styles.viewAll}>View All →</a>
      </div>

      {/* Product Grid */}
      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.productCard}>
            {/* Image Container */}
            <div style={styles.imageWrapper}>
              <img src={product.image} alt={product.name} style={styles.image} />
              
              {/* Badges */}
              <div style={styles.badgeContainer}>
                <span style={{...styles.badge, backgroundColor: '#1a3a32'}}>NEW</span>
                <span style={{...styles.badge, backgroundColor: '#e74c3c'}}>{product.discount}</span>
              </div>

              {/* Action Buttons (Visible on hover or mobile) */}
              <div className="actions" style={styles.actionOverlay}>
                <button style={styles.quickView}>👁 Quick View</button>
                <button style={styles.addToCart}>🛒 Add to Cart</button>
              </div>
            </div>

            {/* Product Info */}
            <div style={styles.info}>
              <p style={styles.category}>{product.category}</p>
              <h3 style={styles.productName}>{product.name}</h3>
              
              <div style={styles.ratingRow}>
                <span style={styles.stars}>{'★'.repeat(product.rating)}{'☆'.repeat(5-product.rating)}</span>
                <span style={styles.reviewCount}>({product.reviews})</span>
              </div>

              <div style={styles.priceRow}>
                <span style={styles.currentPrice}>{product.price}</span>
                <span style={styles.oldPrice}>{product.oldPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global Style for Responsive Behavior */}
      <style>
        {`
          .actions { opacity: 0; transition: opacity 0.3s ease; }
          div:hover > .actions { opacity: 1; }
          
          @media (max-width: 768px) {
            .actions { opacity: 1 !important; position: relative !important; background: none !important; padding: 10px 0 !important; }
            .grid-container { grid-template-columns: 1fr !important; padding: 15px !important; }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fafaf8' // Light textured background match
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '30px',
    borderBottom: '1px solid #eee',
    paddingBottom: '15px'
  },
  tagline: {
    color: '#d4af37',
    fontSize: '12px',
    fontWeight: 'bold',
    letterSpacing: '2px'
  },
  title: {
    fontSize: '32px',
    margin: '5px 0 0',
    fontFamily: 'serif',
    color: '#111'
  },
  viewAll: {
    color: '#d4af37',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'bold'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px'
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  imageWrapper: {
    position: 'relative',
    height: '400px',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  badgeContainer: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  badge: {
    color: '#fff',
    fontSize: '10px',
    padding: '4px 8px',
    borderRadius: '4px',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  actionOverlay: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    padding: '15px',
    boxSizing: 'border-box',
    display: 'flex',
    gap: '10px',
    background: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(5px)'
  },
  quickView: {
    flex: 1,
    padding: '10px',
    border: 'none',
    borderRadius: '20px',
    backgroundColor: '#eee',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  addToCart: {
    flex: 1,
    padding: '10px',
    border: 'none',
    borderRadius: '20px',
    backgroundColor: '#d4af37',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  info: {
    padding: '20px'
  },
  category: {
    color: '#888',
    fontSize: '11px',
    margin: '0 0 5px',
    letterSpacing: '1px'
  },
  productName: {
    fontSize: '18px',
    margin: '0 0 10px',
    color: '#1a3a32'
  },
  ratingRow: {
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  stars: {
    color: '#f1c40f',
    fontSize: '14px'
  },
  reviewCount: {
    color: '#888',
    fontSize: '12px'
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  currentPrice: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#d4af37'
  },
  oldPrice: {
    fontSize: '14px',
    color: '#aaa',
    textDecoration: 'line-through'
  }
};

export default NewArrivals;