import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL =
  'https://vanyabackenddatabase-vahr.onrender.com/products/all';

const VanyaCollections = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  // ============================================================
  // CATEGORY IMAGES
  // ============================================================

  const categoryImages = {
    'SILK SAREES': '/silksaree.jpg',

    'HANDLOOM SAREES':
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=500',

    'COTTON SAREES':
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=500',

    'PATTU SAREES': '/festivalsaree.jpg',

    'DESIGNER SAREES':
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=500',

    'DESIGNERSAREES':
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=500',

    'DRESSES':
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=500',

    'DRESS MATERIALS':
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=500',

    'READYMAD BLOUSES':
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=500',

    'READYMADE BLOUSES':
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=500',

    'DAMAGE SAREES':
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=500',

    'WORK SAREES':
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=500',

    'BUDGET FRIENDLY SAREES':
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=500',

    'WEAVING MISTAKE SAREES':
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=500',
  };

  const DEFAULT_CATEGORY_IMAGE =
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=500';

  // ============================================================
  // FETCH PRODUCTS
  // ============================================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('PRODUCT FETCH ERROR:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ============================================================
  // GET UNIQUE API CATEGORIES
  // ============================================================

  const getCategories = () => {
    const categoryMap = new Map();

    products.forEach((product) => {
      const category = String(product.category || '').trim();

      if (!category) return;

      const normalized = category.toLowerCase();

      if (!categoryMap.has(normalized)) {
        categoryMap.set(normalized, category);
      }
    });

    return Array.from(categoryMap.values());
  };

  const categories = getCategories();

  // ============================================================
  // CATEGORY COUNT
  // ============================================================

  const getCategoryCount = (category) => {
    return products.filter((product) => {
      const productCategory = String(product.category || '')
        .trim()
        .toLowerCase();

      return (
        productCategory === category.trim().toLowerCase()
      );
    }).length;
  };

  // ============================================================
  // CATEGORY IMAGE
  // ============================================================

  const getCategoryImage = (category) => {
    const normalized = category.trim().toUpperCase();

    return (
      categoryImages[normalized] ||
      DEFAULT_CATEGORY_IMAGE
    );
  };

  // ============================================================
  // CLICK CATEGORY
  // ============================================================

  const handleCategoryClick = (category) => {
    navigate(
      `/category/${encodeURIComponent(category)}`
    );
  };

  // ============================================================
  // CAROUSEL
  // ============================================================

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const {
      scrollLeft,
      scrollWidth,
      clientWidth,
    } = scrollContainerRef.current;

    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll > 0) {
      const percentage =
        scrollLeft / maxScroll;

      const newIndex = Math.min(
        2,
        Math.floor(percentage * 3)
      );

      setActiveIndex(newIndex);
    }
  };

  const scrollLeft = () => {
    if (!scrollContainerRef.current) return;

    scrollContainerRef.current.scrollBy({
      left: -250,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    if (!scrollContainerRef.current) return;

    scrollContainerRef.current.scrollBy({
      left: 250,
      behavior: 'smooth',
    });
  };

  const scrollToDot = (index) => {
    if (!scrollContainerRef.current) return;

    const {
      scrollWidth,
      clientWidth,
    } = scrollContainerRef.current;

    const maxScroll =
      scrollWidth - clientWidth;

    const targetScroll =
      (maxScroll / 2) * index;

    scrollContainerRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });

    setActiveIndex(index);
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <p style={styles.subHeader}>
            ✦ BROWSE BY CATEGORY ✦
          </p>

          <h1 style={styles.mainTitle}>
            Our Exquisite Collections
          </h1>

          <div style={styles.underline}></div>

          <p style={styles.headerDesc}>
            Loading our collections...
          </p>
        </header>
      </div>
    );
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <div style={styles.container}>

      {/* HEADER */}

      <header style={styles.header}>
        <p style={styles.subHeader}>
          ✦ BROWSE BY CATEGORY ✦
        </p>

        <h1 style={styles.mainTitle}>
          Our Exquisite Collections
        </h1>

        <div style={styles.underline}></div>

        <p style={styles.headerDesc}>
          Immerse yourself in our royal handloom
          masterpieces tailored for elegance.
        </p>
      </header>

      {/* NO CATEGORIES */}

      {categories.length === 0 ? (
        <div style={styles.noCategories}>
          No categories available.
        </div>
      ) : (

        <div style={styles.carouselWrapperOuter}>

          <div style={styles.carouselWrapper}>

            {/* LEFT */}

            <button
              style={styles.navButtonLeft}
              onClick={scrollLeft}
              aria-label="Scroll Left"
            >
              ‹
            </button>

            {/* CAROUSEL */}

            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              style={styles.carouselTrack}
              className="carousel-track"
            >

              {categories.map((category, index) => {

                const count =
                  getCategoryCount(category);

                const image =
                  getCategoryImage(category);

                return (
                  <div
                    key={`${category}-${index}`}
                    style={styles.card}
                    className="collection-card"
                    onClick={() =>
                      handleCategoryClick(category)
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (
                        e.key === 'Enter' ||
                        e.key === ' '
                      ) {
                        handleCategoryClick(category);
                      }
                    }}
                  >

                    {/* RING */}

                    <div style={styles.ringGlow}></div>

                    {/* IMAGE */}

                    <div style={styles.imageWrapper}>

                      <img
                        src={image}
                        alt={category}
                        style={styles.image}
                        className="card-image"
                        onError={(e) => {
                          e.currentTarget.src =
                            DEFAULT_CATEGORY_IMAGE;
                        }}
                      />

                    </div>

                    {/* CONTENT */}

                    <div style={styles.cardContent}>

                      <div style={styles.contentBanner}>

                        <h3 style={styles.cardTitle}>
                          {category}
                        </h3>

                        <p style={styles.cardSub}>
                          {count}{' '}
                          {count === 1
                            ? 'DESIGN'
                            : 'DESIGNS'}
                        </p>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

            {/* RIGHT */}

            <button
              style={styles.navButtonRight}
              onClick={scrollRight}
              aria-label="Scroll Right"
            >
              ›
            </button>

          </div>

          {/* DOTS */}

          <div style={styles.dotsContainer}>

            {[0, 1, 2].map((dotIndex) => (

              <button
                key={dotIndex}
                onClick={() =>
                  scrollToDot(dotIndex)
                }
                style={{
                  ...styles.dot,
                  ...(activeIndex === dotIndex
                    ? styles.activeDot
                    : {}),
                }}
                aria-label={`Go to slide ${
                  dotIndex + 1
                }`}
              />

            ))}

          </div>

        </div>
      )}

      {/* CSS */}

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

          .collection-card {
            transition:
              transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1),
              box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

            flex-shrink: 0;
            cursor: pointer;
          }

          .collection-card:hover {
            transform: translateY(-8px) scale(1.02);

            box-shadow:
              0 20px 40px rgba(53, 19, 61, 0.3),
              0 0 30px rgba(226, 188, 83, 0.4) !important;
          }

          .collection-card:hover .card-image {
            transform: scale(1.12);
          }

          .card-image {
            transition:
              transform 0.6s cubic-bezier(
                0.165,
                0.84,
                0.44,
                1
              );
          }

          .carousel-track::-webkit-scrollbar {
            display: none;
          }

          .carousel-track {
            -ms-overflow-style: none;
            scrollbar-width: none;
            scroll-snap-type: x mandatory;
          }

          .collection-card {
            scroll-snap-align: start;
          }

          @media (max-width: 768px) {
            .collection-card {
              width: 155px !important;
              height: 155px !important;
            }

            .carousel-wrapper {
              padding-left: 25px !important;
              padding-right: 25px !important;
            }
          }

          @media (max-width: 380px) {
            .collection-card {
              width: 140px !important;
              height: 140px !important;
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
    fontFamily: '"Playfair Display", serif',
    background:
      'radial-gradient(circle at 50% 0%, #fcf8fd 0%, #f4eaf6 55%, #ebdcf0 100%)',
    minHeight: '100vh',
    paddingBottom: '60px',
    width: '100%',
    boxSizing: 'border-box',
    overflowX: 'hidden',
  },

  header: {
    textAlign: 'center',
    padding: '50px 20px 25px',
    boxSizing: 'border-box',
  },

  subHeader: {
    fontFamily: '"Montserrat", sans-serif',
    color: '#bfa136',
    fontSize: '11px',
    letterSpacing: '3px',
    marginBottom: '10px',
    fontWeight: '600',
  },

  mainTitle: {
    fontSize: 'clamp(2rem, 5vw, 3.2rem)',
    color: '#35133d',
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

  headerDesc: {
    fontFamily: '"Montserrat", sans-serif',
    color: '#6c5073',
    fontSize: 'clamp(14px, 2vw, 15px)',
    maxWidth: '500px',
    margin: '0 auto',
    letterSpacing: '0.4px',
    lineHeight: '1.5',
  },

  carouselWrapperOuter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
  },

  carouselWrapper: {
    position: 'relative',
    width: '100%',
    padding: '20px 40px 10px',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
  },

  carouselTrack: {
    display: 'flex',
    flexDirection: 'row',
    gap: '28px',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    width: '100%',
    padding: '12px 10px',
  },

  navButtonLeft: {
    position: 'absolute',
    left: '5px',
    zIndex: 10,
    backgroundColor: '#35133d',
    color: '#f5d470',
    border: '1.5px solid #e2bc53',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    fontSize: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow:
      '0 4px 10px rgba(53, 19, 61, 0.2)',
  },

  navButtonRight: {
    position: 'absolute',
    right: '5px',
    zIndex: 10,
    backgroundColor: '#35133d',
    color: '#f5d470',
    border: '1.5px solid #e2bc53',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    fontSize: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow:
      '0 4px 10px rgba(53, 19, 61, 0.2)',
  },

  dotsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    marginTop: '15px',
    marginBottom: '20px',
  },

  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#d8c4df',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
  },

  activeDot: {
    width: '24px',
    borderRadius: '4px',
    backgroundColor: '#35133d',
    boxShadow:
      '0 0 8px rgba(226, 188, 83, 0.6)',
  },

  card: {
    position: 'relative',
    borderRadius: '50%',
    overflow: 'hidden',
    width: '185px',
    height: '185px',
    border: '3px solid #e8cc68',
    boxShadow:
      '0 12px 30px rgba(53, 19, 61, 0.2), inset 0 0 10px rgba(226, 188, 83, 0.4)',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  ringGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '50%',
    border:
      '1px solid rgba(255, 255, 255, 0.6)',
    pointerEvents: 'none',
    zIndex: 3,
  },

  imageWrapper: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },

  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '52%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: '16px',
    background:
      'linear-gradient(to top, rgba(35, 12, 40, 0.95) 30%, rgba(35, 12, 40, 0.7) 80%, transparent 100%)',
    zIndex: 2,
    boxSizing: 'border-box',
  },

  contentBanner: {
    backgroundColor:
      'rgba(35, 12, 40, 0.85)',
    border:
      '1px solid rgba(226, 188, 83, 0.5)',
    borderRadius: '16px',
    padding: '4px 12px',
    textAlign: 'center',
    width: '82%',
    boxSizing: 'border-box',
    boxShadow:
      '0 4px 10px rgba(0,0,0,0.3)',
  },

  cardTitle: {
    margin: 0,
    fontSize: '10px',
    color: '#f5d470',
    fontWeight: '700',
    letterSpacing: '0.8px',
    lineHeight: '1.2',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  cardSub: {
    fontFamily: '"Montserrat", sans-serif',
    margin: '2px 0 0',
    fontSize: '8px',
    color: 'rgba(253, 248, 242, 0.9)',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    fontWeight: '500',
  },

  noCategories: {
    textAlign: 'center',
    padding: '40px 20px',
    fontFamily: '"Montserrat", sans-serif',
    color: '#6c5073',
    fontSize: '14px',
  },
};

export default VanyaCollections;