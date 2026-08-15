import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, X, Trash2, Tag, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

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
          background: #ffffff; 
          box-shadow: -15px 0 40px rgba(74, 35, 90, 0.15); 
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
          background: rgba(74, 35, 90, 0.5); 
          backdrop-filter: blur(6px); 
          z-index: 2000; 
          animation: fadeIn 0.3s ease;
        }
        
        .cart-header { 
          padding: 24px; 
          background: #5b2c6f; 
          color: #f39c12; 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          border-bottom: 1px solid rgba(243, 156, 18, 0.25);
        }
        .header-title { font-family: 'Playfair Display', serif; font-weight: 700; font-size: 20px; display: flex; align-items: center; gap: 12px; }
        .item-count { color: #5b2c6f; font-weight: 700; font-size: 13px; background: #f39c12; padding: 2px 10px; border-radius: 20px; }
        .close-btn { 
          background: rgba(255, 255, 255, 0.1); 
          border: none; 
          color: #f39c12; 
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer; 
          transition: all 0.2s; 
        }
        .close-btn:hover { background: rgba(243, 156, 18, 0.2); transform: scale(1.05); }

        .cart-body { flex: 1; overflow-y: auto; padding: 24px; background: #f9f8fc; }
        
        .cart-item { 
          display: flex; 
          gap: 16px; 
          padding: 16px; 
          border-radius: 16px; 
          margin-bottom: 16px; 
          background: #ffffff; 
          box-shadow: 0 4px 20px rgba(74, 35, 90, 0.05); 
          border: 1px solid rgba(243, 156, 18, 0.2); 
          align-items: center;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cart-item:hover {
          box-shadow: 0 6px 24px rgba(74, 35, 90, 0.1);
          transform: translateY(-2px);
        }
        .item-img img { width: 75px; height: 95px; object-fit: cover; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.08); }
        .item-details { flex: 1; }
        .item-cat { font-size: 10px; color: #d68910; margin: 0; letter-spacing: 1.5px; font-weight: 700; text-transform: uppercase; }
        .item-name { font-size: 15px; margin: 4px 0 8px 0; color: #5b2c6f; font-weight: 700; font-family: 'Playfair Display', serif; line-height: 1.3; }
        .item-price { font-weight: 700; color: #5b2c6f; font-size: 16px; }
        
        .item-actions { display: flex; align-items: center; justify-content: space-between; margin-top: 12px; }
        .qty-selector { display: flex; align-items: center; border: 1.5px solid #e2e8f0; border-radius: 30px; background: #fff; overflow: hidden; }
        .qty-selector button { border: none; background: #f8fafc; padding: 6px 12px; cursor: pointer; color: #5b2c6f; font-weight: bold; font-size: 14px; transition: background 0.2s; }
        .qty-selector button:hover { background: #e2e8f0; }
        .qty-selector span { padding: 0 8px; font-size: 13px; font-weight: 700; min-width: 20px; text-align: center; color: #5b2c6f; }
        
        .remove-btn { 
          background: #fff5f5; 
          border: 1px solid #fed7d7; 
          width: 32px;
          height: 32px;
          border-radius: 50%; 
          cursor: pointer; 
          color: #e53e3e; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          transition: all 0.2s; 
        }
        .remove-btn:hover { background: #ffe3e3; transform: scale(1.05); }

        /* Modern Coupon Container */
        .coupons-container {
          background: #ffffff;
          border: 1.5px dashed #f39c12;
          border-radius: 16px;
          padding: 18px;
          margin-top: 20px;
          box-shadow: 0 4px 15px rgba(243, 156, 18, 0.08);
        }
        .coupons-title {
          font-size: 12px;
          font-weight: 700;
          color: #5b2c6f;
          text-transform: uppercase;
          margin-bottom: 12px;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .coupon-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .coupon-chip {
          background: linear-gradient(135deg, #fef9e7 0%, #fcf3cf 100%);
          border: 1px solid #f9e79f;
          border-radius: 10px;
          padding: 8px 12px;
          font-size: 11px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 3px;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .coupon-chip:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(243, 156, 18, 0.25);
          border-color: #f39c12;
        }
        .coupon-chip-code {
          font-weight: 700;
          color: #5b2c6f;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .coupon-chip-desc {
          color: #b7950b;
          font-size: 10px;
          font-weight: 600;
        }

        .cart-footer { 
          padding: 24px; 
          border-top: 1px solid #eae6df; 
          background: #ffffff; 
          box-shadow: 0 -10px 30px rgba(74, 35, 90, 0.05); 
        }
        
        .coupon-section { display: flex; gap: 10px; margin-bottom: 18px; }
        .coupon-section input { 
          flex: 1; 
          padding: 12px 18px; 
          border: 1.5px solid #dcd6cd; 
          border-radius: 30px; 
          background: #f9f8fc; 
          font-family: inherit; 
          font-size: 13px; 
          outline: none;
          transition: all 0.2s;
        }
        .coupon-section input:focus { border-color: #5b2c6f; background: #fff; box-shadow: 0 0 0 3px rgba(91, 44, 111, 0.1); }
        
        .apply-btn { 
          background: #5b2c6f; 
          color: #f39c12; 
          border: none; 
          padding: 0 22px; 
          border-radius: 30px; 
          cursor: pointer; 
          font-weight: 700; 
          font-size: 13px; 
          transition: all 0.2s;
        }
        .apply-btn:hover { background: #6c3483; transform: translateY(-1px); }

        .summary-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .summary-label { font-size: 14px; color: #64748b; font-weight: 500; }
        .summary-value { font-size: 14px; color: #1e293b; font-weight: 600; }
        .total-row { border-top: 1.5px solid #eae6df; padding-top: 12px; margin-top: 8px; }
        .total-amount { font-weight: 800; color: #5b2c6f; font-size: 22px; font-family: 'Playfair Display', serif; }
        
        .shipping-note { font-size: 11px; color: #94a3b8; margin-bottom: 18px; text-align: left; }
        
        .checkout-btn { 
          width: 100%; 
          background: linear-gradient(135deg, #5b2c6f 0%, #7d3c98 100%); 
          color: #f39c12; 
          padding: 16px; 
          border: none; 
          border-radius: 35px; 
          font-weight: 700; 
          cursor: pointer; 
          margin-bottom: 10px; 
          font-size: 15px; 
          letter-spacing: 0.5px; 
          box-shadow: 0 6px 20px rgba(91, 44, 111, 0.25); 
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); 
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .checkout-btn:hover { opacity: 0.95; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(91, 44, 111, 0.35); }
        
        .continue-btn { 
          width: 100%; 
          background: transparent; 
          border: 1.5px solid #5b2c6f; 
          color: #5b2c6f; 
          padding: 12px; 
          border-radius: 35px; 
          cursor: pointer; 
          font-size: 13px; 
          font-weight: 700; 
          transition: all 0.2s; 
        }
        .continue-btn:hover { background: rgba(91, 44, 111, 0.05); }

        /* Popup Notification */
        .coupon-popup-overlay{
          position:fixed;
          inset:0;
          background:rgba(74, 35, 90, 0.6);
          backdrop-filter: blur(4px);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index:99999;
          animation:fadeIn .25s ease;
          padding: 20px;
        }

        .coupon-popup{
          width:100%;
          max-width:340px;
          background:#fff;
          border-radius:24px;
          padding:30px 24px;
          text-align:center;
          box-shadow:0 25px 50px rgba(74, 35, 90, 0.25);
          animation:popupScale .3s cubic-bezier(0.16, 1, 0.3, 1);
          border: 1px solid rgba(243, 156, 18, 0.3);
        }

        .coupon-popup-icon{
          width:64px;
          height:64px;
          margin:0 auto 16px;
          border-radius:50%;
          display:flex;
          align-items:center;
          justify-content:center;
        }
        .coupon-popup-icon.success{ background: #ecfdf5; color:#059669; }
        .coupon-popup-icon.error{ background: #fef2f2; color:#dc2626; }

        .coupon-popup h2{ margin:0 0 8px; color:#5b2c6f; font-size:20px; font-family: 'Playfair Display', serif; }
        .coupon-popup p{ color:#64748b; font-size:14px; line-height:1.5; margin:0; }
        
        .coupon-popup button{
          margin-top:24px;
          width:100%;
          border:none;
          background:#5b2c6f;
          color:#f39c12;
          padding:14px;
          border-radius:30px;
          cursor:pointer;
          font-size:14px;
          font-weight:700;
          transition: opacity 0.2s;
        }
        .coupon-popup button:hover { opacity: 0.9; }

        @keyframes popupScale{
          from{ transform:scale(.85); opacity:0; }
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
          .cart-header, .cart-footer { padding: 18px; }
          .cart-body { padding: 16px; }
        }
      `}</style>

      {isOpen && <div className="cart-overlay" onClick={onClose}></div>}

      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div className="header-title">
            <ShoppingBag size={20} color="#f39c12" /> Your Bag 
            <span className="item-count">{cartItems.length}</span>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '120px' }}>
              <div style={{ display: 'inline-flex', padding: '24px', background: '#f4ecf7', borderRadius: '50%', marginBottom: '16px' }}>
                <ShoppingBag size={40} color="#7d3c98" style={{ opacity: 0.6 }} />
              </div>
              <p style={{ color: '#5b2c6f', fontSize: '18px', fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: '0 0 6px 0' }}>Your bag is empty</p>
              <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>Explore our exquisite collection of sarees and add your favorites.</p>
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
                    <button className="remove-btn" onClick={() => handleRemove(item.id)} title="Remove item">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Interactive Available Coupons Section */}
          {coupons.length > 0 && cartItems.length > 0 && (
            <div className="coupons-container">
              <div className="coupons-title">
                <Tag size={13} color="#5b2c6f" /> Available Offers
              </div>
              <div className="coupon-chips">
                {coupons.map(c => (
                  <div 
                    key={c.id} 
                    className="coupon-chip"
                    onClick={() => processApplyCoupon(c.code)}
                  >
                    <span className="coupon-chip-code">
                      <Tag size={10} /> {c.code}
                    </span>
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
            <div className="summary-row" style={{ color: '#059669' }}>
              <span className="summary-label" style={{ color: '#059669' }}>Discount ({appliedCoupon.code})</span>
              <span className="summary-value" style={{ color: '#059669' }}>-₹{discountAmount.toLocaleString()}</span>
            </div>
          )}

          <div className="summary-row total-row">
            <span className="summary-label" style={{ fontWeight: 700, color: '#5b2c6f' }}>Total</span>
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
            Proceed to Checkout <ArrowRight size={16} />
          </button>
          <button className="continue-btn" onClick={onClose}>Continue Shopping</button>
        </div>
      </div>

      {couponPopup.show && (
        <div className="coupon-popup-overlay">
          <div className="coupon-popup">
            <div className={`coupon-popup-icon ${couponPopup.success ? "success" : "error"}`}>
              {couponPopup.success ? <CheckCircle2 size={32} /> : <AlertCircle size={32} />}
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