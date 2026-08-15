import React, { useState, useEffect } from 'react';

const CollectionsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSubCategory, setActiveSubCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://vanyabackenddatabase-vahr.onrender.com/products/all');
        const data = await res.json();

        const mappedProducts = data.map(item => ({
          id: item.id,
          name: item.name,
          category: item.category,
          subCategory: item.sub_category,
          price: `₹${Number(item.price).toLocaleString()}`,
          originalPrice: `₹${Number(item.old_price).toLocaleString()}`,
          discount: `-${item.discount}%`,
          rating: 4 + Math.random(),
          reviews: Math.floor(Math.random() * 100) + 10,
          tag: Number(item.discount) > 20 ? 'BESTSELLER' : 'NEW',
          image: item.img_url || item.thumbnails[0]
        }));

        setProducts(mappedProducts);
        const uniqueCategories = [...new Set(data.map(p => p.category))];
        setCategories(['All', ...uniqueCategories]);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Update subcategories when a category is selected
  useEffect(() => {
    if (activeCategory === 'All') {
      setSubCategories([]);
      setActiveSubCategory('All');
    } else {
      const subs = products
        .filter(p => p.category === activeCategory)
        .map(p => p.subCategory)
        .filter(Boolean);
      setSubCategories(['All', ...[...new Set(subs)]]);
      setActiveSubCategory('All');
    }
  }, [activeCategory, products]);

  // Filter products by category & subcategory
  const filteredProducts = products.filter(p =>
    (activeCategory === 'All' || p.category === activeCategory) &&
    (activeSubCategory === 'All' || p.subCategory === activeSubCategory)
  );

  // Collections summary
  const collectionsSummary = categories
    .filter(cat => cat !== 'All')
    .map((cat, idx) => {
      const firstProduct = products.find(p => p.category === cat);
      return {
        id: idx + 1,
        category: cat,
        title: cat,
        count: `${products.filter(p => p.category === cat).length} DESIGNS`,
        description: `Explore our ${cat.toLowerCase()} collection.`,
        image: firstProduct ? firstProduct.image : 'https://via.placeholder.com/400',
        btnText: `Explore ${cat}`
      };
    });

  return (
    <div className="vanya-wrapper">
      <style>{`
        :root { 
          --primary-purple: #633878; 
          --accent-gold: #fbd349; 
          --purple-hover: #74418c;
          --bg-light: #f8f4fa; 
          --text-gray: #666; 
          --border: #e6d8ed;
        }

        * { box-sizing: border-box; }
        .vanya-wrapper { font-family: 'Playfair Display', serif; color: #2c2c2c; background-color: var(--bg-light); min-height: 100vh; }
        
        header { 
          background: var(--primary-purple); 
          color: var(--accent-gold); 
          text-align: center; 
          padding: 60px 20px; 
          background-image: radial-gradient(circle, #74418c 1px, transparent 1px);
          background-size: 20px 20px;
          box-shadow: inset 0 -10px 20px rgba(0,0,0,0.15);
        }
        
        .subtitle { font-size: 0.8rem; letter-spacing: 2.5px; font-weight: 600; color: var(--accent-gold); margin-bottom: 5px; }
        .main-title { font-size: 2.8rem; color: var(--accent-gold); margin: 10px 0; font-weight: 700; letter-spacing: 1px; }

        .filter-tabs { 
          display: flex; 
          justify-content: center; 
          gap: 10px; 
          padding: 15px 20px; 
          background: white; 
          position: sticky; 
          top: 0; 
          z-index: 100; 
          border-bottom: 1px solid var(--border); 
          box-shadow: 0 4px 15px rgba(99, 56, 120, 0.06);
          flex-wrap: wrap;
        }
        
        .tab-btn { 
          padding: 8px 18px; 
          border-radius: 4px; 
          border: 1px solid var(--border); 
          background: #fdfafd; 
          color: var(--primary-purple);
          cursor: pointer; 
          transition: 0.3s; 
          font-weight: 600;
          font-size: 0.9rem;
        }
        .tab-btn:hover { border-color: var(--primary-purple); }
        .tab-btn.active { background: var(--primary-purple); color: var(--accent-gold); border-color: var(--primary-purple); }

        .summary-list { max-width: 1100px; margin: 40px auto; padding: 0 20px; }
        
        .summary-card { 
          display: flex; 
          align-items: center; 
          background: white; 
          border-radius: 8px; 
          overflow: hidden; 
          margin-bottom: 40px; 
          border: 1px solid var(--border);
          box-shadow: 0 6px 20px rgba(99, 56, 120, 0.08);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .summary-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(99, 56, 120, 0.15);
        }
        .summary-card.reverse { flex-direction: row-reverse; }
        .card-img { flex: 1.2; height: 400px; background: #f5eef7; }
        .card-img img { width: 100%; height: 100%; object-fit: cover; }
        .card-info { flex: 1; padding: 40px; }
        
        .explore-btn { 
          background: var(--primary-purple); 
          color: var(--accent-gold); 
          border: none; 
          padding: 12px 24px; 
          border-radius: 4px; 
          cursor: pointer; 
          display: flex; 
          align-items: center; 
          gap: 10px; 
          font-weight: 700;
          font-size: 0.9rem;
          transition: background 0.2s;
        }
        .explore-btn:hover { background: var(--purple-hover); }

        .product-grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
          gap: 30px; 
          max-width: 1200px; 
          margin: 40px auto; 
          padding: 20px; 
          background: linear-gradient(135deg, #f8f4fa 0%, #f3ebf6 100%);
        }
        
        .product-card { 
          background: white; 
          border-radius: 8px; 
          overflow: hidden; 
          position: relative; 
          border: 1px solid var(--border);
          box-shadow: 0 6px 20px rgba(99, 56, 120, 0.08);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(99, 56, 120, 0.16);
          border-color: #d1b8dc;
        }

        .badge { 
          position: absolute; 
          top: 12px; 
          left: 12px; 
          background: var(--primary-purple); 
          color: var(--accent-gold); 
          font-size: 0.65rem; 
          font-weight: bold; 
          padding: 5px 12px; 
          border-radius: 3px; 
          z-index: 2; 
          letter-spacing: 1px;
          border: 1px solid rgba(251, 211, 73, 0.3);
        }
        
        .discount-tag { 
          position: absolute; 
          top: 44px; 
          left: 12px; 
          background: #d9534f; 
          color: white; 
          padding: 2px 8px; 
          border-radius: 3px; 
          font-size: 0.7rem; 
          font-weight: 600;
          z-index: 2;
        }
        
        .wishlist-icon { 
          position: absolute; 
          top: 12px; 
          right: 12px; 
          background: white; 
          border-radius: 50%; 
          width: 34px; 
          height: 34px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          cursor: pointer; 
          box-shadow: 0 3px 8px rgba(0,0,0,0.12);
          color: var(--primary-purple);
          z-index: 2;
        }
        
        .prod-img { height: 380px; position: relative; background: #f5eef7; overflow: hidden; }
        .prod-img img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
        .product-card:hover .prod-img img { transform: scale(1.05); }

        .prod-details { padding: 20px; background: #ffffff; }
        .price-row { display: flex; align-items: center; gap: 12px; margin-top: 10px; }
        .current-price { font-weight: 700; font-size: 1.25rem; color: var(--primary-purple); }
        .old-price { text-decoration: line-through; color: #aaa; font-size: 0.9rem; }
        
        .btn-group { display: flex; gap: 10px; margin-top: 15px; }
        .quick-view { flex: 1; padding: 10px; border: 1px solid var(--border); background: white; color: var(--primary-purple); border-radius: 4px; cursor: pointer; font-weight: 700; font-size: 0.8rem; transition: background 0.2s; }
        .quick-view:hover { background: #fdfafd; }
        
        .add-cart { flex: 1.5; padding: 10px; background: var(--accent-gold); color: var(--primary-purple); border: none; border-radius: 4px; cursor: pointer; font-weight: 700; font-size: 0.85rem; letter-spacing: 0.5px; transition: background 0.2s; }
        .add-cart:hover { background: #e6bf36; }

        /* Subcategory Tabs */
        .sub-filter-tabs { display: flex; justify-content: center; gap: 10px; padding: 12px; background: #f3ebf6; border-bottom: 1px solid var(--border); flex-wrap: wrap; }
        .sub-tab-btn { padding: 6px 16px; border-radius: 4px; border: 1px solid var(--border); background: white; cursor: pointer; transition: 0.3s; font-size: 0.85rem; color: var(--primary-purple); font-weight: 600; }
        .sub-tab-btn.active { background: var(--accent-gold); color: var(--primary-purple); border-color: var(--accent-gold); }

        @media (max-width: 768px) { 
          .summary-card, .summary-card.reverse { flex-direction: column; } 
          .card-img { height: 250px; width: 100%; } 
          .product-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; padding: 15px; }
          .prod-img { height: 220px; }
          .main-title { font-size: 2rem; }
        }
      `}</style>

      <header>
        <p className="subtitle">CURATED FOR YOU</p>
        <h1 className="main-title">{activeCategory === 'All' ? 'All Collections' : activeCategory}</h1>
      </header>

      {/* Category Filter */}
      <nav className="filter-tabs">
        {categories.map(cat => (
          <button
            key={cat}
            className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Subcategory Filter */}
      {subCategories.length > 1 && (
        <nav className="sub-filter-tabs">
          {subCategories.map(sub => (
            <button
              key={sub}
              className={`sub-tab-btn ${activeSubCategory === sub ? 'active' : ''}`}
              onClick={() => setActiveSubCategory(sub)}
            >
              {sub}
            </button>
          ))}
        </nav>
      )}

      <main>
        {loading ? (
          <p style={{textAlign: 'center', padding: '40px', color: 'var(--primary-purple)', fontStyle: 'italic'}}>Loading products...</p>
        ) : activeCategory === 'All' ? (
          <div className="summary-list">
            {collectionsSummary.map((item, index) => (
              <article key={item.id} className={`summary-card ${index % 2 !== 0 ? 'reverse' : ''}`}>
                <div className="card-img"><img src={item.image} alt={item.title} /></div>
                <div className="card-info">
                  <span style={{color: 'var(--primary-purple)', fontWeight: 'bold', fontSize: '0.75rem', letterSpacing: '1.5px', textTransform: 'uppercase'}}>{item.count}</span>
                  <h2 style={{fontSize: '2.2rem', margin: '10px 0', color: '#2c2c2c'}}>{item.title}</h2>
                  <p style={{color: 'var(--text-gray)', marginBottom: '20px'}}>{item.description}</p>
                  <button className="explore-btn" onClick={() => setActiveCategory(item.category)}>
                    {item.btnText} <span>→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map(prod => (
              <div key={prod.id} className="product-card">
                <span className="badge">{prod.tag}</span>
                <span className="discount-tag">{prod.discount}</span>
                <div className="wishlist-icon">♡</div>
                <div className="prod-img"><img src={prod.image} alt={prod.name} /></div>
                <div className="prod-details">
                  <p style={{fontSize: '0.75rem', color: '#8a7a94', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '600'}}>{prod.category}</p>
                  <h3 style={{fontSize: '1.1rem', margin: '8px 0', color: '#2c2c2c', fontWeight: '600'}}>{prod.name}</h3>
                  <div style={{color: '#e6af2e', fontSize: '0.85rem', margin: '6px 0'}}>
                    {'★'.repeat(Math.floor(prod.rating))} <span style={{color: '#888', fontSize: '0.8rem'}}>({prod.reviews})</span>
                  </div>
                  <div className="price-row">
                    <span className="current-price">{prod.price}</span>
                    <span className="old-price">{prod.originalPrice}</span>
                  </div>
                  <div className="btn-group">
                    <button className="quick-view">👁 Quick View</button>
                    <button className="add-cart">🛒 Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CollectionsPage;