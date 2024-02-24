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
import RequireAuth from './components/auth/RequireAuth'
import Denied from './pages/Denied'
import Leave from './pages/Leave'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Task from './pages/Task'

function App() {
  return (
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/employee-login' element={<EmployeeLogin />} />
      <Route path='/denied' element={<Denied />} />
      {/* <Route element={<RequireAuth allowedRoles={["Admin", "Manager"]} />}> */}
      <Route path='/' element={<Dashboard />} />
      <Route path='/leads/page/:page' element={<Leads />} />
      <Route path='/leave' element={<Leave />} />
      <Route path='/employees' element={<Employees />} />
      <Route path='/profile/:uid' element={<Profile />} />
      <Route path='/task' element={<Task />} />
      {/* </Route> */}

      {/* <Route element={<RequireAuth allowedRoles={["Admin", "Hr"]} />}> */}
      {/* <Route path='/' element={<Home />} /> */}
      {/* <Route path='/employees' element={<Employees />} /> */}
      {/* </Route> */}

      {/* <Route element={<RequireAuth allowedRoles={["Admin", "Sales-Executive"]} />}> */}
      {/* <Route path='/' element={<Home />} /> */}
      {/* <Route path='/leads' element={<Leads />} /> */}
      {/* </Route> */}

      {/* <Route element={<RequireAuth allowedRoles={["Admin", "Intern"]} />}> */}
      {/* <Route path='/leads' element={<Leads />} /> */}
      {/* </Route> */}
    </Routes>
  )
}

export default App
