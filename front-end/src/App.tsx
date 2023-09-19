import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Dashboard from './pages/Dashboard'
import RegisterCapital from './pages/CapitalRegister'
import Registration from './pages/Register'
import Login from './pages/Login'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registrar" element={<Registration />} />
        <Route path="/faturamento" element={<RegisterCapital />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
