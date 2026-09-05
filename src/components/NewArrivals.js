
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CART_API =
  "https://vanyabackenddatabase-vahr.onrender.com/cart";

const PRODUCTS_API =
  "https://vanyabackenddatabase-vahr.onrender.com/products/all";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [addingProduct, setAddingProduct] = useState(null);

  const navigate = useNavigate();

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
      console.error("Error fetching new arrivals:", err);
      setProducts([]);
    }
  };

  // ============================================================
  // QUICK VIEW
  // ============================================================

  const handleQuickView = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    navigate(`/product/${product.id}`);
  };

  // ============================================================
  // ADD TO CART
  // ============================================================

  const handleAddToCart = async (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    if (addingProduct === product.id) {
      return;
    }

    try {
      setAddingProduct(product.id);

      // --------------------------------------------------------
      // GET USER
      // --------------------------------------------------------

      const storedUser =
        localStorage.getItem("user") ||
        localStorage.getItem("customer");

      let user = null;

      try {
        user = storedUser ? JSON.parse(storedUser) : null;
      } catch (err) {
        console.error("Invalid user data:", err);
      }

      // --------------------------------------------------------
      // GET USER ID
      // --------------------------------------------------------

      const userId =
        user?.id ||
        user?.user_id ||
        user?.userId;

      // --------------------------------------------------------
      // LOGIN CHECK
      // --------------------------------------------------------

      if (!userId) {
        alert("Please login to add products to your cart.");
        navigate("/login");
        return;
      }

      // --------------------------------------------------------
      // CART PAYLOAD
      // --------------------------------------------------------

      const cartItem = {
        user_id: userId,
        product_id: product.id,
        quantity: 1,

        name: product.name,

        price: Number(product.price || 0),

        old_price: Number(
          product.old_price ||
            product.oldPrice ||
            0
        ),

        image:
          product.img_url ||
          product.mainImage ||
          product.thumbnails?.[0] ||
          "",

        category: product.category || "",

        size: product.sizes
          ? Array.isArray(product.sizes)
            ? product.sizes[0]
            : product.sizes
          : null,

        colour:
          product.colour ||
          product.color ||
          "",
      };

      console.log(
        "ADDING TO CART:",
        cartItem
      );

      // --------------------------------------------------------
      // SEND TO CART API
      // --------------------------------------------------------

      const response = await fetch(
        `${CART_API}/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItem),
        }
      );

      const result = await response.json();

      console.log(
        "CART RESPONSE:",
        result
      );

      if (!response.ok) {
        throw new Error(
          result?.message ||
            result?.error ||
            "Unable to add product to cart"
        );
      }

      alert(
        "Product added to cart successfully!"
      );
    } catch (error) {
      console.error(
        "ADD TO CART ERROR:",
        error
      );

      alert(
        error.message ||
          "Unable to add product to cart"
      );
    } finally {
      setAddingProduct(null);
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <section
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
        <div className="header-content">
          <span
            style={styles.tagline}
            className="new-arrivals-tagline"
          >
            ✦ CURATED EXCLUSIVES ✦
          </span>

          <h2
            style={styles.title}
            className="new-arrivals-title"
          >
            New Arrivals
          </h2>

          <div
            style={styles.underline}
            className="new-arrivals-underline"
          />
        </div>

        <Link
          to="/new-arrivals"
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
        className="new-arrivals-grid"
      >
        {products.map((product) => {
          const image =
            product.img_url ||
            product.mainImage ||
            product.thumbnails?.[0] ||
            "";

          const price = Number(
            product.price || 0
          );

          const oldPrice = Number(
            product.old_price ||
              product.oldPrice ||
              0
          );

          const discount =
            Number(product.discount || 0);

          return (
            <article
              key={product.id}
              style={styles.productCardWrapper}
              className="product-card-wrapper"
            >
              {/* ================================================= */}
              {/* PRODUCT */}
              {/* ================================================= */}

              <Link
                to={`/product/${product.id}`}
                className="product-link"
                style={styles.productLink}
              >
                <div
                  style={styles.productCard}
                  className="product-card"
                >
                  {/* ============================================= */}
                  {/* IMAGE */}
                  {/* ============================================= */}

                  <div
                    style={styles.imageWrapper}
                    className="product-image-wrapper"
                  >
                    <img
                      src={image}
                      alt={
                        product.name ||
                        "Product"
                      }
                      style={styles.image}
                      className="product-image"
                      loading="lazy"
                    />

                    {/* BADGES */}

                    <div
                      style={styles.badgeContainer}
                      className="product-badges"
                    >
                      <span
                        style={styles.badgeNew}
                      >
                        NEW
                      </span>

                      {discount > 0 && (
                        <span
                          style={
                            styles.badgeDiscount
                          }
                        >
                          {discount}% OFF
                        </span>
                      )}
                    </div>

                    {/* DESKTOP ACTIONS */}

                    <div
                      className="desktop-actions"
                      style={
                        styles.actionOverlay
                      }
                    >
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

                      <button
                        type="button"
                        style={
                          styles.addToCart
                        }
                        disabled={
                          addingProduct ===
                          product.id
                        }
                        onClick={(e) =>
                          handleAddToCart(
                            e,
                            product
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

                  {/* ============================================= */}
                  {/* PRODUCT INFO */}
                  {/* ============================================= */}

                  <div
                    style={styles.info}
                    className="product-info"
                  >
                    <p
                      style={styles.category}
                      className="product-category"
                    >
                      {product.category ||
                        "Handloom Saree"}
                    </p>

                    <h3
                      style={styles.productName}
                      className="product-name"
                      title={product.name}
                    >
                      {product.name ||
                        "Product"}
                    </h3>

                    <div
                      style={styles.priceRow}
                      className="price-row"
                    >
                      <span
                        style={
                          styles.currentPrice
                        }
                        className="current-price"
                      >
                        ₹
                        {price.toLocaleString(
                          "en-IN"
                        )}
                      </span>

                      {oldPrice > price &&
                        oldPrice > 0 && (
                          <span
                            style={
                              styles.oldPrice
                            }
                            className="old-price"
                          >
                            ₹
                            {oldPrice.toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        )}
                    </div>
                  </div>
                </div>
              </Link>

              {/* ================================================= */}
              {/* MOBILE ACTIONS */}
              {/* ================================================= */}

              <div
                className="mobile-actions"
                style={
                  styles.mobileActionRow
                }
              >
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

                <button
                  type="button"
                  style={
                    styles.mobileAddToCart
                  }
                  disabled={
                    addingProduct ===
                    product.id
                  }
                  onClick={(e) =>
                    handleAddToCart(
                      e,
                      product
                    )
                  }
                >
                  {addingProduct ===
                  product.id
                    ? "Adding..."
                    : "Add to Bag"}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* ====================================================== */}
      {/* RESPONSIVE CSS */}
      {/* ====================================================== */}

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

          /* =====================================================
             GLOBAL
          ===================================================== */

          .new-arrivals-container,
          .new-arrivals-container * {
            box-sizing: border-box;
          }

          .new-arrivals-container {
            width: 100%;
            max-width: 1300px;
            margin-left: auto;
            margin-right: auto;
            overflow-x: hidden;
          }

          .new-arrivals-grid {
            width: 100%;
          }

          .product-card-wrapper {
            min-width: 0;
          }

          .product-link {
            min-width: 0;
          }

          .product-image {
            max-width: 100%;
          }

          button {
            font-family: inherit;
          }

          /* =====================================================
             DESKTOP ACTIONS
          ===================================================== */

          .mobile-actions {
            display: none !important;
          }

          .desktop-actions {
            display: flex !important;

            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;

            transition:
              opacity 0.25s ease,
              visibility 0.25s ease;
          }

          /* =====================================================
             DESKTOP
          ===================================================== */

          @media (min-width: 769px) and (hover: hover) {

            .product-card:hover
            .desktop-actions {
              opacity: 1 !important;
              visibility: visible !important;
              pointer-events: auto !important;
            }

            .product-card:hover {
              transform: translateY(-5px);

              border-color:
                #D4AF37 !important;

              box-shadow:
                0 12px 30px
                  rgba(75, 41, 84, 0.12),
                0 0 15px
                  rgba(212, 175, 55, 0.2)
                  !important;
            }

            .product-card:hover
            .product-image {
              transform: scale(1.04);
            }
          }

          .product-card {
            transition:
              transform 0.35s
                cubic-bezier(
                  0.165,
                  0.84,
                  0.44,
                  1
                ),
              box-shadow 0.35s ease,
              border-color 0.35s ease;
          }

          .product-image {
            transition:
              transform 0.5s
                cubic-bezier(
                  0.165,
                  0.84,
                  0.44,
                  1
                );
          }

          .view-all-link {
            transition:
              color 0.2s ease;
          }

          .view-all-link:hover {
            color: #C22730 !important;
          }

          /* =====================================================
             TABLET
          ===================================================== */

          @media (min-width: 769px)
            and (max-width: 1100px) {

            .new-arrivals-container {
              padding:
                40px 18px !important;
            }

            .new-arrivals-grid {
              grid-template-columns:
                repeat(
                  3,
                  minmax(0, 1fr)
                ) !important;

              gap: 18px !important;
            }

            .product-image-wrapper {
              height:
                280px !important;
            }
          }

          /* =====================================================
             MOBILE
          ===================================================== */

          @media (max-width: 768px) {

            html,
            body {
              overflow-x: hidden;
            }

            .new-arrivals-container {
              width: 100% !important;

              max-width: 100% !important;

              margin: 0 !important;

              padding:
                20px 10px 25px !important;

              min-height: auto !important;

              overflow-x: hidden !important;
            }

            /* HEADER */

            .new-arrivals-header {
              width: 100% !important;

              display: flex !important;

              justify-content:
                space-between !important;

              align-items:
                center !important;

              gap: 10px !important;

              margin-bottom:
                18px !important;

              padding-bottom:
                10px !important;
            }

            .header-content {
              min-width: 0 !important;
            }

            .new-arrivals-tagline {
              display: block;

              font-size:
                7px !important;

              letter-spacing:
                2px !important;

              line-height:
                1.2 !important;
            }

            .new-arrivals-title {
              font-size:
                24px !important;

              line-height:
                1.1 !important;

              margin:
                4px 0 0 !important;
            }

            .new-arrivals-underline {
              width:
                30px !important;

              height:
                2px !important;

              margin-top:
                6px !important;
            }

            .view-all-link {
              flex-shrink: 0 !important;

              font-size:
                9px !important;

              letter-spacing:
                0.7px !important;

              white-space:
                nowrap !important;
            }

            /* GRID */

            .new-arrivals-grid {
              width: 100% !important;

              display: grid !important;

              grid-template-columns:
                repeat(
                  2,
                  minmax(0, 1fr)
                ) !important;

              gap:
                12px !important;

              margin: 0 !important;

              padding: 0 !important;
            }

            /* CARD */

            .product-card-wrapper {
              width: 100% !important;

              min-width: 0 !important;

              max-width: 100% !important;

              background:
                #FFFFFF !important;

              border:
                1px solid
                rgba(
                  75,
                  41,
                  84,
                  0.08
                ) !important;

              border-radius:
                7px !important;

              overflow:
                hidden !important;

              box-shadow:
                0 2px 8px
                rgba(
                  75,
                  41,
                  84,
                  0.06
                ) !important;

              margin: 0 !important;

              padding: 0 !important;

              display: flex !important;

              flex-direction:
                column !important;
            }

            /* LINK */

            .product-link {
              display: block !important;

              width: 100% !important;

              margin: 0 !important;

              padding: 0 !important;
            }

            /* CARD */

            .product-card {
              width: 100% !important;

              height: auto !important;

              margin: 0 !important;

              padding: 0 !important;

              border: none !important;

              border-radius:
                0 !important;

              box-shadow:
                none !important;

              transform: none !important;
            }

            /* IMAGE */

            .product-image-wrapper {
              position: relative !important;

              width: 100% !important;

              height:
                175px !important;

              margin: 0 !important;

              padding: 0 !important;

              overflow:
                hidden !important;

              background:
                #F3EBF5 !important;
            }

            .product-image {
              display: block !important;

              width: 100% !important;

              height: 100% !important;

              max-width: 100% !important;

              object-fit:
                cover !important;

              margin: 0 !important;

              padding: 0 !important;

              transform: none !important;
            }

            /* BADGES */

            .product-badges {
              top:
                6px !important;

              left:
                6px !important;

              gap:
                3px !important;
            }

            .product-badges span {
              font-size:
                6px !important;

              line-height:
                1 !important;

              padding:
                4px 5px !important;

              letter-spacing:
                0.6px !important;
            }

            /* HIDE DESKTOP */

            .desktop-actions {
              display:
                none !important;
            }

            /* PRODUCT INFO */

            .product-info {
              width: 100% !important;

              margin: 0 !important;

              padding:
                8px 8px 7px !important;

              background:
                #FFFFFF !important;
            }

            .product-category {
              margin:
                0 0 3px !important;

              padding: 0 !important;

              font-size:
                7px !important;

              line-height:
                1.2 !important;

              letter-spacing:
                0.9px !important;

              white-space:
                nowrap !important;

              overflow:
                hidden !important;

              text-overflow:
                ellipsis !important;
            }

            .product-name {
              width: 100% !important;

              margin:
                0 0 5px !important;

              padding: 0 !important;

              font-size:
                11px !important;

              line-height:
                1.25 !important;

              font-weight:
                600 !important;

              white-space:
                nowrap !important;

              overflow:
                hidden !important;

              text-overflow:
                ellipsis !important;
            }

            .price-row {
              width: 100% !important;

              display: flex !important;

              align-items:
                center !important;

              flex-wrap:
                nowrap !important;

              gap:
                5px !important;

              margin: 0 !important;

              padding: 0 !important;
            }

            .current-price {
              font-size:
                11px !important;

              line-height:
                1 !important;

              font-weight:
                700 !important;
            }

            .old-price {
              font-size:
                8.5px !important;

              line-height:
                1 !important;
            }

            /* MOBILE ACTIONS */

            .mobile-actions {
              display: flex !important;

              width: 100% !important;

              flex-shrink: 0 !important;

              gap:
                5px !important;

              margin: 0 !important;

              padding:
                0 7px 7px !important;

              background:
                #FFFFFF !important;

              border-radius:
                0 0 7px 7px !important;
            }

            .mobile-actions button {
              flex:
                1 1 0 !important;

              width:
                50% !important;

              min-width:
                0 !important;

              height:
                30px !important;

              min-height:
                30px !important;

              margin: 0 !important;

              padding:
                5px 3px !important;

              border-radius:
                3px !important;

              font-size:
                7px !important;

              line-height:
                1 !important;

              white-space:
                nowrap !important;

              overflow:
                hidden !important;

              text-overflow:
                ellipsis !important;

              -webkit-tap-highlight-color:
                transparent;

              touch-action:
                manipulation;
            }
          }

          /* =====================================================
             SMALL PHONES
             360px - 400px
          ===================================================== */

          @media (max-width: 400px) {

            .new-arrivals-container {
              padding:
                18px 7px 22px !important;
            }

            .new-arrivals-header {
              margin-bottom:
                15px !important;

              padding-bottom:
                8px !important;
            }

            .new-arrivals-tagline {
              font-size:
                6px !important;

              letter-spacing:
                1.6px !important;
            }

            .new-arrivals-title {
              font-size:
                21px !important;
            }

            .view-all-link {
              font-size:
                8px !important;
            }

            .new-arrivals-grid {
              gap:
                8px !important;
            }

            .product-image-wrapper {
              height:
                155px !important;
            }

            .product-info {
              padding:
                7px 6px 6px !important;
            }

            .product-category {
              font-size:
                6px !important;

              margin-bottom:
                2px !important;
            }

            .product-name {
              font-size:
                10px !important;

              margin-bottom:
                4px !important;
            }

            .current-price {
              font-size:
                10px !important;
            }

            .old-price {
              font-size:
                8px !important;
            }

            .mobile-actions {
              gap:
                4px !important;

              padding:
                0 5px 6px !important;
            }

            .mobile-actions button {
              height:
                28px !important;

              min-height:
                28px !important;

              font-size:
                6.5px !important;

              padding:
                4px 2px !important;
            }
          }

          /* =====================================================
             VERY SMALL PHONES
             320px - 359px
          ===================================================== */

          @media (max-width: 359px) {

            .new-arrivals-container {
              padding:
                16px 5px 20px !important;
            }

            .new-arrivals-grid {
              gap:
                6px !important;
            }

            .new-arrivals-title {
              font-size:
                20px !important;
            }

            .new-arrivals-tagline {
              font-size:
                5.5px !important;

              letter-spacing:
                1.3px !important;
            }

            .view-all-link {
              font-size:
                7px !important;
            }

            .product-image-wrapper {
              height:
                145px !important;
            }

            .product-info {
              padding:
                6px 5px !important;
            }

            .product-category {
              font-size:
                5.5px !important;
            }

            .product-name {
              font-size:
                9px !important;

              margin-bottom:
                4px !important;
            }

            .current-price {
              font-size:
                9px !important;
            }

            .old-price {
              font-size:
                7px !important;
            }

            .mobile-actions {
              gap:
                3px !important;

              padding:
                0 4px 5px !important;
            }

            .mobile-actions button {
              height:
                27px !important;

              min-height:
                27px !important;

              font-size:
                6px !important;

              padding:
                4px 1px !important;
            }
          }
        `}
      </style>
    </section>
  );
};

