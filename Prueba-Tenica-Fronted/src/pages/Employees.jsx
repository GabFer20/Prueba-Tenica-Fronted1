import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import Spinner from '../components/Spinner'

export default function Employees(){
  const [loading,setLoading]=useState(true)
  const [users,setUsers]=useState([])

  useEffect(()=>{ async function load(){ setLoading(true); try{ const res = await api.get('/users'); setUsers(res.data) }catch(err){} setLoading(false) } load() },[])

  if(loading) return <Spinner />
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Empleados</h1>
      <div className="bg-white rounded shadow p-4">
        <table className="w-full">
          <thead className="bg-slate-100"><tr><th className="p-2 text-left">Nombre</th><th className="p-2 text-left">Email</th></tr></thead>
          <tbody>
            {users.map(u=>(
              <tr key={u.id} className="border-t"><td className="p-2">{u.name}</td><td className="p-2">{u.email}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
