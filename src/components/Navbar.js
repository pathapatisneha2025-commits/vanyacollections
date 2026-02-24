import React, { useState, useEffect } from 'react';
import { Link ,useLocation} from 'react-router-dom'; 
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import CartPage from '../pages/CartPage';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Load user from localStorage
  const [user, setUser] = useState(null);

  // Load user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Update user if coming from login redirect
  useEffect(() => {
    if (location.state?.user) {
      setUser(location.state.user);
    }
  }, [location]);

  // Example cart data
  // Cart items state starts empty
const [cartItems, setCartItems] = useState([]);

useEffect(() => {
  const fetchCart = async () => {
    if (user) {
      try {
        const res = await fetch(`https://vanyabackenddatabase.onrender.com/cart/${user.id}`);
        const data = await res.json();

        if (data.items) {
          setCartItems(data.items); // update state with API response
        } else {
          setCartItems([]); // fallback if no items
        }
      } catch (err) {
        console.error('Failed to fetch cart:', err);
        setCartItems([]); // clear cart on error
      }
    } else {
      setCartItems([]); // clear cart if no user
    }
  };

  fetchCart();
}, [user]);

  const updateQty = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems(cartItems.map(item => item.id === id ? {...item, quantity: newQty} : item));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div style={styles.container}>
      <nav className="navbar-layout" style={styles.navbar}>
        
        {/* Left: Mobile Toggle */}
        <div className="mobile-toggle" style={styles.mobileToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
{/* Center: Logo */}
<div style={styles.logoSection}>
  <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
    <img 
      src="/logo.jpeg" 
      alt="Vanya Logo" 
      style={styles.logoImage} 
    />
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
      {user ? (
  <div style={{ position: 'relative' }}>
    {/* Username button */}
    <button
      style={styles.userDropdownBtn}
      onClick={() => setIsDropdownOpen(prev => !prev)}
    >
      Hello, {user.fullName} ▼
    </button>

    {/* Dropdown menu */}
    {isDropdownOpen && (
      <div style={styles.userDropdownMenu}>
        {/* <Link to="/profile" style={styles.dropdownItem}>Profile</Link> */}
        <button onClick={handleLogout} style={styles.dropdownItemBtn}>Logout</button>
      </div>
    )}
  </div>
) : (
  <Link to="/AuthPage" style={{ display: 'flex', alignItems: 'center' }}>
    <User size={22} style={styles.icon} />
  </Link>
)}
          <Heart size={20} style={styles.icon} className="hide-mobile" />
          
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setIsCartOpen(true)}>
            <ShoppingBag size={22} style={styles.icon} />
            {cartItems.length > 0 && (
<span style={styles.badge}>
  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
</span>            )}
          </div>
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

      {/* Cart Sidebar */}
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
 // Replace these specific sections in your styles object

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
    logoText: { fontSize: '24px', fontWeight: '700', letterSpacing: '4px', color: '#d4af37' },
  logoSubtext: { fontSize: '9px', textTransform: 'uppercase', letterSpacing: '2px', color: '#d4af37', marginTop: '2px' },
  navLinks: { display: 'flex', gap: '25px', alignItems: 'center' },
  link: { color: '#ffffff', textDecoration: 'none', fontSize: '13px', fontWeight: '400', letterSpacing: '1px' },
  iconGroup: { display: 'flex', gap: '18px', alignItems: 'center', color: '#d4af37' },
  icon: { cursor: 'pointer', strokeWidth: '1.5px' },
  mobileToggle: { display: 'none', color: '#d4af37', cursor: 'pointer' },
  mobileMenu: { position: 'absolute', top: '100%', left: 0, width: '100%', backgroundColor: '#063b2a', display: 'flex', flexDirection: 'column', zIndex: 999, borderTop: '1px solid #084d37', paddingBottom: '20px' },
  mobileNavLink: { color: 'white', padding: '15px 5%', textDecoration: 'none', borderBottom: '1px solid #084d37', fontSize: '14px', letterSpacing: '1px' },
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
    border: '1px solid #063b2a'
  },
  logoutBtn: {
    marginLeft: '10px',
    backgroundColor: '#f2b94a',
    color: '#063b2a',
    border: 'none',
    borderRadius: '12px',
    padding: '4px 10px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  userDropdownBtn: {
  background: 'none',
  border: 'none',
  color: '#f2b94a',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '14px',
},

userDropdownMenu: {
  position: 'absolute',
  top: '100%',
  right: 0,
  backgroundColor: '#063b2a',
  border: '1px solid #084d37',
  borderRadius: '8px',
  overflow: 'hidden',
  marginTop: '5px',
  minWidth: '120px',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
},

dropdownItem: {
  color: '#fff',
  padding: '10px 15px',
  textDecoration: 'none',
  fontSize: '13px',
  cursor: 'pointer',
  borderBottom: '1px solid #084d37',
},

dropdownItemBtn: {
  background: 'none',
  border: 'none',
  color: '#fff',
  padding: '10px 15px',
  fontSize: '13px',
  textAlign: 'left',
  cursor: 'pointer',
}
};

export default Navbar;