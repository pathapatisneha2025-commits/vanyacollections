import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import CartPage from '../pages/CartPage';

const Navbar = () => {
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
          const res = await fetch(`https://vanyabackenddatabase.onrender.com/cart/${user.id}`);
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
  };

  return (
    <div style={styles.container}>
      <nav className="navbar-layout" style={styles.navbar}>
        
        {/* 1. Logo (Left on mobile) */}
        <div className="logo-section" style={styles.logoSection}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img src="/logo.jpeg" alt="Vanya Logo" style={styles.logoImage} />
          </Link>
        </div>

        {/* Desktop Links (Hidden on mobile) */}
        <div className="nav-links-desktop" style={styles.navLinks}>
          <Link to="/" style={styles.link}>HOME</Link>
          <Link to="/shop" style={styles.link}>SHOP</Link>
          <Link to="/collection" style={styles.link}>COLLECTIONS</Link>
          <Link to="/about" style={styles.link}>ABOUT</Link>
          <Link to="/contact" style={styles.link}>CONTACT</Link>
        </div>

        {/* 2. Action Icons (Center on mobile) */}
        <div className="icon-group-mobile" style={styles.iconGroup}>
          <Search size={20} style={styles.icon} />
          
          {user ? (
            <div style={{ position: 'relative' }}>
              <button style={styles.userDropdownBtn} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <User size={22} style={styles.icon} />
              </button>
              {isDropdownOpen && (
                <div style={styles.userDropdownMenu}>
                  <button onClick={handleLogout} style={styles.dropdownItemBtn}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/AuthPage"><User size={22} style={styles.icon} /></Link>
          )}
          
          <Heart size={20} style={styles.icon} />
          
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={22} style={styles.icon} />
            {cartItems.length > 0 && (
              <span style={styles.badge}>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
            )}
          </div>
        </div>

        {/* 3. Mobile Toggle (Right on mobile) */}
        <div className="mobile-toggle" style={styles.mobileToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
          
          /* Desktop is kept as is. Mobile (992px and below) matches the screenshot */
          @media (max-width: 992px) {
            .navbar-layout {
              display: grid !important;
              /* LOGO | ICONS | HAMBURGER */
              grid-template-columns: 1fr auto auto !important; 
              gap: 15px;
              padding: 0 15px !important;
              align-items: center;
              height: 60px !important;
            }
            .nav-links-desktop { display: none !important; }
            
            .logo-section {
              justify-content: flex-start !important;
              margin-right: 0 !important;
            }

            .icon-group-mobile {
              justify-content: center !important;
              gap: 12px !important; /* Tighter spacing for mobile icons */
            }

            .mobile-toggle { 
              display: flex !important; 
              justify-content: flex-end;
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
  height: '60px',        // Increased height to fill the bar vertically
  width: 'auto',
  display: 'block',
  /* 'lighten' or 'screen' removes the black background of a JPEG */
  mixBlendMode: 'screen', 
  /* Removes any natural padding the browser might add */
  padding: 0,
  margin: 0,
  /* This ensures the image behaves like a block and fills the height */
  objectFit: 'contain',
  /* Slight scale-up helps hide tiny 1px borders often found in JPEGs */
  transform: 'scale(1.1)', 
},

logoSection: { 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center',
  padding: '0',
  marginRight: '20px',
  /* Ensure this container doesn't add extra height */
  height: '100%',
  overflow: 'hidden',
},

navbar: {
  backgroundColor: '#063b2a', 
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 5%', // Reduced vertical padding to 0 so logo can touch edges
  height: '70px',  // Explicit height helps alignment
  color: '#d4af37',
},

  navLinks: { display: 'flex', gap: '25px', alignItems: 'center' },
  link: { color: '#ffffff', textDecoration: 'none', fontSize: '13px', fontWeight: '400', letterSpacing: '1px' },
  iconGroup: { display: 'flex', gap: '18px', alignItems: 'center', color: '#d4af37' },
  icon: { cursor: 'pointer', strokeWidth: '1.5px', color: '#d4af37' },
  mobileToggle: { display: 'none', color: '#d4af37', cursor: 'pointer' },
  mobileMenu: { position: 'absolute', top: '100%', left: 0, width: '100%', backgroundColor: '#063b2a', display: 'flex', flexDirection: 'column', zIndex: 999, borderTop: '1px solid #084d37' },
  mobileNavLink: { color: 'white', padding: '15px 5%', textDecoration: 'none', borderBottom: '1px solid #084d37', fontSize: '14px' },
  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#d4af37',
    color: '#063b2a',
    fontSize: '10px',
    fontWeight: 'bold',
    borderRadius: '50%',
    padding: '2px 6px',
  },
  userDropdownBtn: { background: 'none', border: 'none', padding: 0, cursor: 'pointer' },
  userDropdownMenu: { position: 'absolute', top: '100%', right: 0, backgroundColor: '#063b2a', border: '1px solid #084d37', borderRadius: '4px', minWidth: '100px' },
  dropdownItemBtn: { background: 'none', border: 'none', color: '#fff', padding: '10px', cursor: 'pointer', width: '100%' }
};

export default Navbar;