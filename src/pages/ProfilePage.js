import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const { id } = JSON.parse(storedUser);

    const fetchUser = async () => {
      try {
        const res = await fetch(
          `https://vanyabackenddatabase-vahr.onrender.com/auth/users/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch user data");
        const data = await res.json();
        setUser({
          name: data.full_name || "User",
          email: data.email || "",
          memberSince: new Date(data.created_at).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          phone: data.phone || "Not provided",
          address: data.address || "Not provided",
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const goToOrders = () => {
    navigate("/orders");
  };

  if (loading)
    return <div className="profile-loading">Loading royal profile...</div>;
  if (error)
    return <div className="profile-loading" style={{ color: "#c62828" }}>{error}</div>;
  if (!user) return null;

  return (
    <div style={styles.pageContainer}>
      <style>{hoverEffects}</style>

      <div style={styles.contentWrapper}>
        {/* Avatar Section */}
        <div style={styles.avatarCircle}>{user.name.charAt(0)}</div>

        <h1 style={styles.userName}>{user.name}</h1>
        <p style={styles.membershipText}>
          ✨ Gold Member since {user.memberSince} ✨
        </p>

        {/* Info Grid */}
        <div style={styles.infoGrid}>
          <div style={styles.infoCard}>
            <span style={styles.label}>EMAIL ADDRESS</span>
            <p style={styles.value}>{user.email}</p>
          </div>
          <div style={styles.infoCard}>
            <span style={styles.label}>PHONE NUMBER</span>
            <p style={styles.value}>{user.phone}</p>
          </div>
          <div style={{ ...styles.infoCard, gridColumn: "1 / -1" }}>
            <span style={styles.label}>SHIPPING ADDRESS</span>
            <p style={styles.value}>{user.address}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={styles.buttonGroup}>
          <button style={styles.primaryBtn} className="btn-p">
            Edit Profile
          </button>
          <button
            style={styles.secondaryBtn}
            className="btn-s"
            onClick={goToOrders}
          >
            View Order History
          </button>
        </div>

        <button style={styles.logoutBtn} className="btn-logout" onClick={handleLogout}>
          Sign Out of Account
        </button>
      </div>
    </div>
  );
};

// ================= CSS-in-JS =================
const styles = {
  pageContainer: {
    backgroundColor: "#f7f2f9",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "60px 20px",
    fontFamily: '"Playfair Display", serif, sans-serif',
    color: "#3b1443",
  },
  contentWrapper: {
    maxWidth: "650px",
    width: "100%",
    textAlign: "center",
    backgroundColor: "#ffffff",
    padding: "45px 35px",
    borderRadius: "24px",
    boxShadow: "0 10px 35px rgba(74, 25, 89, 0.1)",
    border: "1px solid rgba(106, 46, 124, 0.18)",
  },
  avatarCircle: {
    width: "110px",
    height: "110px",
    background: "linear-gradient(135deg, #5c2069, #45154f)",
    color: "#d4af37",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.8rem",
    fontWeight: "bold",
    margin: "0 auto 20px",
    boxShadow: "0 8px 25px rgba(92, 32, 105, 0.25)",
    border: "2px solid #d4af37",
  },
  userName: { 
    fontSize: "2.5rem", 
    color: "#3b1443", 
    marginBottom: "8px",
    fontWeight: "700" 
  },
  membershipText: {
    color: "#6a2e7c",
    fontSize: "0.95rem",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: "35px",
    fontWeight: "600",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "18px",
    textAlign: "left",
    marginBottom: "35px",
  },
  infoCard: {
    padding: "18px 20px",
    background: "linear-gradient(135deg, #ffffff 0%, #f9f5fb 100%)",
    border: "1px solid rgba(106, 46, 124, 0.18)",
    borderRadius: "14px",
    boxShadow: "0 4px 15px rgba(74, 25, 89, 0.04)",
  },
  label: {
    display: "block",
    fontSize: "11px",
    color: "#6a2e7c",
    letterSpacing: "1.5px",
    fontWeight: "700",
    marginBottom: "6px",
  },
  value: {
    margin: 0,
    fontSize: "15px",
    color: "#3b1443",
    fontWeight: "600",
    wordBreak: "break-word",
  },
  buttonGroup: { 
    display: "flex", 
    gap: "15px", 
    marginBottom: "25px" 
  },
  primaryBtn: {
    flex: 1,
    padding: "16px",
    background: "linear-gradient(135deg, #5c2069, #45154f)",
    color: "#ffffff",
    border: "none",
    borderRadius: "40px",
    fontSize: "1rem",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(92, 32, 105, 0.3)",
    transition: "all 0.3s ease",
  },
  secondaryBtn: {
    flex: 1,
    padding: "16px",
    background: "linear-gradient(135deg, #d4af37 0%, #aa8c2c 100%)",
    color: "#3b1443",
    border: "1px solid #f3e5ab",
    borderRadius: "40px",
    fontSize: "1rem",
    fontWeight: "800",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(212, 175, 55, 0.35)",
    transition: "all 0.3s ease",
  },
  logoutBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "#8b263e",
    fontSize: "0.95rem",
    fontWeight: "700",
    cursor: "pointer",
    textDecoration: "underline",
    letterSpacing: "0.5px",
  },
};

const hoverEffects = `
  .profile-loading {
    text-align: center;
    padding: 100px;
    font-size: 20px;
    color: #6a2e7c;
    background: #f7f2f9;
    min-height: 100vh;
    font-family: 'Playfair Display', serif;
  }
  .btn-p:hover { 
    background: linear-gradient(135deg, #6a2e7c, #5c2069); 
    transform: translateY(-2px); 
    box-shadow: 0 8px 25px rgba(92, 32, 105, 0.4);
  }
  .btn-s:hover { 
    background: linear-gradient(135deg, #e2be42, #b89832); 
    transform: translateY(-2px); 
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.5);
  }
  .btn-logout:hover {
    color: #6b1b2f;
  }
`;

export default ProfilePage;