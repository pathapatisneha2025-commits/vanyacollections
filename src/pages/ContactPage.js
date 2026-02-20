import React from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const ContactPage = () => {
  return (
    <div style={styles.pageContainer}>
      {/* Hero Banner Section - Exact match to Screenshot 172405 */}
      <div style={styles.heroBanner}>
        <div style={styles.patternOverlay}></div>
        <div style={styles.heroContent}>
          <p style={styles.heroSubtitle}>WE'D LOVE TO HEAR FROM YOU</p>
          <h1 style={styles.heroTitle}>Get in Touch</h1>
        </div>
      </div>

      {/* Contact Content Section */}
      <div style={styles.contentSection}>
        <div style={styles.container}>
          <div className="contact-grid" style={styles.grid}>
            
            {/* Left: Contact Info - Matches layout in Screenshot 172426 */}
            <div style={styles.infoColumn}>
              <h2 style={styles.sectionTitle}>We're Here to Help</h2>
              <p style={styles.sectionDesc}>
                Whether you have a question about a saree, need styling advice, or want to make a special order — our team is always ready to assist.
              </p>

              <div style={styles.infoList}>
                <div style={styles.infoItem}>
                  <div style={styles.iconCircle}><Phone size={18} color="#bca172" strokeWidth={1.5} /></div>
                  <div>
                    <div style={styles.infoLabel}>PHONE</div>
                    <div style={styles.infoValue}>+91 98765 43210</div>
                  </div>
                </div>
                <div style={styles.infoItem}>
                  <div style={styles.iconCircle}><Mail size={18} color="#bca172" strokeWidth={1.5} /></div>
                  <div>
                    <div style={styles.infoLabel}>EMAIL</div>
                    <div style={styles.infoValue}>hello@vanyacollections.com</div>
                  </div>
                </div>
                <div style={styles.infoItem}>
                  <div style={styles.iconCircle}><MapPin size={18} color="#bca172" strokeWidth={1.5} /></div>
                  <div>
                    <div style={styles.infoLabel}>ADDRESS</div>
                    <div style={styles.infoValue}>123 Silk Route, Textile Bazaar, Mumbai 400001</div>
                  </div>
                </div>
                <div style={styles.infoItem}>
                  <div style={styles.iconCircle}><Clock size={18} color="#bca172" strokeWidth={1.5} /></div>
                  <div>
                    <div style={styles.infoLabel}>HOURS</div>
                    <div style={styles.infoValue}>Mon–Sat: 10 AM – 7 PM</div>
                  </div>
                </div>
              </div>

              {/* WhatsApp button from Screenshot 172426 */}
              <button style={styles.whatsappBtn}>
                <span style={{ fontSize: '18px' }}>💬</span> Chat on WhatsApp
              </button>
            </div>

            {/* Right: Form Card - Exact Match to Screenshot 172405 & 172426 */}
            <div style={styles.formCard}>
              <h3 style={styles.formTitle}>Send Us a Message</h3>
              <form style={styles.form}>
                <div className="form-row" style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Your Name</label>
                    <input type="text" placeholder="Priya Sharma" style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Email Address</label>
                    <input type="email" placeholder="priya@example.com" style={styles.input} />
                  </div>
                </div>
                <div className="form-row" style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Phone Number</label>
                    <input type="text" placeholder="+91 98765 43210" style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Subject</label>
                    <input type="text" placeholder="Order inquiry, Styling advice..." style={styles.input} />
                  </div>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Message</label>
                  <textarea placeholder="Tell us how we can help you..." style={{...styles.input, height: '120px', resize: 'none'}}></textarea>
                </div>
                
                {/* The pill-shaped dark green submit button from Screenshot 172426 */}
                <button type="submit" style={styles.submitBtn}>
                   <Send size={16} style={{marginRight: '10px'}} /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Boutique Map Section - Match to Screenshot 172435 */}
      <div style={styles.mapSection}>
        <div style={styles.mapCard}>
          <div style={styles.mapPinIcon}>
            <MapPin size={32} color="#d4af37" strokeWidth={2} />
          </div>
          <h2 style={styles.mapTitle}>Find Our Boutique</h2>
          <p style={styles.mapText}>123 Silk Route, Textile Bazaar, Mumbai, Maharashtra 400001</p>
          <button style={styles.mapBtn}>Open in Maps</button>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 50px !important; }
          .form-row { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </div>
  );
};

