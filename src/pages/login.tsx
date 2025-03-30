import React, { useState } from "react"
import axios from "axios"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")

    try {
      // Check if the user exists and the password matches
      const loginResponse = await axios.post("http://localhost:4000/login", { username, password })
      setMessage("Login successful!") // Login successful
      localStorage.setItem("token", loginResponse.data.token) // Save token if needed
      
    } catch (error: any) {
        
      // Handle user not found or password mismatch
      if (error.response) {
        const errorMessage = error.response.data.message
        if (errorMessage === "User not found") {
          try {
            // If the user is not found, create an account
            setMessage("Account created!") // Account created
          } catch (signupError: any) {
            setMessage(signupError.response?.data.message || "Error creating account")
          }
        } else if (errorMessage === "Incorrect password") {
          setMessage("Incorrect password") // Password mismatch
        } else {
          setMessage("error here.")
        }
      } else {
        setMessage("eeeeerrrrorrerrror:")
        setMessage(error)
        console.log("error: ", error)
      }
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
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
        }}
      >
        <h2 style={{ textAlign: "center" }}>Welcome</h2>
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
    </div>
  )
}

export default Login
