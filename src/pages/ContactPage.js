import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://vanyabackenddatabase-vahr.onrender.com/contact/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const result = await res.json();

      if (res.ok) {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      } else {
        alert(result.error || "Failed to send message");
      }
    } catch (err) {
      console.log(err);
      alert("Failed to send message. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <style>
        {`
          *{
            box-sizing:border-box;
          }

          .contact-grid{
            display:grid;
            grid-template-columns:1fr 1.8fr;
            gap:80px;
          }

          .form-row{
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:25px;
          }

          .input-box:focus {
            border-color: #633878 !important;
            background-color: #fff !important;
            box-shadow: 0 0 0 3px rgba(99, 56, 120, 0.1);
          }

          @media(max-width:900px){
            .hero-banner{
              height:260px !important;
            }
            .hero-title{
              font-size:42px !important;
            }
            .contact-grid{
              grid-template-columns:1fr;
              gap:40px;
            }
            .content-section{
              padding:60px 0 !important;
              margin-top:-30px !important;
            }
            .section-title{
              font-size:32px !important;
            }
            .form-card{
              padding:30px 20px !important;
            }
            .form-row{
              grid-template-columns:1fr;
            }
            .map-card{
              padding:50px 20px !important;
            }
          }

          @media(max-width:480px){
            .hero-banner{
              height:220px !important;
            }
            .hero-title{
              font-size:34px !important;
            }
            .container{
              padding:0 15px !important;
            }
            .hero-subtitle{
              font-size:10px !important;
              letter-spacing:3px !important;
            }
            .section-title{
              font-size:28px !important;
            }
            .info-value{
              font-size:14px !important;
            }
            .whatsapp-btn{
              width:100%;
              justify-content:center;
            }
            .form-title{
              font-size:24px !important;
            }
            .input-box{
              padding:12px 14px !important;
            }
            .submit-btn{
              padding:15px !important;
            }
            .map-section{
              padding:0 15px 50px !important;
            }
          }
        `}
      </style>

      {/* HERO */}
      <div className="hero-banner" style={styles.heroBanner}>
        <div style={styles.patternOverlay}></div>
        <div style={styles.heroContent}>
          <p className="hero-subtitle" style={styles.heroSubtitle}>
            WE'D LOVE TO HEAR FROM YOU
          </p>
          <h1 className="hero-title" style={styles.heroTitle}>
            Get in Touch
          </h1>
        </div>
      </div>

      {/* CONTACT SECTION */}
      <div className="content-section" style={styles.contentSection}>
        <div className="container" style={styles.container}>
          <div className="contact-grid">
            {/* LEFT INFORMATION */}
            <div style={styles.infoColumn}>
              <h2 className="section-title" style={styles.sectionTitle}>
                We're Here to Help
              </h2>
              <p style={styles.sectionDesc}>
                Whether you have a question about a saree, need styling advice,
                or want to make a special order — our team is always ready to
                assist.
              </p>

              <div style={styles.infoList}>
                <div style={styles.infoItem}>
                  <div style={styles.iconCircle}>
                    <Phone size={18} color="#633878" />
                  </div>
                  <div>
                    <div style={styles.infoLabel}>PHONE</div>
                    <div style={styles.infoValue}>+91 98765 43210</div>
                  </div>
                </div>

                <div style={styles.infoItem}>
                  <div style={styles.iconCircle}>
                    <Mail size={18} color="#633878" />
                  </div>
                  <div>
                    <div style={styles.infoLabel}>EMAIL</div>
                    <div style={styles.infoValue}>
                      hello@vanyacollections.com
                    </div>
                  </div>
                </div>

                <div style={styles.infoItem}>
                  <div style={styles.iconCircle}>
                    <MapPin size={18} color="#633878" />
                  </div>
                  <div>
                    <div style={styles.infoLabel}>ADDRESS</div>
                    <div style={styles.infoValue}>
                      123 Silk Route, Textile Bazaar, Mumbai 400001
                    </div>
                  </div>
                </div>

                <div style={styles.infoItem}>
                  <div style={styles.iconCircle}>
                    <Clock size={18} color="#633878" />
                  </div>
                  <div>
                    <div style={styles.infoLabel}>HOURS</div>
                    <div style={styles.infoValue}>Mon–Sat: 10 AM – 7 PM</div>
                  </div>
                </div>
              </div>

              <button className="whatsapp-btn" style={styles.whatsappBtn}>
                💬 Chat on WhatsApp
              </button>
            </div>

            {/* FORM */}
            <div className="form-card" style={styles.formCard}>
              <h3 style={styles.formTitle}>Send Us a Message</h3>
              <form style={styles.form} onSubmit={handleSubmit}>
                <div className="form-row">
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Your Name</label>
                    <input
                      className="input-box"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Priya Sharma"
                      style={styles.input}
                      required
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Email Address</label>
                    <input
                      className="input-box"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="priya@example.com"
                      style={styles.input}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Phone Number</label>
                    <input
                      className="input-box"
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Subject</label>
                    <input
                      className="input-box"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Order inquiry..."
                      style={styles.input}
                    />
                  </div>
                </div>

                {/* MESSAGE */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>Message</label>
                  <textarea
                    className="input-box"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    style={{
                      ...styles.input,
                      height: "120px",
                      resize: "none"
                    }}
                  />
                </div>

                <button
                  className="submit-btn"
                  type="submit"
                  style={styles.submitBtn}
                  disabled={loading}
                >
                  <Send size={16} style={{ marginRight: "10px" }} />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* MAP SECTION */}
      <div className="map-section" style={styles.mapSection}>
        <div className="map-card" style={styles.mapCard}>
          <div style={styles.mapPinIcon}>
            <MapPin size={32} color="#633878" />
          </div>
          <h2 style={styles.mapTitle}>Find Our Boutique</h2>
          <p style={styles.mapText}>
            123 Silk Route, Textile Bazaar, Mumbai, Maharashtra 400001
          </p>
          <button style={styles.mapBtn}>Open in Maps</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: "#f8f4fa",
    minHeight: "100vh",
    fontFamily: "'Playfair Display', serif"
  },

  heroBanner: {
    height: "320px",
    backgroundColor: "#633878",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundImage: "radial-gradient(circle, #74418c 1px, transparent 1px)",
    backgroundSize: "20px 20px"
  },

  patternOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.15,
    backgroundImage: `url("https://www.transparenttextures.com/patterns/luxury.png")`,
    backgroundSize: "200px"
  },

  heroContent: {
    textAlign: "center",
    zIndex: 2,
    color: "#fbd349"
  },

  heroSubtitle: {
    fontSize: "12px",
    letterSpacing: "4px",
    marginBottom: "15px",
    fontWeight: "600"
  },

  heroTitle: {
    fontSize: "62px",
    fontWeight: "700",
    margin: 0
  },

  contentSection: {
    padding: "100px 0",
    marginTop: "-60px",
    position: "relative",
    zIndex: 10
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 25px"
  },

  infoColumn: {
    color: "#2c2c2c"
  },

  sectionTitle: {
    fontSize: "40px",
    marginBottom: "25px",
    fontWeight: "700",
    color: "#633878"
  },

  sectionDesc: {
    color: "#666",
    lineHeight: "1.8",
    marginBottom: "45px",
    fontSize: "15px"
  },

  infoList: {
    display: "flex",
    flexDirection: "column",
    gap: "30px"
  },

  infoItem: {
    display: "flex",
    gap: "20px",
    alignItems: "center"
  },

  iconCircle: {
    width: "42px",
    height: "42px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #e6d8ed",
    boxShadow: "0 3px 10px rgba(99, 56, 120, 0.05)"
  },

  infoLabel: {
    fontSize: "10px",
    fontWeight: "700",
    color: "#74418c",
    letterSpacing: "1.5px",
    marginBottom: "4px"
  },

  infoValue: {
    fontSize: "16px",
    color: "#2c2c2c",
    wordBreak: "break-word"
  },

  whatsappBtn: {
    marginTop: "50px",
    backgroundColor: "#eefcf4",
    color: "#27ae60",
    border: "1px solid #d4efdf",
    padding: "12px 28px",
    borderRadius: "50px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px"
  },

  formCard: {
    backgroundColor: "#fff",
    padding: "50px",
    borderRadius: "8px",
    boxShadow: "0 10px 30px rgba(99, 56, 120, 0.08)",
    border: "1px solid #e6d8ed"
  },

  formTitle: {
    fontSize: "32px",
    marginBottom: "40px",
    fontWeight: "700",
    color: "#633878"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "25px"
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },

  label: {
    fontSize: "13px",
    color: "#666",
    fontWeight: "600"
  },

  input: {
    padding: "14px 18px",
    border: "1px solid #e6d8ed",
    borderRadius: "6px",
    backgroundColor: "#fdfafd",
    fontSize: "15px",
    fontFamily: "inherit",
    outline: "none",
    width: "100%",
    transition: "all 0.3s ease"
  },

  submitBtn: {
    backgroundColor: "#633878",
    color: "#fbd349",
    border: "none",
    padding: "16px",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "background 0.2s"
  },

  mapSection: {
    padding: "0 25px 100px"
  },

  mapCard: {
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#f3ebf6",
    padding: "80px 40px",
    borderRadius: "8px",
    textAlign: "center",
    border: "1px solid #e6d8ed",
    boxShadow: "0 6px 20px rgba(99, 56, 120, 0.05)"
  },

  mapPinIcon: {
    marginBottom: "15px"
  },

  mapTitle: {
    fontSize: "32px",
    marginBottom: "10px",
    fontWeight: "700",
    color: "#633878"
  },

  mapText: {
    color: "#666",
    marginBottom: "35px",
    fontSize: "16px"
  },

  mapBtn: {
    backgroundColor: "#fbd349",
    color: "#633878",
    border: "none",
    padding: "14px 35px",
    borderRadius: "6px",
    fontWeight: "700",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.2s"
  }
};

export default ContactPage;