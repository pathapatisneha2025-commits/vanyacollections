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

      const res = await fetch(`https://vanyabackenddatabase.onrender.com/auth/${endpoint}`, {
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
        setFormData({ full_name: '', email: '', password: '', confirmPassword: '' });

// Redirect to home with state
navigate('/', { state: { user: data.user } });      }
    } catch (err) {
      setError('Server error. Try again later.');
      console.error(err);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <main style={styles.mainContainer}>
        <h1 style={styles.title}>Join Vanya</h1>
        <p style={styles.subtitle}>Create your account today</p>

        <div style={styles.formCard}>
          {/* Tab Switcher */}
          <div style={styles.tabContainer}>
            <button
              onClick={() => setIsSignUp(false)}
              style={{ ...styles.tabBtn, color: !isSignUp ? '#D4AF37' : '#888' }}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              style={{ ...styles.tabBtn, ...(!isSignUp ? {} : styles.activeTab) }}
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

            {error && <p style={{ color: 'red', fontSize: '13px' }}>{error}</p>}
            {success && <p style={{ color: 'green', fontSize: '13px' }}>{success}</p>}

            <button type="submit" style={styles.submitBtn}>
              {isSignUp ? 'Create Account' : 'Login'}
            </button>
          </form>

          <div style={styles.divider}>or continue with</div>
        </div>
      </main>
    </div>
  );
};



// Simple CSS-in-JS object
const styles = {
  pageWrapper: {
    minHeight: '100vh',
    background: 'radial-gradient(circle at center, #1a3c2f 0%, #0d1f18 100%)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  navbar: {
    width: '100%',
    padding: '20px 50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#D4AF37', // Gold color
    lineHeight: '1',
  },
  navLinks: {
    display: 'flex',
    gap: '30px',
    fontSize: '14px',
    letterSpacing: '1px',
    cursor: 'pointer',
  },
  mainContainer: {
    marginTop: '40px',
    textAlign: 'center',
    width: '100%',
    maxWidth: '450px',
  },
  title: {
    fontSize: '32px',
    marginBottom: '5px',
    color: '#D4AF37',
  },
  subtitle: {
    fontSize: '14px',
    color: '#aaa',
    marginBottom: '30px',
  },
  formCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(10px)',
    padding: '40px',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 15px 35px rgba(0,0,0,0.5)',
  },
  tabContainer: {
    display: 'flex',
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '30px',
    marginBottom: '30px',
    padding: '5px',
  },
  tabBtn: {
    flex: 1,
    padding: '12px',
    border: 'none',
    background: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: '0.3s',
    borderRadius: '25px',
  },
  activeTab: {
    background: '#f2b94a',
    color: '#1a3c2f',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(212, 175, 55, 0.3)',
    borderRadius: '30px',
    padding: '0 20px',
  },
  input: {
    flex: 1,
    background: 'none',
    border: 'none',
    padding: '15px 10px',
    color: '#fff',
    outline: 'none',
    fontSize: '14px',
  },
  icon: {
    opacity: 0.6,
    fontSize: '14px',
  },
  submitBtn: {
    background: '#f2b94a',
    color: '#1a3c2f',
    padding: '15px',
    borderRadius: '30px',
    border: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    boxShadow: '0 4px 15px rgba(242, 185, 74, 0.3)',
  },
  divider: {
    marginTop: '25px',
    fontSize: '12px',
    color: '#666',
    position: 'relative',
  }
};

export default AuthPage;