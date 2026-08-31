import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const VanyaBestSellers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchBestSellers();
  }, []);

  const fetchBestSellers = async () => {
    try {
      const res = await fetch("https://vanyabackenddatabase-vahr.onrender.com/products/all");
      const data = await res.json();
      const bestSellers = data.filter((p) => p.type === "Best Seller");
      setProducts(bestSellers);
    } catch (err) {
      console.error("Error fetching best sellers:", err);
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <span style={styles.tagline}>✦ FAN FAVOURITES ✦</span>
          <h2 style={styles.title}>Best Sellers</h2>
          <div style={styles.underline}></div>
        </div>
        <Link to="/best-sellers" style={styles.viewAll} className="view-all-link">
          View All →
        </Link>
      </div>

      {/* Product Grid */}
      <div style={styles.grid} className="bestsellers-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card-wrapper" style={styles.cardWrapper}>
            <div style={styles.productCard} className="product-card">
              {/* Image Container (Clickable to detail page) */}
              <Link
                to={`/product/${product.id}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div style={styles.imageWrapper} className="product-image-wrapper">
                  <img
                    src={product.img_url || product.thumbnails?.[0]}
                    alt={product.name}
                    style={styles.image}
                    className="product-image"
                  />

                  {/* Compact Badges */}
                  <div style={styles.badgeContainer}>
                    <span style={styles.badgeBestseller}>BESTSELLER</span>
                    {product.discount > 0 && (
                      <span style={styles.badgeDiscount}>{product.discount}% OFF</span>
                    )}
                  </div>
                </div>
              </Link>

              {/* Product Info (Clickable to detail page) */}
              <Link
                to={`/product/${product.id}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block', flexGrow: 1 }}
              >
                <div style={styles.info} className="product-info">
                  <p style={styles.category}>{product.category || "Handloom Saree"}</p>
                  <h3 style={styles.productName}>{product.name}</h3>

                  <div style={styles.priceRow}>
                    <span style={styles.currentPrice}>₹{Number(product.price).toLocaleString()}</span>
                    {product.old_price && Number(product.old_price) > Number(product.price) && (
                      <span style={styles.oldPrice}>₹{Number(product.old_price).toLocaleString()}</span>
                    )}
                  </div>
                </div>
              </Link>

              {/* Responsive Action Buttons */}
              <div className="product-actions" style={styles.actionRow}>
                <button 
                  style={styles.quickView} 
                  onClick={(e) => { e.preventDefault(); }}
                >
                  Quick View
                </button>
                <button 
                  style={styles.addToCart} 
                  onClick={(e) => { e.preventDefault(); }}
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

          .product-card {
            transition: all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
            height: 100%;
            display: flex;
            flex-direction: column;
            background: #FFFFFF;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid rgba(75, 41, 84, 0.08);
            box-shadow: 0 4px 15px rgba(75, 41, 84, 0.04);
            box-sizing: border-box;
          }

          .product-card:hover {
            transform: translateY(-5px);
            border-color: #D4AF37 !important;
            box-shadow: 0 12px 30px rgba(75, 41, 84, 0.12), 0 0 15px rgba(212, 175, 55, 0.2) !important;
          }

          .product-card:hover .product-image {
            transform: scale(1.04);
          }

          .product-image {
            transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
          }

          .view-all-link {
            transition: color 0.2s ease;
          }

          .view-all-link:hover {
            color: #C22730 !important;
          }

          /* Desktop Hover Overlay Style */
          @media (min-width: 769px) {
            .product-image-wrapper {
              position: relative;
            }
            .product-actions {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              opacity: 0;
              transition: opacity 0.25s ease;
              background: linear-gradient(to top, rgba(75, 41, 84, 0.85) 0%, rgba(75, 41, 84, 0.3) 75%, transparent 100%);
              backdrop-filter: blur(3px);
              padding: 12px;
              display: flex;
              gap: 8px;
              z-index: 2;
            }
            .product-card-wrapper:hover .product-actions {
              opacity: 1;
            }
          }

          /* Mobile Layout Styling */
          @media (max-width: 768px) {
            .bestsellers-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 8px !important;
              padding: 0 2px !important;
            }
            .product-image-wrapper {
              height: 150px !important;
            }
            .product-info {
              padding: 10px 10px 4px 10px !important;
            }
            .product-actions {
              display: flex !important;
              position: relative !important;
              opacity: 1 !important;
              background: transparent !important;
              padding: 0 10px 10px 10px !important;
              gap: 4px;
            }
            .product-actions button {
              font-size: 8px !important;
              padding: 6px 2px !important;
              letter-spacing: 0.2px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    padding: '50px 20px',
    maxWidth: '1300px',
    margin: '0 auto',
    fontFamily: '"Montserrat", sans-serif',
    backgroundColor: '#FAF5FC',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '35px',
    borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
    paddingBottom: '15px',
  },
  tagline: {
    color: '#D4AF37',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '4px',
  },
  title: {
    fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
    margin: '6px 0 0',
    fontFamily: '"Playfair Display", serif',
    color: '#000000',
    fontWeight: '700',
  },
  underline: {
    width: '40px',
    height: '2px',
    backgroundColor: '#D4AF37',
    marginTop: '8px',
  },
  viewAll: {
    color: '#4B2954',
    textDecoration: 'none',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '24px',
  },
  cardWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid rgba(75, 41, 84, 0.08)',
    boxShadow: '0 4px 15px rgba(75, 41, 84, 0.04)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    position: 'relative',
  },
  imageWrapper: {
    position: 'relative',
    height: '320px',
    overflow: 'hidden',
    backgroundColor: '#F3EBF5',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  badgeContainer: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    zIndex: 2,
  },
  badgeBestseller: {
    backgroundColor: '#4B2954',
    color: '#FBF5FC',
    fontSize: '8px',
    padding: '3px 7px',
    borderRadius: '3px',
    fontWeight: '600',
    letterSpacing: '1px',
  },
  badgeDiscount: {
    backgroundColor: '#C22730',
    color: '#FFFFFF',
    fontSize: '8px',
    padding: '3px 7px',
    borderRadius: '3px',
    fontWeight: '600',
    letterSpacing: '1px',
  },
  actionRow: {
    display: 'flex',
    gap: '8px',
  },
  quickView: {
    flex: 1,
    padding: '8px',
    border: 'none',
    borderRadius: '3px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    color: '#4B2954',
    cursor: 'pointer',
    fontSize: '10px',
    fontWeight: '600',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  addToCart: {
    flex: 1,
    padding: '8px',
    border: 'none',
    borderRadius: '3px',
    backgroundColor: '#D4AF37',
    color: '#222222',
    cursor: 'pointer',
    fontSize: '10px',
    fontWeight: '700',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  info: {
    padding: '16px 14px 10px 14px',
  },
  category: {
    color: '#8E7394',
    fontSize: '9px',
    margin: '0 0 4px',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  productName: {
    fontSize: '14px',
    margin: '0 0 8px',
    color: '#4B2954',
    fontFamily: '"Playfair Display", serif',
    fontWeight: '600',
    lineHeight: '1.3',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  currentPrice: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#C22730',
  },
  oldPrice: {
    fontSize: '11px',
    color: '#9E8C9E',
    textDecoration: 'line-through',
  }
};

export default VanyaBestSellers;