import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  const fetchNewArrivals = async () => {
    try {
      const res = await fetch(
        "https://vanyabackenddatabase-vahr.onrender.com/products/all"
      );

      const data = await res.json();

      const newArrivals = data.filter(
        (p) => p.type === "New Arrival"
      );

      setProducts(newArrivals);
    } catch (err) {
      console.error("Error fetching new arrivals:", err);
    }
  };

  return (
    <div
      style={styles.container}
      className="new-arrivals-container"
    >
      {/* HEADER */}
      <div
        style={styles.header}
        className="new-arrivals-header"
      >
        <div>
          <span style={styles.tagline}>
            ✦ CURATED EXCLUSIVES ✦
          </span>

          <h2 style={styles.title}>
            New Arrivals
          </h2>

          <div style={styles.underline}></div>
        </div>


      </div>

      {/* PRODUCT GRID */}
      <div
        style={styles.grid}
        className="new-arrivals-grid"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            style={styles.productCard}
          >
            {/* IMAGE AREA */}
            <div
              className="product-image-wrapper"
              style={styles.imageWrapper}
            >
              {/* CLICK IMAGE */}
              <Link
                to={`/product/${product.id}`}
                style={styles.imageLink}
              >
                <img
                  src={
                    product.img_url ||
                    product.thumbnails?.[0]
                  }
                  alt={product.name}
                  style={styles.image}
                  className="product-image"
                />
              </Link>

              {/* BADGES */}
              <div style={styles.badgeContainer}>
                <span style={styles.badgeNew}>
                  NEW
                </span>

                {product.discount > 0 && (
                  <span style={styles.badgeDiscount}>
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              {/* DESKTOP ACTIONS */}
              <div
                className="desktop-actions"
                style={styles.desktopActions}
              >
                <button
                  style={styles.quickView}
                  onClick={(e) => {
                    e.stopPropagation();

                    // Quick View logic here
                    console.log("Quick View", product);
                  }}
                >
                  Quick View
                </button>

                <button
                  style={styles.addToCart}
                  onClick={(e) => {
                    e.stopPropagation();

                    // Add To Cart logic here
                    console.log("Add To Bag", product);
                  }}
                >
                  Add to Bag
                </button>
              </div>
            </div>

            {/* PRODUCT INFORMATION */}
            <Link
              to={`/product/${product.id}`}
              style={styles.productInfoLink}
            >
              <div
                style={styles.info}
                className="product-info"
              >
                <p style={styles.category}>
                  {product.category || "Handloom Saree"}
                </p>

                <h3 style={styles.productName}>
                  {product.name}
                </h3>

                <div style={styles.priceRow}>
                  <span style={styles.currentPrice}>
                    ₹{Number(product.price || 0).toLocaleString()}
                  </span>

                  {product.old_price &&
                    Number(product.old_price) >
                      Number(product.price) && (
                      <span style={styles.oldPrice}>
                        ₹
                        {Number(
                          product.old_price
                        ).toLocaleString()}
                      </span>
                    )}
                </div>
              </div>
            </Link>

            {/* MOBILE ACTIONS */}
            <div
              className="mobile-actions"
              style={styles.mobileActions}
            >
              <button
                style={styles.mobileQuickView}
                onClick={() => {
                  console.log("Quick View", product);
                }}
              >
                Quick View
              </button>

              <button
                style={styles.mobileAddToCart}
                onClick={() => {
                  console.log("Add To Bag", product);
                }}
              >
                Add to Bag
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700&family=Montserrat:wght@300;400;500;600;700&display=swap');

          * {
            box-sizing: border-box;
          }

          /* =========================
             PRODUCT CARD
          ========================= */

          .product-card {
            transition: all 0.35s cubic-bezier(
              0.165,
              0.84,
              0.44,
              1
            );
          }

          @media (min-width: 769px) {

            .product-card:hover {
              transform: translateY(-5px);
              border-color: #D4AF37 !important;
              box-shadow:
                0 12px 30px rgba(75, 41, 84, 0.12),
                0 0 15px rgba(212, 175, 55, 0.2) !important;
            }

            .product-card:hover .product-image {
              transform: scale(1.05);
            }

            /* HIDE DESKTOP BUTTONS */

            .desktop-actions {
              opacity: 0;
              visibility: hidden;
              transform: translateY(15px);

              transition:
                opacity 0.25s ease,
                transform 0.25s ease,
                visibility 0.25s ease;
            }

            /* SHOW ONLY ON IMAGE HOVER */

            .product-image-wrapper:hover .desktop-actions {
              opacity: 1;
              visibility: visible;
              transform: translateY(0);
            }

            /* MOBILE BUTTONS HIDDEN */

            .mobile-actions {
              display: none !important;
            }
          }

          /* =========================
             IMAGE
          ========================= */

          .product-image {
            transition: transform 0.5s ease;
          }

          /* =========================
             VIEW ALL
          ========================= */

          .view-all-link {
            transition: color 0.25s ease;
          }

          .view-all-link:hover {
            color: #C22730 !important;
          }

          /* =========================
             TABLET
          ========================= */

          @media (max-width: 1024px) and (min-width: 769px) {

            .new-arrivals-grid {
              grid-template-columns:
                repeat(3, 1fr) !important;

              gap: 16px !important;
            }

            .product-image-wrapper {
              height: 270px !important;
            }
          }

          /* =========================
             MOBILE / ANDROID
          ========================= */

          @media (max-width: 768px) {

            .new-arrivals-container {
              padding: 20px 10px !important;
              width: 100%;
            }

            .new-arrivals-header {
              margin-bottom: 20px !important;
              padding-bottom: 12px !important;
              align-items: flex-end !important;
            }

            .new-arrivals-grid {
              grid-template-columns:
                repeat(2, minmax(0, 1fr)) !important;

              gap: 10px !important;
            }

            /* HIDE DESKTOP HOVER BUTTONS */

            .desktop-actions {
              display: none !important;
            }

            /* SHOW MOBILE BUTTONS */

            .mobile-actions {
              display: flex !important;
            }

            .product-image-wrapper {
              height: 190px !important;
            }

            .product-info {
              padding: 10px 8px !important;
            }

            .product-card {
              border-radius: 8px !important;
            }
          }

          /* =========================
             SMALL ANDROID
          ========================= */

          @media (max-width: 480px) {

            .new-arrivals-container {
              padding: 16px 8px !important;
            }

            .new-arrivals-grid {
              gap: 8px !important;
            }

            .product-image-wrapper {
              height: 165px !important;
            }

            .new-arrivals-header {
              margin-bottom: 16px !important;
            }
          }

          /* =========================
             VERY SMALL SCREENS
          ========================= */

          @media (max-width: 360px) {

            .product-image-wrapper {
              height: 145px !important;
            }

            .new-arrivals-grid {
              gap: 6px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    padding: "50px 20px",
    maxWidth: "1300px",
    margin: "0 auto",
    fontFamily: '"Montserrat", sans-serif',
    backgroundColor: "#FAF5FC",
    minHeight: "100vh",
    width: "100%",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "35px",
    borderBottom:
      "1px solid rgba(212, 175, 55, 0.25)",
    paddingBottom: "15px",
  },

  tagline: {
    color: "#D4AF37",
    fontSize: "10px",
    fontWeight: "600",
    letterSpacing: "4px",
  },

  title: {
    fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
    margin: "6px 0 0",
    fontFamily: '"Playfair Display", serif',
    color: "#4B2954",
    fontWeight: "700",
  },

  underline: {
    width: "40px",
    height: "2px",
    backgroundColor: "#D4AF37",
    marginTop: "8px",
  },

 

  /* GRID */

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "24px",
    width: "100%",
  },

  /* CARD */

  productCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    overflow: "hidden",
    border:
      "1px solid rgba(75, 41, 84, 0.08)",
    boxShadow:
      "0 4px 15px rgba(75, 41, 84, 0.04)",
    position: "relative",
    minWidth: 0,
  },

  /* IMAGE */

  imageWrapper: {
    position: "relative",
    height: "320px",
    overflow: "hidden",
    backgroundColor: "#F3EBF5",
  },

  imageLink: {
    display: "block",
    width: "100%",
    height: "100%",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  /* BADGES */

  badgeContainer: {
    position: "absolute",
    top: "10px",
    left: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    zIndex: 3,
    pointerEvents: "none",
  },

  badgeNew: {
    backgroundColor: "#4B2954",
    color: "#FFFFFF",
    fontSize: "8px",
    padding: "4px 7px",
    borderRadius: "3px",
    fontWeight: "600",
    letterSpacing: "1px",
  },

  badgeDiscount: {
    backgroundColor: "#C22730",
    color: "#FFFFFF",
    fontSize: "8px",
    padding: "4px 7px",
    borderRadius: "3px",
    fontWeight: "600",
    letterSpacing: "1px",
  },

  /* DESKTOP HOVER ACTIONS */

  desktopActions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    padding: "12px",

    display: "flex",
    gap: "8px",

    background:
      "linear-gradient(to top, rgba(75, 41, 84, 0.9) 0%, rgba(75, 41, 84, 0.45) 70%, transparent 100%)",

    backdropFilter: "blur(3px)",

    zIndex: 5,
  },

  quickView: {
    flex: 1,
    padding: "9px 6px",
    border: "none",
    borderRadius: "4px",

    backgroundColor:
      "rgba(255,255,255,0.96)",

    color: "#4B2954",

    cursor: "pointer",

    fontSize: "10px",
    fontWeight: "600",

    letterSpacing: "0.5px",

    textTransform: "uppercase",
  },

  addToCart: {
    flex: 1,

    padding: "9px 6px",

    border: "none",
    borderRadius: "4px",

    backgroundColor: "#D4AF37",

    color: "#222",

    cursor: "pointer",

    fontSize: "10px",
    fontWeight: "700",

    letterSpacing: "0.5px",

    textTransform: "uppercase",
  },

  /* PRODUCT INFO */

  productInfoLink: {
    textDecoration: "none",
    color: "inherit",
    display: "block",
  },

  info: {
    padding: "16px 14px",
  },

  category: {
    color: "#8E7394",
    fontSize: "9px",
    margin: "0 0 5px",
    letterSpacing: "1.2px",
    textTransform: "uppercase",
    fontWeight: "500",

    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  productName: {
    fontSize: "14px",

    margin: "0 0 9px",

    color: "#4B2954",

    fontFamily:
      '"Playfair Display", serif',

    fontWeight: "600",

    lineHeight: "1.3",

    whiteSpace: "nowrap",

    overflow: "hidden",

    textOverflow: "ellipsis",
  },

  priceRow: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    flexWrap: "wrap",
  },

  currentPrice: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#C22730",
  },

  oldPrice: {
    fontSize: "11px",
    color: "#9E8C9E",
    textDecoration: "line-through",
  },

  /* MOBILE ACTIONS */

  mobileActions: {
    display: "flex",
    gap: "5px",

    padding: "0 8px 10px",
  },

  mobileQuickView: {
    flex: 1,

    padding: "7px 3px",

    border:
      "1px solid rgba(75, 41, 84, 0.2)",

    borderRadius: "4px",

    backgroundColor: "#FAF5FC",

    color: "#4B2954",

    cursor: "pointer",

    fontSize: "8px",

    fontWeight: "600",

    textTransform: "uppercase",

    whiteSpace: "nowrap",
  },

  mobileAddToCart: {
    flex: 1,

    padding: "7px 3px",

    border: "none",

    borderRadius: "4px",

    backgroundColor: "#D4AF37",

    color: "#222",

    cursor: "pointer",

    fontSize: "8px",

    fontWeight: "700",

    textTransform: "uppercase",

    whiteSpace: "nowrap",
  },
};

export default NewArrivals;