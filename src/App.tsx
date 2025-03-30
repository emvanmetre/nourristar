// import logo from './logo.svg';
import './App.css'
import './style.css'
import React, { useLayoutEffect } from 'react'
import { Home, LoginSignup, Create, Recipes, RecipePage, UserRecipePage } from './pages'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components'

const ScrollToTop = () => {
  const location = useLocation()

  useLayoutEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0 })
  }, [location.pathname])

  return null
}

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Recipes />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/MyAccount" element={<UserRecipePage />} />
        <Route path="/recipe/:title" element={<RecipePage />} />
      </Routes>
    </Router>
  )
}

export default App
