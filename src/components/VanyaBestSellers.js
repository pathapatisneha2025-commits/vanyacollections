import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VanyaBestSellers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchBestSellers();
  }, []);

  const fetchBestSellers = async () => {
    try {
      const res = await fetch("https://vanyabackenddatabase.onrender.com/products/all");
      const data = await res.json();
      // Filter only Best Seller products
      const bestSellers = data.filter(p => p.type === "Best Seller");
      setProducts(bestSellers);
    } catch (err) {
      console.error("Error fetching best sellers:", err);
    }
  };

  return (
    <div className="vanya-main-wrapper">
      <style>
        {`
          .vanya-main-wrapper { background-color: #fdfaf5; font-family: 'serif'; }
          .best-sellers-section { padding: 60px 5%; }
          .section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
          .fan-fav-text { color: #b8860b; font-size: 11px; letter-spacing: 3px; margin-bottom: 8px; text-transform: uppercase; font-weight: 700; }
          .main-title { font-size: 42px; margin: 0; color: #1a3321; font-weight: 400; }
          .view-all { color: #b8860b; text-decoration: none; font-weight: 600; font-size: 14px; }
          .product-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; }
          .product-card { background: #fff; border-radius: 16px; padding-bottom: 20px; transition: transform 0.3s ease; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
          .image-container { position: relative; height: 480px; overflow: hidden; border-radius: 16px 16px 0 0; }
          .product-image { width: 100%; height: 100%; object-fit: cover; }
          .badge-container { position: absolute; top: 15px; left: 15px; display: flex; flex-direction: column; gap: 8px; }
          .bestseller-badge { background: #fcc419; color: #000; padding: 5px 14px; border-radius: 6px; font-size: 10px; font-weight: 800; }
          .discount-badge { background: #e65555; color: white; padding: 4px 12px; border-radius: 10px; font-size: 12px; font-weight: 600; width: fit-content; }
          .hover-overlay { position: absolute; bottom: 20px; left: 0; right: 0; display: flex; justify-content: center; gap: 12px; opacity: 0; transition: opacity 0.3s ease; }
          .product-card:hover .hover-overlay { opacity: 1; }
          .btn-quick, .btn-add { border-radius: 25px; font-size: 12px; font-weight: 700; cursor: pointer; padding: 10px 18px; border: none; }
          .btn-quick { background: #fff; }
          .btn-add { background: #fcc419; }
          .product-info { padding: 20px 15px 0; }
          .category { color: #889e8f; font-size: 10px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px; }
          .product-name { font-size: 18px; color: #1a3321; margin: 0 0 10px 0; font-weight: 500; }
          .price-row { display: flex; align-items: center; gap: 12px; }
          .current-price { color: #b8860b; font-weight: 700; font-size: 20px; }
          .old-price { color: #bbb; text-decoration: line-through; font-size: 14px; }
          @media (max-width: 1024px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 600px) { .product-grid { grid-template-columns: 1fr; } .image-container { height: 400px; } .main-title { font-size: 32px; } }
        `}
      </style>

      <section className="best-sellers-section">
        <div className="section-header">
          <div>
            <p className="fan-fav-text">FAN FAVOURITES</p>
            <h2 className="main-title">Best Sellers</h2>
          </div>
          <a href="#" className="view-all">View All →</a>
        </div>

        <div className="product-grid">
          {products.map((product) => (
<Link
      key={product.id}
      to={`/product/${product.id}`} // Redirects to product page by ID
      style={{ textDecoration: 'none', color: 'inherit' }} // Preserve styles
    >                <div className="image-container">
                <img
                  src={product.img_url || product.thumbnails?.[0]}
                  alt={product.name}
                  className="product-image"
                />
                <div className="badge-container">
                  <span className="bestseller-badge">BESTSELLER</span>
                  <span className="discount-badge">{product.discount}%</span>
                </div>
                <div className="hover-overlay">
                  <button className="btn-quick">Quick View</button>
                  <button className="btn-add">Add to Cart</button>
                </div>
              </div>

              <div className="product-info">
                <div className="category">{product.category || "Uncategorized"}</div>
                <h3 className="product-name">{product.name}</h3>
                <div className="price-row">
                  <span className="current-price">₹{Number(product.price).toLocaleString()}</span>
                  <span className="old-price">₹{Number(product.old_price).toLocaleString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default VanyaBestSellers;