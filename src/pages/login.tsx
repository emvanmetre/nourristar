import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:4000/login", {
        username,
        password,
      });

      if (response.data.token) {
        // Store the token in localStorage (or another secure location)
        localStorage.setItem("token", response.data.token);

        // Redirect to the desired URL
        navigate("/");
        window.location.href = "http://localhost:4000";
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "2rem",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          width: "300px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit" style={{ padding: "0.5rem", border: "none", borderRadius: "5px", backgroundColor: "#007bff", color: "#fff", cursor: "pointer" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
