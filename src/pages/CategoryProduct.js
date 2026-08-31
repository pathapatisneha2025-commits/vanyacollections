import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL =
  'https://vanyabackenddatabase-vahr.onrender.com/products/all';

const FALLBACK_IMAGE =
  'https://via.placeholder.com/500x600?text=No+Image';

const CategoryProducts = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ============================================================
  // SELECTED CATEGORY
  // ============================================================

  const selectedCategory = decodeURIComponent(
    category || ''
  ).trim();

  // ============================================================
  // FETCH PRODUCTS
  // ============================================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch products: ${response.status}`
          );
        }

        const data = await response.json();

        console.log('ALL PRODUCTS:', data);

        setProducts(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        console.error(
          'CATEGORY PRODUCTS ERROR:',
          error
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ============================================================
  // FILTER CATEGORY
  // ============================================================

  const categoryProducts = useMemo(() => {
    const normalizedCategory =
      selectedCategory.toLowerCase();

    return products.filter((product) => {
      const productCategory =
        String(product.category || '')
          .trim()
          .toLowerCase();

      return (
        productCategory === normalizedCategory
      );
    });
  }, [products, selectedCategory]);

  // ============================================================
  // GET PRODUCT IMAGE
  // ============================================================

  const getProductImage = (product) => {
    // ----------------------------------------------------------
    // 1. MAIN PRODUCT IMAGE
    // API FIELD = img_url
    // ----------------------------------------------------------

    if (
      typeof product.img_url === 'string' &&
      product.img_url.startsWith('http')
    ) {
      return product.img_url;
    }

    // ----------------------------------------------------------
    // 2. OLD / ALTERNATIVE IMAGE FIELDS
    // ----------------------------------------------------------

    const directImageFields = [
      product.mainImage,
      product.main_image,
      product.image,
      product.imageUrl,
      product.image_url,
    ];

    const directImage = directImageFields.find(
      (image) =>
        typeof image === 'string' &&
        image.startsWith('http')
    );

    if (directImage) {
      return directImage;
    }

    // ----------------------------------------------------------
    // 3. PRODUCT THUMBNAILS
    // ----------------------------------------------------------

    if (
      Array.isArray(product.thumbnails) &&
      product.thumbnails.length > 0
    ) {
      const thumbnail =
        product.thumbnails.find(
          (image) =>
            typeof image === 'string' &&
            image.startsWith('http')
        );

      if (thumbnail) {
        return thumbnail;
      }
    }

    // ----------------------------------------------------------
    // 4. VARIANT MAIN IMAGE
    // ----------------------------------------------------------

    if (
      Array.isArray(product.variants)
    ) {
      for (const variant of product.variants) {
        if (
          typeof variant?.mainImage === 'string' &&
          variant.mainImage.startsWith('http')
        ) {
          return variant.mainImage;
        }

        if (
          typeof variant?.existingMainImage === 'string' &&
          variant.existingMainImage.startsWith('http')
        ) {
          return variant.existingMainImage;
        }
      }
    }

    // ----------------------------------------------------------
    // 5. VARIANT THUMBNAILS
    // ----------------------------------------------------------

    if (
      Array.isArray(product.variants)
    ) {
      for (const variant of product.variants) {
        if (
          Array.isArray(variant?.thumbnails)
        ) {
          const variantThumbnail =
            variant.thumbnails.find(
              (image) =>
                typeof image === 'string' &&
                image.startsWith('http')
            );

          if (variantThumbnail) {
            return variantThumbnail;
          }
        }

        if (
          Array.isArray(
            variant?.existingThumbnails
          )
        ) {
          const existingThumbnail =
            variant.existingThumbnails.find(
              (image) =>
                typeof image === 'string' &&
                image.startsWith('http')
            );

          if (existingThumbnail) {
            return existingThumbnail;
          }
        }
      }
    }

    // ----------------------------------------------------------
    // 6. FALLBACK
    // ----------------------------------------------------------

    return FALLBACK_IMAGE;
  };

  // ============================================================
  // PRODUCT CLICK
  // ============================================================

  const handleProductClick = (product) => {
    if (product.id) {
      navigate(`/product/${product.id}`);
    }
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.loading}>
          Loading products...
        </div>
      </div>
    );
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <div style={styles.page}>

      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <div style={styles.header}>

        <button
          onClick={() => navigate(-1)}
          style={styles.backButton}
        >
          ← Back
        </button>

        <p style={styles.smallTitle}>
          ✦ COLLECTION ✦
        </p>

        <h1 style={styles.title}>
          {selectedCategory}
        </h1>

        <div style={styles.underline}></div>

        <p style={styles.description}>
          Explore our beautiful collection of{' '}
          {selectedCategory.toLowerCase()}.
        </p>

      </div>

      {/* ====================================================== */}
      {/* PRODUCT COUNT */}
      {/* ====================================================== */}

      <div style={styles.resultBar}>
        <span>
          {categoryProducts.length}{' '}
          {categoryProducts.length === 1
            ? 'Product'
            : 'Products'}
        </span>
      </div>

      {/* ====================================================== */}
      {/* PRODUCTS */}
      {/* ====================================================== */}

      {categoryProducts.length === 0 ? (

        <div style={styles.empty}>

          <div style={styles.emptyIcon}>
            🛍️
          </div>

          <h2>
            No Products Found
          </h2>

          <p>
            There are currently no products in{' '}
            {selectedCategory}.
          </p>

          <button
            onClick={() => navigate('/')}
            style={styles.shopButton}
          >
            Continue Shopping
          </button>

        </div>

      ) : (

        <div
          style={styles.productGrid}
          className="category-product-grid"
        >

          {categoryProducts.map(
            (product, index) => {

              const image =
                getProductImage(product);

              const price =
                product.price ?? 0;

              const oldPrice =
                product.oldPrice ??
                product.old_price;

              const discount =
                product.discount ?? 0;

              return (

                <div
                  key={
                    product.id ||
                    `${product.name}-${index}`
                  }
                  style={styles.productCard}
                  className="product-card"
                  onClick={() =>
                    handleProductClick(product)
                  }
                >

                  {/* IMAGE */}

                  <div
                    style={
                      styles.productImageWrapper
                    }
                  >

                    <img
                      src={image}
                      alt={
                        product.name ||
                        selectedCategory
                      }
                      style={
                        styles.productImage
                      }
                      loading="lazy"
                      onError={(e) => {
                        console.warn(
                          'IMAGE FAILED:',
                          image
                        );

                        e.currentTarget.onerror =
                          null;

                        e.currentTarget.src =
                          FALLBACK_IMAGE;
                      }}
                    />

                    {/* DISCOUNT */}

                    {Number(discount) > 0 && (
                      <span
                        style={styles.discount}
                      >
                        {discount}% OFF
                      </span>
                    )}

                  </div>

                  {/* DETAILS */}

                  <div
                    style={styles.productInfo}
                  >

                    <p
                      style={
                        styles.productCategory
                      }
                    >
                      {product.category}
                    </p>

                    <h3
                      style={styles.productName}
                    >
                      {product.name ||
                        'Beautiful Collection'}
                    </h3>

                    <div
                      style={styles.priceRow}
                    >

                      <span
                        style={styles.price}
                      >
                        ₹
                        {Number(
                          price
                        ).toLocaleString(
                          'en-IN'
                        )}
                      </span>

                      {oldPrice &&
                        Number(oldPrice) >
                          Number(price) && (
                          <span
                            style={
                              styles.oldPrice
                            }
                          >
                            ₹
                            {Number(
                              oldPrice
                            ).toLocaleString(
                              'en-IN'
                            )}
                          </span>
                        )}

                    </div>

                    {/* COLOUR */}

                    {product.colour && (
                      <p
                        style={
                          styles.colour
                        }
                      >
                        Colour:{' '}
                        {product.colour}
                      </p>
                    )}

                    {/* VARIANT COLOUR */}

                    {!product.colour &&
                      Array.isArray(
                        product.variants
                      ) &&
                      product.variants[0]
                        ?.colour && (
                        <p
                          style={
                            styles.colour
                          }
                        >
                          Colour:{' '}
                          {
                            product
                              .variants[0]
                              .colour
                          }
                        </p>
                      )}

                  </div>

                </div>
              );
            }
          )}

        </div>
      )}

      {/* ====================================================== */}
      {/* CSS */}
      {/* ====================================================== */}

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

          .product-card {
            transition:
              transform 0.3s ease,
              box-shadow 0.3s ease;
          }

          .product-card:hover {
            transform: translateY(-6px);
            box-shadow:
              0 15px 35px rgba(53, 19, 61, 0.18);
          }

          .product-card:hover img {
            transform: scale(1.05);
          }

          .product-card img {
            transition:
              transform 0.5s ease;
          }

          @media (max-width: 1000px) {
            .category-product-grid {
              grid-template-columns:
                repeat(3, minmax(0, 1fr)) !important;
            }
          }

          @media (max-width: 768px) {
            .category-product-grid {
              grid-template-columns:
                repeat(2, minmax(0, 1fr)) !important;
              gap: 15px !important;
              padding-left: 12px !important;
              padding-right: 12px !important;
            }

            .category-back-button {
              position: static !important;
              margin-bottom: 15px !important;
            }
          }

          @media (max-width: 480px) {
            .category-product-grid {
              gap: 10px !important;
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

  page: {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at 50% 0%, #fcf8fd 0%, #f4eaf6 55%, #ebdcf0 100%)',
    paddingBottom: '70px',
    boxSizing: 'border-box',
  },

  header: {
    textAlign: 'center',
    padding: '35px 20px 20px',
    position: 'relative',
  },

  backButton: {
    position: 'absolute',
    left: '25px',
    top: '30px',
    border: '1px solid #e2bc53',
    background: '#35133d',
    color: '#f5d470',
    borderRadius: '20px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontFamily: '"Montserrat", sans-serif',
    fontSize: '12px',
  },

  smallTitle: {
    fontFamily: '"Montserrat", sans-serif',
    color: '#bfa136',
    fontSize: '11px',
    letterSpacing: '3px',
    fontWeight: '600',
    margin: '10px 0',
  },

  title: {
    fontFamily: '"Playfair Display", serif',
    color: '#35133d',
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    margin: '0',
    fontWeight: '700',
  },

  underline: {
    width: '70px',
    height: '2px',
    background:
      'linear-gradient(90deg, transparent, #e2bc53, transparent)',
    margin: '15px auto',
  },

  description: {
    fontFamily: '"Montserrat", sans-serif',
    color: '#6c5073',
    fontSize: '14px',
    margin: '0 auto',
    maxWidth: '550px',
    lineHeight: '1.6',
  },

  resultBar: {
    maxWidth: '1200px',
    margin: '20px auto',
    padding: '0 20px',
    fontFamily: '"Montserrat", sans-serif',
    color: '#6c5073',
    fontSize: '13px',
  },

  productGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '10px 20px 50px',
    display: 'grid',
    gridTemplateColumns:
      'repeat(4, minmax(0, 1fr))',
    gap: '25px',
    boxSizing: 'border-box',
  },

  productCard: {
    background: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow:
      '0 6px 20px rgba(53, 19, 61, 0.08)',
    border:
      '1px solid rgba(226, 188, 83, 0.25)',
  },

  productImageWrapper: {
    position: 'relative',
    width: '100%',
    aspectRatio: '3 / 4',
    overflow: 'hidden',
    background: '#f5edf6',
  },

  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },

  discount: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    background: '#35133d',
    color: '#f5d470',
    padding: '6px 9px',
    borderRadius: '4px',
    fontFamily: '"Montserrat", sans-serif',
    fontSize: '10px',
    fontWeight: '600',
  },

  productInfo: {
    padding: '15px',
  },

  productCategory: {
    fontFamily: '"Montserrat", sans-serif',
    color: '#bfa136',
    fontSize: '9px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    margin: '0 0 5px',
  },

  productName: {
    fontFamily: '"Playfair Display", serif',
    color: '#35133d',
    fontSize: '17px',
    margin: '0 0 10px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  priceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },

  price: {
    fontFamily: '"Montserrat", sans-serif',
    color: '#35133d',
    fontSize: '15px',
    fontWeight: '600',
  },

  oldPrice: {
    fontFamily: '"Montserrat", sans-serif',
    color: '#999',
    fontSize: '12px',
    textDecoration: 'line-through',
  },

  colour: {
    fontFamily: '"Montserrat", sans-serif',
    color: '#777',
    fontSize: '10px',
    margin: '8px 0 0',
  },

  empty: {
    textAlign: 'center',
    padding: '80px 20px',
    fontFamily: '"Montserrat", sans-serif',
    color: '#6c5073',
  },

  emptyIcon: {
    fontSize: '45px',
    marginBottom: '15px',
  },

  shopButton: {
    marginTop: '15px',
    background: '#35133d',
    color: '#f5d470',
    border: '1px solid #e2bc53',
    borderRadius: '25px',
    padding: '12px 25px',
    cursor: 'pointer',
    fontFamily: '"Montserrat", sans-serif',
    fontWeight: '600',
  },

  loading: {
    minHeight: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: '"Montserrat", sans-serif',
    color: '#6c5073',
  },
};

export default CategoryProducts;