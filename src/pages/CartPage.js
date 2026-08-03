import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponPopup, setCouponPopup] = useState({
    show: false,
    title: "",
    message: "",
    success: false,
  });

  const showCouponPopup = (title, message, success = true) => {
    setCouponPopup({
      show: true,
      title,
      message,
      success,
    });

    setTimeout(() => {
      setCouponPopup({
        show: false,
        title: "",
        message: "",
        success: false,
      });
    }, 2000);
  };
  const navigate = useNavigate();

  // Get logged-in user ID from localStorage
  const storedUser = localStorage.getItem('user');
  const userId = storedUser ? JSON.parse(storedUser).id : null;

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) return;

      try {
        const res = await fetch(
          `https://vanyabackenddatabase-vahr.onrender.com/cart/${userId}`
        );

        const data = await res.json();

        setCartItems(
          Array.isArray(data.items) ? data.items : []
        );

      } catch (err) {
        console.error(err);
        setCartItems([]);
      }
    };

    if (isOpen) fetchCart();
  }, [isOpen, userId]);

  // Fetch available coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await fetch("https://vanyabackenddatabase-vahr.onrender.com/cart/coupons/all");
        const data = await res.json();
        if (data.success) setCoupons(data.coupons);
      } catch (err) {
        console.error("Failed to fetch coupons:", err);
      }
    };

    if (isOpen) fetchCoupons();
  }, [isOpen]);

  // Quantity update
  const handleUpdateQty = (productId, change) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );

    const item = cartItems.find(i => i.id === productId);
    if (item) {
      const newQty = Math.max(1, item.quantity + change);
      fetch('https://vanyabackenddatabase-vahr.onrender.com/cart/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, product_id: productId, quantity: newQty }),
      }).catch(err => console.error(err));
    }
  };

  // Remove item
  const handleRemove = async (cartId) => {
    try {
      setCartItems(prev => prev.filter(item => item.id !== cartId));
      const res = await fetch(`https://vanyabackenddatabase-vahr.onrender.com/cart/delete/${cartId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to remove item from cart');
    } catch (err) {
      console.error(err);
      alert("Could not remove item from cart. Try again.");
    }
  };

  // Apply coupon helper logic
  const processApplyCoupon = (codeToApply) => {
    const coupon = coupons.find(
      c => c.code.trim().toLowerCase() === codeToApply.trim().toLowerCase()
    );

    if (!coupon) {
      showCouponPopup(
        "Invalid Coupon",
        "Please enter a valid coupon code.",
        false
      );
      return;
    }

    const eligibleItems = cartItems.filter(item => {
      if (coupon.apply_type === "category") {
        return (
          item.category?.trim().toLowerCase() ===
          coupon.category_name?.trim().toLowerCase()
        );
      }

      if (coupon.apply_type === "product") {
        return Number(item.product_id) === Number(coupon.product_id);
      }

      return true;
    });

    if (eligibleItems.length === 0) {
      showCouponPopup(
        "Coupon Not Applicable",
        "This coupon doesn't apply to any items in your cart.",
        false
      );
      return;
    }

    const eligibleSubtotal = eligibleItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (eligibleSubtotal < Number(coupon.min_amount)) {
      showCouponPopup(
        "Minimum Purchase Required",
        `Minimum purchase of ₹${coupon.min_amount} is required.`,
        false
      );
      return;
    }

    setAppliedCoupon(coupon);
    setCouponInput(coupon.code);

    showCouponPopup(
      "Coupon Applied",
      `${coupon.code} applied successfully!`,
      true
    );
  };

  const handleApplyCoupon = () => {
    processApplyCoupon(couponInput);
  };

  // Subtotal and discounted total
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  const discountAmount = appliedCoupon
    ? appliedCoupon.discount_type === "percentage"
      ? (subtotal * parseFloat(appliedCoupon.discount_value)) / 100
      : parseFloat(appliedCoupon.discount_value)
    : 0;

  const discountedTotal = Math.max(0, subtotal - discountAmount);

  return (
    <>
      <style>{`
        .cart-drawer { 
          position: fixed; 
          top: 0; 
          right: -480px; 
          width: 450px; 
          max-width: 100%; 
          height: 100%; 
          background: #fdfdfd; 
          box-shadow: -10px 0 30px rgba(0,0,0,0.15); 
          z-index: 2001; 
          transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1); 
          display: flex; 
          flex-direction: column; 
          font-family: 'Inter', sans-serif; 
        }
        .cart-drawer.open { right: 0; }
        .cart-overlay { 
          position: fixed; 
          top: 0; 
          left: 0; 
          width: 100%; 
          height: 100%; 
          background: rgba(6, 59, 42, 0.45); 
          backdrop-filter: blur(4px); 
          z-index: 2000; 
          animation: fadeIn 0.3s ease;
        }
        
        .cart-header { 
          padding: 20px 24px; 
          background: #063b2a; 
          color: #d4af37; 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
        }
        .header-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 20px; display: flex; align-items: center; gap: 10px; }
        .item-count { color: #d4af37; opacity: 0.9; font-size: 15px; background: rgba(212, 175, 55, 0.15); padding: 2px 10px; border-radius: 20px; }
        .close-btn { background: none; border: none; color: #d4af37; font-size: 22px; cursor: pointer; padding: 5px; transition: transform 0.2s; }
        .close-btn:hover { transform: scale(1.1); }

        .cart-body { flex: 1; overflow-y: auto; padding: 20px; background: #f8f9f8; }
        
        .cart-item { 
          display: flex; 
          gap: 14px; 
          padding: 14px; 
          border-radius: 14px; 
          margin-bottom: 14px; 
          background: #ffffff; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.03); 
          border: 1px solid rgba(0,0,0,0.04); 
          align-items: center;
        }
        .item-img img { width: 65px; height: 85px; object-fit: cover; border-radius: 8px; }
        .item-details { flex: 1; }
        .item-cat { font-size: 10px; color: #888; margin: 0; letter-spacing: 1px; font-weight: 600; text-transform: uppercase; }
        .item-name { font-size: 14px; margin: 3px 0 6px 0; color: #063b2a; font-weight: 700; font-family: 'Playfair Display', serif; }
        .item-price { font-weight: 700; color: #b8860b; font-size: 15px; }
        
        .item-actions { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; }
        .qty-selector { display: flex; align-items: center; border: 1.5px solid #e5e5e5; border-radius: 20px; background: #fff; }
        .qty-selector button { border: none; background: none; padding: 4px 10px; cursor: pointer; color: #063b2a; font-weight: bold; font-size: 14px; }
        .qty-selector span { padding: 0 6px; font-size: 13px; font-weight: 600; min-width: 15px; text-align: center; }
        
        .remove-btn { background: #fdf2f2; border: none; padding: 8px; border-radius: 50%; cursor: pointer; color: #e53e3e; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
        .remove-btn:hover { background: #fee2e2; }

        /* Modern Coupon Container */
        .coupons-container {
          background: #fff;
          border: 1.5px dashed #d4af37;
          border-radius: 12px;
          padding: 14px;
          margin-top: 15px;
        }
        .coupons-title {
          font-size: 12px;
          font-weight: 700;
          color: #063b2a;
          text-transform: uppercase;
          margin-bottom: 8px;
          letter-spacing: 0.5px;
        }
        .coupon-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .coupon-chip {
          background: #fdfaf0;
          border: 1px solid #ebd691;
          border-radius: 8px;
          padding: 6px 10px;
          font-size: 11px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 2px;
          transition: all 0.2s;
        }
        .coupon-chip:hover {
          background: #f7ecce;
          border-color: #d4af37;
        }
        .coupon-chip-code {
          font-weight: 700;
          color: #063b2a;
        }
        .coupon-chip-desc {
          color: #666;
          font-size: 10px;
        }

        .cart-footer { 
          padding: 20px 24px; 
          border-top: 1px solid #eee; 
          background: #fff; 
          border-radius: 24px 24px 0 0; 
          box-shadow: 0 -10px 25px rgba(0,0,0,0.04); 
        }
        
        .coupon-section { display: flex; gap: 8px; margin-bottom: 16px; }
        .coupon-section input { 
          flex: 1; 
          padding: 12px 16px; 
          border: 1.5px solid #e0e0e0; 
          border-radius: 25px; 
          background: #f9f9f9; 
          font-family: inherit; 
          font-size: 13px; 
          outline: none;
          transition: border-color 0.2s;
        }
        .coupon-section input:focus { border-color: #063b2a; background: #fff; }
        
        .apply-btn { 
          background: #063b2a; 
          color: #d4af37; 
          border: none; 
          padding: 0 18px; 
          border-radius: 25px; 
          cursor: pointer; 
          font-weight: 700; 
          font-size: 13px; 
          transition: opacity 0.2s;
        }
        .apply-btn:hover { opacity: 0.9; }

        .summary-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
        .summary-label { font-size: 14px; color: #666; font-weight: 500; }
        .summary-value { font-size: 14px; color: #333; font-weight: 600; }
        .total-row { border-top: 1px solid #eee; padding-top: 10px; margin-top: 6px; }
        .total-amount { font-weight: 800; color: #b8860b; font-size: 20px; font-family: 'Playfair Display', serif; }
        
        .shipping-note { font-size: 11px; color: #888; margin-bottom: 16px; text-align: left; }
        
        .checkout-btn { 
          width: 100%; 
          background: #063b2a; 
          color: #d4af37; 
          padding: 16px; 
          border: none; 
          border-radius: 35px; 
          font-weight: 700; 
          cursor: pointer; 
          margin-bottom: 10px; 
          font-size: 15px; 
          letter-spacing: 0.5px; 
          box-shadow: 0 4px 15px rgba(6, 59, 42, 0.2); 
          transition: transform 0.2s, opacity 0.2s;
        }
        .checkout-btn:hover { opacity: 0.95; transform: translateY(-1px); }
        
        .continue-btn { 
          width: 100%; 
          background: transparent; 
          border: 1.5px solid #063b2a; 
          color: #063b2a; 
          padding: 12px; 
          border-radius: 35px; 
          cursor: pointer; 
          font-size: 13px; 
          font-weight: 700; 
          transition: 0.2s; 
        }
        .continue-btn:hover { background: rgba(6, 59, 42, 0.05); }

        /* Popup Notification */
        .coupon-popup-overlay{
          position:fixed;
          inset:0;
          background:rgba(0,0,0,.4);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index:99999;
          animation:fadeIn .25s ease;
          padding: 20px;
        }

        .coupon-popup{
          width:100%;
          max-width:330px;
          background:#fff;
          border-radius:20px;
          padding:25px;
          text-align:center;
          box-shadow:0 20px 45px rgba(0,0,0,.18);
          animation:popupScale .3s ease;
        }

        .coupon-popup-icon{
          width:60px;
          height:60px;
          margin:0 auto 15px;
          border-radius:50%;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:28px;
          color:#fff;
        }
        .coupon-popup-icon.success{ background:#22c55e; }
        .coupon-popup-icon.error{ background:#ef4444; }

        .coupon-popup h2{ margin:0 0 8px; color:#063b2a; font-size:20px; font-family: 'Playfair Display', serif; }
        .coupon-popup p{ color:#666; font-size:14px; line-height:1.4; margin:0; }
        
        .coupon-popup button{
          margin-top:20px;
          width:100%;
          border:none;
          background:#063b2a;
          color:#d4af37;
          padding:12px;
          border-radius:25px;
          cursor:pointer;
          font-size:14px;
          font-weight:700;
        }

        @keyframes popupScale{
          from{ transform:scale(.8); opacity:0; }
          to{ transform:scale(1); opacity:1; }
        }

        @keyframes fadeIn{
          from{ opacity:0; }
          to{ opacity:1; }
        }

        /* Mobile Adjustments */
        @media (max-width: 480px) {
          .cart-drawer { width: 100%; right: -100%; }
          .cart-drawer.open { right: 0; }
          .cart-header, .cart-footer { padding: 16px; }
          .cart-body { padding: 12px; }
        }
      `}</style>

      {isOpen && <div className="cart-overlay" onClick={onClose}></div>}

      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div className="header-title">
            <span>👜</span> Your Bag 
            <span className="item-count">{cartItems.length}</span>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '120px' }}>
              <div style={{ fontSize: '50px', marginBottom: '15px', opacity: 0.2 }}>🛒</div>
              <p style={{ color: '#888', fontSize: '16px', fontWeight: 500 }}>Your bag is empty</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-img">
                  <img src={item.img_url} alt={item.name} />
                </div>
                <div className="item-details">
                  <p className="item-cat">{item.category?.toUpperCase() || "SILK SAREES"}</p>
                  <h4 className="item-name">{item.name}</h4>
                  <p className="item-price">₹{(item.price * item.quantity).toLocaleString()}</p>

                  <div className="item-actions">
                    <div className="qty-selector">
                      <button onClick={() => handleUpdateQty(item.id, -1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleUpdateQty(item.id, 1)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => handleRemove(item.id)}>🗑️</button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Interactive Available Coupons Section */}
          {coupons.length > 0 && cartItems.length > 0 && (
            <div className="coupons-container">
              <div className="coupons-title">Available Offers</div>
              <div className="coupon-chips">
                {coupons.map(c => (
                  <div 
                    key={c.id} 
                    className="coupon-chip"
                    onClick={() => processApplyCoupon(c.code)}
                  >
                    <span className="coupon-chip-code">🏷️ {c.code}</span>
                    <span className="coupon-chip-desc">
                      {c.discount_type === "percentage" ? `${c.discount_value}% OFF` : `₹${c.discount_value} OFF`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="cart-footer">
          {cartItems.length > 0 && (
            <div className="coupon-section">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponInput}
                onChange={e => setCouponInput(e.target.value)}
              />
              <button className="apply-btn" onClick={handleApplyCoupon}>Apply</button>
            </div>
          )}

          <div className="summary-row">
            <span className="summary-label">Subtotal</span>
            <span className="summary-value">₹{subtotal.toLocaleString()}</span>
          </div>

          {appliedCoupon && (
            <div className="summary-row" style={{ color: '#22c55e' }}>
              <span className="summary-label" style={{ color: '#22c55e' }}>Discount ({appliedCoupon.code})</span>
              <span className="summary-value" style={{ color: '#22c55e' }}>-₹{discountAmount.toLocaleString()}</span>
            </div>
          )}

          <div className="summary-row total-row">
            <span className="summary-label" style={{ fontWeight: 700, color: '#063b2a' }}>Total</span>
            <span className="total-amount">₹{discountedTotal.toLocaleString()}</span>
          </div>

          <p className="shipping-note">Shipping & taxes calculated at checkout</p>

          <button
            className="checkout-btn"
            onClick={() => {
              onClose();
              setTimeout(() => 
                navigate('/checkout', { 
                  state: { 
                    items: cartItems,
                    appliedCoupon: appliedCoupon, 
                    totalAmount: discountedTotal   
                  } 
                }), 
                400
              );
            }}
          >
            Proceed to Checkout →
          </button>
          <button className="continue-btn" onClick={onClose}>Continue Shopping</button>
        </div>
      </div>

      {couponPopup.show && (
        <div className="coupon-popup-overlay">
          <div className="coupon-popup">
            <div className={`coupon-popup-icon ${couponPopup.success ? "success" : "error"}`}>
              {couponPopup.success ? "✓" : "✕"}
            </div>
            <h2>{couponPopup.title}</h2>
            <p>{couponPopup.message}</p>
            <button
              onClick={() =>
                setCouponPopup({
                  show: false,
                  title: "",
                  message: "",
                  success: false,
                })
              }
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;