const styles = {
  pageContainer: { backgroundColor: '#fdfdfb', minHeight: '100vh', fontFamily: "'Playfair Display', serif" },
  
  heroBanner: { 
    height: '320px', 
    backgroundColor: '#063b2a', 
    position: 'relative', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    overflow: 'hidden'
  },
  patternOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: '0.08',
    backgroundImage: `url("https://www.transparenttextures.com/patterns/luxury.png")`,
    backgroundSize: '200px'
  },
  heroContent: { textAlign: 'center', zIndex: 2, color: '#d4af37' },
  heroSubtitle: { fontSize: '12px', letterSpacing: '4px', marginBottom: '15px', fontWeight: '500', opacity: 0.9 },
  heroTitle: { fontSize: '62px', fontWeight: '400', margin: 0 },

  contentSection: { padding: '100px 0', marginTop: '-60px', position: 'relative', zIndex: 10 },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 25px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '80px', alignItems: 'start' },

  infoColumn: { color: '#1a1a1a' },
  sectionTitle: { fontSize: '40px', marginBottom: '25px', fontWeight: '400' },
  sectionDesc: { color: '#666', lineHeight: '1.8', marginBottom: '45px', fontSize: '15px' },
  infoList: { display: 'flex', flexDirection: 'column', gap: '30px' },
  infoItem: { display: 'flex', gap: '20px', alignItems: 'center' },
  iconCircle: { 
    width: '42px', height: '42px', 
    backgroundColor: '#fffcf5', 
    borderRadius: '8px', 
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: '1px solid #f9f0d9'
  },
  infoLabel: { fontSize: '10px', fontWeight: '700', color: '#bca172', letterSpacing: '1.5px', marginBottom: '4px' },
  infoValue: { fontSize: '16px', color: '#333' },
  
  whatsappBtn: { 
    marginTop: '50px', 
    backgroundColor: '#eefcf4', 
    color: '#27ae60', 
    border: '1px solid #d4efdf', 
    padding: '12px 28px', 
    borderRadius: '50px', 
    display: 'flex', alignItems: 'center', gap: '12px', 
    cursor: 'pointer', fontWeight: '600', fontSize: '14px'
  },

  formCard: { 
    backgroundColor: '#fff', 
    padding: '50px', 
    borderRadius: '24px', 
    boxShadow: '0 20px 60px rgba(0,0,0,0.04)',
    border: '1px solid #f5f5f5'
  },
  formTitle: { fontSize: '32px', marginBottom: '40px', fontWeight: '400' },
  form: { display: 'flex', flexDirection: 'column', gap: '25px' },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '13px', color: '#888', fontWeight: '500' },
  input: { 
    padding: '14px 18px', 
    border: '1px solid #eee', 
    borderRadius: '12px', 
    backgroundColor: '#fafafa', 
    fontSize: '15px',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s ease'
  },
  submitBtn: { 
    backgroundColor: '#063b2a', 
    color: '#d4af37', 
    border: 'none', 
    padding: '18px', 
    borderRadius: '50px', 
    fontSize: '16px', fontWeight: '600', 
    cursor: 'pointer', marginTop: '15px', 
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    boxShadow: '0 10px 20px rgba(6, 59, 42, 0.2)'
  },

  mapSection: { padding: '0 25px 100px' },
  mapCard: { 
    maxWidth: '1200px', 
    margin: '0 auto', 
    backgroundColor: '#f8f8f5', 
    padding: '80px 40px', 
    borderRadius: '32px', 
    textAlign: 'center',
    border: '1px solid #efefea'
  },
  mapPinIcon: { marginBottom: '15px' },
  mapTitle: { fontSize: '32px', marginBottom: '10px', fontWeight: '400' },
  mapText: { color: '#666', marginBottom: '35px', fontSize: '16px' },
  mapBtn: { 
    backgroundColor: '#d4af37', 
    color: '#fff', 
    border: 'none', 
    padding: '14px 35px', 
    borderRadius: '10px', 
    fontWeight: '700', 
    cursor: 'pointer',
    fontSize: '14px',
    letterSpacing: '0.5px'
  }
};

export default ContactPage;