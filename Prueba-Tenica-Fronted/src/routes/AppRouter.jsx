import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import Assets from '../pages/Assets'
import AssetForm from '../pages/AssetForm'
import Employees from '../pages/Employees'
import NotFound from '../pages/NotFound'
import Layout from '../layout/Layout'
import useAuth from '../hooks/useAuth'

function PrivateRoute({ children }){
  const { user } = useAuth()
  if(!user) return <Navigate to='/login' replace />
  return children
}

export default function AppRouter(){
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="assets" element={<Assets />} />
        <Route path="assets/new" element={<AssetForm />} />
        <Route path="assets/edit/:id" element={<AssetForm />} />
        <Route path="employees" element={<Employees />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
