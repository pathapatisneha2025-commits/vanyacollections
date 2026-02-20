import React from 'react';

const VanyaBestSellers = () => {
  const products = [
    {
      id: 1,
      name: "Crimson Zari Banarasi Silk",
      category: "SILK SAREES",
      price: "8,999",
      oldPrice: "12,999",
      discount: "-31%",
      rating: 4,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=500"
    },
    {
      id: 2,
      name: "Golden Hour Bridal Silk",
      category: "WEDDING COLLECTION",
      price: "24,999",
      oldPrice: "34,999",
      discount: "-29%",
      rating: 5,
      reviews: 64,
      image: "/festivalsaree.jpg"
    },
    {
      id: 3,
      name: "Maroon Magnificence Silk",
      category: "WEDDING COLLECTION",
      price: "9,499",
      oldPrice: "13,999",
      discount: "-32%",
      rating: 4,
      reviews: 112,
      image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=500"
    }
  ];

  return (
    <div className="vanya-main-wrapper">
      <style>
        {`
          .vanya-main-wrapper {
            background-color: #fdfaf5; /* Exact warm off-white background from screenshot */
            font-family: 'serif';
          }
          
          /* Navigation Bar Styling */
          .nav-container {
            background-color: #16402d; /* Deep Forest Green from screenshot */
            color: #dcc07b;
            padding: 15px 5%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .logo {
             height: 40px;
          }
          .nav-links {
            display: flex;
            gap: 25px;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 2px;
          }
          .nav-links a {
            color: #dcc07b;
            text-decoration: none;
            transition: opacity 0.3s;
          }
          .nav-icons {
            display: flex;
            gap: 20px;
            font-size: 18px;
          }

          /* Best Sellers Content */
          .best-sellers-section {
            padding: 60px 5%;
          }
          .section-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 40px;
          }
          .fan-fav-text {
            color: #b8860b;
            font-size: 11px;
            letter-spacing: 3px;
            margin-bottom: 8px;
            text-transform: uppercase;
            font-weight: 700;
          }
          .main-title {
            font-size: 42px;
            margin: 0;
            color: #1a3321;
            font-weight: 400;
          }
          .view-all {
            color: #b8860b;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
          }

          .product-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 25px;
          }
          .product-card {
            background: #fff; /* White cards on off-white background */
            border-radius: 16px;
            padding-bottom: 20px;
            transition: transform 0.3s ease;
            box-shadow: 0 4px 15px rgba(0,0,0,0.03);
          }
          .image-container {
            position: relative;
            height: 480px; /* Taller image size as per screenshot */
            overflow: hidden;
            border-radius: 16px 16px 0 0;
          }
          .product-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          /* Badges */
          .badge-container {
            position: absolute;
            top: 15px;
            left: 15px;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }
          .bestseller-badge {
            background: #fcc419;
            color: #000;
            padding: 5px 14px;
            border-radius: 6px;
            font-size: 10px;
            font-weight: 800;
          }
          .discount-badge {
            background: #e65555;
            color: white;
            padding: 4px 12px;
            border-radius: 10px;
            font-size: 12px;
            font-weight: 600;
            width: fit-content;
          }

          /* Hover Actions */
          .hover-overlay {
            position: absolute;
            bottom: 20px;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            gap: 12px;
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          .product-card:hover .hover-overlay { opacity: 1; }
          .btn-quick {
            background: #fff;
            border: none;
            padding: 10px 18px;
            border-radius: 25px;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
          }
          .btn-add {
            background: #fcc419;
            border: none;
            padding: 10px 18px;
            border-radius: 25px;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
          }

          /* Info Styling */
          .product-info {
            padding: 20px 15px 0;
          }
          .category {
            color: #889e8f;
            font-size: 10px;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 6px;
          }
          .product-name {
            font-size: 18px;
            color: #1a3321;
            margin: 0 0 10px 0;
            font-weight: 500;
          }
          .rating {
            color: #fcc419;
            font-size: 13px;
            margin-bottom: 12px;
          }
          .price-row {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .current-price {
            color: #b8860b;
            font-weight: 700;
            font-size: 20px;
          }
          .old-price {
            color: #bbb;
            text-decoration: line-through;
            font-size: 14px;
          }

          @media (max-width: 1024px) {
            .product-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 600px) {
            .nav-links { display: none; }
            .product-grid { grid-template-columns: 1fr; }
            .image-container { height: 400px; }
            .main-title { font-size: 32px; }
          }
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
            <div key={product.id} className="product-card">
              <div className="image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="badge-container">
                  <span className="bestseller-badge">BESTSELLER</span>
                  <span className="discount-badge">{product.discount}</span>
                </div>
                <div className="hover-overlay">
                  <button className="btn-quick">Quick View</button>
                  <button className="btn-add">Add to Cart</button>
                </div>
              </div>

              <div className="product-info">
                <div className="category">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>
                <div className="rating">
                  {"★".repeat(product.rating)}{"☆".repeat(5-product.rating)} 
                  <span style={{color: '#aaa', marginLeft: '8px', fontSize: '11px'}}>({product.reviews})</span>
                </div>
                <div className="price-row">
                  <span className="current-price">₹{product.price}</span>
                  <span className="old-price">₹{product.oldPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default VanyaBestSellers;