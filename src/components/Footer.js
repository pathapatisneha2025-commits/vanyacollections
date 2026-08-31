import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="vanya-footer">
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <p className="newsletter-tagline">✦ JOIN OUR ROYAL CIRCLE ✦</p>
        <h2 className="newsletter-title">Subscribe & Save</h2>
        <div className="title-underline"></div>
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
              <div className="contact-item"><Phone size={16} className="contact-icon" /> +91 9398728628</div>
              <div className="contact-item"><Mail size={16} className="contact-icon" /> hello@vanyacollections.com</div>
              <div className="contact-item">
                <MapPin size={16} className="pin-icon" /> 
                <span>Door No. 1-01, Thadithota, Dhanalakshmi Complex, Upstair, 16 MC Division Village, Mahathma Gandhi, Rajahmundry, Andhra Pradesh, India - 533101</span>
              </div>
            </div>
            <div className="social-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube"><Youtube size={18} /></a>
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

        /* Footer Base */
        .vanya-footer {
          background: linear-gradient(135deg, #5f0672 0%, #340d3c 100%);
          color: #fdf8f2;
          padding: 90px 5% 40px;
          font-family: 'Montserrat', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Newsletter Section */
        .newsletter-section { 
          text-align: center; 
          max-width: 650px; 
          margin: 0 auto 70px; 
        }
        .newsletter-tagline { 
          font-size: 12px; 
          letter-spacing: 4px; 
          font-weight: 600; 
          margin-bottom: 10px; 
          color: #d4af37;
        }
        .newsletter-title { 
          color: #fdf8f2; 
          font-size: clamp(2.2rem, 3.8vw, 3.2rem); 
          font-family: 'Playfair Display', serif; 
          margin-bottom: 15px; 
          font-weight: 600;
        }
        .title-underline {
          width: 70px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
          margin: 0 auto 20px auto;
        }
        .newsletter-desc { 
          color: rgba(253, 248, 242, 0.75); 
          font-size: 15px; 
          margin-bottom: 30px; 
          line-height: 1.6; 
        }
        .newsletter-form { 
          display: flex; 
          gap: 10px; 
          background: rgba(255, 255, 255, 0.03); 
          padding: 6px; 
          border-radius: 50px; 
          border: 1px solid rgba(212, 175, 55, 0.3);
          box-shadow: 0 10px 30px rgba(45, 18, 51, 0.2);
        }
        .newsletter-input { 
          background: transparent; 
          border: none; 
          padding: 12px 25px; 
          flex: 1; 
          color: #fdf8f2; 
          outline: none; 
          font-family: 'Montserrat', sans-serif;
          font-size: 14px;
        }
        .newsletter-input::placeholder { 
          color: rgba(253, 248, 242, 0.4); 
        }
        .subscribe-btn { 
          background: #d4af37; 
          color: #35153c; 
          padding: 12px 35px; 
          border-radius: 50px; 
          border: none; 
          font-weight: 600; 
          cursor: pointer; 
          transition: all 0.3s ease;
          font-family: 'Montserrat', sans-serif;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }
        .subscribe-btn:hover { 
          background: #f3c653; 
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.5); 
        }

        /* Divider */
        .footer-divider { 
          height: 1px; 
          background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent); 
          margin-bottom: 60px; 
        }

        /* Grid Layout */
        .footer-container {
          max-width: 1300px;
          margin: 0 auto;
        }
        .footer-grid { 
          display: grid; 
          grid-template-columns: 2fr 1fr 1fr 1fr; 
          gap: 40px; 
        }
        .footer-col h3 { 
          color: #d4af37; 
          font-size: 19px; 
          margin-bottom: 25px; 
          font-family: 'Playfair Display', serif; 
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .footer-col ul { 
          list-style: none; 
          padding: 0; 
          margin: 0;
        }
        .footer-col ul li { 
          margin-bottom: 12px; 
          font-size: 14px; 
          transition: transform 0.3s ease, opacity 0.3s ease; 
        }

        /* Links Styling */
        .footer-col ul li a {
          color: rgba(253, 248, 242, 0.75);        
          text-decoration: none; 
          transition: color 0.3s ease;
        }
        .footer-col ul li a:hover {
          color: #d4af37;        
        }

        /* List hover effect */
        .footer-col ul li:hover { 
          transform: translateX(5px); 
        }
        .footer-col ul li:hover a {
          opacity: 1; 
        }

        /* Brand Logo */
        .brand-col .footer-logo {
          height: 75px; 
          width: auto; 
          margin-bottom: 20px; 
          display: block;
          mix-blend-mode: screen;
          filter: brightness(1.2) contrast(1.3);
          transform: scale(1.1); 
          transform-origin: left center;
        }
        .brand-col { 
          display: flex; 
          flex-direction: column; 
          align-items: flex-start; 
        }

        .brand-story { 
          font-size: 14px; 
          line-height: 1.8; 
          margin-bottom: 25px; 
          color: rgba(253, 248, 242, 0.75); 
        }

        /* Contact & Social */
        .contact-info { 
          margin-bottom: 25px; 
        }
        .contact-item { 
          display: flex; 
          align-items: flex-start; 
          gap: 12px; 
          margin-bottom: 12px; 
          font-size: 13px; 
          color: rgba(253, 248, 242, 0.85);
          line-height: 1.5;
        }
        .contact-icon {
          color: #d4af37;
          flex-shrink: 0;
          margin-top: 2px;
        }
        .pin-icon { 
          color: #d4af37;
          flex-shrink: 0;
          margin-top: 3px; 
        }
        .social-links { 
          display: flex; 
          gap: 12px; 
        }
        .social-icon { 
          border: 1px solid rgba(212, 175, 55, 0.4); 
          background: rgba(255, 255, 255, 0.03);
          color: #d4af37;
          width: 38px;
          height: 38px; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          cursor: pointer; 
          transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1); 
        }
        .social-icon:hover { 
          background: #5c2d66; 
          border-color: #d4af37;
          color: #f3c653; 
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
        }

        /* Responsive Improvements for Mobile */
        @media (max-width: 1024px) { 
          .footer-grid { 
            grid-template-columns: repeat(2, 1fr); 
            gap: 40px;
          } 
          .brand-col {
            grid-column: span 2;
          }
        }

        @media (max-width: 600px) { 
          .vanya-footer {
            padding: 50px 16px 30px;
          }
          .newsletter-section {
            margin-bottom: 45px;
          }
          .newsletter-title {
            font-size: 1.8rem;
          }
          .newsletter-desc {
            font-size: 13.5px;
            margin-bottom: 20px;
          }
          .newsletter-form { 
            flex-direction: row; 
            background: rgba(255, 255, 255, 0.03); 
            border: 1px solid rgba(212, 175, 55, 0.3);
            border-radius: 50px;
            padding: 4px;
          }
          .newsletter-input {
            padding: 10px 15px;
            font-size: 13px;
          }
          .subscribe-btn {
            padding: 10px 20px;
            font-size: 12px;
            white-space: nowrap;
          }
          .footer-divider {
            margin-bottom: 40px;
          }
          .footer-grid { 
            grid-template-columns: repeat(2, 1fr); /* 2 columns for a neat professional desktop-like look on mobile */
            gap: 30px 15px; 
            text-align: left; 
          }
          .brand-col {
            grid-column: span 2; /* Brand spans full width at the top */
            align-items: flex-start;
          }
          .brand-col .footer-logo {
            transform-origin: left center;
            height: 60px;
          }
          .contact-item { 
            justify-content: flex-start; 
            text-align: left;
          }
          .social-links { 
            justify-content: flex-start; 
          }
          .footer-col h3 {
            font-size: 16px;
            margin-bottom: 15px;
          }
          .footer-col ul li {
            font-size: 13px;
            margin-bottom: 10px;
          }
          .footer-col ul li:hover { 
            transform: none; 
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;