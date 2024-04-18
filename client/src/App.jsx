import { useEffect, useState } from 'react'
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
import Denied from './pages/Denied'
import Leave from './pages/Leave'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Task from './pages/Task'
import LeadForm from './pages/LeadForm'
import RequireAuth from './components/auth/RequireAuth'
import PrivateRoutes from './components/auth/PrivateRoutes'
import Reminder from './pages/Reminder'
<Route
  path="/"
  element={<PrivateRoutes allowedRoles={["Admin", "Manager", "Hr"]} />}
>
  <Route index element={<Dashboard />} />
</Route>
function App() {
  return (
    <Routes>
      <Route path='/register' element={<Register />} />
      <Route path='/admin-login' element={<Login />} />
      <Route path='/user-login' element={<EmployeeLogin />} />
      <Route path='/denied' element={<Denied />} />
      <Route path='/inquiry' element={<LeadForm />} />
      <Route path='/reminder' element={<Reminder />} />

      <Route path="/" element={<PrivateRoutes allowedRoles={["Admin", "Manager", "Sales Executive", "Hr"]} />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path='/leads/page/:page' element={<PrivateRoutes allowedRoles={["Admin", "Manager", "Sales Executive", "Intern"]} />}>
        <Route index element={<Leads />} />
      </Route>
      <Route path='/leave' element={<PrivateRoutes allowedRoles={["Admin", "Manager", "Hr", "Sales Executive", "Intern"]} />}>
        <Route index element={<Leave />} />
      </Route>
      <Route path="/employees" element={<PrivateRoutes allowedRoles={["Admin", "Manager", "Hr"]} />}>
        <Route index element={<Employees />} />
      </Route>
      <Route path="/task" element={<PrivateRoutes allowedRoles={["Admin", "Manager", "Hr", "Sales Executive", "Intern"]} />}>
        <Route index element={<Task />} />
      </Route>

      <Route path="/profile/:uid" element={<PrivateRoutes allowedRoles={["Admin", "Manager", "Hr", "Sales Executive", "Intern"]} />}>
        <Route index element={<Profile />} />
      </Route>

      {/* <Route path='/profile/:uid' element={<Profile />} />
        <Route path='/task' element={<Task />} />
        <Route path='/inquiry' element={<LeadForm />} /> */}

      {/* <Route element={<PrivateRoutes allowedRoles={["Admin", "Hr"]} />}>
        <Route index element={<Home />} />
        <Route path='/employees' element={<Employees />} />
      </Route>

      <Route element={<PrivateRoutes allowedRoles={["Admin", "Sales Executive"]} />}>
        <Route index element={<Home />} />
        <Route path='/leads' element={<Leads />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={["Admin", "Intern"]} />}>
        <Route path='/leads' element={<Leads />} />
      </Route> */}
    </Routes>

  )
}

export default App
