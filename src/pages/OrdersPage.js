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
          `https://vanyabackenddatabase.onrender.com/orders/user/${userId}`
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
            status: order.status || "Processing",
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
    return <p style={{ textAlign: "center" }}>Loading orders...</p>;
  if (error)
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  if (orders.length === 0)
    return <p style={{ textAlign: "center" }}>No orders found.</p>;

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>Your Orders</h1>
        <p style={styles.subtitle}>
          Track and manage your luxury silk collection
        </p>
      </header>

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
              <td style={styles.td}>{order.id}</td>
              <td style={styles.td}>{order.date}</td>
              <td style={styles.td}>
                <ul style={{ paddingLeft: "15px", margin: 0 }}>
                  {order.items.map((item) => (
                    <li key={item.id} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
                      <img 
                        src={item.img_url} 
                        alt={item.name} 
                        style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px", border: "1px solid #ddd" }}
                      />
                      <span>
                        {item.name} (x{item.quantity}) - ₹{item.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </td>
              <td style={styles.td}>{order.total}</td>
              <td
                style={{
                  ...styles.td,
                  color:
                    order.status === "Delivered" ? "#2e7d32" : "#f57f17",
                }}
              >
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: "#fff",
    minHeight: "100vh",
    padding: "40px 20px",
    fontFamily: '"Playfair Display", serif',
    color: "#1a1a1a",
  },
  header: { textAlign: "center", marginBottom: "40px" },
  title: {
    fontSize: "2.5rem",
    color: "#06402B",
    marginBottom: "10px",
    fontWeight: "600",
  },
  subtitle: { color: "#666", fontSize: "1rem", letterSpacing: "1px" },
  table: {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    borderCollapse: "collapse",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
  },
  th: {
    borderBottom: "2px solid #ddd",
    padding: "12px",
    textAlign: "left",
    backgroundColor: "#f7f7f7",
    color: "#06402B",
  },
  td: {
    borderBottom: "1px solid #eee",
    padding: "12px",
    verticalAlign: "top",
  },
  tr: {
    transition: "background 0.3s",
  },
};

export default OrdersPage;