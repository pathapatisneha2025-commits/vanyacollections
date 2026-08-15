import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isSignUp && formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      const endpoint = isSignUp ? 'register' : 'login';
      const payload = isSignUp
        ? { fullName: formData.fullName, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password };

      const res = await fetch(`https://vanyabackenddatabase-vahr.onrender.com/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
      } else {
        setSuccess(data.message);

        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));

        // Clear form
        setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });

        // Redirect to home with state
        navigate('/', { state: { user: data.user } });
      }
    } catch (err) {
      setError('Server error. Try again later.');
      console.error(err);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <style>{hoverEffects}</style>
      <main style={styles.mainContainer}>
        <h1 style={styles.title}>Vanya Collections</h1>
        <p style={styles.subtitle}>
          {isSignUp ? "Begin your royal journey with us" : "Access your account"}
        </p>

        <div style={styles.formCard}>
          {/* Tab Switcher */}
          <div style={styles.tabContainer}>
            <button
              type="button"
              onClick={() => { setIsSignUp(false); setError(''); setSuccess(''); }}
              style={{
                ...styles.tabBtn,
                background: !isSignUp ? '#D4AF37' : 'transparent',
                color: !isSignUp ? '#513262' : '#D4AF37',
                boxShadow: !isSignUp ? '0 4px 12px rgba(212, 175, 55, 0.3)' : 'none'
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsSignUp(true); setError(''); setSuccess(''); }}
              style={{
                ...styles.tabBtn,
                background: isSignUp ? '#D4AF37' : 'transparent',
                color: isSignUp ? '#513262' : '#D4AF37',
                boxShadow: isSignUp ? '0 4px 12px rgba(212, 175, 55, 0.3)' : 'none'
              }}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form style={styles.form} onSubmit={handleSubmit}>
            {isSignUp && (
              <div style={styles.inputGroup}>
                <span style={styles.icon}>👤</span>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  style={styles.input}
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div style={styles.inputGroup}>
              <span style={styles.icon}>✉️</span>
              <input
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Email Address"
                style={styles.input}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <span style={styles.icon}>🔒</span>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                placeholder="Password"
                style={styles.input}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {isSignUp && (
              <div style={styles.inputGroup}>
                <span style={styles.icon}>🔐</span>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  style={styles.input}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            {error && <p style={styles.errorText}>{error}</p>}
            {success && <p style={styles.successText}>{success}</p>}

            <button type="submit" style={styles.submitBtn} className="submit-btn-hover">
              {isSignUp ? 'Create Royal Account' : 'Sign In'}
            </button>
          </form>

          <div style={styles.divider}>Experience timeless heritage & luxury</div>
        </div>
      </main>
    </div>
  );
};

// ================= CSS-in-JS =================
const styles = {
  pageWrapper: {
    minHeight: '100vh',
    background: 'radial-gradient(circle at center, #633c78 0%, #513262 100%)',
    fontFamily: '"Playfair Display", serif, sans-serif',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
  },
  mainContainer: {
    textAlign: 'center',
    width: '100%',
    maxWidth: '460px',
  },
  title: {
    fontSize: '38px',
    marginBottom: '6px',
    color: '#D4AF37',
    fontWeight: '750',
    letterSpacing: '1px',
  },
  subtitle: {
    fontSize: '15px',
    color: '#f3e5ab',
    marginBottom: '30px',
    letterSpacing: '0.5px',
  },
  formCard: {
    background: 'rgba(81, 50, 98, 0.75)',
    backdropFilter: 'blur(12px)',
    padding: '40px 35px',
    borderRadius: '24px',
    border: '1px solid rgba(212, 175, 55, 0.3)',
    boxShadow: '0 15px 40px rgba(45, 25, 55, 0.6)',
    textAlign: 'left',
  },
  tabContainer: {
    display: 'flex',
    background: 'rgba(50, 30, 62, 0.6)',
    borderRadius: '30px',
    marginBottom: '30px',
    padding: '5px',
    border: '1px solid rgba(212, 175, 55, 0.2)',
  },
  tabBtn: {
    flex: 1,
    padding: '12px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '700',
    transition: 'all 0.3s ease',
    borderRadius: '25px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(65, 38, 80, 0.6)',
    border: '1px solid rgba(212, 175, 55, 0.35)',
    borderRadius: '30px',
    padding: '0 20px',
    transition: 'all 0.3s ease',
  },
  input: {
    flex: 1,
    background: 'none',
    border: 'none',
    padding: '15px 10px',
    color: '#ffffff',
    outline: 'none',
    fontSize: '14px',
    fontFamily: '"Playfair Display", serif, sans-serif',
  },
  icon: {
    opacity: 0.8,
    fontSize: '15px',
  },
  errorText: {
    color: '#ff8a8a',
    fontSize: '13px',
    margin: '0',
    fontWeight: '600',
    textAlign: 'center',
  },
  successText: {
    color: '#a3e4d7',
    fontSize: '13px',
    margin: '0',
    fontWeight: '600',
    textAlign: 'center',
  },
  submitBtn: {
    background: 'linear-gradient(135deg, #D4AF37 0%, #aa8c2c 100%)',
    color: '#513262',
    padding: '16px',
    borderRadius: '30px',
    border: 'none',
    fontWeight: '800',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    boxShadow: '0 6px 20px rgba(212, 175, 55, 0.35)',
    transition: 'all 0.3s ease',
    width: '100%',
    fontFamily: '"Playfair Display", serif, sans-serif',
  },
  divider: {
    marginTop: '25px',
    fontSize: '12px',
    color: '#f3e5ab',
    textAlign: 'center',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontWeight: '600',
  }
};

const hoverEffects = `
  .submit-btn-hover:hover {
    background: linear-gradient(135deg, #e2be42, #b89832);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.5);
  }
`;

export default AuthPage;