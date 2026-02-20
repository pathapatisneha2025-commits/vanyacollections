import React, { useState } from 'react';
/* Replace 'a' tags with 'Link' for smoother React navigation */
import { Link } from 'react-router-dom'; 
import { Search, User, Heart, ShoppingBag, ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div style={styles.container}>
      <nav className="navbar-layout" style={styles.navbar}>
        
        {/* Left: Mobile Toggle */}
        <div className="mobile-toggle" style={styles.mobileToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        {/* Center: Logo */}
        <div style={styles.logoSection}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={styles.logoText}>VANYA</div>
            <div style={styles.logoSubtext}>Collections</div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="nav-links-desktop" style={styles.navLinks}>
          <Link to="/" style={styles.link}>HOME</Link>
          <Link to="/shop" style={styles.link}>SHOP</Link>
        <Link to="/collection" style={styles.link}>Collections</Link>

          <Link to="/about" style={styles.link}>ABOUT</Link>
          <Link to="/contact" style={styles.link}>CONTACT</Link>
        </div>

        {/* Right: Action Icons */}
        <div className="icon-group-mobile" style={styles.iconGroup}>
          <Search size={20} style={styles.icon} className="hide-mobile" />
          <User size={22} style={styles.icon} />
          <Heart size={20} style={styles.icon} className="hide-mobile" />
          <ShoppingBag size={22} style={styles.icon} />
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div style={styles.mobileMenu}>
          <Link to="/" style={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>HOME</Link>
          <Link to="/shop" style={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>SHOP</Link>
          <Link to="/collection" style={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>COLLECTIONS</Link>
          <Link to="/about" style={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>ABOUT</Link>
          <Link to="/contact" style={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>CONTACT</Link>
        </div>
      )}

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
          
          @media (max-width: 992px) {
            .navbar-layout {
              display: grid !important;
              grid-template-columns: 1fr auto 1fr !important;
              padding: 15px 5% !important;
              background-color: #063b2a;
            }
            .nav-links-desktop { display: none !important; }
            .mobile-toggle { 
              display: flex !important; 
              justify-content: flex-start;
              align-items: center;
            }
            .icon-group-mobile {
              justify-content: flex-end !important;
            }
            .hide-mobile { display: none !important; }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Playfair Display', serif",
    width: '100%',
    position: 'sticky',
    top: 0,
    zIndex: 2000,
  },
  navbar: {
    backgroundColor: '#063b2a', 
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 5%',
    color: '#d4af37',
  },
  logoSection: { 
    textAlign: 'center', 
    lineHeight: '1.1',
  },
  logoText: { 
    fontSize: '24px', 
    fontWeight: '700', 
    letterSpacing: '4px',
    color: '#d4af37' 
  },
  logoSubtext: { 
    fontSize: '9px', 
    textTransform: 'uppercase', 
    letterSpacing: '2px',
    color: '#d4af37',
    marginTop: '2px'
  },
  navLinks: { 
    display: 'flex', 
    gap: '25px',
    alignItems: 'center'
  },
  link: { 
    color: '#ffffff', 
    textDecoration: 'none', 
    fontSize: '13px', 
    fontWeight: '400',
    letterSpacing: '1px'
  },
  iconGroup: { 
    display: 'flex', 
    gap: '18px', 
    alignItems: 'center',
    color: '#d4af37'
  },
  icon: { 
    cursor: 'pointer',
    strokeWidth: '1.5px' 
  },
  mobileToggle: {
    display: 'none', 
    color: '#d4af37',
    cursor: 'pointer'
  },
  mobileMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    backgroundColor: '#063b2a',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 999,
    borderTop: '1px solid #084d37',
    paddingBottom: '20px'
  },
  mobileNavLink: {
    color: 'white',
    padding: '15px 5%',
    textDecoration: 'none',
    borderBottom: '1px solid #084d37',
    fontSize: '14px',
    letterSpacing: '1px'
  }
};

export default Navbar;