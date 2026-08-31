
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE =
  "https://vanyabackenddatabase-vahr.onrender.com";

const CART_API = `${API_BASE}/cart`;

const VanyaBestSellers = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [addingProduct, setAddingProduct] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBestSellers();
  }, []);

  // ============================================================
  // FETCH BEST SELLERS
  // ============================================================

  const fetchBestSellers = async () => {
    try {
      const res = await fetch(
        `${API_BASE}/products/all`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();

      const bestSellers = Array.isArray(data)
        ? data.filter(
            (p) =>
              String(p.type || "")
                .trim()
                .toLowerCase() === "best seller"
          )
        : [];

      setProducts(bestSellers);
    } catch (err) {
      console.error(
        "Error fetching best sellers:",
        err
      );
    }
  };

  // ============================================================
  // QUICK VIEW
  // ============================================================

  const handleQuickView = (product, e) => {
    e.preventDefault();
    e.stopPropagation();

    navigate(`/product/${product.id}`);
  };

  // ============================================================
  // GET USER
  // ============================================================

  const getUser = () => {
    try {
      const possibleKeys = [
        "user",
        "currentUser",
        "customer",
        "loggedInUser",
        "userData",
      ];

      for (const key of possibleKeys) {
        const value = localStorage.getItem(key);

        if (!value) continue;

        try {
          const parsed = JSON.parse(value);

          if (parsed) {
            return parsed;
          }
        } catch {
          return {
            id: value,
          };
        }
      }

      return null;
    } catch (error) {
      console.error(
        "Error getting user:",
        error
      );

      return null;
    }
  };

  // ============================================================
  // ADD TO CART
  // ============================================================

  const handleAddToCart = async (product, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (addingProduct === product.id) {
      return;
    }

    try {
      setAddingProduct(product.id);
      setMessage("");

      const user = getUser();

      /*
        Try to find the logged-in user's ID.

        If your application stores the user ID
        under another localStorage key, update it here.
      */

      const userId =
        user?.id ||
        user?.user_id ||
        user?.customer_id ||
        localStorage.getItem("userId") ||
        localStorage.getItem("user_id") ||
        localStorage.getItem("customerId");

      if (!userId) {
        setMessage(
          "Please login first to add products to your bag."
        );

        setTimeout(() => {
          setMessage("");
        }, 2500);

        navigate("/login");

        return;
      }

      // ========================================================
      // CART API REQUEST
      // ========================================================

      const response = await fetch(
        `${CART_API}/add`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            user_id: userId,
            product_id: product.id,
            quantity: 1,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            result?.error ||
            "Failed to add product to cart"
        );
      }

      // ========================================================
      // SUCCESS
      // ========================================================

      setMessage(
        `${product.name || "Product"} added to your bag`
      );

      setTimeout(() => {
        setMessage("");
      }, 2500);
    } catch (error) {
      console.error(
        "Add to cart error:",
        error
      );

      setMessage(
        error.message ||
          "Unable to add product to bag."
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } finally {
      setAddingProduct(null);
    }
  };

  return (
    <div style={styles.container}>
      {/* ====================================================== */}
      {/* SUCCESS / ERROR MESSAGE */}
      {/* ====================================================== */}

      {message && (
        <div
          className="cart-message"
          style={styles.cartMessage}
        >
          {message}
        </div>
      )}

      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <div style={styles.header}>
        <div>
          <span style={styles.tagline}>
            ✦ FAN FAVOURITES ✦
          </span>

          <h2 style={styles.title}>
            Best Sellers
          </h2>

          <div style={styles.underline}></div>
        </div>

        <Link
          to="/best-sellers"
          style={styles.viewAll}
          className="view-all-link"
        >
          View All →
        </Link>
      </div>

      {/* ====================================================== */}
      {/* PRODUCT GRID */}
      {/* ====================================================== */}

      <div
        style={styles.grid}
        className="bestsellers-grid"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card-wrapper"
            style={styles.cardWrapper}
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
                {/* Product image link */}
                <Link
                  to={`/product/${product.id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
                    width: "100%",
                    height: "100%",
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
                    style={
                      styles.badgeBestseller
                    }
                  >
                    BESTSELLER
                  </span>

                  {Number(
                    product.discount
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
                  className="product-actions desktop-actions"
                  style={
                    styles.desktopActionRow
                  }
                >
                  {/* QUICK VIEW */}

                  <button
                    type="button"
                    style={styles.quickView}
                    onClick={(e) =>
                      handleQuickView(
                        product,
                        e
                      )
                    }
                  >
                    Quick View
                  </button>

                  {/* ADD TO BAG */}

                  <button
                    type="button"
                    style={styles.addToCart}
                    disabled={
                      addingProduct ===
                      product.id
                    }
                    onClick={(e) =>
                      handleAddToCart(
                        product,
                        e
                      )
                    }
                  >
                    {addingProduct ===
                    product.id
                      ? "Adding..."
                      : "Add to Bag"}
                  </button>
                </div>
              </div>

              {/* ================================================= */}
              {/* PRODUCT INFO */}
              {/* ================================================= */}

              <Link
                to={`/product/${product.id}`}
                style={{
                  textDecoration:
                    "none",
                  color: "inherit",
                  display: "block",
                  flexGrow: 1,
                }}
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
                className="product-actions mobile-actions"
                style={
                  styles.mobileActionRow
                }
              >
                {/* QUICK VIEW */}

                <button
                  type="button"
                  style={styles.quickView}
                  onClick={(e) =>
                    handleQuickView(
                      product,
                      e
                    )
                  }
                >
                  Quick View
                </button>

                {/* ADD TO BAG */}

                <button
                  type="button"
                  style={styles.addToCart}
                  disabled={
                    addingProduct ===
                    product.id
                  }
                  onClick={(e) =>
                    handleAddToCart(
                      product,
                      e
                    )
                  }
                >
                  {addingProduct ===
                  product.id
                    ? "Adding..."
                    : "Add to Bag"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ====================================================== */}
      {/* CSS */}
      {/* ====================================================== */}

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

          * {
            box-sizing: border-box;
          }

          .product-card {
            transition:
              transform 0.35s cubic-bezier(0.165, 0.84, 0.44, 1),
              box-shadow 0.35s ease,
              border-color 0.35s ease;

            height: 100%;

            display: flex;

            flex-direction: column;

            background: #FFFFFF;

            border-radius: 8px;

            overflow: hidden;

            border:
              1px solid rgba(75, 41, 84, 0.08);

            box-shadow:
              0 4px 15px rgba(75, 41, 84, 0.04);
          }

          .product-card:hover {
            transform: translateY(-5px);

            border-color: #D4AF37 !important;

            box-shadow:
              0 12px 30px rgba(75, 41, 84, 0.12),
              0 0 15px rgba(212, 175, 55, 0.2) !important;
          }

          .product-image {
            transition:
              transform 0.5s
              cubic-bezier(0.165, 0.84, 0.44, 1);
          }

          .product-card:hover .product-image {
            transform: scale(1.04);
          }

          .view-all-link {
            transition:
              color 0.2s ease;
          }

          .view-all-link:hover {
            color: #C22730 !important;
          }

          /* =====================================================
             DESKTOP ACTIONS
          ===================================================== */

          @media (min-width: 769px) {

            .product-image-wrapper {
              position: relative;
            }

            .desktop-actions {
              position: absolute;

              bottom: 0;

              left: 0;

              right: 0;

              opacity: 0;

              visibility: hidden;

              pointer-events: none;

              transition:
                opacity 0.25s ease,
                visibility 0.25s ease;

              background:
                linear-gradient(
                  to top,
                  rgba(75, 41, 84, 0.9) 0%,
                  rgba(75, 41, 84, 0.35) 75%,
                  transparent 100%
                );

              backdrop-filter:
                blur(3px);

              padding: 12px;

              display: flex;

              gap: 8px;

              z-index: 10;
            }

            .product-card:hover
            .desktop-actions {
              opacity: 1;

              visibility: visible;

              pointer-events: auto;
            }

            .mobile-actions {
              display: none !important;
            }
          }

          /* =====================================================
             MOBILE
          ===================================================== */

          @media (max-width: 768px) {

            .bestsellers-container {
              padding:
                25px 10px 35px !important;
            }

            .bestsellers-grid {
              grid-template-columns:
                repeat(2, minmax(0, 1fr))
                !important;

              gap: 8px !important;

              width: 100% !important;

              padding: 0 !important;
            }

            .product-card {
              width: 100% !important;

              transform: none !important;
            }

            .product-card:hover {
              transform: none !important;

              box-shadow:
                0 4px 15px
                rgba(75, 41, 84, 0.04) !important;
            }

            .product-image-wrapper {
              height: 150px !important;
            }

            .product-info {
              padding:
                10px 10px 5px 10px !important;
            }

            .product-category {
              font-size: 8px !important;

              letter-spacing:
                1px !important;
            }

            .product-name {
              font-size: 11px !important;

              margin-bottom:
                7px !important;
            }

            .current-price {
              font-size:
                11px !important;
            }

            .old-price {
              font-size:
                8px !important;
            }

            /* Hide desktop actions */

            .desktop-actions {
              display:
                none !important;
            }

            /* Mobile actions */

            .mobile-actions {
              display:
                flex !important;

              position:
                relative !important;

              opacity:
                1 !important;

              visibility:
                visible !important;

              pointer-events:
                auto !important;

              background:
                transparent !important;

              backdrop-filter:
                none !important;

              padding:
                5px 8px 9px 8px !important;

              gap:
                4px !important;

              z-index:
                20 !important;
            }

            .mobile-actions button {
              min-height:
                34px !important;

              font-size:
                7px !important;

              padding:
                5px 2px !important;

              touch-action:
                manipulation !important;

              -webkit-tap-highlight-color:
                transparent !important;
            }

            .badgeContainer {
              top:
                7px !important;

              left:
                7px !important;
            }
          }

          /* =====================================================
             SMALL MOBILE
          ===================================================== */

          @media (max-width: 400px) {

            .bestsellers-container {
              padding-left:
                7px !important;

              padding-right:
                7px !important;
            }

            .bestsellers-grid {
              gap:
                6px !important;
            }

            .product-image-wrapper {
              height:
                145px !important;
            }

            .product-info {
              padding:
                8px 6px 3px 6px !important;
            }

            .product-name {
              font-size:
                10px !important;
            }

            .product-category {
              font-size:
                7px !important;
            }

            .current-price {
              font-size:
                10px !important;
            }

            .old-price {
              font-size:
                7px !important;
            }

            .mobile-actions {
              padding:
                4px 6px 7px 6px !important;

              gap:
                3px !important;
            }

            .mobile-actions button {
              min-height:
                30px !important;

              font-size:
                6.5px !important;

              padding:
                4px 1px !important;
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
    boxSizing: "border-box",
    position: "relative",
  },

  cartMessage: {
    position: "fixed",
    top: "20px",
    right: "20px",
    zIndex: 9999,
    backgroundColor: "#4B2954",
    color: "#FFFFFF",
    padding: "12px 18px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.18)",
    maxWidth: "320px",
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
    color: "#000000",
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

  cardWrapper: {
    display: "flex",
    flexDirection: "column",
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
    display: "flex",
    flexDirection: "column",
    height: "100%",
    position: "relative",
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
    zIndex: 5,
    pointerEvents: "none",
  },

  badgeBestseller: {
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

  desktopActionRow: {
    display: "flex",
    gap: "8px",
  },

  mobileActionRow: {
    display: "none",
    gap: "8px",
    padding: "0 14px 14px 14px",
    boxSizing: "border-box",
    zIndex: 20,
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
    boxShadow:
      "0 1px 3px rgba(0,0,0,0.1)",
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
    boxShadow:
      "0 1px 3px rgba(0,0,0,0.1)",
  },

  info: {
    padding: "16px 14px 10px 14px",
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
    fontSize: "14px",
    margin: "0 0 8px",
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
    gap: "8px",
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
};

export default VanyaBestSellers;
