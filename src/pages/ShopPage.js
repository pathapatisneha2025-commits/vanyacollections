import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// --- STYLES ---
const styles = `
  :root {
    --primary-purple: #633878;
    --accent-gold: #fbd349;
    --purple-hover: #74418c;
    --light-bg: #fdfbfd;
    --text-dark: #2c2c2c;
    --white: #ffffff;
    --border: #f0e6f5;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Playfair Display', serif; }
  body { background-color: var(--light-bg); color: var(--text-dark); }

  /* Hero Banner */
  .banner {
    background: var(--primary-purple);
    color: var(--accent-gold);
    text-align: center;
    padding: 30px 20px;
    background-image: radial-gradient(circle, #74418c 1px, transparent 1px);
    background-size: 20px 20px;
  }
  .banner h1 { font-size: 1.8rem; color: var(--accent-gold); margin-bottom: 4px; font-weight: 700; letter-spacing: 1px; }

  /* Desktop Top Filter Bar */
  .top-filter-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 5%;
    background: white;
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .sort-dropdown {
    padding: 6px 10px;
    border: 1px solid var(--border);
    border-radius: 4px;
    outline: none;
    color: var(--primary-purple);
    font-weight: 600;
    font-size: 0.85rem;
    background: #fdfafd;
    cursor: pointer;
  }

  /* Mobile Action Bar */
  .mobile-action-bar {
    display: none;
    background: white;
    border-bottom: 1px solid var(--border);
    border-top: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .mobile-action-grid {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    align-items: center;
  }
  .mobile-action-btn {
    background: white;
    border: none;
    padding: 12px 10px;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: var(--text-dark);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
  .mobile-action-btn:nth-child(1) {
    border-right: 1px solid var(--border);
  }
  .mobile-grid-toggle-section {
    display: flex;
    border-left: 1px solid var(--border);
    padding: 0 8px;
    gap: 4px;
    align-items: center;
    height: 100%;
  }
  .grid-box-icon {
    width: 14px;
    height: 14px;
    border: 1.5px solid #888;
    background: #f5f5f5;
    cursor: pointer;
  }
  .grid-box-icon.active {
    background: var(--primary-purple);
    border-color: var(--primary-purple);
  }

  /* Main Layout */
  .shop-container {
    display: flex;
    padding: 30px 5%;
    gap: 30px;
  }

  /* Sidebar Filters */
  .sidebar { 
    width: 260px; 
    flex-shrink: 0; 
    background: white; 
    padding: 20px; 
    border-radius: 6px; 
    border: 1px solid var(--border); 
    height: fit-content; 
  }

  .mobile-sidebar-header {
    display: none;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid var(--border);
  }
  .mobile-sidebar-header h3 {
    font-size: 0.9rem;
    color: var(--primary-purple);
    letter-spacing: 1.2px;
    text-transform: uppercase;
  }
  .btn-close-sidebar {
    background: none;
    border: none;
    font-size: 1.1rem;
    color: var(--text-dark);
    cursor: pointer;
    padding: 4px 8px;
  }
  
  .filter-section { 
    margin-bottom: 16px; 
    border-bottom: 1px solid var(--border);
    padding-bottom: 12px;
  }
  .filter-section:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
  
  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    font-size: 0.8rem; 
    text-transform: uppercase;
    letter-spacing: 1.2px; 
    color: var(--primary-purple); 
    font-weight: 700;
  }

  .arrow-icon { transition: transform 0.3s ease; font-size: 0.7rem; }
  .arrow-icon.open { transform: rotate(180deg); }

  .filter-content {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 180px;
    overflow-y: auto;
  }

  .filter-checkbox-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8rem;
    color: #555;
    cursor: pointer;
  }
  .filter-checkbox-item input { accent-color: var(--primary-purple); width: 14px; height: 14px; }
  .color-dot { width: 10px; height: 10px; border-radius: 50%; border: 1px solid #ccc; display: inline-block; }

  /* Premium Compact Product Grid & Cards */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
    gap: 20px;
    width: 100%;
  }
  .product-grid.single-column {
    grid-template-columns: 1fr !important;
  }

  .product-card {
    background: white;
    position: relative;
    border-radius: 6px;
    overflow: hidden;
    border: 1px solid var(--border);
    transition: all 0.25s ease;
  }
  
  .product-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(99, 56, 120, 0.08);
    border-color: #d8c2e3;
  }

  .image-container { 
    position: relative; 
    height: 260px; 
    overflow: hidden; 
    background: #fbf9fc; 
  }
  .product-img { width: 100%; height: 100%; object-fit: cover; transition: 0.4s ease; }
  
  /* Compact Hover Actions */
  .hover-actions {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    display: flex;
    padding: 8px;
    gap: 6px;
    background: rgba(99, 56, 120, 0.85);
    backdrop-filter: blur(4px);
    transform: translateY(101%);
    transition: 0.25s ease-in-out;
  }
  .product-card:hover .hover-actions { transform: translateY(0); }
  .product-card:hover .product-img { transform: scale(1.04); }

  .btn-cart { 
    flex: 2; background: var(--accent-gold); border: none; padding: 7px; 
    cursor: pointer; font-weight: 700; color: var(--primary-purple); 
    border-radius: 3px; font-size: 0.75rem; letter-spacing: 0.3px; 
  }
  .btn-cart:hover { background: #e6bf36; }
  
  .btn-view { 
    flex: 1; background: white; border: none; padding: 7px; 
    cursor: pointer; border-radius: 3px; font-size: 0.75rem; 
    color: var(--primary-purple); font-weight: 700; 
  }
  .btn-view:hover { background: #fdfafd; }

  .badge {
    position: absolute; top: 8px; left: 8px; padding: 3px 8px;
    border-radius: 2px; font-size: 0.55rem; font-weight: bold; z-index: 2; letter-spacing: 0.8px;
  }
  .badge.new { background: var(--primary-purple); color: var(--accent-gold); }
  .badge.bestseller { background: var(--accent-gold); color: var(--primary-purple); }
  
  .discount {
    position: absolute; top: 32px; left: 8px; background: #d9534f;
    color: white; padding: 1px 6px; border-radius: 2px; font-size: 0.6rem; z-index: 2; font-weight: 600;
  }

  /* Compact Product Info */
  .product-info { padding: 12px; background: #ffffff; }
  .product-cat { color: #9a8aab; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
  .product-name { font-weight: 600; margin: 4px 0 6px 0; font-size: 0.9rem; color: #2c2c2c; line-height: 1.25; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  
  .rating-row { display: flex; align-items: center; gap: 4px; margin-bottom: 6px; }
  .stars { color: #e6af2e; font-size: 0.75rem; }
  .review-count { color: #888; font-size: 0.7rem; }

  .price-row { display: flex; gap: 8px; align-items: center; }
  .current-price { color: var(--primary-purple); font-weight: 700; font-size: 1rem; }
  .old-price { text-decoration: line-through; color: #aaa; font-size: 0.8rem; }

  /* Sort Modal (Mobile) */
  .sort-modal-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.5); z-index: 1002; display: flex; align-items: flex-end;
  }
  .sort-modal-content {
    background: white; width: 100%; padding: 20px; border-radius: 12px 12px 0 0;
    display: flex; flex-direction: column; gap: 12px; animation: slideUp 0.25s ease;
  }
  .sort-modal-header {
    display: flex; justify-content: space-between; align-items: center;
    border-bottom: 1px solid var(--border); padding-bottom: 6px;
  }
  .sort-modal-content h3 { font-size: 0.9rem; color: var(--primary-purple); text-transform: uppercase; letter-spacing: 1px; }
  .sort-option-item { padding: 10px 0; font-size: 0.85rem; cursor: pointer; border-bottom: 1px solid #f8f8f8; font-weight: 500; }
  .sort-option-item.selected { color: var(--primary-purple); font-weight: 700; }

  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }

  .cart-success-overlay{
    position:fixed; top:0; left:0; width:100%; height:100%;
    background:rgba(99,56,120,0.3); backdrop-filter: blur(2px);
    display:flex; justify-content:center; align-items:center; z-index:99999;
  }
  .cart-success-box{
    width:320px; background:#ffffff; padding:25px; border-radius:8px; text-align:center;
    border: 1px solid var(--accent-gold); box-shadow: 0 10px 30px rgba(99,56,120,0.2);
  }
  .cart-success-icon{ font-size:35px; margin-bottom:10px; }
  .cart-success-box h3{ color:var(--primary-purple); font-size:18px; margin-bottom:6px; font-weight: 700; }
  .cart-success-box p{ color:#666; font-size:13px; }

  /* Mobile Grid adjustments */
  @media (max-width: 768px) {
    .top-filter-bar { display: none; }
    .mobile-action-bar { display: block; }
    .mobile-sidebar-header { display: flex; }
    .shop-container { flex-direction: column; padding: 15px 3%; gap: 15px; }
    .sidebar {
      position: fixed; left: -100%; top: 0; height: 100%; background: white;
      z-index: 1001; width: 280px; padding: 15px; box-shadow: 5px 0 25px rgba(0,0,0,0.15);
      overflow-y: auto; border-radius: 0; transition: left 0.3s ease;
    }
    .sidebar.open { left: 0; }
    .sidebar-overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.4); z-index: 1000; display: none;
    }
    .sidebar-overlay.visible { display: block; }
    .product-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .image-container { height: 190px; }
  }
`;

