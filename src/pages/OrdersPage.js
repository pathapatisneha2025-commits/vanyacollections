import React, { useState, useEffect } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const { id: userId } = JSON.parse(storedUser);

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `https://vanyabackenddatabase-vahr.onrender.com/orders/user/${userId}`
        );
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();

        const formattedOrders = (Array.isArray(data) ? data : [data]).map(
          (order) => ({
            id: order.id,
            date: new Date(order.created_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            status: order.order_status,
            total: `₹${order.total_amount}`,
            items: order.items || [],
          })
        );

        setOrders(formattedOrders);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return (
      <div style={styles.centerWrapper}>
        <div style={styles.loaderSpinner}></div>
        <p style={styles.statusText}>Loading your royal orders...</p>
      </div>
    );

  if (error)
    return (
      <div style={styles.centerWrapper}>
        <p style={styles.errorText}>{error}</p>
      </div>
    );

  if (orders.length === 0)
    return (
      <div style={styles.centerWrapper}>
        <div style={styles.emptyIcon}>📦</div>
        <h2 style={styles.emptyTitle}>No Orders Found</h2>
        <p style={styles.subtitle}>You haven't placed any orders yet. Begin your royal journey with our exquisite collection.</p>
      </div>
    );

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>Your Royal Orders</h1>
        <p style={styles.subtitle}>
          Track and manage your luxury silk collection
        </p>
      </header>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Order ID</th>
              <th style={styles.th}>Date Placed</th>
              <th style={styles.th}>Items</th>
              <th style={styles.th}>Total Amount</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} style={styles.tr}>
                <td style={styles.td}>
                  <span style={styles.orderIdBadge}>#{order.id}</span>
                </td>
                <td style={styles.td}>{order.date}</td>
                <td style={styles.td}>
                  <ul style={{ paddingLeft: "0", margin: 0, listStyle: "none" }}>
                    {order.items.map((item) => (
                      <li key={item.id} style={styles.itemRow}>
                        <img 
                          src={item.img_url} 
                          alt={item.name} 
                          style={styles.itemImg}
                        />
                        <div style={styles.itemDetails}>
                          <span style={styles.itemName}>{item.name}</span>
                          <span style={styles.itemMeta}>Qty: {item.quantity} • ₹{item.price}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </td>
                <td style={styles.totalCell}>{order.total}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.statusBadge,
                      backgroundColor: order.status === "Delivered" ? 'rgba(46, 125, 50, 0.15)' : 'rgba(212, 175, 55, 0.15)',
                      color: order.status === "Delivered" ? "#a3e4d7" : "#D4AF37",
                      borderColor: order.status === "Delivered" ? "rgba(46, 125, 50, 0.4)" : "rgba(212, 175, 55, 0.4)",
                    }}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: "#513262",
    minHeight: "100vh",
    padding: "50px 20px",
    fontFamily: '"Playfair Display", serif, sans-serif',
    color: "#ffffff",
  },
  centerWrapper: {
    backgroundColor: "#513262",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: '"Playfair Display", serif, sans-serif',
    color: "#ffffff",
    padding: "20px",
    textAlign: "center",
  },
  loaderSpinner: {
    width: "40px",
    height: "40px",
    border: "3px solid rgba(212, 175, 55, 0.3)",
    borderTop: "3px solid #D4AF37",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "15px",
  },
  statusText: {
    color: "#f3e5ab",
    fontSize: "16px",
  },
  emptyIcon: {
    fontSize: "48px",
    marginBottom: "15px",
  },
  emptyTitle: {
    fontSize: "28px",
    color: "#D4AF37",
    marginBottom: "10px",
  },
  header: { 
    textAlign: "center", 
    marginBottom: "40px" 
  },
  title: {
    fontSize: "38px",
    color: "#D4AF37",
    marginBottom: "8px",
    fontWeight: "750",
    letterSpacing: "1px",
  },
  subtitle: { 
    color: "#f3e5ab", 
    fontSize: "15px", 
    letterSpacing: "0.5px" 
  },
  tableWrapper: {
    maxWidth: "1000px",
    margin: "0 auto",
    background: "rgba(81, 50, 98, 0.75)",
    backdropFilter: "blur(12px)",
    borderRadius: "24px",
    border: "1px solid rgba(212, 175, 55, 0.3)",
    boxShadow: "0 15px 40px rgba(45, 25, 55, 0.6)",
    overflow: "hidden",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  th: {
    borderBottom: "1px solid rgba(212, 175, 55, 0.3)",
    padding: "18px 20px",
    backgroundColor: "rgba(50, 30, 62, 0.6)",
    color: "#D4AF37",
    fontWeight: "700",
    fontSize: "14px",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  td: {
    borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
    padding: "16px 20px",
    verticalAlign: "middle",
    color: "#ffffff",
    fontSize: "14px",
  },
  totalCell: {
    borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
    padding: "16px 20px",
    verticalAlign: "middle",
    color: "#D4AF37",
    fontWeight: "700",
    fontSize: "15px",
  },
  tr: {
    transition: "background 0.3s ease",
  },
  orderIdBadge: {
    background: "rgba(212, 175, 55, 0.15)",
    color: "#f3e5ab",
    padding: "6px 10px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    border: "1px solid rgba(212, 175, 55, 0.3)",
  },
  itemRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "8px",
  },
  itemImg: {
    width: "45px",
    height: "45px",
    objectFit: "cover",
    borderRadius: "8px",
    border: "1px solid rgba(212, 175, 55, 0.3)",
  },
  itemDetails: {
    display: "flex",
    flexDirection: "column",
  },
  itemName: {
    fontWeight: "600",
    color: "#ffffff",
    fontSize: "14px",
  },
  itemMeta: {
    fontSize: "12px",
    color: "#f3e5ab",
  },
  statusBadge: {
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    border: "1px solid",
    textTransform: "uppercase",
  },
  errorText: {
    color: "#ff8a8a",
    fontSize: "16px",
    fontWeight: "600",
  }
};

export default OrdersPage;