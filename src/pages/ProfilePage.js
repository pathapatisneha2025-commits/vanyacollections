import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // for navigation

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
          `https://vanyabackenddatabase.onrender.com/auth/users/${id}`
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
          phone: data.phone || "",
          address: data.address || "",
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
    navigate("/login"); // redirect to login page
  };

  const goToOrders = () => {
    navigate("/orders"); // redirect to orders page
  };

  if (loading)
    return <p style={{ textAlign: "center" }}>Loading profile...</p>;
  if (error)
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  if (!user) return null;

  return (
    <div style={styles.pageContainer}>
      <style>{hoverEffects}</style>

      {/* Profile Header Section */}
      <div style={styles.contentWrapper}>
        <div style={styles.avatarCircle}>{user.name.charAt(0)}</div>

        <h1 style={styles.userName}>{user.name}</h1>
        <p style={styles.membershipText}>
          Gold Member since {user.memberSince}
        </p>

        {/* Info Grid */}
        <div style={styles.infoGrid}>
          <div style={styles.infoCard}>
            <span style={styles.label}>Email Address</span>
            <p style={styles.value}>{user.email}</p>
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

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

// ================= CSS-in-JS =================
const styles = {
  pageContainer: {
    backgroundColor: "#ffffff",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "80px 20px",
    fontFamily: '"Playfair Display", serif',
    color: "#1a1a1a",
  },
  contentWrapper: {
    maxWidth: "600px",
    width: "100%",
    textAlign: "center",
  },
  avatarCircle: {
    width: "100px",
    height: "100px",
    backgroundColor: "#06402B",
    color: "#D4AF37",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.5rem",
    fontWeight: "bold",
    margin: "0 auto 20px",
    boxShadow: "0 8px 20px rgba(6, 64, 43, 0.15)",
    border: "2px solid #D4AF37",
  },
  userName: { fontSize: "2.2rem", color: "#06402B", marginBottom: "8px" },
  membershipText: {
    color: "#888",
    fontSize: "0.9rem",
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginBottom: "40px",
  },
  infoGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    textAlign: "left",
    marginBottom: "40px",
  },
  infoCard: {
    flex: "1 1 calc(50% - 10px)",
    padding: "20px",
    border: "1px solid #eee",
    borderRadius: "12px",
    backgroundColor: "#fafafa",
  },
  buttonGroup: { display: "flex", gap: "15px", marginBottom: "30px" },
  primaryBtn: {
    flex: 1,
    padding: "16px",
    backgroundColor: "#06402B",
    color: "#D4AF37",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  secondaryBtn: {
    flex: 1,
    padding: "16px",
    backgroundColor: "#fff",
    color: "#06402B",
    border: "1px solid #06402B",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  logoutBtn: {
    backgroundColor: "transparent",
    border: "none",
    color: "#cc0000",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

const hoverEffects = `
  .btn-p:hover { background-color: #043020; transform: translateY(-2px); }
  .btn-s:hover { background-color: #f9f9f9; transform: translateY(-2px); }
`;

export default ProfilePage;