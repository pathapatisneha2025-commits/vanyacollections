import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const ProductdetailedPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [mainImage, setMainImage] = useState("");
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [reviews, setReviews] = useState([]);
  const [wishlisted, setWishlisted] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ""
  });

  // Calculate average rating and review count
  const averageRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const roundedRating = Math.round(averageRating * 2) / 2; 
  const totalReviews = reviews.length;
  const totalPrice = product ? product.price * quantity : 0;

  // Generate star string
  const fullStars = "★".repeat(Math.floor(roundedRating));
  const halfStar = roundedRating % 1 === 0.5 ? "½" : ""; 
  const emptyStars = "☆".repeat(5 - Math.ceil(roundedRating));
  const starDisplay = fullStars + halfStar + emptyStars;

  const fetchReviews = async () => {
    try {
      const res = await fetch(
        `https://vanyabackenddatabase-vahr.onrender.com/review/${id}`
      );
      const data = await res.json();
      setReviews(
        Array.isArray(data)
          ? data
          : data.reviews || data.data || []
      );    
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await fetch("https://vanyabackenddatabase-vahr.onrender.com/products/all");
        const data = await res.json();
        
        const selectedProduct = data.find((item) => item.id === Number(id));
        setProduct(selectedProduct);
        setMainImage(selectedProduct?.img_url || "");

        if (selectedProduct) {
          const related = data
            .filter((item) => item.category === selectedProduct.category && item.id !== selectedProduct.id)
            .slice(0, 4); 
          setRelatedProducts(related);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
    fetchReviews(); 
    window.scrollTo(0, 0); 
  }, [id]);
    
  const addToCart = async (productId, qty = 1) => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        alert('Please login to add items to cart.');
        navigate('/login');
        return;
      }

      const user = JSON.parse(storedUser);
      const userId = user.id;

      const res = await fetch("https://vanyabackenddatabase-vahr.onrender.com/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, product_id: productId, quantity: qty }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add to cart");

      alert(`Added ${qty} item(s) to bag! ✨`);

      setProduct(prev => ({
        ...prev,
        stock: prev.stock - qty
      }));

      setQuantity(1);
    } catch (err) {
      console.error(err);
      alert("Error adding to cart: " + err.message);
    }
  };

  const addWishlist = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        alert("Please login to manage your wishlist");
        navigate("/login");
        return;
      }

      const user = JSON.parse(storedUser);
      const res = await fetch(
        "https://vanyabackenddatabase-vahr.onrender.com/review/wishlist/add",
        {
          method:"POST",
          headers:{ "Content-Type":"application/json" },
          body:JSON.stringify({
            user_id: user.id,
            product_id: product.id
          })
        }
      );

      const data = await res.json();
      if(!res.ok) throw new Error(data.error);

      setWishlisted(true);
      alert("Added to wishlist ❤️");
    } catch(err){
      console.log(err);
      alert("Wishlist action failed");
    }
  };

  const handleBuyNow = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Please login to proceed to checkout.");
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);
    const userId = user.id;

    try {
      const addRes = await fetch(
        "https://vanyabackenddatabase-vahr.onrender.com/cart/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            product_id: product.id,
            quantity,
          }),
        }
      );

      const addData = await addRes.json();
      if (!addRes.ok) throw new Error(addData.error || "Failed to add to cart");

      await new Promise((resolve) => setTimeout(resolve, 300));

      const cartRes = await fetch(`https://vanyabackenddatabase-vahr.onrender.com/cart/${userId}`);
      if (!cartRes.ok) throw new Error("Failed to fetch cart");

      const cartData = await cartRes.json();
      const cartItems = Array.isArray(cartData)
        ? cartData
        : cartData.items || cartData.cart || [];

      if (!cartItems.length) {
        alert("Cart is empty. Please try again.");
        return;
      }

      const totalAmount = cartItems.reduce((acc, item) => {
        const price = item.price ?? item.product?.price ?? 0;
        const qty = item.quantity ?? item.qty ?? 1;
        return acc + price * qty;
      }, 0);

      navigate("/checkout", { state: { items: cartItems, totalAmount } });
    } catch (err) {
      console.error(err);
      alert("Error processing your request: " + err.message);
    }
  };

  const handleAddReview = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Please login to write a review");
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    try {
      const res = await fetch(
        "https://vanyabackenddatabase-vahr.onrender.com/review/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.id,
            product_id: product.id,
            rating: newReview.rating,
            comment: newReview.comment
          })
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setReviews([data, ...reviews]); 
      setNewReview({ rating: 5, comment: "" });
      alert("Review submitted successfully! 🌟");
    } catch (err) {
      alert("Error adding review");
    }
  };

  if (loading) return <div className="pd-loading">Loading royal collection...</div>;
  if (!product) return <div className="pd-loading">Product not found.</div>;

  const discount =
    product.old_price && product.price
      ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
      : 0;

  const thumbnails = [product.img_url, ...(product.thumbnails || [])];

  return (
    <div className="pd-container">
      <style>{styles}</style>

      <div className="pd-breadcrumb">
        <Link to="/">Home</Link> &nbsp;›&nbsp; <Link to="/shop">Shop</Link> &nbsp;›&nbsp; <span>{product.name}</span>
      </div>

      <div className="pd-wrapper">
        {/* LEFT SIDE: Image Gallery */}
        <div className="pd-left">
          <div className="pd-main-img-container">
            <img src={mainImage} alt={product.name} className="pd-main-img" />
            {discount > 0 && <span className="pd-floating-badge">-{discount}% OFF</span>}
          </div>

          <div className="pd-thumbnails">
            {thumbnails.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=""
                className={`pd-thumb ${mainImage === img ? "active-thumb" : ""}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: Product Info */}
        <div className="pd-right">
          <p className="pd-category">{product.category || "Handcrafted Heritage"}</p>
          <h1 className="pd-title">{product.name}</h1>

          <div className="pd-rating">
            <span className="stars">{starDisplay}</span>
            <span className="rating-text">
              {averageRating.toFixed(1)} ({totalReviews} verified review{totalReviews !== 1 ? "s" : ""})
            </span>
          </div>

          <div className="pd-price-row">
            <span className="pd-price">
              ₹{Number(totalPrice).toLocaleString()}
            </span>
            {product.old_price && (
              <>
                <span className="pd-old">
                  ₹{Number(product.old_price).toLocaleString()}
                </span>
                <span className="pd-discount">Save {discount}%</span>
              </>
            )}
          </div>

          <div className="pd-stock">
            {product.stock > 0 ? (
              <span className="stock-badge in-stock">
                ✓ In Stock ({product.stock} pieces available)
              </span>
            ) : (
              <span className="stock-badge out-stock">✕ Currently Out of Stock</span>
            )}
          </div>

          <hr className="pd-divider" />

          <div className="pd-spec-grid">
            <div className="pd-spec-box">
              <span>FABRIC</span>
              <p>Pure Kanjeevaram Silk</p>
            </div>
            <div className="pd-spec-box">
              <span>LENGTH</span>
              <p>6.2 meters with Blouse</p>
            </div>
            <div className="pd-spec-box">
              <span>OCCASION</span>
              <p>Festive & Bridal Wear</p>
            </div>
            <div className="pd-spec-box">
              <span>AUTHENTICITY</span>
              <p>Handloom Certified</p>
            </div>
          </div>

          <div className="pd-qty-row">
            <span className="pd-qty-label">Quantity:</span>
            <div className="pd-qty">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <div className="pd-action-section">
            <div className="pd-main-actions">
              <button 
                className="pd-add-to-bag"
                onClick={() => addToCart(product.id, quantity)}
                disabled={product.stock === 0}
              >
                <span>👜</span> Add to Bag
              </button>

              <button 
                className={`pd-icon-btn ${wishlisted ? "active-wishlist" : ""}`}
                title="Wishlist"
                onClick={addWishlist}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlisted ? "#8b263e":"none"} stroke={wishlisted ? "#8b263e":"currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </button>

              <button 
                className="pd-icon-btn" 
                title="Share"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: product.name, url: window.location.href });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </button>
            </div>

            <button className="pd-buy-now" onClick={handleBuyNow} disabled={product.stock === 0}>
              ⚡ Proceed to Checkout
            </button>
          </div>

          <div className="pd-trust">
            <div>🛡️ 100% Handloom Certified</div>
            <div>🚚 Free Insured Shipping</div>
            <div>🔄 7-Day Easy Returns</div>
          </div>

          <div className="pd-tabs">
            <button className={activeTab === "description" ? "active" : ""} onClick={() => setActiveTab("description")}>
              Description
            </button>
            <button className={activeTab === "care" ? "active" : ""} onClick={() => setActiveTab("care")}>
              Care & Weave
            </button>
            <button className={activeTab === "reviews" ? "active" : ""} onClick={() => setActiveTab("reviews")}>
              Reviews ({totalReviews})
            </button>
          </div>

          <div className="pd-tab-content">
            {activeTab === "description" && (
              <p className="tab-text">{product.description || "Exquisite drape woven with genuine zari threads, reflecting a majestic heritage aesthetic crafted for elite celebrations."}</p>
            )}
            {activeTab === "care" && (
              <p className="tab-text">Dry clean only. Store your handloom saree wrapped in clean muslin cloth in a dry, cool place. Air occasionally away from direct sunlight.</p>
            )}
            {activeTab === "reviews" && (
              <div className="reviews-section">
                <div className="review-form">
                  <h3>Leave Your Feedback</h3>
                  <div className="star-input">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${star <= newReview.rating ? "active-star" : ""}`}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <textarea
                    placeholder="Share your experience with this saree..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  />

                  <button className="submit-review-btn" onClick={handleAddReview}>Post Review</button>
                </div>

                <div className="review-list">
                  {reviews.length === 0 && <p className="no-reviews">No reviews for this product yet. Be the first to share your experience!</p>}

                  {reviews.map((rev) => (
                    <div key={rev.id} className="review-card">
                      <div className="review-rating">
                        {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                      </div>
                      <p className="review-comment">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS SECTION */}
      {relatedProducts.length > 0 && (
        <section className="related-section">
          <p className="related-subtitle">COMPLETE YOUR WARDROBE</p>
          <h2 className="related-title">You May Also Like</h2>

          <div className="related-grid">
            {relatedProducts.map((item) => {
              const relatedDiscount = item.old_price
                ? Math.round(((item.old_price - item.price) / item.old_price) * 100)
                : 0;

              return (
                <div key={item.id} className="related-card-wrapper">
                  <Link to={`/product/${item.id}`} className="related-card">
                    <div className="related-img-container">
                      <img src={item.img_url} alt={item.name} />
                      <div className="related-badges">
                        {relatedDiscount > 0 && (
                          <span className="badge-discount">-{relatedDiscount}%</span>
                        )}
                      </div>
                    </div>

                    <div className="related-info">
                      <p className="related-item-cat">{item.category || "Saree"}</p>
                      <h3 className="related-item-name">{item.name}</h3>
                      <div className="related-price-row">
                        <span className="related-curr-price">₹{Number(item.price).toLocaleString()}</span>
                        {item.old_price && (
                          <span className="related-old-price">₹{Number(item.old_price).toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};

const styles = `
.pd-container {
  padding: 40px 6%;
  font-family: 'Playfair Display', serif, sans-serif;
  background: linear-gradient(135deg, #f7f2f9 0%, #f3ebf5 100%);
  color: #3b1443;
  min-height: 100vh;
}

.pd-loading {
  text-align: center;
  padding: 100px;
  font-size: 20px;
  color: #6a2e7c;
  background: #f7f2f9;
  min-height: 100vh;
}

.pd-breadcrumb {
  margin-bottom: 25px;
  color: #6a2e7c;
  font-size: 14px;
}

.pd-breadcrumb a {
  color: #6a2e7c;
  text-decoration: none;
}

.pd-breadcrumb span {
  color: #3b1443;
  font-weight: 600;
}

.pd-wrapper {
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
}

.pd-left, .pd-right {
  flex: 1 1 450px;
}

.pd-main-img-container {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(74, 25, 89, 0.15);
  background: #fff;
  border: 1px solid rgba(106, 46, 124, 0.2);
}

.pd-main-img {
  width: 100%;
  height: 520px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.pd-main-img:hover {
  transform: scale(1.03);
}

.pd-floating-badge {
  position: absolute;
  top: 20px;
  left: 20px;
  background: linear-gradient(135deg, #8b263e, #6b1b2f);
  color: #fff;
  padding: 6px 14px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
}

.pd-thumbnails {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  overflow-x: auto;
  padding-bottom: 5px;
}

.pd-thumb {
  width: 80px;
  height: 90px;
  border-radius: 12px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid rgba(106, 46, 124, 0.2);
  transition: all 0.2s ease;
  box-shadow: 0 4px 10px rgba(74, 25, 89, 0.08);
}

.pd-thumb.active-thumb {
  border-color: #6a2e7c;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(106, 46, 124, 0.25);
}

.pd-category {
  color: #6a2e7c;
  letter-spacing: 3px;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.pd-title {
  font-size: 36px;
  color: #3b1443;
  margin: 0 0 15px 0;
  font-weight: 700;
  line-height: 1.2;
}

.pd-rating {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.stars {
  color: #d4af37;
  font-size: 18px;
  letter-spacing: 2px;
}

.rating-text {
  font-size: 14px;
  color: #6e4878;
}

.pd-price-row {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.pd-price {
  font-size: 32px;
  font-weight: 800;
  color: #3b1443;
}

.pd-old {
  text-decoration: line-through;
  color: #896d91;
  font-size: 18px;
}

.pd-discount {
  background: rgba(106, 46, 124, 0.12);
  color: #6a2e7c;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  border: 1px solid rgba(106, 46, 124, 0.25);
}

.pd-stock {
  margin-bottom: 20px;
}

.stock-badge {
  font-size: 14px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 30px;
  display: inline-block;
}

.stock-badge.in-stock {
  background: rgba(46, 125, 50, 0.1);
  color: #2e7d32;
  border: 1px solid rgba(46, 125, 50, 0.2);
}

.stock-badge.out-stock {
  background: rgba(198, 40, 40, 0.1);
  color: #c62828;
  border: 1px solid rgba(198, 40, 40, 0.2);
}

.pd-divider {
  margin: 20px 0;
  border: none;
  border-top: 1px solid rgba(106, 46, 124, 0.2);
}

.pd-spec-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 25px;
}

.pd-spec-box {
  background: linear-gradient(135deg, #ffffff 0%, #f9f5fb 100%);
  padding: 16px;
  border-radius: 14px;
  box-shadow: 0 4px 15px rgba(74, 25, 89, 0.06);
  border: 1px solid rgba(106, 46, 124, 0.18);
}

.pd-spec-box span {
  font-size: 11px;
  color: #6a2e7c;
  letter-spacing: 1.5px;
  font-weight: 700;
}

.pd-spec-box p {
  margin: 6px 0 0 0;
  font-size: 15px;
  font-weight: 600;
  color: #3b1443;
}

.pd-qty-row {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
}

.pd-qty-label {
  font-weight: 600;
  color: #3b1443;
}

.pd-qty {
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid rgba(106, 46, 124, 0.35);
  border-radius: 30px;
  padding: 8px 20px;
  background: #fff;
  color: #3b1443;
  box-shadow: 0 2px 8px rgba(74, 25, 89, 0.05);
}

.pd-qty button {
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
  color: #6a2e7c;
  font-weight: bold;
}

.pd-action-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 25px;
}

.pd-main-actions {
  display: flex;
  gap: 12px;
}

.pd-add-to-bag {
  flex: 1;
  background: linear-gradient(135deg, #5c2069, #45154f);
  color: #fff;
  padding: 16px;
  border-radius: 40px;
  border: none;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  box-shadow: 0 6px 20px rgba(92, 32, 105, 0.3);
  transition: all 0.3s ease;
}

.pd-add-to-bag:hover:not(:disabled) {
  background: linear-gradient(135deg, #6a2e7c, #5c2069);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(92, 32, 105, 0.4);
}

.pd-add-to-bag:disabled {
  background: #d8cce0;
  color: #888;
  cursor: not-allowed;
}

.pd-icon-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid rgba(106, 46, 124, 0.35);
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #5c2069;
  transition: all 0.2s ease;
  box-shadow: 0 4px 10px rgba(74, 25, 89, 0.08);
}

.pd-icon-btn:hover {
  background: #f4ecf7;
  border-color: #5c2069;
  transform: translateY(-2px);
}

.pd-buy-now {
  width: 100%;
  background: linear-gradient(135deg, #d4af37 0%, #aa8c2c 100%); /* Luxurious Royal Gold gradient */
  color: #3b1443; /* Deep purple text for high contrast and readability on gold */
  padding: 16px;
  border-radius: 40px;
  border: 1px solid #f3e5ab;
  font-weight: 800;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
}

.pd-buy-now:hover:not(:disabled) {
  background: linear-gradient(135deg, #e2be42, #b89832);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.6);
}

.pd-buy-now:disabled {
  background: #d8cce0;
  color: #888;
  border: none;
  cursor: not-allowed;
  box-shadow: none;
}

.pd-trust {
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
  background: linear-gradient(135deg, #ffffff 0%, #f9f5fb 100%);
  border-radius: 14px;
  font-size: 13px;
  color: #5c2069;
  font-weight: 600;
  margin-bottom: 25px;
  border: 1px solid rgba(106, 46, 124, 0.18);
  box-shadow: 0 4px 12px rgba(74, 25, 89, 0.05);
}

.pd-tabs {
  display: flex;
  background: #e6d8ec;
  border-radius: 30px;
  padding: 4px;
  margin-bottom: 15px;
  border: 1px solid rgba(106, 46, 124, 0.15);
}

.pd-tabs button {
  flex: 1;
  padding: 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: 600;
  color: #6e4878;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.pd-tabs button.active {
  background: #5c2069;
  color: #fff;
  box-shadow: 0 4px 12px rgba(92, 32, 105, 0.25);
}

.pd-tab-content {
  background: #fff;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 6px 25px rgba(74, 25, 89, 0.08);
  min-height: 140px;
  border: 1px solid rgba(106, 46, 124, 0.18);
}

.tab-text {
  line-height: 1.7;
  color: #451b4f;
}

.review-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 25px;
}

.review-form h3 {
  margin: 0;
  color: #3b1443;
  font-size: 18px;
}

.star-input {
  font-size: 30px;
  cursor: pointer;
  display: flex;
  gap: 6px;
}

.star {
  color: #d8c5df;
  transition: transform 0.2s ease, color 0.2s ease;
}

.star:hover {
  transform: scale(1.2);
}

.active-star {
  color: #d4af37;
}

.review-form textarea {
  min-height: 90px;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid rgba(106, 46, 124, 0.3);
  background: #f9f5fb;
  color: #3b1443;
  font-family: inherit;
  resize: vertical;
}

.review-form textarea::placeholder {
  color: #9c7aa6;
}

.submit-review-btn {
  background: #5c2069;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 30px;
  font-weight: 700;
  cursor: pointer;
  width: fit-content;
  box-shadow: 0 4px 12px rgba(92, 32, 105, 0.25);
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.review-card {
  background: #f9f5fb;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgba(106, 46, 124, 0.18);
}

.review-rating {
  color: #d4af37;
  margin-bottom: 6px;
  font-size: 14px;
}

.review-comment {
  margin: 0;
  color: #3b1443;
  font-size: 14px;
}

.no-reviews {
  color: #6a2e7c;
  font-style: italic;
  margin: 0;
}

/* Related Products */
.related-section {
  margin-top: 80px;
  text-align: center;
}

.related-subtitle {
  color: #6a2e7c;
  letter-spacing: 3px;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 8px;
}

.related-title {
  font-size: 38px;
  color: #3b1443;
  margin-bottom: 40px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 25px;
  text-align: left;
}

.related-card-wrapper {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(74, 25, 89, 0.08);
  border: 1px solid rgba(106, 46, 124, 0.18);
  transition: transform 0.3s ease;
}

.related-card-wrapper:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(106, 46, 124, 0.18);
}

.related-card {
  text-decoration: none;
  color: inherit;
  display: block;
}

.related-img-container {
  position: relative;
  height: 320px;
  overflow: hidden;
}

.related-img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.related-card:hover .related-img-container img {
  transform: scale(1.06);
}

.related-badges {
  position: absolute;
  top: 15px;
  left: 15px;
}

.badge-discount {
  background: #8b263e;
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: bold;
}

.related-info {
  padding: 18px;
}

.related-item-cat {
  font-size: 11px;
  color: #6a2e7c;
  margin-bottom: 4px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 600;
}

.related-item-name {
  font-size: 17px;
  color: #3b1443;
  margin-bottom: 10px;
  font-weight: 600;
}

.related-price-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.related-curr-price {
  font-size: 18px;
  font-weight: 700;
  color: #3b1443;
}

.related-old-price {
  font-size: 13px;
  color: #9c7aa6;
  text-decoration: line-through;
}

@media(max-width: 768px) {
  .pd-wrapper {
    flex-direction: column;
    gap: 30px;
  }
  .pd-title {
    font-size: 28px;
  }
  .pd-price {
    font-size: 26px;
  }
  .related-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  .related-img-container {
    height: 220px;
  }
}
`;

export default ProductdetailedPage;