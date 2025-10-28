import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import Spinner from '../components/Spinner'

export default function Assets(){
  const [loading,setLoading]=useState(true)
  const [assets,setAssets]=useState([])
  const nav = useNavigate()

  async function load(){
    setLoading(true)
    try{
      const res = await api.get('/assets?_expand=user')
      setAssets(res.data)
    }catch(err){}
    setLoading(false)
  }

  useEffect(()=>{ load() },[])

  async function handleDelete(id){
    const ok = confirm('¿Eliminar activo?')
    if(!ok) return
    await api.delete(`/assets/${id}`)
    load()
  }

  if(loading) return <Spinner />
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Activos</h1>
        <div>
          <Link to="/assets/new" className="bg-blue-600 text-white px-4 py-2 rounded">Agregar Nuevo Activo</Link>
        </div>
      </div>
      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full table-auto">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-2 text-left">Nombre</th>
              <th className="p-2 text-left">Modelo</th>
              <th className="p-2 text-left">Estado</th>
              <th className="p-2 text-left">Asignado a</th>
              <th className="p-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(a=>(
              <tr key={a.id} className="border-t">
                <td className="p-2">{a.name}</td>
                <td className="p-2">{a.model}</td>
                <td className="p-2">{a.status}</td>
                <td className="p-2">{a.user? a.user.name : '-'}</td>
                <td className="p-2">
                  <button onClick={()=> nav(`/assets/edit/${a.id}`)} className="mr-2 px-2 py-1 bg-yellow-400 rounded">Editar</button>
                  <button onClick={()=> handleDelete(a.id)} className="px-2 py-1 bg-red-500 text-white rounded">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
