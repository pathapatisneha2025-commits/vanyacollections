import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const navigate = useNavigate();

  // Get logged-in user ID from localStorage
  const storedUser = localStorage.getItem('user');
  const userId = storedUser ? JSON.parse(storedUser).id : null;

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`https://vanyabackenddatabase.onrender.com/cart/${userId}`);
        const data = await res.json();
        setCartItems(Array.isArray(data.items) ? data.items : []);
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
        const res = await fetch("https://vanyabackenddatabase.onrender.com/cart/coupons/all");
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
      fetch('https://vanyabackenddatabase.onrender.com/cart/update', {
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
      const res = await fetch(`https://vanyabackenddatabase.onrender.com/cart/delete/${cartId}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to remove item from cart');
    } catch (err) {
      console.error(err);
      alert("Could not remove item from cart. Try again.");
    }
  };

  // Apply coupon
  const handleApplyCoupon = () => {
    const coupon = coupons.find(c => c.code.toLowerCase() === couponInput.toLowerCase());
    if (!coupon) {
      alert("Invalid coupon code");
      return;
    }
    if (subtotal < parseFloat(coupon.min_amount)) {
      alert(`This coupon requires a minimum cart value of ₹${coupon.min_amount}`);
      return;
    }
    setAppliedCoupon(coupon);
    alert(`Coupon "${coupon.code}" applied!`);
  };

  // Subtotal and discounted total
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountedTotal = appliedCoupon
    ? appliedCoupon.discount_type === "percentage"
      ? subtotal - (subtotal * parseFloat(appliedCoupon.discount_value) / 100)
      : subtotal - parseFloat(appliedCoupon.discount_value)
    : subtotal;

  return (
    <>
      <style>{`
        .cart-drawer { position: fixed; top: 0; right: -450px; width: 400px; height: 100%; background: #fdfdfd; box-shadow: -10px 0 30px rgba(0,0,0,0.15); z-index: 2001; transition: all 0.4s; display: flex; flex-direction: column; font-family: 'Playfair Display', serif; }
        .cart-drawer.open { right: 0; }
        .cart-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(6, 59, 42, 0.4); backdrop-filter: blur(4px); z-index: 2000; }
        .cart-header { padding: 24px; background: #063b2a; color: #d4af37; display: flex; justify-content: space-between; align-items: center; }
        .header-title { font-weight: 700; font-size: 20px; display: flex; align-items: center; gap: 12px; }
        .item-count { color: #d4af37; opacity: 0.9; font-size: 16px; }
        .close-btn { background: none; border: none; color: #d4af37; font-size: 24px; cursor: pointer; }
        .cart-body { flex: 1; overflow-y: auto; padding: 20px; background: #f8f9f8; }
        .cart-item { display: flex; gap: 16px; padding: 16px; border-radius: 16px; margin-bottom: 16px; background: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid rgba(0,0,0,0.02); }
        .item-img img { width: 75px; height: 95px; object-fit: cover; border-radius: 10px; }
        .item-details { flex: 1; }
        .item-cat { font-size: 9px; color: #888; margin: 0; letter-spacing: 1.5px; font-weight: 600; }
        .item-name { font-size: 15px; margin: 4px 0; color: #063b2a; font-weight: 700; }
        .item-price { font-weight: bold; color: #b8860b; font-size: 16px; margin-bottom: 8px; }
        .item-actions { display: flex; align-items: center; justify-content: space-between; margin-top: 8px; }
        .qty-selector { display: flex; align-items: center; border: 1.5px solid #eee; border-radius: 25px; padding: 2px 8px; }
        .qty-selector button { border: none; background: none; padding: 4px 10px; cursor: pointer; color: #063b2a; font-weight: bold; }
        .qty-selector span { padding: 0 10px; font-size: 13px; font-weight: 600; min-width: 15px; text-align: center; }
        .remove-btn { background: #fdf2f2; border: none; padding: 8px; border-radius: 50%; cursor: pointer; color: #e53e3e; display: flex; align-items: center; }
        .cart-footer { padding: 25px; border-top: 1px solid #eee; background: #fff; border-radius: 30px 30px 0 0; box-shadow: 0 -10px 20px rgba(0,0,0,0.03); }
        .coupon-section { display: flex; gap: 8px; margin-bottom: 20px; }
        .coupon-section input { flex: 1; padding: 12px 20px; border: 1px solid #f0f0f0; border-radius: 25px; background: #f9f9f9; font-family: inherit; font-size: 13px; }
        .apply-btn { background: #063b2a; color: #d4af37; border: none; padding: 0 20px; border-radius: 25px; cursor: pointer; font-weight: 700; font-size: 13px; }
        .summary-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .summary-label { font-size: 15px; color: #666; font-weight: 500; }
        .total-amount { font-weight: 800; color: #b8860b; font-size: 24px; }
        .shipping-note { font-size: 11px; color: #999; margin-bottom: 20px; text-align: left; }
        .checkout-btn { width: 100%; background: #063b2a; color: #d4af37; padding: 18px; border: none; border-radius: 40px; font-weight: 700; cursor: pointer; margin-bottom: 12px; font-size: 15px; letter-spacing: 1px; box-shadow: 0 4px 15px rgba(6, 59, 42, 0.2); }
        .continue-btn { width: 100%; background: transparent; border: 1.5px solid #063b2a; color: #063b2a; padding: 14px; border-radius: 40px; cursor: pointer; font-size: 13px; font-weight: 700; transition: 0.2s; }
        .continue-btn:hover { background: rgba(6, 59, 42, 0.05); }
      `}</style>

      {isOpen && <div className="cart-overlay" onClick={onClose}></div>}

      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <div className="header-title">
            <span style={{ fontSize: '22px' }}>👜</span>
            Your Bag <span className="item-count">({cartItems.length})</span>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
              <div style={{ fontSize: '50px', marginBottom: '20px', opacity: 0.2 }}>🛒</div>
              <p style={{ color: '#999', fontSize: '18px' }}>Your bag is empty</p>
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

          {/* Display available coupons */}
          {coupons.length > 0 && (
            <div style={{ marginTop: "15px" }}>
              <strong>Available Coupons:</strong>
              <ul>
                {coupons.map(c => (
                  <li key={c.id}>{c.code} - {c.discount_type === "percentage" ? c.discount_value + "%" : "₹" + c.discount_value}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="cart-footer">
          <div className="coupon-section">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponInput}
              onChange={e => setCouponInput(e.target.value)}
            />
            <button className="apply-btn" onClick={handleApplyCoupon}>Apply</button>
          </div>

          <div className="summary-row">
            <span className="summary-label">Subtotal</span>
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
          appliedCoupon: appliedCoupon, // pass the coupon
          totalAmount: discountedTotal   // pass the discounted total
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
    </>
  );
};

export default CartPage;