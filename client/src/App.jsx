import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Leads from './pages/Leads'
import Employees from './pages/Employees'
import EmployeeLogin from './pages/EmployeeLogin'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/employee-login' element={<EmployeeLogin />} />
      <Route path='/leads' element={<Leads />} />
      <Route path='/employees' element={<Employees />} />
    </Routes>
  )
}

export default App
