import React, { useState } from 'react'
import { Box, Button, Container, Card, CardContent, TextField, Typography, ThemeProvider } from '@mui/material'
import axios from 'axios'
import theme from '../core/theme'
import { Link } from 'react-router-dom'

const LoginSignup = () => {
  // Toggle between 'login' and 'signup' modes
  const [mode, setMode] = useState('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setMessage('')

    try {
      if (mode === 'login') {
        const response = await axios.post('http://localhost:4001/login', { username, password })
        // Optionally save the token
        localStorage.setItem('token', response.data.token)
        setMessage('Login successful!')
        window.location.href = 'http://localhost:4000'
      } else {
        await axios.post('http://localhost:4001/signup', { username: username, password: password })
        setMessage('Signup successful!')
        window.location.href = 'http://localhost:4000'
      }
    } catch (error) {
      console.log(error)
      // If an error response was received from the backend, use its message; otherwise, show a generic error
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message)
      } else {
        setMessage('An error occurred. Please try again.')
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Card
          sx={{
            mt: 5,
            p: 2,
            backgroundColor: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              {mode === 'login' ? 'Login' : 'Sign Up'}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mt: 2,
              }}
            >
              <TextField label="Username" variant="outlined" value={username} onChange={e => setUsername(e.target.value)} required />
              <TextField label="Password" variant="outlined" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
              <Button variant="contained" type="submit">
                {mode === 'login' ? 'Login' : 'Sign Up'}
              </Button>
            </Box>
            {message && (
              <Typography align="center" sx={{ mt: 2 }} color="error">
                {message}
              </Typography>
            )}
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2">
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <Button
                  onClick={() => {
                    setMode(mode === 'login' ? 'signup' : 'login')
                    setMessage('')
                  }}
                  sx={{ textTransform: 'none' }}
                >
                  {mode === 'login' ? 'Sign Up' : 'Login'}
                </Button>
              </Typography>
              {/* Optionally include a link for password recovery */}
              {mode === 'login' && (
                <Typography variant="caption" display="block">
                  {/* <Link to="/forgot-password">Forgot password?</Link> */}
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  )
}

export default LoginSignup
