import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import CartPage from '../pages/CartPage';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    if (location.state?.user) {
      setUser(location.state.user);
    }
  }, [location]);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const res = await fetch(`https://vanyabackenddatabase-vahr.onrender.com/cart/${user.id}`);
          const data = await res.json();
          setCartItems(data.items || []);
        } catch (err) {
          console.error('Failed to fetch cart:', err);
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    };
    fetchCart();
  }, [user]);

  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsDropdownOpen(false);
  };

  return (
    <div style={styles.container}>
      <nav className="navbar-layout" style={styles.navbar}>
        
        {/* 1. Logo Section */}
        <div className="logo-section" style={styles.logoSection}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', height: '100%' }}>
            <img src="/vanyalogo.png" alt="Vanya Logo" style={styles.logoImage} />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="nav-links-desktop" style={styles.navLinks}>
          <Link to="/" style={styles.link}>HOME</Link>
          <Link to="/shop" style={styles.link}>SHOP</Link>
          <Link to="/collection" style={styles.link}>COLLECTIONS</Link>
          <Link to="/about" style={styles.link}>ABOUT</Link>
          <Link to="/contact" style={styles.link}>CONTACT</Link>
        </div>

        {/* 2. Action Icons */}
        <div className="icon-group-mobile" style={styles.iconGroup}>
          <Search size={20} style={styles.icon} />
          
          {user ? (
            <div style={{ position: 'relative' }}>
              <button style={styles.userDropdownBtn} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <User size={22} style={styles.icon} />
              </button>
              {isDropdownOpen && (
                <div style={styles.userDropdownMenu}>
                  <button
                    onClick={() => {
                      navigate("/ProfilePage");
                      setIsDropdownOpen(false);
                    }}
                    style={styles.dropdownItemBtn}
                  >
                    My Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    style={styles.dropdownItemBtn}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/AuthPage" style={{ display: 'flex', alignItems: 'center' }}><User size={22} style={styles.icon} /></Link>
          )}
          
          <div
            style={{ cursor: "pointer", position: "relative", display: 'flex', alignItems: 'center' }}
            onClick={() => navigate("/wishlist")}
          >
            <Heart size={20} style={styles.icon} />
          </div>         
          
          <div style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={22} style={styles.icon} />
            {cartItems.length > 0 && (
              <span style={styles.badge}>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
            )}
          </div>
        </div>

        {/* 3. Mobile / Android Hamburger Toggle */}
        <div className="mobile-toggle" style={styles.mobileToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </nav>

      {/* Mobile & Android Slide Menu Overlay */}
      {isMenuOpen && (
        <div style={styles.mobileMenu}>
          <Link to="/" style={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>HOME</Link>
          <Link to="/shop" style={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>SHOP</Link>
          <Link to="/collection" style={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>COLLECTIONS</Link>
          <Link to="/about" style={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>ABOUT</Link>
          <Link to="/contact" style={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>CONTACT</Link>
        </div>
      )}

      <CartPage 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQty={updateQty}
        onRemove={removeItem}
      />

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
          
          @media (max-width: 992px) {
            .navbar-layout {
              display: grid !important;
              grid-template-columns: 1fr auto auto !important; 
              gap: 12px;
              padding: 0 12px !important;
              align-items: center;
              height: 60px !important;
            }
            .nav-links-desktop { display: none !important; }
            
            .logo-section {
              justify-content: flex-start !important;
              margin-right: 0 !important;
            }

            .icon-group-mobile {
              justify-content: flex-end !important;
              gap: 14px !important; 
            }

            .mobile-toggle { 
              display: flex !important; 
              justify-content: flex-end;
              align-items: center;
            }
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
  logoImage: {
    /* Adjusted to a compact, proportionate height that fits properly on both mobile and web */
    height: '42px', 
    width: 'auto',
    display: 'block',
    mixBlendMode: 'screen',
    objectFit: 'contain',
    filter: 'brightness(1.15) contrast(1.1)',
  },
  logoSection: { 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'flex-start',
    padding: '0',
    height: '100%', 
  },
  navbar: {
    backgroundColor: '#522b5b', 
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 5%', 
    height: '70px', 
    color: '#f3c653', 
    boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
  },
  navLinks: { display: 'flex', gap: '30px', alignItems: 'center' },
  link: { color: '#fdf8f2', textDecoration: 'none', fontSize: '13px', fontWeight: '500', letterSpacing: '1.2px', transition: 'color 0.2s' },
  iconGroup: { display: 'flex', gap: '20px', alignItems: 'center', color: '#f3c653' },
  icon: { cursor: 'pointer', strokeWidth: '1.5px', color: '#f3c653' },
  mobileToggle: { display: 'none', color: '#f3c653', cursor: 'pointer' },
  mobileMenu: { 
    position: 'absolute', 
    top: '100%', 
    left: 0, 
    width: '100%', 
    backgroundColor: '#522b5b', 
    display: 'flex', 
    flexDirection: 'column', 
    zIndex: 999, 
    borderTop: '1px solid #63366e',
    boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
  },
  mobileNavLink: { 
    color: '#fdf8f2', 
    padding: '16px 6%', 
    textDecoration: 'none', 
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)', 
    fontSize: '14px',
    letterSpacing: '1px',
    fontWeight: '500'
  },
  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#f3c653',
    color: '#522b5b',
    fontSize: '10px',
    fontWeight: 'bold',
    borderRadius: '50%',
    padding: '2px 6px',
  },
  userDropdownBtn: { background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' },
  userDropdownMenu: { 
    position: 'absolute', 
    top: 'calc(100% + 10px)', 
    right: 0, 
    backgroundColor: '#522b5b', 
    border: '1px solid #63366e', 
    borderRadius: '6px', 
    minWidth: '130px', 
    boxShadow: '0 6px 16px rgba(0,0,0,0.4)',
    overflow: 'hidden',
    zIndex: 1000
  },
  dropdownItemBtn: { 
    background: 'none', 
    border: 'none', 
    color: '#fdf8f2', 
    padding: '12px 16px', 
    cursor: 'pointer', 
    width: '100%', 
    textAlign: 'left',
    fontSize: '13px',
    transition: 'background 0.2s'
  }
};

export default Navbar;