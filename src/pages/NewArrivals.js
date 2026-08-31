
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NewArrivals = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  const fetchNewArrivals = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://vanyabackenddatabase-vahr.onrender.com/products/all"
      );

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

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
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={styles.container}
      className="new-arrivals-container"
    >
      {/* ===================================================== */}
      {/* BACK BUTTON */}
      {/* ===================================================== */}

      <button
        type="button"
        onClick={() => navigate(-1)}
        style={styles.backButton}
        className="back-button"
        aria-label="Go back"
      >
        <span className="back-arrow">←</span>
        <span>Back</span>
      </button>

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <div
        style={styles.header}
        className="new-arrivals-header"
      >
        <div style={styles.headerContent}>
          <span style={styles.tagline}>
            ✦ CURATED EXCLUSIVES ✦
          </span>

          <h2 style={styles.title}>
            New Arrivals
          </h2>

          <div style={styles.underline}></div>
        </div>
      </div>

      {/* ===================================================== */}
      {/* LOADING */}
      {/* ===================================================== */}

      {loading && (
        <div
          style={styles.message}
          className="product-message"
        >
          Loading new arrivals...
        </div>
      )}

      {/* ===================================================== */}
      {/* EMPTY */}
      {/* ===================================================== */}

      {!loading && products.length === 0 && (
        <div
          style={styles.message}
          className="product-message"
        >
          No new arrivals available at the moment.
        </div>
      )}

      {/* ===================================================== */}
      {/* PRODUCT GRID */}
      {/* ===================================================== */}

      {!loading && products.length > 0 && (
        <div
          style={styles.grid}
          className="new-arrivals-grid"
        >
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
                minWidth: 0,
                width: "100%",
              }}
            >
              <div
                style={styles.productCard}
                className="product-card"
              >
                {/* ================================================= */}
                {/* IMAGE */}
                {/* ================================================= */}

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
                    loading="lazy"
                  />

                  {/* ================================================= */}
                  {/* BADGES */}
                  {/* ================================================= */}

                  <div
                    style={styles.badgeContainer}
                    className="badge-container"
                  >
                    <span style={styles.badgeNew}>
                      NEW
                    </span>

                    {Number(product.discount) > 0 && (
                      <span style={styles.badgeDiscount}>
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* ================================================= */}
                  {/* ACTION BUTTONS */}
                  {/* ================================================= */}

                  <div
                    className="actions"
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

                {/* ================================================= */}
                {/* PRODUCT INFO */}
                {/* ================================================= */}

                <div
                  style={styles.info}
                  className="product-info"
                >
                  <p style={styles.category}>
                    {product.category ||
                      "Handloom Saree"}
                  </p>

                  <h3
                    style={styles.productName}
                    title={product.name}
                  >
                    {product.name}
                  </h3>

                  <div
                    style={styles.priceRow}
                  >
                    <span
                      style={styles.currentPrice}
                    >
                      ₹
                      {Number(
                        product.price || 0
                      ).toLocaleString("en-IN")}
                    </span>

                    {product.old_price &&
                      Number(product.old_price) >
                        Number(product.price) && (
                        <span
                          style={styles.oldPrice}
                        >
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
          ))}
        </div>
      )}

      {/* ===================================================== */}
      {/* STYLES */}
      {/* ===================================================== */}

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

          * {
            box-sizing: border-box;
          }

          .new-arrivals-container {
            width: 100%;
            max-width: 100%;
            overflow-x: hidden;
          }

          /* ============================================= */
          /* BACK BUTTON */
          /* ============================================= */

          .back-button {
            transition:
              color 0.2s ease,
              transform 0.2s ease,
              background-color 0.2s ease;
          }

          .back-button:hover {
            color: #C22730 !important;
            transform: translateX(-3px);
          }

          .back-button:active {
            transform: translateX(-2px) scale(0.98);
          }

          .back-button:focus {
            outline: 2px solid rgba(212, 175, 55, 0.5);
            outline-offset: 3px;
          }

          .back-arrow {
            font-size: 20px;
            line-height: 1;
          }

          /* ============================================= */
          /* PRODUCT CARD */
          /* ============================================= */

          .product-card {
            transition:
              transform 0.35s cubic-bezier(0.165, 0.84, 0.44, 1),
              box-shadow 0.35s ease,
              border-color 0.35s ease;

            height: 100%;
            box-sizing: border-box;
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

          .product-image {
            transition:
              transform 0.5s
              cubic-bezier(0.165, 0.84, 0.44, 1);
          }

          /* ============================================= */
          /* ACTION BUTTONS */
          /* ============================================= */

          .actions {
            opacity: 0;
            transition: opacity 0.25s ease;
          }

          .product-card:hover .actions {
            opacity: 1;
          }

          /* ============================================= */
          /* MOBILE / ANDROID */
          /* ============================================= */

          @media (max-width: 768px) {

            .new-arrivals-container {
              padding: 20px 10px !important;
            }

            .back-button {
              min-height: 42px;
              min-width: 80px;
              padding: 8px 10px !important;
              margin-bottom: 18px !important;

              font-size: 13px !important;

              -webkit-tap-highlight-color:
                transparent;
            }

            .back-arrow {
              font-size: 21px !important;
            }

            .new-arrivals-header {
              margin-bottom: 22px !important;
              padding-bottom: 12px !important;
            }

            .tagline {
              font-size: 8px !important;
              letter-spacing: 2.5px !important;
            }

            .new-arrivals-title {
              font-size: 1.7rem !important;
            }

            .new-arrivals-grid {
              grid-template-columns:
                repeat(2, minmax(0, 1fr)) !important;

              gap: 8px !important;
              width: 100% !important;
            }

            .product-image-wrapper {
              height: 175px !important;
            }

            .product-info {
              padding: 10px 8px !important;
            }

            .product-name {
              font-size: 12px !important;
            }

            .actions {
              opacity: 1 !important;
              position: relative !important;

              background: none !important;

              padding: 5px 0 0 0 !important;

              gap: 3px !important;

              backdrop-filter: none !important;
            }

            .actions button {
              min-height: 30px !important;

              font-size: 7.5px !important;

              padding: 5px 2px !important;

              letter-spacing: 0.1px !important;

              -webkit-tap-highlight-color:
                transparent;
            }

            .badge-container {
              top: 7px !important;
              left: 7px !important;
            }
          }

          /* ============================================= */
          /* SMALL ANDROID PHONES */
          /* ============================================= */

          @media (max-width: 400px) {

            .new-arrivals-container {
              padding-left: 7px !important;
              padding-right: 7px !important;
            }

            .new-arrivals-grid {
              gap: 6px !important;
            }

            .product-image-wrapper {
              height: 155px !important;
            }

            .product-info {
              padding: 8px 6px !important;
            }

            .product-name {
              font-size: 11px !important;
            }

            .category {
              font-size: 7.5px !important;
            }

            .current-price {
              font-size: 12px !important;
            }

            .old-price {
              font-size: 9px !important;
            }
          }

          /* ============================================= */
          /* TABLET */
          /* ============================================= */

          @media (min-width: 769px) and (max-width: 1100px) {

            .new-arrivals-grid {
              grid-template-columns:
                repeat(3, minmax(0, 1fr)) !important;

              gap: 18px !important;
            }

            .product-image-wrapper {
              height: 280px !important;
            }
          }

          /* ============================================= */
          /* REDUCE HOVER EFFECT ON TOUCH DEVICES */
          /* ============================================= */

          @media (hover: none) {

            .product-card:hover {
              transform: none;
              border-color:
                rgba(75, 41, 84, 0.08) !important;

              box-shadow:
                0 4px 15px
                rgba(75, 41, 84, 0.04) !important;
            }

            .product-card:hover .product-image {
              transform: none;
            }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  /* ===================================================== */
  /* CONTAINER */
  /* ===================================================== */

  container: {
    width: "100%",
    maxWidth: "1300px",
    padding: "30px 20px 50px",
    margin: "0 auto",
    fontFamily: '"Montserrat", sans-serif',
    backgroundColor: "#FAF5FC",
    minHeight: "100vh",
    boxSizing: "border-box",
    overflowX: "hidden",
  },

  /* ===================================================== */
  /* BACK BUTTON */
  /* ===================================================== */

  backButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",

    background: "transparent",
    border: "none",

    color: "#4B2954",

    fontSize: "13px",
    fontWeight: "600",

    cursor: "pointer",

    padding: "8px 4px",
    marginBottom: "25px",

    fontFamily: '"Montserrat", sans-serif',
    letterSpacing: "0.5px",

    WebkitTapHighlightColor: "transparent",
    touchAction: "manipulation",
  },

  /* ===================================================== */
  /* HEADER */
  /* ===================================================== */

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",

    marginBottom: "35px",

    borderBottom:
      "1px solid rgba(212, 175, 55, 0.25)",

    paddingBottom: "15px",

    width: "100%",
  },

  headerContent: {
    minWidth: 0,
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

    lineHeight: "1.2",
  },

  underline: {
    width: "40px",
    height: "2px",

    backgroundColor: "#D4AF37",

    marginTop: "8px",
  },

  /* ===================================================== */
  /* GRID */
  /* ===================================================== */

  grid: {
    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit, minmax(240px, 1fr))",

    gap: "24px",

    width: "100%",
  },

  /* ===================================================== */
  /* CARD */
  /* ===================================================== */

  productCard: {
    backgroundColor: "#FFFFFF",

    borderRadius: "8px",

    overflow: "hidden",

    border:
      "1px solid rgba(75, 41, 84, 0.08)",

    boxShadow:
      "0 4px 15px rgba(75, 41, 84, 0.04)",

    width: "100%",
  },

  /* ===================================================== */
  /* IMAGE */
  /* ===================================================== */

  imageWrapper: {
    position: "relative",

    width: "100%",

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

  /* ===================================================== */
  /* BADGES */
  /* ===================================================== */

  badgeContainer: {
    position: "absolute",

    top: "10px",
    left: "10px",

    display: "flex",

    flexDirection: "column",

    gap: "4px",

    zIndex: 2,
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

  /* ===================================================== */
  /* ACTIONS */
  /* ===================================================== */

  actionOverlay: {
    position: "absolute",

    bottom: "0",
    left: "0",
    right: "0",

    padding: "12px",

    boxSizing: "border-box",

    display: "flex",

    gap: "8px",

    background:
      "linear-gradient(to top, rgba(75, 41, 84, 0.85) 0%, rgba(75, 41, 84, 0.3) 75%, transparent 100%)",

    backdropFilter: "blur(3px)",

    zIndex: 2,
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

    letterSpacing: "0.5px",

    textTransform: "uppercase",

    touchAction: "manipulation",
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

    letterSpacing: "0.5px",

    textTransform: "uppercase",

    touchAction: "manipulation",
  },

  /* ===================================================== */
  /* PRODUCT INFO */
  /* ===================================================== */

  info: {
    padding: "16px 14px",

    minWidth: 0,
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

    fontFamily: '"Playfair Display", serif',

    fontWeight: "600",

    lineHeight: "1.3",

    whiteSpace: "nowrap",

    overflow: "hidden",

    textOverflow: "ellipsis",
  },

  priceRow: {
    display: "flex",

    alignItems: "center",

    gap: "6px",

    flexWrap: "wrap",
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

  /* ===================================================== */
  /* MESSAGE */
  /* ===================================================== */

  message: {
    width: "100%",

    textAlign: "center",

    padding: "60px 20px",

    color: "#4B2954",

    fontSize: "14px",

    fontWeight: "500",
  },
};

export default NewArrivals;
