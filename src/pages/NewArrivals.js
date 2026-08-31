
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE =
  "https://vanyabackenddatabase-vahr.onrender.com";

const PRODUCTS_API = `${API_BASE}/products/all`;

// IMPORTANT:
// Change this only if your backend cart API is different.
const CART_API = `${API_BASE}/cart`;

const VanyaNewArrivals = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [addingProductId, setAddingProductId] = useState(null);

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  // ============================================================
  // FETCH NEW ARRIVALS
  // ============================================================

  const fetchNewArrivals = async () => {
    try {
      const res = await fetch(PRODUCTS_API);

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();

      const newArrivals = Array.isArray(data)
        ? data.filter(
            (p) =>
              String(p.type || "")
                .trim()
                .toLowerCase() === "new arrival"
          )
        : [];

      setProducts(newArrivals);
    } catch (err) {
      console.error(
        "Error fetching new arrivals:",
        err
      );

      setProducts([]);
    }
  };

  // ============================================================
  // QUICK VIEW
  // ============================================================

  const handleQuickView = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product?.id) {
      console.error("Product ID missing");
      return;
    }

    // Open product detail page
    navigate(`/product/${product.id}`);
  };

  // ============================================================
  // ADD TO CART
  // ============================================================

  const handleAddToCart = async (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product?.id) {
      alert("Product ID is missing.");
      return;
    }

    if (addingProductId === product.id) {
      return;
    }

    try {
      setAddingProductId(product.id);

      // --------------------------------------------------------
      // GET USER
      // --------------------------------------------------------

      const storedUser =
        localStorage.getItem("user") ||
        localStorage.getItem("customer");

      let user = null;

      try {
        user = storedUser
          ? JSON.parse(storedUser)
          : null;
      } catch (error) {
        console.warn(
          "Unable to parse stored user"
        );
      }

      // --------------------------------------------------------
      // GET USER ID
      // --------------------------------------------------------

      const userId =
        user?.id ||
        user?.user_id ||
        user?.userId ||
        localStorage.getItem("userId") ||
        localStorage.getItem("user_id");

      // --------------------------------------------------------
      // PRODUCT PRICE
      // --------------------------------------------------------

      const price = Number(
        product.price || 0
      );

      // --------------------------------------------------------
      // CART PAYLOAD
      // --------------------------------------------------------
      //
      // This supports the common backend structure.
      // If your backend expects different field names,
      // change them here only.
      //
      // --------------------------------------------------------

      const cartData = {
        product_id: product.id,
        quantity: 1,
        price: price,
      };

      // Add user ID only if available
      if (userId) {
        cartData.user_id = userId;
      }

      // Add store code if your product has one
      if (
        product.store_code ||
        product.storeCode
      ) {
        cartData.store_code =
          product.store_code ||
          product.storeCode;
      }

      console.log(
        "Adding product to cart:",
        cartData
      );

      // --------------------------------------------------------
      // API CALL
      // --------------------------------------------------------

      const response = await fetch(
        `${CART_API}/add`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(cartData),
        }
      );

      // --------------------------------------------------------
      // READ RESPONSE
      // --------------------------------------------------------

      const contentType =
        response.headers.get(
          "content-type"
        );

      let result;

      if (
        contentType &&
        contentType.includes(
          "application/json"
        )
      ) {
        result = await response.json();
      } else {
        result = await response.text();
      }

      console.log(
        "Cart API response:",
        result
      );

      // --------------------------------------------------------
      // ERROR
      // --------------------------------------------------------

      if (!response.ok) {
        const message =
          typeof result === "object"
            ? result?.message ||
              result?.error ||
              "Failed to add product to cart."
            : result ||
              "Failed to add product to cart.";

        throw new Error(message);
      }

      // --------------------------------------------------------
      // SUCCESS
      // --------------------------------------------------------

      alert(
        `${product.name || "Product"} added to bag successfully!`
      );

      // Optional cart refresh event
      window.dispatchEvent(
        new Event("cartUpdated")
      );
    } catch (error) {
      console.error(
        "Add to cart error:",
        error
      );

      alert(
        error.message ||
          "Unable to add product to cart."
      );
    } finally {
      setAddingProductId(null);
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div
      style={styles.container}
      className="new-arrivals-container"
    >
      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

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

      {/* ====================================================== */}
      {/* EMPTY */}
      {/* ====================================================== */}

      {products.length === 0 && (
        <div style={styles.emptyMessage}>
          No new arrivals available.
        </div>
      )}

      {/* ====================================================== */}
      {/* PRODUCT GRID */}
      {/* ====================================================== */}

      <div
        style={styles.grid}
        className="new-arrivals-grid"
      >
        {products.map((product) => {
          const isAdding =
            addingProductId === product.id;

          return (
            <div
              key={product.id}
              className="product-card"
              style={styles.productCard}
            >
              {/* ================================================= */}
              {/* IMAGE AREA */}
              {/* ================================================= */}

              <div
                className="product-image-wrapper"
                style={styles.imageWrapper}
              >
                {/* IMAGE LINK */}
                <Link
                  to={`/product/${product.id}`}
                  style={styles.imageLink}
                  onClick={(e) => {
                    // Normal image click -> product page
                    e.stopPropagation();
                  }}
                >
                  <img
                    src={
                      product.img_url ||
                      product.thumbnails?.[0]
                    }
                    alt={
                      product.name ||
                      "Product"
                    }
                    style={styles.image}
                    className="product-image"
                    loading="lazy"
                  />
                </Link>

                {/* ================================================= */}
                {/* BADGES */}
                {/* ================================================= */}

                <div
                  style={styles.badgeContainer}
                >
                  <span
                    style={styles.badgeNew}
                  >
                    NEW
                  </span>

                  {Number(
                    product.discount || 0
                  ) > 0 && (
                    <span
                      style={
                        styles.badgeDiscount
                      }
                    >
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                {/* ================================================= */}
                {/* DESKTOP ACTIONS */}
                {/* ================================================= */}

                <div
                  className="desktop-actions"
                  style={styles.desktopActions}
                >
                  {/* QUICK VIEW */}
                  <button
                    type="button"
                    style={styles.quickView}
                    onClick={(e) =>
                      handleQuickView(
                        e,
                        product
                      )
                    }
                  >
                    Quick View
                  </button>

                  {/* ADD TO CART */}
                  <button
                    type="button"
                    style={{
                      ...styles.addToCart,
                      opacity: isAdding
                        ? 0.7
                        : 1,
                    }}
                    disabled={isAdding}
                    onClick={(e) =>
                      handleAddToCart(
                        e,
                        product
                      )
                    }
                  >
                    {isAdding
                      ? "Adding..."
                      : "Add to Bag"}
                  </button>
                </div>
              </div>

              {/* ================================================= */}
              {/* PRODUCT INFORMATION */}
              {/* ================================================= */}

              <Link
                to={`/product/${product.id}`}
                style={
                  styles.productInfoLink
                }
              >
                <div
                  style={styles.info}
                  className="product-info"
                >
                  <p
                    style={styles.category}
                  >
                    {product.category ||
                      "Handloom Saree"}
                  </p>

                  <h3
                    style={
                      styles.productName
                    }
                    title={product.name}
                  >
                    {product.name}
                  </h3>

                  <div
                    style={styles.priceRow}
                  >
                    <span
                      style={
                        styles.currentPrice
                      }
                    >
                      ₹
                      {Number(
                        product.price || 0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </span>

                    {product.old_price &&
                      Number(
                        product.old_price
                      ) >
                        Number(
                          product.price
                        ) && (
                        <span
                          style={
                            styles.oldPrice
                          }
                        >
                          ₹
                          {Number(
                            product.old_price
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      )}
                  </div>
                </div>
              </Link>

              {/* ================================================= */}
              {/* MOBILE ACTIONS */}
              {/* ================================================= */}

              <div
                className="mobile-actions"
                style={styles.mobileActions}
              >
                {/* QUICK VIEW */}
                <button
                  type="button"
                  style={
                    styles.mobileQuickView
                  }
                  onClick={(e) =>
                    handleQuickView(
                      e,
                      product
                    )
                  }
                >
                  Quick View
                </button>

                {/* ADD TO BAG */}
                <button
                  type="button"
                  style={{
                    ...styles.mobileAddToCart,
                    opacity: isAdding
                      ? 0.7
                      : 1,
                  }}
                  disabled={isAdding}
                  onClick={(e) =>
                    handleAddToCart(
                      e,
                      product
                    )
                  }
                >
                  {isAdding
                    ? "Adding..."
                    : "Add to Bag"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ====================================================== */}
      {/* CSS */}
      {/* ====================================================== */}

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700&family=Montserrat:wght@300;400;500;600;700&display=swap');

          .new-arrivals-container,
          .new-arrivals-container * {
            box-sizing: border-box;
          }

          /* =========================
             PRODUCT CARD
          ========================= */

          .product-card {
            transition:
              transform 0.35s cubic-bezier(
                0.165,
                0.84,
                0.44,
                1
              ),
              box-shadow 0.35s ease,
              border-color 0.35s ease;
          }

          @media (min-width: 769px) {

            .product-card:hover {
              transform: translateY(-5px);

              border-color: #D4AF37 !important;

              box-shadow:
                0 12px 30px rgba(
                  75,
                  41,
                  84,
                  0.12
                ),
                0 0 15px rgba(
                  212,
                  175,
                  55,
                  0.2
                ) !important;
            }

            .product-card:hover
            .product-image {
              transform: scale(1.05);
            }

            /* DESKTOP ACTIONS */

            .desktop-actions {
              opacity: 0;
              visibility: hidden;

              transform:
                translateY(15px);

              transition:
                opacity 0.25s ease,
                transform 0.25s ease,
                visibility 0.25s ease;
            }

            .product-image-wrapper:hover
            .desktop-actions {
              opacity: 1;
              visibility: visible;
              transform: translateY(0);
            }

            /* MOBILE ACTIONS HIDDEN */

            .mobile-actions {
              display: none !important;
            }
          }

          /* =========================
             IMAGE
          ========================= */

          .product-image {
            transition:
              transform 0.5s ease;
          }

          /* =========================
             BUTTONS
          ========================= */

          button {
            font-family:
              "Montserrat",
              sans-serif;
          }

          button:disabled {
            cursor: not-allowed !important;
          }

          .desktop-actions button,
          .mobile-actions button {
            -webkit-tap-highlight-color:
              transparent;

            touch-action: manipulation;
          }

          /* =========================
             MOBILE
          ========================= */

          @media (max-width: 768px) {

            .new-arrivals-container {
              padding: 20px 10px !important;
              width: 100%;
            }

            .new-arrivals-header {
              margin-bottom: 20px !important;
              padding-bottom: 12px !important;
            }

            .new-arrivals-grid {
              grid-template-columns:
                repeat(
                  2,
                  minmax(0, 1fr)
                ) !important;

              gap: 10px !important;
            }

            /* HIDE DESKTOP */

            .desktop-actions {
              display: none !important;
            }

            /* SHOW MOBILE */

            .mobile-actions {
              display: flex !important;

              width: 100%;

              padding:
                0 8px 10px;

              gap: 5px;

              position: relative;

              z-index: 10;
            }

            .mobile-actions button {
              min-height: 34px;

              padding:
                7px 3px;

              font-size: 8px;

              font-weight: 600;

              border-radius: 4px;

              cursor: pointer;
            }

            .product-image-wrapper {
              height: 190px !important;
            }

            .product-info {
              padding:
                10px 8px !important;
            }

            .product-card {
              border-radius: 8px !important;
            }

            .product-name {
              font-size: 12px !important;
            }

            .current-price {
              font-size: 12px !important;
            }

            .old-price {
              font-size: 9px !important;
            }
          }

          /* =========================
             SMALL MOBILE
          ========================= */

          @media (max-width: 480px) {

            .new-arrivals-container {
              padding:
                16px 8px !important;
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

            .mobile-actions {
              padding:
                0 6px 8px !important;

              gap: 4px !important;
            }

            .mobile-actions button {
              font-size: 7px !important;

              min-height: 32px !important;

              padding:
                6px 2px !important;
            }
          }

          /* =========================
             VERY SMALL
          ========================= */

          @media (max-width: 360px) {

            .product-image-wrapper {
              height: 145px !important;
            }

            .new-arrivals-grid {
              gap: 6px !important;
            }

            .mobile-actions button {
              font-size: 6.5px !important;
            }
          }
        `}
      </style>
    </div>
  );
};

// ============================================================
// STYLES
// ============================================================

const styles = {
  container: {
    padding: "50px 20px",
    maxWidth: "1300px",
    margin: "0 auto",
    fontFamily:
      '"Montserrat", sans-serif',
    backgroundColor: "#FAF5FC",
    minHeight: "100vh",
    width: "100%",
  },

  header: {
    display: "flex",
    justifyContent:
      "space-between",
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
    fontSize:
      "clamp(1.8rem, 3vw, 2.4rem)",
    margin: "6px 0 0",
    fontFamily:
      '"Playfair Display", serif',
    color: "#4B2954",
    fontWeight: "700",
  },

  underline: {
    width: "40px",
    height: "2px",
    backgroundColor: "#D4AF37",
    marginTop: "8px",
  },

  emptyMessage: {
    textAlign: "center",
    padding: "50px 20px",
    color: "#4B2954",
    fontSize: "14px",
  },

  // ==========================================================
  // GRID
  // ==========================================================

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "24px",
    width: "100%",
  },

  // ==========================================================
  // CARD
  // ==========================================================

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

  // ==========================================================
  // IMAGE
  // ==========================================================

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

  // ==========================================================
  // BADGES
  // ==========================================================

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

  // ==========================================================
  // DESKTOP ACTIONS
  // ==========================================================

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

    backdropFilter:
      "blur(3px)",

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

  // ==========================================================
  // PRODUCT INFO
  // ==========================================================

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
    textDecoration:
      "line-through",
  },

  // ==========================================================
  // MOBILE ACTIONS
  // ==========================================================

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

    touchAction: "manipulation",
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

    touchAction: "manipulation",
  },
};

export default VanyaNewArrivals;
