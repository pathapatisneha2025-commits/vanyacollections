import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const storedUser = localStorage.getItem('user');

      if (!storedUser) {
        alert("Please login first");
        setLoading(false);
        return;
      }

      const user = JSON.parse(storedUser);

      const res = await fetch(
        `https://vanyabackenddatabase-vahr.onrender.com/review/wishlist/${user.id}`
      );

      const data = await res.json();
      setWishlist(data.wishlist || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const removeWishlist = async (id) => {
    try {
      const res = await fetch(
        `https://vanyabackenddatabase-vahr.onrender.com/review/wishlist/delete/${id}`,
        {
          method: "DELETE"
        }
      );

      const data = await res.json();

      if (data.success) {
        setWishlist(
          wishlist.filter(
            (item) => item.id !== id
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="wishlist-loading">
        Loading royal wishlist...
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .wishlist-page {
          padding: 40px 6%;
          background: linear-gradient(135deg, #f7f2f9 0%, #f3ebf5 100%);
          min-height: 100vh;
          font-family: 'Playfair Display', serif, sans-serif;
          color: #3b1443;
        }

        .wishlist-title {
          text-align: center;
          color: #3b1443;
          font-size: 38px;
          font-weight: 700;
          margin-bottom: 40px;
          letter-spacing: 0.5px;
        }

        .wishlist-empty {
          text-align: center;
          font-size: 20px;
          color: #6a2e7c;
          padding: 80px 20px;
          font-style: italic;
        }

        .wishlist-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 30px;
        }

        .wishlist-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(74, 25, 89, 0.08);
          border: 1px solid rgba(106, 46, 124, 0.18);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .wishlist-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(106, 46, 124, 0.18);
        }

        .wishlist-image-container {
          position: relative;
          height: 320px;
          overflow: hidden;
        }

        .wishlist-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .wishlist-card:hover .wishlist-image {
          transform: scale(1.06);
        }

        .wishlist-content {
          padding: 18px;
        }

        .wishlist-category {
          color: #6a2e7c;
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .wishlist-name {
          color: #3b1443;
          font-size: 17px;
          margin: 0 0 12px 0;
          height: 48px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-weight: 600;
        }

        .wishlist-price {
          color: #3b1443;
          font-size: 18px;
          font-weight: 700;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 16px;
        }

        .wishlist-old {
          color: #9c7aa6;
          font-size: 13px;
          text-decoration: line-through;
          font-weight: normal;
        }

        .wishlist-actions {
          display: flex;
          gap: 10px;
        }

        .view-btn,
        .remove-btn {
          flex: 1;
          height: 40px;
          border-radius: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .view-btn {
          background: linear-gradient(135deg, #5c2069, #45154f);
          color: #fff;
          box-shadow: 0 4px 12px rgba(92, 32, 105, 0.25);
          border: none;
        }

        .view-btn:hover {
          background: linear-gradient(135deg, #6a2e7c, #5c2069);
          transform: translateY(-1px);
        }

        .remove-btn {
          border: 1px solid rgba(139, 38, 62, 0.3);
          background: rgba(139, 38, 62, 0.08);
          color: #8b263e;
        }

        .remove-btn:hover {
          background: #8b263e;
          color: #fff;
          transform: translateY(-1px);
        }

        .wishlist-loading {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          color: #6a2e7c;
          background: #f7f2f9;
          font-family: 'Playfair Display', serif;
        }

        /* Tablet & Mobile Layout adjustments */
        @media (max-width: 992px) {
          .wishlist-page {
            padding: 30px 4%;
          }
        }

        @media (max-width: 600px) {
          .wishlist-page {
            padding: 20px 15px;
          }

          .wishlist-title {
            font-size: 26px;
            margin-bottom: 25px;
          }

          .wishlist-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }

          .wishlist-image-container {
            height: 220px;
          }

          .wishlist-content {
            padding: 12px;
          }

          .wishlist-category {
            font-size: 10px;
          }

          .wishlist-name {
            font-size: 15px;
            height: 40px;
          }

          .wishlist-price {
            font-size: 16px;
            margin-bottom: 12px;
          }

          .wishlist-old {
            font-size: 12px;
          }

          .wishlist-actions {
            flex-direction: column;
            gap: 8px;
          }

          .view-btn,
          .remove-btn {
            height: 36px;
            font-size: 12px;
          }
        }

        @media (max-width: 380px) {
          .wishlist-grid {
            grid-template-columns: 1fr;
          }

          .wishlist-image-container {
            height: 280px;
          }
        }
      `}</style>

      <h1 className="wishlist-title">
        My Wishlist ❤️
      </h1>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          Your wishlist is currently empty.
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div className="wishlist-card" key={item.id}>
              <Link to={`/product/${item.product_id}`}>
                <div className="wishlist-image-container">
                  <img
                    src={item.img_url}
                    alt={item.name}
                    className="wishlist-image"
                  />
                </div>
              </Link>

              <div className="wishlist-content">
                <div className="wishlist-category">
                  {item.category || "Handcrafted Heritage"}
                </div>

                <h3 className="wishlist-name">
                  {item.name}
                </h3>

                <div className="wishlist-price">
                  ₹{Number(item.price).toLocaleString()}
                  {item.old_price && (
                    <span className="wishlist-old">
                      ₹{Number(item.old_price).toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="wishlist-actions">
                  <Link
                    to={`/product/${item.product_id}`}
                    className="view-btn"
                  >
                    View
                  </Link>

                  <button
                    className="remove-btn"
                    onClick={() => removeWishlist(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;