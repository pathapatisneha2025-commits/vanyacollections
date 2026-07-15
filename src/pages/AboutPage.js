import React from 'react';
import { Heart, ShieldCheck, Leaf, Star, Quote } from 'lucide-react';

const AboutPage = () => {
  return (
    <div style={styles.pageContainer}>
      {/* Hero Section - Matches Screenshot 173453 */}
      <div style={styles.heroBanner}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <p style={styles.heroSubtitle}>OUR STORY</p>
          <h1 style={styles.heroTitle}>About Vanya Collections</h1>
        </div>
      </div>

      {/* Intro Section - Matches Screenshot 173509 */}
      <div style={styles.sectionPadding}>
        <div style={styles.container}>
          <div style={styles.introGrid}>
            <div style={styles.textBlock}>
              <p style={styles.overline}>WHO WE ARE</p>
              <h2 style={styles.heading}>Born from a Passion for India's Textile Heritage</h2>
              <p style={styles.paragraph}>
                Vanya Collections was born in 2018 when our founder, Priya Vanya, traveled across India's 
                most celebrated weaving centers — from the silk looms of Kanchipuram to the Banarasi ghats 
                of Varanasi — and fell deeply in love with the stories woven into every thread.
              </p>
              <p style={styles.paragraph}>
                Dismayed by the decline of traditional handloom crafts, she founded Vanya Collections with 
                a mission: to connect India's most gifted weavers with women who appreciate true artistry, 
                ensuring these ancient traditions not only survive — but thrive.
              </p>
            </div>
            {/* Mission Card - Matches Screenshot 173509 & 173520 */}
            <div style={styles.missionCard}>
              <div style={styles.missionImageContainer}>
                <img 
                  src="https://images.unsplash.com/photo-1610030469668-93510ef2d32e?auto=format&fit=crop&q=80&w=800" 
                  alt="Saree Craftsmanship" 
                  style={styles.missionImage} 
                />
                <div style={styles.missionOverlayCard}>
                  <h3 style={styles.missionTitle}>Our Mission</h3>
                  <p style={styles.missionText}>To preserve India's weaving heritage while empowering artisan communities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Counter Section - Matches Screenshot 173520 */}
      <div style={styles.statsSection}>
        <div style={styles.container}>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>6+</span>
              <span style={styles.statLabel}>Years</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>10K+</span>
              <span style={styles.statLabel}>Customers</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNumber}>500+</span>
              <span style={styles.statLabel}>Designs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section - Matches Screenshot 173530 */}
      <div style={styles.valuesSection}>
        <div style={styles.container}>
          <p style={styles.overlineCenter}>WHAT WE STAND FOR</p>
          <h2 style={styles.headingCenter}>Our Values</h2>
          <div style={styles.valuesGrid}>
            {[
              { icon: <Star size={24} />, title: "Uncompromising Quality", desc: "Every saree is handpicked and quality-checked by our experts before it reaches you. We accept only the finest." },
              { icon: <Heart size={24} />, title: "Artisan Empowerment", desc: "We work directly with weavers across India, ensuring they receive fair wages and recognition for their extraordinary craft." },
              { icon: <Leaf size={24} />, title: "Sustainable Practices", desc: "We promote eco-friendly natural dyes and sustainable weaving methods that honor both tradition and our planet." },
              { icon: <ShieldCheck size={24} />, title: "Authenticity Guaranteed", desc: "Every product comes with a certificate of authenticity. What you see is exactly what you receive — no compromises." }
            ].map((value, idx) => (
              <div key={idx} style={styles.valueCard}>
                <div style={styles.valueIcon}>{value.icon}</div>
                <h4 style={styles.valueTitle}>{value.title}</h4>
                <p style={styles.valueDesc}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quote Section - Matches Screenshot 173548 */}
      <div style={styles.quoteSection}>
        <div style={styles.containerCenter}>
          <div style={styles.quoteIconCircle}>PV</div>
          <p style={styles.quoteText}>
            "I wanted to build a bridge between the extraordinary artisans of India and the women who would 
            cherish their work for generations. Every saree we sell is a love letter to our heritage."
          </p>
          <p style={styles.quoteAuthor}>Priya Vanya</p>
          <p style={styles.quoteSubtext}>Founder & Creative Director, Vanya Collections</p>
        </div>
      </div>

      {/* Meet Our Team Section - Matches Screenshot 173559 */}
      <div style={styles.sectionPadding}>
        <div style={styles.container}>
          <p style={styles.overlineCenter}>THE CURATORS</p>
          <h2 style={styles.headingCenter}>Meet Our Team</h2>
          <div style={styles.teamGrid}>
            {[
              { initial: "PV", name: "Priya Vanya", role: "Founder & Creative Director" },
              { initial: "AS", name: "Ananya Sharma", role: "Head of Curation & Quality" },
              { initial: "KR", name: "Kavitha Rajan", role: "Lead Designer" }
            ].map((member, idx) => (
              <div key={idx} style={styles.teamMember}>
                <div style={styles.teamCircle}>{member.initial}</div>
                <h4 style={styles.teamName}>{member.name}</h4>
                <p style={styles.teamRole}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: { backgroundColor: '#fdfdfb', fontFamily: "'Playfair Display', serif", color: '#1a1a1a' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 25px' },
  containerCenter: { maxWidth: '900px', margin: '0 auto', textAlign: 'center', padding: '0 25px' },
  sectionPadding: { padding: '100px 0' },
  
  heroBanner: { 
    height: '450px', 
    backgroundImage: 'url("https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=2000")', 
    backgroundSize: 'cover', backgroundPosition: 'center',
    position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  heroOverlay: { position: 'absolute', inset: 0, backgroundColor: 'rgba(6, 59, 42, 0.7)' },
  heroContent: { zIndex: 2, textAlign: 'center', color: '#d4af37' },
  heroSubtitle: { fontSize: '12px', letterSpacing: '4px', marginBottom: '15px' },
  heroTitle: { fontSize: '56px', margin: 0, fontWeight: '400' },

  introGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' },
  overline: { color: '#bca172', fontSize: '11px', letterSpacing: '2px', fontWeight: '700', marginBottom: '15px' },
  heading: { fontSize: '42px', lineHeight: '1.2', marginBottom: '30px', fontWeight: '400' },
  paragraph: { color: '#666', lineHeight: '1.8', marginBottom: '25px', fontSize: '16px' },

  missionCard: { position: 'relative' },
  missionImageContainer: { borderRadius: '20px', overflow: 'hidden', height: '500px' },
  missionImage: { width: '100%', height: '100%', objectFit: 'cover' },
  missionOverlayCard: { 
    position: 'absolute', bottom: '0', left: '0', width: '30%',
    backgroundColor: '#063b2a', padding: '30px', borderTopRightRadius: '20px', color: '#fff'
  },
  missionTitle: { color: '#d4af37', marginBottom: '10px', fontSize: '20px' },
  missionText: { fontSize: '14px', lineHeight: '1.6', opacity: 0.9 },

  statsSection: { padding: '60px 0', borderTop: '1px solid #eee' },
  statsGrid: { display: 'flex', justifyContent: 'space-around', textAlign: 'center' },
  statNumber: { display: 'block', fontSize: '42px', color: '#bca172', marginBottom: '5px' },
  statLabel: { fontSize: '14px', color: '#888', letterSpacing: '1px' },

  valuesSection: { padding: '100px 0', backgroundColor: '#f9f9f7' },
  overlineCenter: { textAlign: 'center', color: '#bca172', fontSize: '11px', letterSpacing: '2px', fontWeight: '700', marginBottom: '10px' },
  headingCenter: { textAlign: 'center', fontSize: '40px', marginBottom: '60px', fontWeight: '400' },
  valuesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' },
  valueCard: { backgroundColor: '#fff', padding: '40px', borderRadius: '15px', border: '1px solid #f0f0f0' },
  valueIcon: { color: '#bca172', marginBottom: '20px' },
  valueTitle: { fontSize: '18px', marginBottom: '15px', fontWeight: '600' },
  valueDesc: { color: '#777', fontSize: '14px', lineHeight: '1.6' },

  quoteSection: { padding: '120px 0', backgroundColor: '#063b2a', color: '#d4af37', textAlign: 'center' },
  quoteIconCircle: { 
    width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(212, 175, 55, 0.15)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px',
    fontSize: '18px', fontWeight: '700', border: '1px solid #d4af37'
  },
  quoteText: { fontSize: '28px', fontStyle: 'italic', lineHeight: '1.5', marginBottom: '40px', maxWidth: '800px', margin: '0 auto 40px' },
  quoteAuthor: { fontSize: '18px', fontWeight: '600', marginBottom: '5px' },
  quoteSubtext: { fontSize: '12px', color: '#fff', opacity: 0.6, letterSpacing: '1px' },

  teamGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px', textAlign: 'center' },
  teamCircle: { 
    width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#063b2a',
    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px',
    fontSize: '28px', color: '#d4af37', border: '2px solid #d4af37'
  },
  teamName: { fontSize: '20px', marginBottom: '8px' },
  teamRole: { color: '#888', fontSize: '14px' }
};

export default AboutPage;