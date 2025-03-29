// import logo from './logo.svg';
import './App.css'
import './style.css'
import React, { useLayoutEffect } from 'react'
import { Home } from './pages'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

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
      {/* <Navbar /> */}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Home />} />
        <Route path="/create" element={<Home />} />
        <Route path="/component/:id" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
