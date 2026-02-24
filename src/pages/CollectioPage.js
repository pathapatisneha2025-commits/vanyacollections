import React, { useState, useEffect } from 'react';

const CollectionsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://vanyabackenddatabase.onrender.com/products/all');
        const data = await res.json();

        // Map products to frontend structure
        const mappedProducts = data.map(item => ({
          id: item.id,
          name: item.name,
          category: item.category,
          price: `₹${Number(item.price).toLocaleString()}`,
          originalPrice: `₹${Number(item.old_price).toLocaleString()}`,
          discount: `-${item.discount}%`,
          rating: 4 + Math.random(), // Random rating
          reviews: Math.floor(Math.random() * 100) + 10,
          tag: Number(item.discount) > 20 ? 'BESTSELLER' : 'NEW',
          image: item.img_url || item.thumbnails[0]
        }));

        setProducts(mappedProducts);

        // Extract unique categories dynamically for filters & summary
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

  // Generate summary dynamically with main image from backend
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
      image: firstProduct ? firstProduct.image : 'https://via.placeholder.com/400', // fallback
      btnText: `Explore ${cat}`
    };
  });
  return (
    <div className="vanya-wrapper">
      <style>{`
        :root { --primary-green: #1a4332; --accent-gold: #c5a059; --bg-light: #f9f9f9; --text-gray: #666; }
        .vanya-wrapper { font-family: 'Playfair Display', serif; color: #333; }
        header { background: var(--primary-green); color: white; text-align: center; padding: 60px 20px; }
        .main-title { font-size: 3rem; color: var(--accent-gold); margin: 10px 0; }
        .filter-tabs { display: flex; justify-content: center; gap: 10px; padding: 30px; position: sticky; top: 0; background: white; z-index: 100; border-bottom: 1px solid #eee; }
        .tab-btn { padding: 10px 20px; border-radius: 30px; border: 1px solid #ddd; background: none; cursor: pointer; transition: 0.3s; }
        .tab-btn.active { background: var(--primary-green); color: white; border-color: var(--primary-green); }

        .summary-list { max-width: 1100px; margin: 40px auto; padding: 0 20px; }
        .summary-card { display: flex; align-items: center; background: var(--bg-light); border-radius: 20px; overflow: hidden; margin-bottom: 50px; }
        .summary-card.reverse { flex-direction: row-reverse; }
        .card-img { flex: 1.2; height: 400px; }
        .card-img img { width: 100%; height: 100%; object-fit: cover; }
        .card-info { flex: 1; padding: 40px; }
        .explore-btn { background: var(--primary-green); color: white; border: none; padding: 12px 24px; border-radius: 30px; cursor: pointer; display: flex; align-items: center; gap: 10px; }

        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px; max-width: 1200px; margin: 40px auto; padding: 20px; }
        .product-card { background: white; border-radius: 12px; overflow: hidden; position: relative; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
        .badge { position: absolute; top: 15px; left: 15px; background: var(--accent-gold); color: black; font-size: 0.7rem; font-weight: bold; padding: 4px 10px; border-radius: 4px; z-index: 2; }
        .discount-tag { position: absolute; top: 45px; left: 15px; background: #e74c3c; color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; }
        .wishlist-icon { position: absolute; top: 15px; right: 15px; background: white; border-radius: 50%; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .prod-img { height: 350px; position: relative; }
        .prod-img img { width: 100%; height: 100%; object-fit: cover; }
        .prod-details { padding: 20px; }
        .price-row { display: flex; align-items: center; gap: 10px; margin: 10px 0; }
        .current-price { font-weight: bold; font-size: 1.2rem; color: var(--accent-gold); }
        .old-price { text-decoration: line-through; color: #999; font-size: 0.9rem; }
        .btn-group { display: flex; gap: 10px; margin-top: 15px; }
        .quick-view { flex: 1; padding: 10px; border: 1px solid #ddd; background: white; border-radius: 8px; cursor: pointer; }
        .add-cart { flex: 1.5; padding: 10px; background: var(--accent-gold); border: none; border-radius: 8px; cursor: pointer; font-weight: bold; }

        @media (max-width: 768px) { .summary-card, .summary-card.reverse { flex-direction: column; } .card-img { height: 250px; width: 100%; } }
      `}</style>

      <header>
        <p className="subtitle">CURATED FOR YOU</p>
        <h1 className="main-title">{activeFilter === 'All' ? 'All Collections' : activeFilter}</h1>
      </header>

      <nav className="filter-tabs">
        {categories.map(f => (
          <button key={f} className={`tab-btn ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>
            {f}
          </button>
        ))}
      </nav>

      <main>
        {loading ? (
          <p style={{textAlign: 'center'}}>Loading products...</p>
        ) : activeFilter === 'All' ? (
          <div className="summary-list">
            {collectionsSummary.map((item, index) => (
              <article key={item.id} className={`summary-card ${index % 2 !== 0 ? 'reverse' : ''}`}>
                <div className="card-img"><img src={item.image} alt={item.title} /></div>
                <div className="card-info">
                  <span style={{color: 'var(--accent-gold)', fontWeight: 'bold', fontSize: '0.8rem'}}>{item.count}</span>
                  <h2 style={{fontSize: '2.2rem', margin: '10px 0'}}>{item.title}</h2>
                  <p style={{color: 'var(--text-gray)', marginBottom: '20px'}}>{item.description}</p>
                  <button className="explore-btn" onClick={() => setActiveFilter(item.category)}>
                    {item.btnText} <span>→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="product-grid">
            {products
              .filter(prod => activeFilter === 'All' || prod.category === activeFilter)
              .map(prod => (
                <div key={prod.id} className="product-card">
                  <span className="badge">{prod.tag}</span>
                  <span className="discount-tag">{prod.discount}</span>
                  <div className="wishlist-icon">♡</div>
                  <div className="prod-img"><img src={prod.image} alt={prod.name} /></div>
                  <div className="prod-details">
                    <p style={{fontSize: '0.75rem', color: '#888', textTransform: 'uppercase'}}>{prod.category}</p>
                    <h3 style={{fontSize: '1.1rem', margin: '5px 0'}}>{prod.name}</h3>
                    <div style={{color: '#f1c40f', fontSize: '0.9rem'}}>
                      {'★'.repeat(Math.floor(prod.rating))} <span style={{color: '#999'}}>({prod.reviews})</span>
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