export default function ShopPage() {
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [selectedFabrics, setSelectedFabrics] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  
  const [openSections, setOpenSections] = useState({
    availability: true,
    price: false,
    category: false,
    fabric: false,
    color: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSortModalOpen, setSortModalOpen] = useState(false);
  const [isSingleColumn, setIsSingleColumn] = useState(false);
  const [sortOption, setSortOption] = useState("Featured");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartPopup, setCartPopup] = useState({ show: false, message: '' });

  const showCartPopup = (message) => {
    setCartPopup({ show: true, message });
    setTimeout(() => setCartPopup({ show: false, message: "" }), 2000);
  };

  const navigate = useNavigate();

  const handleCheckboxChange = (list, setList, item) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const priceRanges = [
    { label: "₹500.00 - ₹999.00", min: 500, max: 999 },
    { label: "₹1000.00 - ₹1999.00", min: 1000, max: 1999 },
    { label: "₹2000.00 - ₹2999.00", min: 2000, max: 2999 },
    { label: "₹3000.00 - ₹4999.00", min: 3000, max: 4999 },
    { label: "₹5000.00 - ₹6999.00", min: 5000, max: 6999 },
    { label: "₹7000.00+", min: 7000, max: 100000 }
  ];

  const displayedProducts = products
    .filter(p => {
      const matchesPrice = selectedPriceRanges.length === 0 || selectedPriceRanges.some(range => {
        const found = priceRanges.find(r => r.label === range);
        return found && p.price >= found.min && p.price <= found.max;
      });

      const matchesOccasion = selectedOccasions.length === 0 || selectedOccasions.some(o => p.cat.toLowerCase().includes(o.toLowerCase()));
      const matchesFabric = selectedFabrics.length === 0 || selectedFabrics.includes(p.fabric);
      const matchesColor = selectedColors.length === 0 || (p.color && selectedColors.includes(p.color));

      return (selectedPriceRanges.length === 0 || matchesPrice) && matchesOccasion && matchesFabric && matchesColor;
    })
    .sort((a, b) => {
      if (sortOption === "Price: Low to High") return a.price - b.price;
      if (sortOption === "Price: High to Low") return b.price - a.price;
      return 0;
    });

  const fetchReviewsForProduct = async (productId) => {
    try {
      const res = await fetch(`https://vanyabackenddatabase-vahr.onrender.com/review/${productId}`);
      return await res.json();
    } catch (err) {
      return [];
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://vanyabackenddatabase-vahr.onrender.com/products/all');
        const productsData = await response.json();

        const productsWithReviews = await Promise.all(
          productsData.map(async (item) => {
            const reviews = await fetchReviewsForProduct(item.id);
            const totalReviews = reviews.length;
            const avgRating = totalReviews ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews : 0;
            return {
              id: item.id,
              name: item.name,
              cat: item.category,
              fabric: item.fabric || 'Pure Silk',
              color: item.color || 'Red',
              price: Number(item.price),
              oldPrice: Number(item.old_price),
              rating: Math.round(avgRating * 10) / 10,
              reviews: totalReviews,
              badge: Number(item.discount) > 20 ? 'BESTSELLER' : 'NEW',
              discount: `-${item.discount}%`,
              img: item.img_url || item.thumbnails[0],
            };
          })
        );
        setProducts(productsWithReviews);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    const storedUser = localStorage.getItem("user");
    if(!storedUser){
      showCartPopup("Please login to add products to your bag");
      setTimeout(() => navigate("/login"), 1500);
      return;
    }
    const user = JSON.parse(storedUser);
    try{
      const response = await fetch("https://vanyabackenddatabase-vahr.onrender.com/cart/add", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({ user_id: user.id, product_id: product.id, quantity: 1 })
      });
      if(response.ok) showCartPopup(`${product.name} added to your bag`);
      else showCartPopup("Unable to add item");
    } catch(error){
      showCartPopup("Something went wrong");
    }
  };

  const occasionsList = [
    'DesignerSarees', 'Wedding Collections', 'COTTON Sarees', 'SILK SAREES',
    'PartyWear', 'Weaving Mistake Sarees', 'Dress Materials', 'Budget Friendly Sarees',
    'Work Sarees', 'Damage Sarees', 'Pattu Sarees', 'Readymade Blouses', 'Handloom Sarees', 'Exclusive Sarees'
  ];

  const fabricsList = ['Pure Banarasi Silk', 'Pure Kanjeevaram Silk', 'Silk Embroidery', 'Pure Silk'];
  const colorsList = ['Red', 'Blue', 'Gold', 'Green', 'Maroon', 'Pink'];

  return (
    <>
      <style>{styles}</style>
      
      <header className="banner">
        <p style={{fontSize: '0.75rem', letterSpacing: '2px', fontWeight: '600', color: 'var(--accent-gold)'}}>ROYAL HERITAGE WEAVES</p>
        <h1>All Sarees</h1>
        <p style={{color: '#f5e6b8', fontSize: '0.85rem'}}>{displayedProducts.length} Products</p>
      </header>

      {/* Desktop Filter Bar */}
      <div className="top-filter-bar">
        <div style={{fontSize: '0.85rem', color: '#666'}}>Showing {displayedProducts.length} products</div>
        <select className="sort-dropdown" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option>Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      {/* Mobile Action Bar */}
      <div className="mobile-action-bar">
        <div className="mobile-action-grid">
          <button className="mobile-action-btn" onClick={() => setSidebarOpen(true)}>
            <span>🎚️</span> FILTER
          </button>
          <button className="mobile-action-btn" onClick={() => setSortModalOpen(true)}>
            <span>⇅</span> SORT BY
          </button>
          <div className="mobile-grid-toggle-section">
            <div 
              className={`grid-box-icon ${!isSingleColumn ? 'active' : ''}`} 
              onClick={() => setIsSingleColumn(false)}
              title="2 Columns"
            ></div>
            <div 
              className={`grid-box-icon ${isSingleColumn ? 'active' : ''}`} 
              onClick={() => setIsSingleColumn(true)}
              title="1 Column"
            ></div>
          </div>
        </div>
      </div>

      {/* Mobile Sort Bottom Modal */}
      {isSortModalOpen && (
        <div className="sort-modal-overlay" onClick={() => setSortModalOpen(false)}>
          <div className="sort-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="sort-modal-header">
              <h3>Sort By</h3>
              <button className="btn-close-sidebar" onClick={() => setSortModalOpen(false)}>✕</button>
            </div>
            {["Featured", "Price: Low to High", "Price: High to Low"].map((option) => (
              <div 
                key={option}
                className={`sort-option-item ${sortOption === option ? 'selected' : ''}`}
                onClick={() => { setSortOption(option); setSortModalOpen(false); }}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={`sidebar-overlay ${isSidebarOpen ? 'visible' : ''}`} onClick={() => setSidebarOpen(false)}></div>

      <div className="shop-container">
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          
          <div className="mobile-sidebar-header">
            <h3>Filters</h3>
            <button className="btn-close-sidebar" onClick={() => setSidebarOpen(false)}>✕</button>
          </div>

          <div className="filter-section">
            <div className="filter-header" onClick={() => toggleSection('availability')}>
              <span>Availability</span>
              <span className={`arrow-icon ${openSections.availability ? 'open' : ''}`}>▼</span>
            </div>
            {openSections.availability && (
              <div className="filter-content">
                <label className="filter-checkbox-item">
                  <input type="checkbox" defaultChecked /> In Stock Only
                </label>
              </div>
            )}
          </div>

          <div className="filter-section">
            <div className="filter-header" onClick={() => toggleSection('price')}>
              <span>Price</span>
              <span className={`arrow-icon ${openSections.price ? 'open' : ''}`}>▼</span>
            </div>
            {openSections.price && (
              <div className="filter-content">
                {priceRanges.map(range => (
                  <label key={range.label} className="filter-checkbox-item">
                    <input 
                      type="checkbox" 
                      checked={selectedPriceRanges.includes(range.label)}
                      onChange={() => handleCheckboxChange(selectedPriceRanges, setSelectedPriceRanges, range.label)}
                    />
                    {range.label}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="filter-section">
            <div className="filter-header" onClick={() => toggleSection('category')}>
              <span>Category</span>
              <span className={`arrow-icon ${openSections.category ? 'open' : ''}`}>▼</span>
            </div>
            {openSections.category && (
              <div className="filter-content">
                {occasionsList.map(o => (
                  <label key={o} className="filter-checkbox-item">
                    <input 
                      type="checkbox" 
                      checked={selectedOccasions.includes(o)}
                      onChange={() => handleCheckboxChange(selectedOccasions, setSelectedOccasions, o)}
                    />
                    {o}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="filter-section">
            <div className="filter-header" onClick={() => toggleSection('fabric')}>
              <span>Fabric</span>
              <span className={`arrow-icon ${openSections.fabric ? 'open' : ''}`}>▼</span>
            </div>
            {openSections.fabric && (
              <div className="filter-content">
                {fabricsList.map(f => (
                  <label key={f} className="filter-checkbox-item">
                    <input 
                      type="checkbox" 
                      checked={selectedFabrics.includes(f)}
                      onChange={() => handleCheckboxChange(selectedFabrics, setSelectedFabrics, f)}
                    />
                    {f}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="filter-section">
            <div className="filter-header" onClick={() => toggleSection('color')}>
              <span>Color</span>
              <span className={`arrow-icon ${openSections.color ? 'open' : ''}`}>▼</span>
            </div>
            {openSections.color && (
              <div className="filter-content">
                {colorsList.map(c => (
                  <label key={c} className="filter-checkbox-item">
                    <input 
                      type="checkbox" 
                      checked={selectedColors.includes(c)}
                      onChange={() => handleCheckboxChange(selectedColors, setSelectedColors, c)}
                    />
                    <span className="color-dot" style={{backgroundColor: c.toLowerCase()}}></span>
                    {c}
                  </label>
                ))}
              </div>
            )}
          </div>

        </aside>    

        <main className={`product-grid ${isSingleColumn ? 'single-column' : ''}`}>
          {loading ? (
            <p style={{color: 'var(--primary-purple)', fontStyle: 'italic'}}>Loading products...</p>
          ) : displayedProducts.length === 0 ? (
            <p style={{color: '#666'}}>No products match your filters.</p>
          ) : (
            displayedProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="image-container">
                  <span className={`badge ${product.badge.toLowerCase()}`}>{product.badge}</span>
                  <span className="discount">{product.discount}</span>
                  <img src={product.img} alt={product.name} className="product-img" />
                  <div className="hover-actions">
                    <button className="btn-view" onClick={() => navigate(`/product/${product.id}`)}>View</button>
                    <button className="btn-cart" onClick={() => handleAddToCart(product)}>+ Add</button>
                  </div>
                </div>
                <div className="product-info">
                  <p className="product-cat">{product.cat}</p>
                  <h2 className="product-name">{product.name}</h2>
                  <div className="rating-row">
                    <div className="stars">
                      {"★".repeat(Math.floor(product.rating))}
                      {product.rating % 1 >= 0.5 ? "½" : ""}
                    </div>
                    <span className="review-count">({product.reviews || 0})</span>
                  </div>
                  <div className="price-row">
                    <span className="current-price">₹{product.price.toLocaleString()}</span>
                    <span className="old-price">₹{product.oldPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </main>

        {cartPopup.show && (
          <div className="cart-success-overlay">
            <div className="cart-success-box">
              <div className="cart-success-icon">🛍️</div>
              <h3>Cart Updated</h3>
              <p>{cartPopup.message}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}