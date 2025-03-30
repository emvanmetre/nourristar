import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Nourristar");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const loginResponse = await axios.post("http://localhost:4000/login", { username, password });
      setMessage(loginResponse.data.message);
      localStorage.setItem("token", loginResponse.data.token);
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Unexpected error occurred.");
      }
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Welcome</h2>
      <form
        onSubmit={handleAction}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "2rem",
          border: "1px solid #ccc",
          borderRadius: "5px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          width: "300px",
          margin: "0 auto",
        }}
      >
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button
          type="submit"
          style={{
            padding: "0.5rem",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Let's Go
        </button>
        {message && <p style={{ color: message.includes("successful") || message.includes("created") ? "green" : "red" }}>{message}</p>}
      </form>

      <h3>All Users in Database:</h3>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {users.length > 0 ? (
          users.map((user, index) => (
            <li key={index} style={{ padding: "0.5rem", borderBottom: "1px solid #ccc" }}>
              <strong>Username:</strong> {user.username}
            </li>
          ))
        ) : (
          <p>No users found in the database.</p>
        )}
      </ul>
    </div>
  );
};

export default Login;
