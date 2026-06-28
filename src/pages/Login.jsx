function Login() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>CRM Login</h1>

      <input
        type="email"
        placeholder="Enter Email"
        style={{
          padding: "10px",
          margin: "10px",
          width: "250px",
        }}
      />

      <br />

      <input
        type="password"
        placeholder="Enter Password"
        style={{
          padding: "10px",
          margin: "10px",
          width: "250px",
        }}
      />

      <br />

    <button
         onClick={() => alert("Login Successful")}
         style={{
         padding: "10px 20px",
        cursor: "pointer",
        }}
    >
         Login
    </button>
    </div>
  );
}

export default Login;