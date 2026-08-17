import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const API_BASE_URL =
  'https://vanyabackenddatabase-vahr.onrender.com';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const appliedCoupon = location.state?.appliedCoupon || null;
  const locationState = location.state || {};

  const cartItems = Array.isArray(locationState.items)
    ? locationState.items
    : [];

  const totalAmount =
    locationState.totalAmount ??
    cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const [step, setStep] = useState('address');
  const [selectedMethod, setSelectedMethod] = useState('cod');

  const [loading, setLoading] = useState(false);

  const [upiSettings, setUpiSettings] = useState(null);
  const [upiLoading, setUpiLoading] = useState(false);
  const [upiError, setUpiError] = useState('');

  // Payment screenshot
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const [validationPopup, setValidationPopup] = useState({
    show: false,
    message: '',
    type: 'error'
  });

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    pinCode: '',
    city: '',
    state: '',
    address: ''
  });

  const showValidationError = (message) => {
    setValidationPopup({
      show: true,
      message,
      type: 'error'
    });
  };

  const showSuccessMessage = (message) => {
    setValidationPopup({
      show: true,
      message,
      type: 'success'
    });
  };

  const validateAddress = () => {
    const requiredFields = [
      'fullName',
      'phone',
      'email',
      'pinCode',
      'city',
      'state',
      'address'
    ];

    for (let field of requiredFields) {
      if (
        !formData[field] ||
        formData[field].trim() === ''
      ) {
        showValidationError(
          `Please enter your ${
            field === 'fullName'
              ? 'Full Name'
              : field.charAt(0).toUpperCase() +
                field.slice(1)
          }`
        );

        return false;
      }
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      showValidationError(
        'Please enter a valid 10 digit mobile number'
      );
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      showValidationError(
        'Please enter a valid email address'
      );
      return false;
    }

    if (!/^\d{6}$/.test(formData.pinCode)) {
      showValidationError(
        'Please enter a valid 6 digit PIN code'
      );
      return false;
    }

    return true;
  };

  const placeCODOrder = async () => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      showValidationError(
        'Please login to place an order.'
      );

      setTimeout(() => {
        navigate('/login');
      }, 1500);

      return;
    }

    const user = JSON.parse(storedUser);
    const userId = user.id;

    if (!cartItems.length) {
      showValidationError('Your cart is empty!');
      return;
    }

    if (!validateAddress()) {
      setStep('address');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${API_BASE_URL}/orders/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: userId,
            formData,
            cartItems,
            paymentMethod: 'cod',
            payment_status: 'pending',
            order_status: 'confirmed',
            totalAmount: subtotal
          })
        }
      );

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.success !== false) {
        showSuccessMessage(
          'Order placed successfully!'
        );

        setTimeout(() => {
          navigate(
            `/order-confirmation/${data.orderId}`,
            {
              state: {
                orderId: data.orderId
              }
            }
          );
        }, 1500);
      } else {
        showValidationError(
          data.message ||
            'Failed to place order'
        );
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      showValidationError(
        'Server error! Please try again.'
      );
    }
  };

  const loadUPISettings = async () => {
    try {
      setUpiLoading(true);
      setUpiError('');

      const response = await fetch(
        `${API_BASE_URL}/scanqr/settings`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            'Unable to load UPI payment details'
        );
      }

      if (
        !data.settings ||
        !data.settings.qr_image_url
      ) {
        throw new Error(
          'UPI QR scanner is not available'
        );
      }

      setUpiSettings(data.settings);
    } catch (error) {
      console.error(
        'UPI settings error:',
        error
      );

      setUpiError(
        error.message ||
          'Unable to load UPI payment details'
      );
    } finally {
      setUpiLoading(false);
    }
  };

  useEffect(() => {
    if (selectedMethod === 'upi') {
      loadUPISettings();
    }
  }, [selectedMethod]);

  const handleScreenshotChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      showValidationError(
        'Please upload an image file.'
      );

      e.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showValidationError(
        'Payment screenshot must be less than 5 MB.'
      );

      e.target.value = '';
      return;
    }

    setPaymentScreenshot(file);

    const previewUrl =
      URL.createObjectURL(file);

    setScreenshotPreview(previewUrl);
  };

  const submitUPIPayment = async () => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      showValidationError(
        'Please login to place an order.'
      );

      setTimeout(() => {
        navigate('/login');
      }, 1500);

      return;
    }

    const user = JSON.parse(storedUser);
    const userId = user.id;

    if (!cartItems.length) {
      showValidationError(
        'Your cart is empty!'
      );
      return;
    }

    if (!validateAddress()) {
      setStep('address');
      return;
    }

    if (!paymentScreenshot) {
      showValidationError(
        'Please upload your payment screenshot.'
      );
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();

      formDataToSend.append(
        'user_id',
        userId
      );

      formDataToSend.append(
        'formData',
        JSON.stringify(formData)
      );

      formDataToSend.append(
        'cartItems',
        JSON.stringify(cartItems)
      );

      formDataToSend.append(
        'paymentMethod',
        'upi'
      );

      formDataToSend.append(
        'payment_status',
        'pending'
      );

      formDataToSend.append(
        'order_status',
        'payment_pending'
      );

      formDataToSend.append(
        'totalAmount',
        subtotal
      );

      formDataToSend.append(
        'paymentScreenshot',
        paymentScreenshot
      );

      const response = await fetch(
        `${API_BASE_URL}/orders/add`,
        {
          method: 'POST',
          body: formDataToSend
        }
      );

      const data = await response.json();
      setLoading(false);

      if (
        response.ok &&
        data.success !== false
      ) {
        showSuccessMessage(
          'Payment screenshot submitted successfully. Your order is waiting for admin verification.'
        );

        setTimeout(() => {
          navigate(
            `/orders`,
            {
              state: {
                orderId: data.orderId,
                paymentStatus: 'pending',
                orderStatus:
                  'payment_pending'
              }
            }
          );
        }, 2000);
      } else {
        showValidationError(
          data.message ||
            'Failed to submit payment screenshot.'
        );
      }
    } catch (error) {
      console.error(
        'UPI payment submission error:',
        error
      );

      setLoading(false);

      showValidationError(
        'Server error while submitting payment. Please try again.'
      );
    }
  };

  const handlePaymentButton = () => {
    if (selectedMethod === 'upi') {
      if (!upiSettings) {
        showValidationError(
          'Please wait for the payment QR to load.'
        );

        return;
      }

      setShowPaymentForm(true);
      return;
    }

    if (selectedMethod === 'cod') {
      placeCODOrder();
      return;
    }

    showValidationError(
      'This payment method is not configured yet.'
    );
  };

  return (
    <div className="checkout-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600&display=swap');

        .checkout-container {
          background-color: #633878;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          padding: 40px 5%;
          color: #fcfcfc;
        }

        .checkout-title {
          font-family: 'Playfair Display', serif;
          font-size: 34px;
          margin-bottom: 30px;
          color: #d4af37;
          text-align: center;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .checkout-layout {
          display: grid;
          grid-template-columns: 1.8fr 1fr;
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .white-card {
          background: #ffffff;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(212, 175, 55, 0.3);
          color: #333;
        }

        .section-header {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          margin-bottom: 25px;
          color: #513277;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          font-size: 11px;
          font-weight: 700;
          color: #513277;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-group input,
        .form-group textarea {
          padding: 14px 16px;
          border: 1.5px solid #dcdcdc;
          border-radius: 12px;
          background: #ffffff;
          font-size: 15px;
          outline: none;
          width: 100%;
          box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s;
          color: #222;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #513277;
          box-shadow: 0 0 0 3px rgba(81, 50, 119, 0.15);
        }

        .payment-methods {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .method-card {
          border: 1.5px solid #e0e0e0;
          border-radius: 15px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          cursor: pointer;
          transition: 0.2s;
          background: #fff;
        }

        .method-card.active {
          border-color: #d4af37;
          background: #fffdf5;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.2);
        }

        .radio-outer {
          width: 20px;
          height: 20px;
          border: 2px solid #ccc;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .method-card.active .radio-outer {
          border-color: #d4af37;
        }

        .radio-inner {
          width: 10px;
          height: 10px;
          background: #d4af37;
          border-radius: 50%;
          display: none;
        }

        .method-card.active .radio-inner {
          display: block;
        }

        .method-text h4 {
          margin: 0;
          font-size: 15px;
          font-weight: 600;
          color: #222;
        }

        .method-text p {
          margin: 2px 0 0 0;
          font-size: 12px;
          color: #666;
        }

        .primary-btn {
          width: 100%;
          background: #513277;
          color: #d4af37;
          padding: 16px;
          border: none;
          border-radius: 35px;
          font-weight: 700;
          font-size: 16px;
          margin-top: 25px;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 4px 12px rgba(81, 50, 119, 0.2);
        }

        .primary-btn.gold {
          background: #d4af37;
          color: #513277;
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
        }

        .primary-btn:hover {
          opacity: 0.95;
          transform: translateY(-1px);
        }

        .primary-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .summary-card {
          background: #ffffff;
          padding: 25px;
          border-radius: 20px;
          border: 1px solid rgba(212, 175, 55, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          height: fit-content;
          color: #333;
        }

        .summary-title {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          color: #513277;
          margin-bottom: 20px;
          border-bottom: 2px solid #f0f0f0;
          padding-bottom: 10px;
        }

        .item-row {
          display: flex;
          gap: 15px;
          padding-bottom: 15px;
          margin-bottom: 15px;
          border-bottom: 1px solid #f0f0f0;
          align-items: center;
        }

        .item-row img {
          width: 60px;
          height: 75px;
          object-fit: cover;
          border-radius: 8px;
          flex-shrink: 0;
          border: 1px solid #eee;
        }

        .item-details h5 {
          margin: 0 0 5px 0;
          font-size: 14px;
          color: #222;
        }

        .item-details p {
          margin: 0;
          font-size: 13px;
          color: #666;
        }

        .summary-calc {
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 14px;
          color: #55s;
        }

        .calc-line {
          display: flex;
          justify-content: space-between;
        }

        .total-row {
          display: flex;
          justify-content: space-between;
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid #e0e0e0;
          align-items: center;
        }

        .total-row span {
          font-weight: 600;
          color: #333;
        }

        .total-value {
          font-size: 22px;
          font-weight: 700;
          color: #513277;
        }

        .payment-upload-card {
          margin-top: 20px;
          padding: 25px;
          border: 1px solid #d4af37;
          border-radius: 15px;
          background: #fffdf5;
        }

        .payment-upload-card h3 {
          margin-top: 0;
          color: #513277;
        }

        .payment-upload-card p {
          font-size: 13px;
          color: #666;
          line-height: 1.6;
        }

        .upload-label {
          display: block;
          margin-top: 15px;
          padding: 14px;
          border: 2px dashed #d4af37;
          border-radius: 12px;
          text-align: center;
          cursor: pointer;
          background: #fff;
          color: #513277;
          font-weight: 600;
        }

        .upload-label input {
          display: none;
        }

        .screenshot-preview {
          width: 100%;
          max-width: 280px;
          max-height: 350px;
          object-fit: contain;
          display: block;
          margin: 20px auto 0;
          border-radius: 12px;
          border: 1px solid #ddd;
          background: #fff;
        }

        .pending-note {
          margin-top: 15px;
          padding: 12px;
          border-radius: 10px;
          background: #fff3cd;
          color: #856404;
          font-size: 13px;
          line-height: 1.5;
        }

        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          box-sizing: border-box;
        }

        .validation-popup {
          width: 100%;
          max-width: 380px;
          background: white;
          border-radius: 20px;
          padding: 30px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          animation: popupScale .25s ease;
        }

        .validation-popup h3 {
          color: #513277;
          margin-bottom: 10px;
        }

        .validation-popup p {
          color: #555;
          font-size: 14px;
          margin-bottom: 25px;
          line-height: 1.5;
        }

        .validation-popup button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 30px;
          background: #513277;
          color: #d4af37;
          font-weight: 700;
          cursor: pointer;
        }

        @keyframes popupScale {
          from {
            transform: scale(.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @media (max-width: 992px) {
          .checkout-container {
            padding: 12px 8px;
          }

          .checkout-title {
            font-size: 24px;
            margin-bottom: 12px;
          }

          .checkout-layout {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .white-card,
          .summary-card {
            padding: 16px 12px;
            border-radius: 14px;
          }

          .form-grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .section-header {
            font-size: 18px;
            margin-bottom: 12px;
          }

          .form-group label {
            font-size: 10px;
          }

          .form-group input,
          .form-group textarea {
            font-size: 14px;
            padding: 10px;
            border-radius: 8px;
          }

          .primary-btn {
            padding: 14px;
            font-size: 15px;
            border-radius: 25px;
            margin-top: 15px;
          }
        }
      `}</style>

      <h1 className="checkout-title">
        Vanya Collections Checkout
      </h1>

      <div className="checkout-layout">
        <div className="white-card">
          {step === 'address' ? (
            <div className="address-section">
              <h2 className="section-header">
                Delivery Address
              </h2>

              <div className="form-grid">
                {[
                  'fullName',
                  'phone',
                  'email',
                  'pinCode',
                  'city',
                  'state'
                ].map(field => (
                  <div
                    key={field}
                    className="form-group"
                  >
                    <label>
                      {field === 'fullName'
                        ? 'Full Name'
                        : field.charAt(0).toUpperCase() +
                          field.slice(1)}
                    </label>

                    <input
                      type={
                        field === 'email'
                          ? 'email'
                          : field === 'phone' ||
                            field === 'pinCode'
                          ? 'tel'
                          : 'text'
                      }
                      inputMode={
                        field === 'phone' ||
                        field === 'pinCode'
                          ? 'numeric'
                          : 'text'
                      }
                      value={formData[field]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field]: e.target.value
                        })
                      }
                    />
                  </div>
                ))}

                <div className="form-group full-width">
                  <label>Address</label>
                  <textarea
                    rows="2"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: e.target.value
                      })
                    }
                  />
                </div>
              </div>

              <button
                className="primary-btn"
                onClick={() => {
                  if (validateAddress()) {
                    setStep('payment');
                  }
                }}
              >
                Continue to Payment →
              </button>
            </div>
          ) : (
            <div className="payment-section">
              <h2 className="section-header">
                Payment Method
              </h2>

              <div className="payment-methods">
                {[
                  {
                    id: 'cod',
                    label: 'Cash on Delivery',
                    sub: 'Pay when you receive'
                  },
                  {
                    id: 'upi',
                    label: 'UPI / PhonePe / GPay',
                    sub: 'Scan QR and pay'
                  },
                  {
                    id: 'card',
                    label: 'Credit / Debit Card',
                    sub: 'Visa, Mastercard accepted'
                  },
                  {
                    id: 'razor',
                    label: 'Razorpay',
                    sub: 'Secure online payment'
                  }
                ].map(m => (
                  <div
                    key={m.id}
                    className={`method-card ${
                      selectedMethod === m.id
                        ? 'active'
                        : ''
                    }`}
                    onClick={() => {
                      setSelectedMethod(m.id);
                      if (m.id !== 'upi') {
                        setShowPaymentForm(false);
                      }
                    }}
                  >
                    <div className="radio-outer">
                      <div className="radio-inner"></div>
                    </div>

                    <div className="method-text">
                      <h4>{m.label}</h4>
                      <p>{m.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {selectedMethod === 'upi' && (
                <div
                  style={{
                    marginTop: 20,
                    padding: 25,
                    border: '1px solid #d4af37',
                    borderRadius: 15,
                    textAlign: 'center',
                    background: '#fffdf5'
                  }}
                >
                  <h3
                    style={{
                      marginTop: 0,
                      color: '#513277'
                    }}
                  >
                    Scan & Pay
                  </h3>

                  <p
                    style={{
                      fontSize: 13,
                      color: '#666'
                    }}
                  >
                    Scan the QR using PhonePe, Google Pay or another UPI app.
                  </p>

                  {upiLoading && <p>Loading payment QR...</p>}

                  {upiError && (
                    <p style={{ color: '#c62828' }}>
                      {upiError}
                    </p>
                  )}

                  {upiSettings &&
                    !upiLoading &&
                    !upiError && (
                      <>
                        <img
                          src={upiSettings.qr_image_url}
                          alt="UPI Payment QR"
                          style={{
                            width: 260,
                            height: 260,
                            objectFit: 'contain',
                            background: '#fff',
                            padding: 10,
                            borderRadius: 12,
                            border: '1px solid #ddd'
                          }}
                        />

                        <p
                          style={{
                            fontSize: 15,
                            fontWeight: 700,
                            color: '#513277',
                            marginTop: '10px'
                          }}
                        >
                          UPI ID: {upiSettings.upi_id}
                        </p>

                        <p
                          style={{
                            fontSize: 13,
                            color: '#666'
                          }}
                        >
                          Amount to Pay:{' '}
                          <strong>
                            ₹{subtotal.toLocaleString()}
                          </strong>
                        </p>
                      </>
                    )}
                </div>
              )}

              {selectedMethod === 'upi' &&
                showPaymentForm && (
                  <div className="payment-upload-card">
                    <h3>Payment Screenshot</h3>
                    <p>
                      After completing the UPI payment, upload the screenshot showing the successful payment.
                    </p>
                    <p>
                      Your order will remain{' '}
                      <strong>Payment Pending</strong> until an admin verifies the payment.
                    </p>

                    <label className="upload-label">
                      📷 Upload Payment Screenshot
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleScreenshotChange}
                      />
                    </label>

                    {screenshotPreview && (
                      <img
                        src={screenshotPreview}
                        alt="Payment Screenshot Preview"
                        className="screenshot-preview"
                      />
                    )}

                    {paymentScreenshot && (
                      <p
                        style={{
                          textAlign: 'center',
                          fontSize: 12,
                          color: '#513277',
                          marginTop: 10
                        }}
                      >
                        Selected: {paymentScreenshot.name}
                      </p>
                    )}

                    <button
                      className="primary-btn gold"
                      onClick={submitUPIPayment}
                      disabled={
                        loading || !paymentScreenshot
                      }
                    >
                      {loading
                        ? 'Submitting Payment...'
                        : 'Submit Payment for Verification'}
                    </button>

                    <div className="pending-note">
                      🔒 Your payment is not automatically confirmed. An admin will verify your screenshot and then confirm your order.
                    </div>
                  </div>
                )}

              {!showPaymentForm && (
                <button
                  className="primary-btn gold"
                  onClick={handlePaymentButton}
                  disabled={
                    loading ||
                    (selectedMethod === 'upi' &&
                      (upiLoading || !upiSettings))
                  }
                >
                  {loading
                    ? 'Processing...'
                    : selectedMethod === 'upi'
                    ? 'I Have Completed Payment'
                    : `Place Order — ₹${subtotal.toLocaleString()}`}
                </button>
              )}
            </div>
          )}
        </div>

        {/* ORDER SUMMARY COLUMN */}
        <div className="summary-card">
          <h3 className="summary-title">Order Summary</h3>

          <div className="summary-items-list" style={{ maxHeight: '250px', overflowY: 'auto' }}>
            {cartItems.map((item, index) => (
              <div key={index} className="item-row">
                <img
                  src={item.image || item.imageUrl || 'https://via.placeholder.com/60x75'}
                  alt={item.name}
                />
                <div className="item-details">
                  <h5>{item.name}</h5>
                  <p>Qty: {item.quantity}</p>
                  <p><strong>₹{(item.price * item.quantity).toLocaleString()}</strong></p>
                </div>
              </div>
            ))}
          </div>

          <div className="summary-calc">
            <div className="calc-line">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            {appliedCoupon && (
              <div className="calc-line" style={{ color: '#2e7d32' }}>
                <span>Coupon ({appliedCoupon.code})</span>
                <span>-₹{appliedCoupon.discount || 0}</span>
              </div>
            )}
            <div className="calc-line">
              <span>Shipping</span>
              <span style={{ color: '#2e7d32', fontWeight: 600 }}>FREE</span>
            </div>
          </div>

          <div className="total-row">
            <span>Total Amount</span>
            <span className="total-value">₹{subtotal.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {validationPopup.show && (
        <div className="popup-overlay">
          <div className="validation-popup">
            <h3>
              {validationPopup.type === 'error' ? 'Notice' : 'Success'}
            </h3>
            <p>{validationPopup.message}</p>
            <button
              onClick={() =>
                setValidationPopup({ show: false, message: '', type: 'error' })
              }
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;