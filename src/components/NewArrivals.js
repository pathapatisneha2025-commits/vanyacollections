
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

      const newArrivals = Array.isArray(data)
        ? data.filter(
            (p) =>
              String(p.type || "").trim().toLowerCase() ===
              "new arrival"
          )
        : [];

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
      {/* ================= HEADER ================= */}

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

        <Link
          to="/new-arrivals"
          style={styles.viewAll}
          className="view-all-link"
        >
          View All →
        </Link>
      </div>

      {/* ================= PRODUCT GRID ================= */}

      <div
        style={styles.grid}
        className="new-arrivals-grid"
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={styles.productCardWrapper}
            className="product-card-wrapper"
          >
            {/* ============================================ */}
            {/* PRODUCT LINK */}
            {/* ============================================ */}

            <Link
              to={`/product/${product.id}`}
              className="product-link"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
                minWidth: 0,
              }}
            >
              <div
                style={styles.productCard}
                className="product-card"
              >
                {/* ================= IMAGE ================= */}

                <div
                  style={styles.imageWrapper}
                  className="product-image-wrapper"
                >
                  <img
                    src={
                      product.img_url ||
                      product.thumbnails?.[0]
                    }
                    alt={product.name || "Product"}
                    style={styles.image}
                    className="product-image"
                  />

                  {/* ================= BADGES ================= */}

                  <div style={styles.badgeContainer}>
                    <span style={styles.badgeNew}>
                      NEW
                    </span>

                    {Number(product.discount) > 0 && (
                      <span style={styles.badgeDiscount}>
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* ============================================ */}
                  {/* DESKTOP ACTIONS - HIDDEN UNTIL HOVER */}
                  {/* ============================================ */}

                  <div
                    className="desktop-actions"
                    style={styles.actionOverlay}
                  >
                    <button
                      type="button"
                      style={styles.quickView}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      Quick View
                    </button>

                    <button
                      type="button"
                      style={styles.addToCart}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>

                {/* ================= PRODUCT INFO ================= */}

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
                      ₹
                      {Number(
                        product.price || 0
                      ).toLocaleString("en-IN")}
                    </span>

                    {product.old_price &&
                      Number(product.old_price) >
                        Number(product.price) && (
                        <span style={styles.oldPrice}>
                          ₹
                          {Number(
                            product.old_price
                          ).toLocaleString("en-IN")}
                        </span>
                      )}
                  </div>
                </div>
              </div>
            </Link>

            {/* ============================================ */}
            {/* MOBILE ACTIONS ONLY */}
            {/* ============================================ */}

            <div
              className="mobile-actions"
              style={styles.mobileActionRow}
            >
              <button
                type="button"
                style={styles.mobileQuickView}
                onClick={() => {}}
              >
                Quick View
              </button>

              <button
                type="button"
                style={styles.mobileAddToCart}
                onClick={() => {}}
              >
                Add to Bag
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= CSS ================= */}

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

          /* ============================================ */
          /* GENERAL */
          /* ============================================ */

          .new-arrivals-container,
          .new-arrivals-container * {
            box-sizing: border-box;
          }

          /* ============================================ */
          /* DESKTOP DEFAULT */
          /* ============================================ */

          /*
            IMPORTANT:
            Mobile buttons are COMPLETELY hidden
            on desktop.
          */

          .mobile-actions {
            display: none !important;
          }

          /*
            Desktop buttons hidden by default.
          */

          .desktop-actions {
            display: flex !important;
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;

            transition:
              opacity 0.25s ease,
              visibility 0.25s ease;
          }

          /*
            Desktop buttons appear ONLY on hover.
          */

          @media (min-width: 769px) and (hover: hover) {

            .product-card:hover .desktop-actions {
              opacity: 1 !important;
              visibility: visible !important;
              pointer-events: auto !important;
            }

            .product-card:hover {
              transform: translateY(-5px);

              border-color: #D4AF37 !important;

              box-shadow:
                0 12px 30px rgba(75, 41, 84, 0.12),
                0 0 15px rgba(212, 175, 55, 0.2) !important;
            }

            .product-card:hover .product-image {
              transform: scale(1.04);
            }
          }

          /* ============================================ */
          /* PRODUCT CARD */
          /* ============================================ */

          .product-card {
            height: 100%;

            transition:
              transform 0.35s cubic-bezier(0.165, 0.84, 0.44, 1),
              box-shadow 0.35s ease,
              border-color 0.35s ease;
          }

          .product-image {
            transition:
              transform 0.5s
              cubic-bezier(0.165, 0.84, 0.44, 1);
          }

          .view-all-link {
            transition: color 0.2s ease;
          }

          .view-all-link:hover {
            color: #C22730 !important;
          }

          /* ============================================ */
          /* MOBILE / ANDROID */
          /* ============================================ */

          @media (max-width: 768px) {

            .new-arrivals-container {
              padding: 25px 10px !important;
            }

            .new-arrivals-grid {
              grid-template-columns:
                repeat(2, minmax(0, 1fr)) !important;

              gap: 10px !important;
            }

            /*
              Hide desktop overlay completely
              on Android/mobile.
            */

            .desktop-actions {
              display: none !important;
            }

            /*
              Show mobile buttons ONLY
              on Android/mobile.
            */

            .mobile-actions {
              display: flex !important;

              gap: 5px;

              padding: 0 8px 8px;

              background: #FFFFFF;

              border-bottom-left-radius: 8px;
              border-bottom-right-radius: 8px;
            }

            .product-card-wrapper {
              width: 100%;

              background: #FFFFFF;

              border-radius: 8px;

              border:
                1px solid rgba(75, 41, 84, 0.08);

              box-shadow:
                0 4px 15px rgba(75, 41, 84, 0.04);

              overflow: hidden;
            }

            .product-card {
              border: none !important;

              box-shadow: none !important;

              border-radius: 0 !important;
            }

            .product-image-wrapper {
              height: 165px !important;
            }

            .product-info {
              padding: 9px 8px 7px !important;
            }

            .product-name {
              font-size: 12px !important;
            }

            .mobile-actions button {
              min-height: 32px;

              -webkit-tap-highlight-color:
                transparent;

              touch-action: manipulation;
            }
          }

          /* ============================================ */
          /* SMALL ANDROID */
          /* ============================================ */

          @media (max-width: 400px) {

            .new-arrivals-container {
              padding-left: 7px !important;
              padding-right: 7px !important;
            }

            .new-arrivals-grid {
              gap: 7px !important;
            }

            .product-image-wrapper {
              height: 150px !important;
            }

            .mobile-actions {
              padding:
                0 6px 7px !important;
            }

            .mobile-actions button {
              font-size: 7px !important;

              padding: 5px 2px !important;
            }

            .product-info {
              padding: 8px 6px 6px !important;
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
    boxSizing: "border-box",
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

  viewAll: {
    color: "#4B2954",
    textDecoration: "none",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "24px",
  },

  productCardWrapper: {
    minWidth: 0,
  },

  productCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    overflow: "hidden",
    border:
      "1px solid rgba(75, 41, 84, 0.08)",
    boxShadow:
      "0 4px 15px rgba(75, 41, 84, 0.04)",
  },

  imageWrapper: {
    position: "relative",
    height: "320px",
    overflow: "hidden",
    backgroundColor: "#F3EBF5",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  badgeContainer: {
    position: "absolute",
    top: "10px",
    left: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    zIndex: 3,
  },

  badgeNew: {
    backgroundColor: "#4B2954",
    color: "#FBF5FC",
    fontSize: "8px",
    padding: "3px 7px",
    borderRadius: "3px",
    fontWeight: "600",
    letterSpacing: "1px",
  },

  badgeDiscount: {
    backgroundColor: "#C22730",
    color: "#FFFFFF",
    fontSize: "8px",
    padding: "3px 7px",
    borderRadius: "3px",
    fontWeight: "600",
    letterSpacing: "1px",
  },

  actionOverlay: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",

    padding: "12px",

    display: "flex",

    gap: "8px",

    background:
      "linear-gradient(to top, rgba(75, 41, 84, 0.85), rgba(75, 41, 84, 0.3), transparent)",

    zIndex: 4,
  },

  quickView: {
    flex: 1,
    padding: "8px",
    border: "none",
    borderRadius: "3px",
    backgroundColor:
      "rgba(255, 255, 255, 0.95)",
    color: "#4B2954",
    cursor: "pointer",
    fontSize: "10px",
    fontWeight: "600",
    textTransform: "uppercase",
  },

  addToCart: {
    flex: 1,
    padding: "8px",
    border: "none",
    borderRadius: "3px",
    backgroundColor: "#D4AF37",
    color: "#222222",
    cursor: "pointer",
    fontSize: "10px",
    fontWeight: "700",
    textTransform: "uppercase",
  },

  info: {
    padding: "16px 14px",
  },

  category: {
    color: "#8E7394",
    fontSize: "9px",
    margin: "0 0 4px",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    fontWeight: "500",
  },

  productName: {
    fontSize: "13px",
    margin: "0 0 8px",
    color: "#4B2954",
  
    lineHeight: "1.3",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  priceRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  currentPrice: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#C22730",
  },

  oldPrice: {
    fontSize: "10.5px",
    color: "#9E8C9E",
    textDecoration: "line-through",
  },

  mobileActionRow: {
    display: "none",
  },

  mobileQuickView: {
    flex: 1,
    padding: "6px 2px",
    border: "1px solid rgba(75, 41, 84, 0.15)",
    borderRadius: "3px",
    backgroundColor: "#FAF5FC",
    color: "#4B2954",
    cursor: "pointer",
    fontSize: "8px",
    fontWeight: "600",
    textTransform: "uppercase",
  },

  mobileAddToCart: {
    flex: 1,
    padding: "6px 2px",
    border: "none",
    borderRadius: "3px",
    backgroundColor: "#D4AF37",
    color: "#222222",
    cursor: "pointer",
    fontSize: "8px",
    fontWeight: "700",
    textTransform: "uppercase",
  },
};

export default NewArrivals;
