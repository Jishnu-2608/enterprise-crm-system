import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 18px",
    marginBottom: "12px",
    textDecoration: "none",
    borderRadius: "10px",
    color: "white",
    fontWeight: "500",
    background: isActive ? "#2563eb" : "transparent",
    transition: "0.3s",
  });

  return (
    <div
      style={{
        width: "240px",
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "25px 15px",
        position: "sticky",
        top: 0,
      }}
    >
      <h1
        style={{
          color: "white",
          fontSize: "28px",
          textAlign: "center",
          marginBottom: "35px",
        }}
      >
        CRM System
      </h1>

      <NavLink to="/" style={linkStyle}>
        📊 Dashboard
      </NavLink>

      <NavLink to="/leads" style={linkStyle}>
        👤 Leads
      </NavLink>

      <NavLink to="/customers" style={linkStyle}>
        👥 Customers
      </NavLink>

      <NavLink to="/login" style={linkStyle}>
        🔐 Login
      </NavLink>

      <div
        style={{
          marginTop: "60px",
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "14px",
        }}
      >
        CRM System v1.0
      </div>
    </div>
  );
}

export default Sidebar;