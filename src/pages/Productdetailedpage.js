  import React, { useState, useEffect } from "react";
  import { useParams,Link,useNavigate } from "react-router-dom";

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
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ""
  });


  // Calculate average rating and review count
  const averageRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const roundedRating = Math.round(averageRating * 2) / 2; // round to nearest 0.5
  const totalReviews = reviews.length;

  // Generate star string
  const fullStars = "★".repeat(Math.floor(roundedRating));
  const halfStar = roundedRating % 1 === 0.5 ? "½" : ""; // optional half-star
  const emptyStars = "☆".repeat(5 - Math.ceil(roundedRating));
  const starDisplay = fullStars + halfStar + emptyStars;
  const fetchReviews = async () => {
    try {
      const res = await fetch(
        `https://vanyabackenddatabase.onrender.com/review/${id}`
      );
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
      const fetchProductData = async () => {
        try {
          const res = await fetch("https://vanyabackenddatabase.onrender.com/products/all");
          const data = await res.json();
          
          const selectedProduct = data.find((item) => item.id === Number(id));
          setProduct(selectedProduct);
          setMainImage(selectedProduct?.img_url || "");

          // Filter related products by category, excluding the current one
          if (selectedProduct) {
            const related = data
              .filter((item) => item.category === selectedProduct.category && item.id !== selectedProduct.id)
              .slice(0, 4); // Show up to 4 related items
            setRelatedProducts(related);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchProductData();
        fetchReviews();   // 👈 ADD THIS

      window.scrollTo(0, 0); // Reset scroll on product change
    }, [id]);
  const addToCart = async (productId, qty = 1) => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        alert('Please login to add items to cart.');
        return;
      }

      const user = JSON.parse(storedUser);
      const userId = user.id;

      const res = await fetch("https://vanyabackenddatabase.onrender.com/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, product_id: productId, quantity: qty }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add to cart");

      alert(`Added ${qty} item(s) to cart!`);
    } catch (err) {
      console.error(err);
      alert("Error adding to cart: " + err.message);
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
    // 1️⃣ Add product to cart
    const addRes = await fetch(
      "https://vanyabackenddatabase.onrender.com/cart/add",
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

    // 2️⃣ Wait briefly for backend to commit (optional, but safer)
    await new Promise((resolve) => setTimeout(resolve, 300));

    // 3️⃣ Fetch updated cart
    const cartRes = await fetch(`https://vanyabackenddatabase.onrender.com/cart/${userId}`);
    if (!cartRes.ok) throw new Error("Failed to fetch cart");

    const cartData = await cartRes.json();

    // 4️⃣ Map cart items depending on backend structure
    const cartItems = Array.isArray(cartData)
      ? cartData
      : cartData.items || cartData.cart || [];

    if (!cartItems.length) {
      alert("Cart is empty. Please try again.");
      return;
    }

    // 5️⃣ Calculate total amount
    const totalAmount = cartItems.reduce((acc, item) => {
      // If backend nests product info
      const price = item.price ?? item.product?.price ?? 0;
      const qty = item.quantity ?? item.qty ?? 1;
      return acc + price * qty;
    }, 0);

    // 6️⃣ Navigate to checkout with state
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
      return;
    }

    const user = JSON.parse(storedUser);

    try {
      const res = await fetch(
        "https://vanyabackenddatabase.onrender.com/review/add",
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

      setReviews([data, ...reviews]); // add new review on top
      setNewReview({ rating: 5, comment: "" });

    } catch (err) {
      alert("Error adding review");
    }
  };

    if (loading) return <div style={{ padding: 80 }}>Loading...</div>;
    if (!product) return <div style={{ padding: 80 }}>Product not found</div>;

    const discount =
      product.old_price && product.price
        ? Math.round(
            ((product.old_price - product.price) / product.old_price) * 100
          )
        : 0;

    // Example thumbnails (in real scenario, you might have multiple images in product.images)
  const thumbnails = [product.img_url, ...(product.thumbnails || [])];
    return (
      <div className="pd-container">
        <style>{styles}</style>

        <div className="pd-breadcrumb">
          Home &nbsp;›&nbsp; Shop &nbsp;›&nbsp; {product.name}
        </div>

        <div className="pd-wrapper">
          {/* LEFT SIDE */}
          <div className="pd-left">
            <img src={mainImage} alt={product.name} className="pd-main-img" />

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

          {/* RIGHT SIDE */}
          <div className="pd-right">
            <p className="pd-category">{product.category}</p>
            <h1 className="pd-title">{product.name}</h1>

          <div className="pd-rating">
    <span className="stars">{starDisplay}</span>
    <span className="rating-text">
      {averageRating.toFixed(1)} ({totalReviews} review{totalReviews !== 1 ? "s" : ""})
    </span>
  </div>

            <div className="pd-price-row">
              <span className="pd-price">
                ₹{Number(product.price).toLocaleString()}
              </span>
              {product.old_price && (
                <>
                  <span className="pd-old">
                    ₹{Number(product.old_price).toLocaleString()}
                  </span>
                  <span className="pd-discount">-{discount}%</span>
                </>
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
                <p>6.2 meters</p>
              </div>
              <div className="pd-spec-box">
                <span>OCCASION</span>
                <p>Festival</p>
              </div>
              <div className="pd-spec-box">
                <span>BLOUSE PIECE</span>
                <p>Included</p>
              </div>
            </div>

            <div className="pd-qty-row">
              <span>Quantity:</span>
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
  >
    <span style={{ marginRight: '8px' }}>👜</span> Add to Bag
  </button>
                <button className="pd-icon-btn" title="Wishlist">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                      alert("Link copied!");
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

  <button className="pd-buy-now" onClick={handleBuyNow}>
    Buy Now
  </button>          </div>

            <div className="pd-trust">
              <div>🛡️ 100% Authentic</div>
              <div>🚚 Free Shipping</div>
              <div>🔄 Easy Returns</div>
            </div>

            <div className="pd-tabs">
              <button
                className={activeTab === "description" ? "active" : ""}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={activeTab === "care" ? "active" : ""}
                onClick={() => setActiveTab("care")}
              >
                Care
              </button>
              <button
                className={activeTab === "reviews" ? "active" : ""}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews
              </button>
            </div>

            <div className="pd-tab-content">
              {activeTab === "description" &&
                (product.description || "Authentic Kanjeevaram silk saree crafted with traditional zari motifs.")}
              {activeTab === "care" && "Dry clean only. Store in muslin cloth."}
  {activeTab === "reviews" && (
    <div className="reviews-section">

      {/* Add Review Form */}
      <div className="review-form">
        <h3>Write a Review</h3>

    <div className="star-input">
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={`star ${star <= newReview.rating ? "active-star" : ""}`}
        onClick={() =>
          setNewReview({ ...newReview, rating: star })
        }
      >
        ★
      </span>
    ))}
  </div>

        <textarea
          placeholder="Write your review..."
          value={newReview.comment}
          onChange={(e) =>
            setNewReview({ ...newReview, comment: e.target.value })
          }
        />

        <button onClick={handleAddReview}>Submit Review</button>
      </div>

      {/* Review List */}
      <div className="review-list">
        {reviews.length === 0 && <p>No reviews yet.</p>}

        {reviews.map((rev) => (
          <div key={rev.id} className="review-card">
            <div className="review-rating">
              {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
            </div>
            <p>{rev.comment}</p>
          </div>
        ))}
      </div>

    </div>
  )}          </div>
          </div>
        </div>

    <section className="related-section">
    <p className="related-subtitle">YOU MAY ALSO LIKE</p>
    <h2 className="related-title">Related Sarees</h2>

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
                  {item.type === "Best Seller" && (
                    <span className="badge-bestseller">BESTSELLER</span>
                  )}
                  {relatedDiscount > 0 && (
                    <span className="badge-discount">-{relatedDiscount}%</span>
                  )}
                </div>

                <button className="related-wishlist-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>

                <div className="related-hover-actions">
                  <button className="btn-quick-view">👁️ Quick View</button>
                  <button className="btn-add-cart">🛒 Add to Cart</button>
                </div>
              </div>

              <div className="related-info">
                <p className="related-item-cat">{item.category || "Saree"}</p>
                <h3 className="related-item-name">{item.name}</h3>

                <div className="related-rating">
                  <span className="related-stars">★★★★☆</span>
                  <span className="related-rev-count">(128)</span>
                </div>

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
      </div>
    );
  };

  const styles = `
  .pd-container { padding: 20px; font-family: 'Segoe UI', serif; background: #f9f9f7; }
  .pd-breadcrumb { margin-bottom: 20px; color: #666; }
  .pd-wrapper { display: flex; gap: 30px; flex-wrap: wrap; }
  .pd-left, .pd-right { flex: 1 1 400px; }
  .pd-main-img { width: 100%; border-radius: 20px; object-fit: cover; }
  .pd-thumbnails { display: flex; gap: 10px; margin-top: 15px; flex-wrap: wrap; }
  .pd-thumb { width: 70px; border-radius: 10px; cursor: pointer; border: 2px solid transparent; transition: border 0.2s; }
  .pd-thumb.active-thumb { border: 2px solid #1a3a32; }
  .pd-category { color: #d4af37; letter-spacing: 2px; font-size: 12px; }
  .pd-title { font-size: 32px; color: #1a3a32; margin: 10px 0; }
  .pd-rating { margin-bottom: 15px; }
  .stars { color: #f5b921; margin-right: 10px; }
  .pd-price-row { display: flex; align-items: center; gap: 15px; margin-bottom: 15px; flex-wrap: wrap; }
  .pd-price { font-size: 28px; font-weight: bold; color: #b8860b; }
  .pd-old { text-decoration: line-through; color: #888; }
  .pd-discount { background: #ffe5e5; color: red; padding: 4px 8px; border-radius: 6px; }
  .pd-divider { margin: 15px 0; border: none; border-top: 1px solid #ddd; }
  .pd-spec-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
  .pd-spec-box { background: #fff; padding: 15px; border-radius: 12px; }
  .pd-spec-box span { font-size: 12px; color: #999; }
  .pd-qty-row { display: flex; align-items: center; gap: 15px; margin-bottom: 15px; flex-wrap: wrap; }
  .pd-qty { display: flex; gap: 15px; border: 1px solid #ddd; border-radius: 30px; padding: 4px 15px; }
  .pd-qty button { border: none; background: none; font-size: 18px; cursor: pointer; }
  .pd-action-section { display: flex; flex-direction: column; gap: 10px; margin-top: 10px; }
  .pd-main-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
  .pd-add-to-bag { flex: 1; background: #1a3a32; color: white; padding: 14px; border-radius: 40px; border: none; font-weight: 600; cursor: pointer; display: flex; justify-content: center; align-items: center; transition: opacity 0.2s; }
  .pd-icon-btn { width: 48px; height: 48px; border-radius: 50%; border: 1px solid #e0e0e0; background: white; display: flex; justify-content: center; align-items: center; cursor: pointer; color: #666; transition: all 0.2s; }
  .pd-icon-btn:hover { background: #f5f5f5; border-color: #1a3a32; color: #1a3a32; }
  .pd-buy-now { width: 100%; background: linear-gradient(90deg, #edc331, #d4af37); color: #1a3a32; padding: 14px; border-radius: 40px; border: none; font-weight: bold; font-size: 16px; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
  .pd-buy-now:hover { filter: brightness(1.05); }
  .pd-trust { display: flex; justify-content: space-between; margin-top: 20px; font-size: 14px; color: #666; flex-wrap: wrap; gap: 10px; }
  .pd-tabs { display: flex; margin-top: 20px; flex-wrap: wrap; }
  .pd-tabs button { flex: 1; padding: 10px; border: none; background: #eee; cursor: pointer; }
  .pd-tabs button.active { background: #1a3a32; color: white; }
  .pd-tab-content { background: white; padding: 15px; border-radius: 10px; margin-top: 10px; }
  @media(max-width:768px) {
    .pd-wrapper { flex-direction: column; gap: 20px; }
    .pd-title { font-size: 26px; }
    .pd-price { font-size: 24px; }
  }
  /* Section Header */
  .related-section { margin-top: 80px; text-align: center; padding-bottom: 50px; }
  .related-subtitle { color: #d4af37; letter-spacing: 3px; font-size: 14px; margin-bottom: 5px; font-weight: 500; }
  .related-title { font-size: 42px; color: #1a3a32; margin-bottom: 45px; font-family: serif; }

  /* Grid Layout */
  .related-grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
    gap: 25px; 
    padding: 0 40px;
  }

  /* Card Image Container */
  .related-card-wrapper { position: relative; background: #fff; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
  .related-img-container { position: relative; height: 380px; overflow: hidden; }
  .related-img-container img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
  .related-card:hover .related-img-container img { transform: scale(1.08); }

  /* Badges & Icons */
  .related-badges { position: absolute; top: 15px; left: 15px; display: flex; flex-direction: column; gap: 8px; }
  .badge-bestseller { background: #d4af37; color: white; padding: 4px 10px; border-radius: 20px; font-size: 10px; font-weight: bold; }
  .badge-discount { background: #ff5252; color: white; padding: 4px 10px; border-radius: 20px; font-size: 10px; font-weight: bold; width: fit-content; }
  .related-wishlist-icon { position: absolute; top: 15px; right: 15px; background: white; border: none; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #666; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }

  /* Hover Action Buttons */
  .related-hover-actions { 
    position: absolute; bottom: -60px; left: 0; width: 100%; 
    display: flex; gap: 1px; transition: bottom 0.3s ease; 
  }
  .related-card:hover .related-hover-actions { bottom: 0; }
  .btn-quick-view, .btn-add-cart { 
    flex: 1; padding: 15px 5px; border: none; font-weight: 600; font-size: 12px; cursor: pointer;
  }
  .btn-quick-view { background: #f8f9fa; color: #1a3a32; }
  .btn-add-cart { background: #d4af37; color: #1a3a32; }

  /* Info Section */
  .related-info { padding: 20px; text-align: left; }
  .related-item-cat { font-size: 11px; color: #999; margin-bottom: 5px; letter-spacing: 1px; }
  .related-item-name { font-size: 19px; color: #1a3a32; margin-bottom: 8px; font-weight: 500; }
  .related-rating { display: flex; align-items: center; gap: 5px; margin-bottom: 12px; }
  .related-stars { color: #f5b921; font-size: 14px; }
  .related-rev-count { color: #888; font-size: 12px; }
  .related-price-row { display: flex; align-items: center; gap: 10px; }
  .related-curr-price { font-size: 20px; font-weight: bold; color: #b8860b; }
  .related-old-price { font-size: 14px; color: #bbb; text-decoration: line-through; }
  .review-form {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .review-form textarea {
    min-height: 80px;
    padding: 10px;
  }

  .review-form button {
    background: #1a3a32;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 6px;
  }

  .review-card {
    background: #f9f9f9;
    padding: 12px;
    border-radius: 10px;
    margin-bottom: 10px;
  }

  .review-rating {
    color: #f5b921;
    margin-bottom: 5px;
  }
    .star-input {
    font-size: 26px;
    cursor: pointer;
    display: flex;
    gap: 5px;
  }

  .star {
    color: #ddd;
    transition: transform 0.2s ease, color 0.2s ease;
  }

  .star:hover {
    transform: scale(1.2);
  }

  .active-star {
    color: #d4af37; /* Elegant gold */
  }

  @media(max-width: 768px) {
    .related-grid { grid-template-columns: 1fr 1fr; padding: 0 15px; gap: 15px; }
    .related-img-container { height: 260px; }
    .related-hover-actions { display: none; } /* Hide hover buttons on mobile for better UX */
  }
  `;

  export default ProductdetailedPage;