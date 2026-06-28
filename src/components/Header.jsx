function Header() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      style={{
        background: "white",
        padding: "18px 25px",
        borderRadius: "12px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
        marginBottom: "25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            color: "#0f172a",
          }}
        >
          CRM Dashboard
        </h2>

        <p
          style={{
            color: "#64748b",
            marginTop: "5px",
          }}
        >
          {today}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search..."
          style={{
            padding: "10px 15px",
            width: "240px",
            borderRadius: "8px",
            border: "1px solid #d1d5db",
          }}
        />

        <span
          style={{
            fontSize: "24px",
            cursor: "pointer",
          }}
        >
          🔔
        </span>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "#2563eb",
            color: "white",
            padding: "8px 15px",
            borderRadius: "30px",
          }}
        >
          👤 <strong>Admin</strong>
        </div>
      </div>
    </div>
  );
}

export default Header;