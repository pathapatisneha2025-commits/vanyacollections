import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  const fetchNewArrivals = async () => {
    try {
      const res = await fetch("https://vanyabackenddatabase-vahr.onrender.com/products/all");
      const data = await res.json();
      const newArrivals = data.filter((p) => p.type === "New Arrival");
      setProducts(newArrivals);
    } catch (err) {
      console.error("Error fetching new arrivals:", err);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <span style={styles.tagline}>✦ JUST IN ✦</span>
          <h2 style={styles.title}>New Arrivals</h2>
          <div style={styles.underline}></div>
        </div>
        <a href="#" style={styles.viewAll} className="view-all-link">View All →</a>
      </div>

      {/* Product Grid */}
      <div style={styles.grid} className="new-arrivals-grid">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            <div style={styles.productCard} className="product-card">
              {/* Image Container */}
              <div style={styles.imageWrapper}>
                <img
                  src={product.img_url || product.thumbnails?.[0]}
                  alt={product.name}
                  style={styles.image}
                  className="product-image"
                />

                {/* Badges */}
                <div style={styles.badgeContainer}>
                  <span style={{ ...styles.badge, backgroundColor: '#522b5b' }}>NEW</span>
                  {product.discount > 0 && (
                    <span style={{ ...styles.badge, backgroundColor: '#c0392b' }}>{product.discount}% OFF</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="actions" style={styles.actionOverlay}>
                  <button style={styles.quickView} onClick={(e) => { e.preventDefault(); }}>👁 Quick View</button>
                  <button style={styles.addToCart} onClick={(e) => { e.preventDefault(); }}>🛒 Add to Cart</button>
                </div>
              </div>

              {/* Product Info */}
              <div style={styles.info}>
                <p style={styles.category}>{product.category || "Handloom Saree"}</p>
                <h3 style={styles.productName}>{product.name}</h3>

                <div style={styles.priceRow}>
                  <span style={styles.currentPrice}>₹{Number(product.price).toLocaleString()}</span>
                  {product.old_price && Number(product.old_price) > Number(product.price) && (
                    <span style={styles.oldPrice}>₹{Number(product.old_price).toLocaleString()}</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

          .product-card {
            transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), border-color 0.4s ease;
          }

          /* Luxurious Purple Highlighter Hover Effect */
          .product-card:hover {
            transform: translateY(-8px);
            background-color: #f7eff9 !important;
            border-color: #8c4a9e !important;
            box-shadow: 0 18px 40px rgba(82, 43, 91, 0.22), 0 0 25px rgba(140, 74, 158, 0.35) !important;
          }

          .product-card:hover .product-image {
            transform: scale(1.06);
          }

          .product-image {
            transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
          }

          .view-all-link {
            transition: color 0.2s ease, text-shadow 0.2s ease;
          }

          .view-all-link:hover {
            color: #8c4a9e !important;
            text-shadow: 0 0 10px rgba(140, 74, 158, 0.3);
          }

          .actions { opacity: 0; transition: opacity 0.3s ease; }
          .product-card:hover .actions { opacity: 1; }

          @media (max-width: 768px) {
            .new-arrivals-grid {
              grid-template-columns: 1fr !important;
              padding: 0 10px !important;
            }
            .actions { opacity: 1 !important; position: relative !important; background: none !important; padding: 12px 0 0 0 !important; }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    padding: '60px 20px',
    maxWidth: '1300px',
    margin: '0 auto',
    fontFamily: '"Montserrat", sans-serif',
    backgroundColor: '#fbf5fc',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '40px',
    borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
    paddingBottom: '20px',
  },
  tagline: {
    color: '#d4af37',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '4px',
  },
  title: {
    fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
    margin: '8px 0 0',
    fontFamily: '"Playfair Display", serif',
    color: '#522b5b',
    fontWeight: '700',
  },
  underline: {
    width: '60px',
    height: '2px',
    backgroundColor: '#d4af37',
    marginTop: '10px',
  },
  viewAll: {
    color: '#522b5b',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600',
    letterSpacing: '1px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
  },
  productCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid rgba(212, 175, 55, 0.25)',
    boxShadow: '0 8px 25px rgba(82, 43, 91, 0.08)',
  },
  imageWrapper: {
    position: 'relative',
    height: '400px',
    overflow: 'hidden',
    backgroundColor: '#f2e8f5',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  badgeContainer: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    zIndex: 2,
  },
  badge: {
    color: '#fff',
    fontSize: '10px',
    padding: '5px 10px',
    borderRadius: '6px',
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: '1px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
  },
  actionOverlay: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    padding: '16px',
    boxSizing: 'border-box',
    display: 'flex',
    gap: '10px',
    background: 'linear-gradient(to top, rgba(45, 18, 51, 0.85) 0%, rgba(45, 18, 51, 0.3) 70%, transparent 100%)',
    backdropFilter: 'blur(4px)',
    zIndex: 2,
  },
  quickView: {
    flex: 1,
    padding: '10px',
    border: 'none',
    borderRadius: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#522b5b',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
  },
  addToCart: {
    flex: 1,
    padding: '10px',
    border: 'none',
    borderRadius: '20px',
    backgroundColor: '#d4af37',
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)',
  },
  info: {
    padding: '22px',
  },
  category: {
    color: '#8c6894',
    fontSize: '11px',
    margin: '0 0 6px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  productName: {
    fontSize: '18px',
    margin: '0 0 12px',
    color: '#522b5b',
    fontFamily: '"Playfair Display", serif',
    fontWeight: '600',
    lineHeight: '1.4',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  currentPrice: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#bfa136',
  },
  oldPrice: {
    fontSize: '14px',
    color: '#9e8c9e',
    textDecoration: 'line-through',
  }
};

export default NewArrivals;