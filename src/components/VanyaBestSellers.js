import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const VanyaBestSellers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchBestSellers();
  }, []);

  const fetchBestSellers = async () => {
    try {
      const res = await fetch("https://vanyabackenddatabase-vahr.onrender.com/products/all");
      const data = await res.json();
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
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

          .vanya-main-wrapper { 
            background: #fbf5fc; 
            font-family: 'Montserrat', sans-serif;
            padding: 20px 0;
          }
          .best-sellers-section { 
            max-width: 1300px;
            margin: 0 auto;
            padding: 60px 20px; 
          }
          .section-header { 
            display: flex; 
            justify-content: space-between; 
            align-items: flex-end; 
            margin-bottom: 40px; 
            border-bottom: 1px solid rgba(212, 175, 55, 0.3);
            padding-bottom: 20px;
          }
          .fan-fav-text { 
            color: #d4af37; 
            font-size: 12px; 
            letter-spacing: 4px; 
            margin-bottom: 8px; 
            text-transform: uppercase; 
            font-weight: 600; 
          }
          .main-title { 
            font-size: clamp(2rem, 3.5vw, 2.8rem); 
            margin: 0; 
            color: #522b5b; 
            font-family: 'Playfair Display', serif;
            font-weight: 700; 
          }
          .header-underline {
            width: 60px;
            height: 2px;
            background-color: #d4af37;
            margin-top: 10px;
          }
          .view-all { 
            color: #522b5b; 
            text-decoration: none; 
            font-weight: 600; 
            font-size: 14px; 
            letter-spacing: 1px;
            transition: color 0.2s ease;
          }
          .view-all:hover {
            color: #d4af37;
          }
          .product-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
            gap: 30px; 
          }
          .product-card-link {
            text-decoration: none;
            color: inherit;
            display: block;
          }
          .product-card { 
            background: #ffffff; 
            border-radius: 16px; 
            overflow: hidden;
            border: 1px solid rgba(212, 175, 55, 0.25);
            box-shadow: 0 8px 25px rgba(82, 43, 91, 0.08);
            transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), background-color 0.4s ease, border-color 0.4s ease; 
          }
          
          /* Luxurious Purple Highlighter Hover Effect */
          .product-card:hover {
            transform: translateY(-8px);
            background-color: #f7eff9 !important;
            border-color: #8c4a9e !important;
            box-shadow: 0 18px 40px rgba(82, 43, 91, 0.22), 0 0 25px rgba(140, 74, 158, 0.35) !important;
          }

          .product-card:hover .product-image {
            transform: scale(1.06);
          }

          .image-container { 
            position: relative; 
            height: 400px; 
            overflow: hidden; 
            background-color: #f2e8f5;
          }
          .product-image { 
            width: 100%; 
            height: 100%; 
            object-fit: cover; 
            transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
          }
          .badge-container { 
            position: absolute; 
            top: 15px; 
            left: 15px; 
            display: flex; 
            flex-direction: column; 
            gap: 6px; 
            z-index: 2;
          }
          .bestseller-badge { 
            background: #522b5b; 
            color: #ffffff; 
            padding: 5px 10px; 
            border-radius: 6px; 
            font-size: 10px; 
            font-weight: 600; 
            letter-spacing: 1px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.15);
            text-align: center;
          }
          .discount-badge { 
            background: #c0392b; 
            color: white; 
            padding: 5px 10px; 
            border-radius: 6px; 
            font-size: 10px; 
            font-weight: 600; 
            letter-spacing: 1px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.15);
            text-align: center;
          }
          .hover-overlay { 
            position: absolute; 
            bottom: 0; 
            left: 0;
            right: 0;
            padding: 16px;
            box-sizing: border-box;
            display: flex; 
            gap: 10px; 
            opacity: 0; 
            transition: opacity 0.3s ease; 
            background: linear-gradient(to top, rgba(45, 18, 51, 0.85) 0%, rgba(45, 18, 51, 0.3) 70%, transparent 100%);
            backdrop-filter: blur(4px);
            z-index: 2;
          }
          .product-card:hover .hover-overlay { opacity: 1; }
          .btn-quick, .btn-add { 
            border-radius: 20px; 
            font-size: 12px; 
            font-weight: 600; 
            cursor: pointer; 
            padding: 10px; 
            border: none; 
            flex: 1;
            transition: background 0.2s ease;
          }
          .btn-quick { 
            background: rgba(255, 255, 255, 0.9); 
            color: #522b5b;
          }
          .btn-add { 
            background: #d4af37; 
            color: #ffffff;
            box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
          }
          .product-info { 
            padding: 22px; 
          }
          .category { 
            color: #8c6894; 
            font-size: 11px; 
            letter-spacing: 1.5px; 
            text-transform: uppercase; 
            margin-bottom: 6px; 
            fontWeight: 500;
          }
          .product-name { 
            font-size: 18px; 
            color: #522b5b; 
            margin: 0 0 12px 0; 
            font-family: 'Playfair Display', serif;
            font-weight: 600; 
            line-height: 1.4;
          }
          .price-row { 
            display: flex; 
            align-items: center; 
            gap: 12px; 
          }
          .current-price { 
            color: #bfa136; 
            font-weight: 700; 
            font-size: 18px; 
          }
          .old-price { 
            color: #9e8c9e; 
            text-decoration: line-through; 
            font-size: 14px; 
          }

          @media (max-width: 768px) { 
            .product-grid { grid-template-columns: 1fr !important; padding: 0 10px !important; } 
            .image-container { height: 400px; } 
            .hover-overlay { opacity: 1 !important; position: relative !important; background: none !important; padding: 12px 0 0 0 !important; }
          }
        `}
      </style>

      <section className="best-sellers-section">
        <div className="section-header">
          <div>
            <p className="fan-fav-text">✦ FAN FAVOURITES ✦</p>
            <h2 className="main-title">Best Sellers</h2>
            <div className="header-underline"></div>
          </div>
          <a href="#" className="view-all">View All →</a>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="product-card-link"
            >
              <div className="product-card">
                <div className="image-container">
                  <img
                    src={product.img_url || product.thumbnails?.[0]}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="badge-container">
                    <span className="bestseller-badge">BESTSELLER</span>
                    {product.discount > 0 && (
                      <span className="discount-badge">{product.discount}% OFF</span>
                    )}
                  </div>
                  <div className="hover-overlay">
                    <button className="btn-quick" onClick={(e) => { e.preventDefault(); }}>👁 Quick View</button>
                    <button className="btn-add" onClick={(e) => { e.preventDefault(); }}>🛒 Add to Cart</button>
                  </div>
                </div>

                <div className="product-info">
                  <div className="category">{product.category || "Handloom Saree"}</div>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="price-row">
                    <span className="current-price">₹{Number(product.price).toLocaleString()}</span>
                    {product.old_price && Number(product.old_price) > Number(product.price) && (
                      <span className="old-price">₹{Number(product.old_price).toLocaleString()}</span>
                    )}
                  </div>
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