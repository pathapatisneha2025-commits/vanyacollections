import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="vanya-footer">
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <p className="newsletter-tagline">JOIN OUR ROYAL CIRCLE</p>
        <h2 className="newsletter-title">Subscribe & Save</h2>
        <p className="newsletter-desc">
          Be the first to know about new collections, exclusive offers, and styling tips.
        </p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Enter your email address" className="newsletter-input" />
          <button type="submit" className="subscribe-btn">Subscribe</button>
        </form>
      </div>

      <div className="footer-divider" />

      {/* Main Footer Content */}
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-col brand-col">
            <img src="/vanyalogo.png" alt="Vanya Collections" className="footer-logo" />
            <p className="brand-story">
              Vanya Collections brings you the finest handpicked sarees from the looms of India's master weavers. 
              Each piece is a testament to timeless elegance and exquisite craftsmanship.
            </p>
            <div className="contact-info">
              <div className="contact-item"><Phone size={16} /> +91 9398728628</div>
              <div className="contact-item"><Mail size={16} /> hello@vanyacollections.com</div>
              <div className="contact-item">
                <MapPin size={16} className="pin-icon" /> 
                <span>Door No. 1-01, Thadithota
Dhanalakshmi Complex, Upstair
16 MC Division Village, Mahathma Gandhi
Rajahmundry, Andhra Pradesh
India - 533101</span>
              </div>
            </div>
            <div className="social-links">
              <div className="social-icon"><Instagram size={18} /></div>
              <div className="social-icon"><Facebook size={18} /></div>
              <div className="social-icon"><Twitter size={18} /></div>
              <div className="social-icon"><Youtube size={18} /></div>
            </div>
          </div>

          {/* Links Columns */}
       <div className="footer-col">
  <h3>Shop</h3>
  <ul>
    <li><Link to="/collection">Silk Sarees</Link></li>
    <li><Link to="/collection">Cotton Sarees</Link></li>
    <li><Link to="/collection">Designer Sarees</Link></li>
    <li><Link to="/collection">Wedding Collection</Link></li>
    <li><Link to="/collection">Party Wear</Link></li>
    <li><Link to="/collection">New Arrivals</Link></li>
  </ul>
</div>

         <div className="footer-col">
  <h3>Help & Info</h3>
  <ul>
    <li><Link to="/about">About Us</Link></li>
    <li><Link to="/contact">Contact Us</Link></li>
    <li><Link to="/shipping-policy">Shipping Policy</Link></li>
    <li><Link to="/return-policy">Return Policy</Link></li>
    <li><Link to="/size-guide">Size Guide</Link></li>
    <li><Link to="/faq">FAQ</Link></li>
  </ul>
</div>
          <div className="footer-col">
  <h3>My Account</h3>
  <ul>
    <li><Link to="/ProfilePage">My Account</Link></li>
    <li><Link to="/orders">My Orders</Link></li>
    <li><Link to="/wishlist">Wishlist</Link></li>
    <li><Link to="/orders">Track Order</Link></li>
  </ul>
</div>
        </div>
      </div>

     <style>{`
  /* Footer Base */
  .vanya-footer {
    background-color: #0d2e1f;
    background-image: radial-gradient(#16402d 1px, transparent 1px);
    background-size: 30px 30px;
    color: #c4a46a;
    padding: 80px 5% 40px;
    font-family: 'serif';
  }

  /* Newsletter Section */
  .newsletter-section { text-align: center; max-width: 600px; margin: 0 auto 80px; }
  .newsletter-tagline { font-size: 12px; letter-spacing: 3px; font-weight: bold; margin-bottom: 10px; }
  .newsletter-title { color: #fdfaf5; font-size: 42px; font-family: 'Playfair Display', serif; margin-bottom: 20px; }
  .newsletter-desc { color: #a18a5e; font-size: 15px; margin-bottom: 30px; line-height: 1.6; }
  .newsletter-form { display: flex; gap: 10px; background: rgba(255,255,255,0.05); padding: 5px; border-radius: 50px; border: 1px solid rgba(196, 164, 106, 0.3); }
  .newsletter-input { background: transparent; border: none; padding: 12px 25px; flex: 1; color: #fdfaf5; outline: none; }
  .newsletter-input::placeholder { color: #6e7a6e; }
  .subscribe-btn { background: #d4af37; color: #0d2e1f; padding: 12px 35px; border-radius: 50px; border: none; font-weight: bold; cursor: pointer; transition: 0.3s; }
  .subscribe-btn:hover { background: #fdfaf5; box-shadow: 0 0 15px rgba(212, 175, 55, 0.4); }

  /* Divider */
  .footer-divider { height: 1px; background: rgba(196, 164, 106, 0.15); margin-bottom: 60px; }

  /* Grid Layout */
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; max-width: 1300px; margin: 0 auto; }
  .footer-col h3 { color: #d4af37; font-size: 20px; margin-bottom: 25px; font-family: 'Playfair Display', serif; }
  .footer-col ul { list-style: none; padding: 0; }
  .footer-col ul li { margin-bottom: 12px; font-size: 14px; opacity: 0.8; transition: 0.3s; }

  /* Links Styling */
  .footer-col ul li a {
    color: #c4a46a;        /* Gold text */
    text-decoration: none; /* Remove underline */
    transition: color 0.3s ease;
  }
  .footer-col ul li a:hover {
    color: #fdfaf5;        /* Lighter gold / off-white on hover */
  }

  /* List hover effect */
  .footer-col ul li:hover { transform: translateX(5px); opacity: 1; }

  /* Brand Logo */
  .brand-col .footer-logo {
    height: 80px; width: auto; margin-bottom: 20px; display: block;
    mix-blend-mode: screen;
    filter: brightness(1.2) contrast(1.3);
    transform: scale(1.15); transform-origin: left center;
    image-rendering: -webkit-optimize-contrast;
  }
  .brand-col { display: flex; flex-direction: column; align-items: flex-start; padding-top: 10px; }

  .brand-story { font-size: 14px; line-height: 1.8; margin-bottom: 25px; color: #a18a5e; }

  /* Contact & Social */
  .contact-info { margin-bottom: 25px; }
  .contact-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; font-size: 14px; }
  .pin-icon { margin-top: 3px; }
  .social-links { display: flex; gap: 15px; }
  .social-icon { border: 1px solid #c4a46a; padding: 8px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s; }
  .social-icon:hover { background: #c4a46a; color: #0d2e1f; }

  /* Responsive */
  @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1.5fr 1fr; } }
  @media (max-width: 600px) { 
    .footer-grid { grid-template-columns: 1fr; text-align: center; }
    .contact-item { justify-content: center; }
    .social-links { justify-content: center; }
    .footer-col ul li:hover { transform: none; }
  }
`}</style>
    </footer>
  );
};

export default Footer;