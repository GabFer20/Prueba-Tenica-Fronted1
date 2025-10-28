import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
export default function Login(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState('')
  const [error,setError]=useState(null)
  const { login } = useAuth()
  const nav = useNavigate()

  async function handle(e){
    e.preventDefault()
    const res = await login(email,password)
    if(res.ok) nav('/dashboard')
    else setError(res.message || 'Error')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handle} className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl mb-4">Iniciar sesión</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <label className="block mb-2">Email
          <input className="w-full border p-2 rounded" value={email} onChange={e=>setEmail(e.target.value)} />
        </label>
        <label className="block mb-4">Contraseña
          <input type="password" className="w-full border p-2 rounded" value={password} onChange={e=>setPassword(e.target.value)} />
        </label>
        <button className="w-full bg-blue-600 text-white p-2 rounded" type="submit">Entrar</button>
        <p className="mt-4 text-sm">¿No tienes cuenta? <Link to="/register" className="text-blue-600">Regístrate</Link></p>
      </form>
    </div>
  )
}
