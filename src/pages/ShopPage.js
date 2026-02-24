import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// --- STYLES ---
const styles = `
  :root {
    --primary-green: #1a3c34;
    --accent-gold: #c5a059;
    --light-bg: #fdfbf7;
    --text-dark: #333;
    --white: #ffffff;
    --border: #e5e5e5;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Segoe UI', serif; }
  body { background-color: var(--light-bg); color: var(--text-dark); }

  /* Hero Banner */
  .banner {
    background: var(--primary-green);
    color: white;
    text-align: center;
    padding: 60px 20px;
    background-image: radial-gradient(circle, #244d43 1px, transparent 1px);
    background-size: 20px 20px;
  }
  .banner h1 { font-size: 2.5rem; color: var(--accent-gold); margin-bottom: 10px; }

  /* Top Filter Bar */
  .top-filter-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 5%;
    background: white;
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .btn-filters-toggle {
    display: none;
    background: white;
    border: 1px solid var(--border);
    padding: 8px 15px;
    cursor: pointer;
    font-weight: 600;
  }

  .sort-dropdown {
    padding: 8px;
    border: 1px solid var(--border);
    border-radius: 4px;
    outline: none;
  }

  /* Main Layout */
  .shop-container {
    display: flex;
    padding: 30px 5%;
    gap: 40px;
  }

  /* Sidebar */
  .sidebar { width: 250px; flex-shrink: 0; transition: 0.3s ease; }
  .filter-section { margin-bottom: 30px; }
  .filter-section h3 { 
    font-size: 0.9rem; margin-bottom: 15px; text-transform: uppercase;
    letter-spacing: 1px; border-bottom: 1px solid #eee; padding-bottom: 8px;
  }
  .filter-list { list-style: none; }
  .filter-item {
    padding: 6px 0; cursor: pointer; font-size: 0.9rem; color: #666;
    display: flex; align-items: center; gap: 10px;
  }
  .filter-item.active { color: var(--accent-gold); font-weight: bold; }
  .color-dot { width: 12px; height: 12px; border-radius: 50%; border: 1px solid #ddd; }

  /* Product Grid */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
    width: 100%;
  }

  .product-card {
    background: white;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    transition: transform 0.3s;
  }
  
  .image-container { position: relative; height: 380px; overflow: hidden; }
  .product-img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
  
  /* Hover Actions */
  .hover-actions {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    display: flex;
    padding: 10px;
    gap: 8px;
    background: rgba(255,255,255,0.9);
    transform: translateY(101%);
    transition: 0.3s ease-in-out;
  }
  .product-card:hover .hover-actions { transform: translateY(0); }
  .product-card:hover .product-img { transform: scale(1.05); }

  .btn-cart { flex: 2; background: var(--accent-gold); border: none; padding: 10px; cursor: pointer; font-weight: bold; color: white; border-radius: 2px; }
  .btn-view { flex: 1; background: white; border: 1px solid #ddd; padding: 10px; cursor: pointer; border-radius: 2px; font-size: 0.8rem; }

  .badge {
    position: absolute; top: 10px; left: 10px; padding: 4px 10px;
    border-radius: 2px; font-size: 0.7rem; font-weight: bold; z-index: 2;
  }
  .badge.new { background: var(--primary-green); color: white; }
  .badge.bestseller { background: var(--accent-gold); color: white; }
  
  .discount {
    position: absolute; top: 40px; left: 10px; background: #ff5252;
    color: white; padding: 2px 8px; border-radius: 2px; font-size: 0.75rem; z-index: 2;
  }

  .wishlist-btn {
    position: absolute; top: 10px; right: 10px; background: white;
    border: none; border-radius: 50%; width: 32px; height: 32px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); z-index: 2;
  }

 /* Product Info UI */
 /* Product Info */
  .product-info { padding: 15px; }
  .product-cat { color: #888; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px; }
  .product-name { font-weight: 500; margin: 6px 0; font-size: 1.1rem; color: #222; }
  
  .rating-row { display: flex; align-items: center; gap: 5px; margin: 4px 0; }
  .stars { color: #f5b921; font-size: 0.9rem; }
  .review-count { color: #888; font-size: 0.85rem; }

  .price-row { display: flex; gap: 10px; align-items: center; margin-top: 8px; }
  .current-price { color: #d4af37; font-weight: 700; font-size: 1.3rem; }
  .old-price { text-decoration: line-through; color: #bbb; font-size: 0.95rem; }
  /* Mobile Responsive */
  @media (max-width: 768px) {
    .btn-filters-toggle { display: block; }
    .shop-container { flex-direction: column; }
    .sidebar {
      position: fixed; left: -100%; top: 0; height: 100%; background: white;
      z-index: 1001; width: 280px; padding: 20px; box-shadow: 2px 0 10px rgba(0,0,0,0.1);
    }
    .sidebar.open { left: 0; }
    .sidebar-overlay {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.5); z-index: 1000; display: none;
    }
    .sidebar-overlay.visible { display: block; }
    .product-grid { grid-template-columns: repeat(2, 1fr); gap: 15px; }
    .image-container { height: 260px; }
    .hover-actions { display: none; } /* Hide hover actions on mobile for better UX */
  }
`;

