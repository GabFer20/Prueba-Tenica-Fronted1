import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function Sidebar(){
  const { user, logout } = useAuth()
  const nav = useNavigate()

  function handleLogout(){
    logout()
    nav('/login')
  }

  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">ActivoCorp</h2>
        {user && <p className="text-sm text-slate-500">{user.name}</p>}
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li><NavLink to="/dashboard" className={({isActive})=> isActive? 'font-semibold':'text-slate-600'}>Dashboard</NavLink></li>
          <li><NavLink to="/assets" className={({isActive})=> isActive? 'font-semibold':'text-slate-600'}>Activos</NavLink></li>
          <li><NavLink to="/employees" className={({isActive})=> isActive? 'font-semibold':'text-slate-600'}>Empleados</NavLink></li>
        </ul>
      </nav>
      <div className="p-4 mt-auto">
        <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded">Cerrar sesión</button>
      </div>
    </aside>
  )
}