// ============================================================
// STYLES
// ============================================================

const styles = {
  // ============================================================
  // CONTAINER
  // ============================================================

  container: {
    width: "100%",
    maxWidth: "1300px",

    margin: "0 auto",

    padding: "50px 20px",

    fontFamily:
      '"Montserrat", sans-serif',

    backgroundColor: "#FAF5FC",

    boxSizing: "border-box",

    minHeight: "auto",

    overflowX: "hidden",
  },

  // ============================================================
  // HEADER
  // ============================================================

  header: {
    width: "100%",

    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "flex-end",

    gap: "20px",

    marginBottom: "35px",

    borderBottom:
      "1px solid rgba(212, 175, 55, 0.25)",

    paddingBottom: "15px",

    boxSizing: "border-box",
  },

  tagline: {
    display: "block",

    color: "#D4AF37",

    fontSize: "10px",

    fontWeight: "600",

    letterSpacing: "4px",

    lineHeight: "1.2",
  },

  title: {
    fontSize:
      "clamp(1.8rem, 3vw, 2.4rem)",

    margin: "6px 0 0",

    fontFamily:
      '"Playfair Display", serif',

    color: "#4B2954",

    fontWeight: "700",

    lineHeight: "1.15",
  },

  underline: {
    width: "40px",

    height: "2px",

    backgroundColor: "#D4AF37",

    marginTop: "8px",
  },

  viewAll: {
    flexShrink: 0,

    color: "#4B2954",

    textDecoration: "none",

    fontSize: "12px",

    fontWeight: "600",

    letterSpacing: "1px",

    textTransform: "uppercase",

    whiteSpace: "nowrap",
  },

  // ============================================================
  // GRID
  // ============================================================

  grid: {
    width: "100%",

    display: "grid",

    gridTemplateColumns:
      "repeat(auto-fit, minmax(240px, 1fr))",

    gap: "24px",

    boxSizing: "border-box",
  },

  // ============================================================
  // PRODUCT WRAPPER
  // ============================================================

  productCardWrapper: {
    minWidth: 0,

    width: "100%",

    boxSizing: "border-box",
  },

  // ============================================================
  // PRODUCT LINK
  // ============================================================

  productLink: {
    textDecoration: "none",

    color: "inherit",

    display: "block",

    width: "100%",

    minWidth: 0,
  },

  // ============================================================
  // PRODUCT CARD
  // ============================================================

  productCard: {
    width: "100%",

    backgroundColor: "#FFFFFF",

    borderRadius: "8px",

    overflow: "hidden",

    border:
      "1px solid rgba(75, 41, 84, 0.08)",

    boxShadow:
      "0 4px 15px rgba(75, 41, 84, 0.04)",

    boxSizing: "border-box",
  },

  // ============================================================
  // IMAGE
  // ============================================================

  imageWrapper: {
    position: "relative",

    width: "100%",

    height: "320px",

    overflow: "hidden",

    backgroundColor: "#F3EBF5",

    boxSizing: "border-box",
  },

  image: {
    width: "100%",

    height: "100%",

    objectFit: "cover",

    display: "block",

    margin: 0,

    padding: 0,
  },

  // ============================================================
  // BADGES
  // ============================================================

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

    lineHeight: "1",
  },

  badgeDiscount: {
    backgroundColor: "#C22730",

    color: "#FFFFFF",

    fontSize: "8px",

    padding: "3px 7px",

    borderRadius: "3px",

    fontWeight: "600",

    letterSpacing: "1px",

    lineHeight: "1",
  },

  // ============================================================
  // DESKTOP ACTION OVERLAY
  // ============================================================

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

    boxSizing: "border-box",
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

    lineHeight: "1",
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

    lineHeight: "1",
  },

  // ============================================================
  // PRODUCT INFO
  // ============================================================

  info: {
    width: "100%",

    padding: "16px 14px",

    boxSizing: "border-box",
  },

  category: {
    color: "#8E7394",

    fontSize: "9px",

    margin: "0 0 4px",

    padding: 0,

    letterSpacing: "1.5px",

    textTransform: "uppercase",

    fontWeight: "500",

    lineHeight: "1.2",
  },

  productName: {
    width: "100%",

    fontSize: "13px",

    margin: "0 0 8px",

    padding: 0,

    color: "#4B2954",

    lineHeight: "1.3",

    fontWeight: "600",

    whiteSpace: "nowrap",

    overflow: "hidden",

    textOverflow: "ellipsis",
  },

  // ============================================================
  // PRICE
  // ============================================================

  priceRow: {
    display: "flex",

    alignItems: "center",

    gap: "6px",

    margin: 0,

    padding: 0,

    lineHeight: "1",
  },

  currentPrice: {
    fontSize: "13px",

    fontWeight: "700",

    color: "#C22730",

    lineHeight: "1",
  },

  oldPrice: {
    fontSize: "10.5px",

    color: "#9E8C9E",

    textDecoration: "line-through",

    lineHeight: "1",
  },

  // ============================================================
  // MOBILE ACTIONS
  // ============================================================

  mobileActionRow: {
    display: "none",
  },

  mobileQuickView: {
    flex: 1,

    minWidth: 0,

    padding: "6px 3px",

    border:
      "1px solid rgba(75, 41, 84, 0.15)",

    borderRadius: "3px",

    backgroundColor: "#FAF5FC",

    color: "#4B2954",

    cursor: "pointer",

    fontSize: "8px",

    lineHeight: "1",

    fontWeight: "600",

    textTransform: "uppercase",
  },

  mobileAddToCart: {
    flex: 1,

    minWidth: 0,

    padding: "6px 3px",

    border: "none",

    borderRadius: "3px",

    backgroundColor: "#D4AF37",

    color: "#222222",

    cursor: "pointer",

    fontSize: "8px",

    lineHeight: "1",

    fontWeight: "700",

    textTransform: "uppercase",
  },
};

export default NewArrivals;