// const PRODUCTS = [
//   { id: 1, name: "Royal Blue Kanjeevaram", cat: "SILK SAREES", price: 11999, rating: 5, reviews: 64,oldPrice: 16999, badge: "NEW", discount: "-29%", img: "/silksaree.jpg" },
//   { id: 2, name: "Emerald Garden Silk", cat: "SILK SAREES", price: 7499,rating: 5, reviews: 64, oldPrice: 9999, badge: "NEW", discount: "-25%", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=400" },
//   { id: 3, name: "Peach Bridal Elegance", cat: "BRIDAL", price: 24500,rating: 5, reviews: 64, oldPrice: 35000, badge: "BESTSELLER", discount: "-29%", img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=400" },
//   { id: 4, name: "Crimson Banarasi", cat: "FESTIVAL", price: 18200,rating: 5, reviews: 64, oldPrice: 26000, badge: "BESTSELLER", discount: "-31%", img: "/festivalsaree.jpg" }
// ];

export default function ShopPage() {
 const [price, setPrice] = useState(35000);
  const [activeColor, setActiveColor] = useState('All');
  const [activeOccasion, setActiveOccasion] = useState('All');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Featured");
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const navigate = useNavigate();


const displayedProducts = products
  .filter(p => {
    const withinPrice = p.price <= Number(price);
    const matchesOccasion =
      activeOccasion === 'All' || p.cat.toLowerCase().includes(activeOccasion.toLowerCase());
    const matchesColor =
      activeColor === 'All' || (p.color && p.color.toLowerCase() === activeColor.toLowerCase());
    return withinPrice && matchesOccasion && matchesColor;
  })
  .sort((a, b) => {
    if (sortOption === "Price: Low to High") return a.price - b.price;
    if (sortOption === "Price: High to Low") return b.price - a.price;
    return 0; // Featured/default order
  });

  const fetchReviewsForProduct = async (productId) => {
  try {
    const res = await fetch(`https://vanyabackenddatabase.onrender.com/review/${productId}`);
    const data = await res.json();
    return data; // array of reviews
  } catch (err) {
    console.error("Failed to fetch reviews for product:", err);
    return [];
  }
};  
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://vanyabackenddatabase.onrender.com/products/all');
      const productsData = await response.json();

      // Fetch reviews for each product
      const productsWithReviews = await Promise.all(
        productsData.map(async (item) => {
          const reviews = await fetchReviewsForProduct(item.id);
          const totalReviews = reviews.length;
         const avgRating = totalReviews
  ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
  : 0;
const roundedRating = Math.round(avgRating * 10) / 10; // e.g., 4.3

          return {
            id: item.id,
            name: item.name,
            cat: item.category,
            price: Number(item.price),
            oldPrice: Number(item.old_price),
            rating: roundedRating,
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

// Inside your ShopPage component, above the return:
const handleAddToCart = async (product) => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) {
    alert("Please login to add products to cart.");
    navigate("/login");
    return;
  }

  const user = JSON.parse(storedUser);   // parse stored object
  const userId = user.id;                // extract the numeric id

  try {
    const response = await fetch("https://vanyabackenddatabase.onrender.com/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: userId,       // backend expects snake_case
        product_id: product.id,
        quantity: 1,
      }),
    });

    if (response.ok) {
      alert(`${product.name} added to cart!`);
    } else {
      alert("Failed to add to cart. Try again.");
    }
  } catch (error) {
    console.error("Add to cart error:", error);
    alert("Something went wrong.");
  }
};
  return (
    <>
      <style>{styles}</style>
      
      <header className="banner">
        <p style={{fontSize: '0.8rem', letterSpacing: '2px'}}>TRADITIONAL WEAVES</p>
        <h1>All Sarees</h1>
        <p>{products.length} curated designs</p>
      </header>

      <div className="top-filter-bar">
        <button className="btn-filters-toggle" onClick={() => setSidebarOpen(true)}>☰ FILTERS</button>
        <div className="results-count" style={{fontSize: '0.9rem', color: '#666'}}>Showing all {products.length} products</div>
      <select 
  className="sort-dropdown"
  value={sortOption}                     // bind to state
  onChange={(e) => setSortOption(e.target.value)} // update state on change
>
  <option>Featured</option>
  <option>Price: Low to High</option>
  <option>Price: High to Low</option>
</select>
      </div>

      <div className={`sidebar-overlay ${isSidebarOpen ? 'visible' : ''}`} onClick={() => setSidebarOpen(false)}></div>

      <div className="shop-container">
     <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="filter-section">
            <h3>Price Range</h3>
            <input 
              type="range" 
              min="0" 
              max="35000" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              style={{width: '100%', accentColor: 'var(--accent-gold)'}} 
            />
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#888', marginTop: '10px'}}>
              <span>₹0</span> <span>₹{Number(price).toLocaleString()}</span>
            </div>
          </div>

          <div className="filter-section">
            <h3>Occasion</h3>
            <ul className="filter-list">
              {['All', 'DesignerSarees', 'Wedding Collections', 'COTTON Sarees', 'SILK SAREES', 'PartyWear'].map(o => (
                <li 
                  key={o} 
                  className={`filter-item ${activeOccasion === o ? 'active' : ''}`}
                  onClick={() => setActiveOccasion(o)}
                >
                  {o}
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-section">
            <h3>Fabric</h3>
            <ul className="filter-list">
              {['All', 'Pure Banarasi Silk', 'Pure Kanjeevaram Silk', 'Silk Embroidery', 'Pure Silk'].map(f => (
                <li key={f} className={`filter-item ${f === 'All' ? 'active' : ''}`}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="filter-section">
            <h3>Color</h3>
            <ul className="filter-list">
              {['All', 'Red', 'Blue', 'Gold', 'Green', 'Maroon', 'Pink'].map(c => (
                <li 
                  key={c} 
                  className={`filter-item ${activeColor === c ? 'active' : ''}`}
                  onClick={() => setActiveColor(c)}
                >
                  {c !== 'All' && <span className="color-dot" style={{backgroundColor: c.toLowerCase()}}></span>}
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </aside>    

  <main className="product-grid">
  {loading ? (
    <p>Loading products...</p>
  ) : displayedProducts.length === 0 ? (
    <p>No products match your filters.</p>
  ) : (
    displayedProducts.map(product => (
      <div key={product.id} className="product-card">
        <div className="image-container">
          <img src={product.img} alt={product.name} className="product-img" />
          <div className="hover-actions">
            <button
              className="btn-view"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              👁 Quick View
            </button>
            <button className="btn-cart" onClick={() => handleAddToCart(product)}>
              🛒 Add to Cart
            </button>
          </div>
        </div>
        <div className="product-info">
          <p className="product-cat">{product.cat}</p>
          <h2 className="product-name">{product.name}</h2>
          <div className="rating-row">
      <div className="stars">
  {"★".repeat(Math.floor(product.rating))}
  {product.rating % 1 >= 0.5 ? "½" : ""}
  {"☆".repeat(5 - Math.ceil(product.rating))}
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
      </div>
    </>
  );
}