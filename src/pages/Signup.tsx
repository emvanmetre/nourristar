// Signup.tsx
import React, { useState } from 'react'
import axios from 'axios'

const Signup = () => {
  document.body.classList.add('bg-light')
  document.body.classList.remove('bg-image')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    try {
      const response = await axios.post('http://localhost:4000/signup', { username, password })

      // Check backend response for success
      if (response.status === 201) {
        setMessage('User created successfully!')
        localStorage.setItem('userId', response.data.user._id) // Save user ID in localStorage
      }
    } catch (error: any) {
      // Handle errors based on backend response
      if (error.response && error.response.data.message === 'User already exists') {
        setMessage('An account already exists for this username.')
      } else {
        setMessage('Error creating account. Please try again.')
      }
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <form
        onSubmit={handleSignup}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '2rem',
          border: '1px solid #ccc',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          width: '300px',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>Create Account</h2>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        {message && <p style={{ color: message.includes('successfully') ? 'green' : 'red' }}>{message}</p>}
        <button
          type="submit"
          style={{
            padding: '0.5rem',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Signup
