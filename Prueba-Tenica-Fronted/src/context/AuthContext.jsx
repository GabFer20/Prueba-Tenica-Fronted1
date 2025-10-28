import React, { createContext, useEffect, useState } from 'react'
import api from '../api/axios'

export const AuthContext = createContext()

export function AuthProvider({ children }){
  const [user, setUser] = useState(()=> {
    try { return JSON.parse(localStorage.getItem('auth_user')) } catch(e){ return null }
  })
  const [loading, setLoading] = useState(false)

  useEffect(()=> {
    // could validate token here
  },[])

  async function login(email, password){
    setLoading(true)
    try{
      const res = await api.get('/users', { params: { email, password }})
      const found = res.data[0]
      if(found){
        setUser(found)
        localStorage.setItem('auth_user', JSON.stringify(found))
        return { ok: true, user: found }
      } else {
        return { ok: false, message: 'Credenciales incorrectas' }
      }
    }catch(err){
      return { ok:false, message: err.message || 'Error' }
    }finally{ setLoading(false) }
  }

  async function register(name, email, password){
    setLoading(true)
    try{
      const res = await api.post('/users', { name, email, password, role: 'employee' })
      return { ok: true, user: res.data }
    }catch(err){
      return { ok:false, message: err.message || 'Error' }
    }finally{ setLoading(false) }
  }

  function logout(){
    setUser(null)
    localStorage.removeItem('auth_user')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
