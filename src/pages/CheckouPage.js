import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // useNavigate for redirect

const CheckoutPage = () => {
  const location = useLocation();
 const appliedCoupon = location.state?.appliedCoupon || null;
const locationState = location.state || {};
const cartItems = Array.isArray(locationState.items) ? locationState.items : [];
const totalAmount = locationState.totalAmount ?? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);  const [step, setStep] = useState('address'); // 'address' or 'payment'
  const [selectedMethod, setSelectedMethod] = useState('cod');
    const [loading, setLoading] = useState(false); // loading state
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    pinCode: '',
    city: '',
    state: '',
    address: ''
  });
 const placeOrder = async () => {
  const storedUser = localStorage.getItem('user');
  if (!storedUser) {
    alert('Please login to place an order.');
    navigate('/login');
    return;
  }

  const user = JSON.parse(storedUser); // parse stored user object
  const userId = user.id;              // extract id

  if (!cartItems.length) {
    alert('Cart is empty!');
    return;
  }

  setLoading(true);

  try {
    const res = await fetch('https://vanyabackenddatabase.onrender.com/orders/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,       // <-- pass user ID
        formData,
        cartItems,
        paymentMethod: selectedMethod,
        totalAmount: subtotal
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      alert('Order placed successfully!');
      navigate(`/order-confirmation/${data.orderId}`, { state: { orderId: data.orderId } });
    } else {
      alert(data.message || 'Failed to place order');
    }
  } catch (err) {
    console.error(err);
    setLoading(false);
    alert('Server error! Please try again.');
  }
};
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="checkout-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600&display=swap');

        .checkout-container { background-color:#fcfcfc; min-height:100vh; font-family:'Inter',sans-serif; padding:40px 5%; color:#333; }
        .checkout-title { font-family:'Playfair Display',serif; font-size:32px; margin-bottom:30px; color:#063b2a; }
        .checkout-layout { display:grid; grid-template-columns:1.8fr 1fr; gap:40px; max-width:1200px; margin:0 auto; }
        .white-card { background:#fff; padding:30px; border-radius:20px; box-shadow:0 4px 20px rgba(0,0,0,0.03); border:1px solid #f0f0f0; }
        .section-header { font-family:'Playfair Display',serif; font-size:24px; margin-bottom:25px; color:#063b2a; }
        .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        .form-group { display:flex; flex-direction:column; gap:8px; }
        .form-group.full-width { grid-column:1 / -1; }
        .form-group label { font-size:11px; font-weight:700; color:#999; text-transform:uppercase; }
        .form-group input, .form-group textarea { padding:14px 18px; border:1.5px solid #f0f0f0; border-radius:12px; background:#f9f9f9; font-size:14px; outline:none; }
        .payment-methods { display:flex; flex-direction:column; gap:15px; }
        .method-card { border:1.5px solid #e0e0e0; border-radius:15px; padding:20px; display:flex; align-items:center; gap:15px; cursor:pointer; transition:0.2s; }
        .method-card.active { border-color:#d4af37; background:#fff; box-shadow:0 4px 12px rgba(212,175,55,0.1); }
        .radio-outer { width:20px; height:20px; border:2px solid #ccc; border-radius:50%; display:flex; align-items:center; justify-content:center; }
        .method-card.active .radio-outer { border-color:#d4af37; }
        .radio-inner { width:10px; height:10px; background:#d4af37; border-radius:50%; display:none; }
        .method-card.active .radio-inner { display:block; }
        .method-text h4 { margin:0; font-size:15px; font-weight:600; }
        .method-text p { margin:2px 0 0 0; font-size:12px; color:#888; }
        .primary-btn { width:100%; background:#063b2a; color:#d4af37; padding:18px; border:none; border-radius:40px; font-weight:700; font-size:15px; margin-top:30px; cursor:pointer; transition:0.3s; }
        .primary-btn.gold { background:#d4af37; color:#000; }
        .primary-btn:hover { opacity:0.9; transform:translateY(-1px); }
        .summary-card { background:#fff; padding:25px; border-radius:20px; border:1px solid #f0f0f0; height:fit-content; }
        .item-row { display:flex; gap:15px; padding-bottom:20px; margin-bottom:20px; border-bottom:1px solid #f0f0f0; }
        .item-row img { width:60px; height:75px; object-fit:cover; border-radius:8px; }
        .total-row { display:flex; justify-content:space-between; margin-top:20px; padding-top:20px; border-top:1px solid #f0f0f0; }
        .total-value { font-size:22px; font-weight:700; color:#b8860b; }
        @media (max-width: 992px) { .checkout-layout { grid-template-columns:1fr; } }
      `}</style>

      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-layout">
        {/* Left Section: Conditional Rendering */}
        <div className="white-card">
          {step === 'address' ? (
            <div className="address-section">
              <h2 className="section-header">Delivery Address</h2>
              <div className="form-grid">
                {['fullName','phone','email','pinCode','city','state'].map(field => (
                  <div key={field} className="form-group">
                    <label>{field === 'fullName' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      value={formData[field]}
                      onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                    />
                  </div>
                ))}
                <div className="form-group full-width">
                  <label>Address</label>
                  <textarea rows="3" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}></textarea>
                </div>
              </div>
              <button className="primary-btn" onClick={() => setStep('payment')}>
                Continue to Payment →
              </button>
            </div>
          ) : (
            <div className="payment-section">
              <h2 className="section-header">Payment Method</h2>
              <div className="payment-methods">
                {[
                  { id: 'cod', label: 'Cash on Delivery', sub: 'Pay when you receive' },
                  { id: 'upi', label: 'UPI / PhonePe / GPay', sub: 'Instant payment' },
                  { id: 'card', label: 'Credit / Debit Card', sub: 'Visa, Mastercard accepted' },
                  { id: 'razor', label: 'Razorpay', sub: 'Secure online payment' }
                ].map(m => (
                  <div key={m.id} className={`method-card ${selectedMethod === m.id ? 'active' : ''}`} onClick={() => setSelectedMethod(m.id)}>
                    <div className="radio-outer"><div className="radio-inner"></div></div>
                    <div className="method-text"><h4>{m.label}</h4><p>{m.sub}</p></div>
                  </div>
                ))}
              </div>
  <button
                className="primary-btn gold"
                onClick={placeOrder}
                disabled={loading}
              >                Place Order — ₹{subtotal.toLocaleString()}
              </button>
              <p style={{textAlign:'center', marginTop:20, cursor:'pointer', fontSize:14, color:'#666'}} onClick={() => setStep('address')}>
                ← Edit Address
              </p>
            </div>
          )}
        </div>

        {/* Right Section: Order Summary */}
        <div className="summary-card">
          <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:20, fontWeight:700}}>
            <span role="img" aria-label="bag">📋</span> Order Summary
          </div>

          {cartItems.length === 0 ? (
            <p style={{textAlign:'center', color:'#888'}}>Your cart is empty</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="item-row">
                <img src={item.img_url} alt={item.name} />
                <div style={{flex:1}}>
                  <h4 style={{fontSize:14, margin:0, color:'#063b2a'}}>{item.name}</h4>
                  <p style={{fontSize:12, color:'#888', margin:0}}>×{item.quantity}</p>
                </div>
                <div style={{fontWeight:600, color:'#d4af37'}}>₹{(item.price * item.quantity).toLocaleString()}</div>
              </div>
            ))
          )}

          <div style={{display:'flex', justifyContent:'space-between', fontSize:14, marginBottom:10}}>
            <span>Subtotal</span>
  <span>₹{totalAmount.toLocaleString()}</span>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', fontSize:14, marginBottom:10}}>
            <span>Shipping</span>
            <span style={{color:'#063b2a', fontWeight:700}}>FREE</span>
          </div>

          <div className="total-row">
            <span style={{fontFamily:'Playfair Display', fontSize:18, fontWeight:700}}>Total</span>
            <span className="total-value">₹{totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;