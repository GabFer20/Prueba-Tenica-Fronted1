import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'
import Spinner from '../components/Spinner'

export default function AssetForm(){
  const { id } = useParams()
  const editMode = !!id
  const [loading,setLoading]=useState(false)
  const [employees,setEmployees]=useState([])
  const [form,setForm]=useState({ name:'', model:'', status:'available', userId: '' })
  const nav = useNavigate()

  useEffect(()=>{ async function load(){ setLoading(true); try{
    const resUsers = await api.get('/users'); setEmployees(resUsers.data)
    if(editMode){
      const r = await api.get(`/assets/${id}`); setForm({ ...r.data, userId: r.data.userId || '' })
    }
  }catch(err){} setLoading(false) } load() },[id])

  async function handle(e){
    e.preventDefault()
    const payload = { name: form.name, model: form.model, status: form.status, userId: form.userId || null }
    setLoading(true)
    try{
      if(editMode) await api.put(`/assets/${id}`, payload)
      else await api.post('/assets', payload)
      nav('/assets')
    }catch(err){ alert('Error'); }
    setLoading(false)
  }

  if(loading) return <Spinner />
  return (
    <div className="max-w-xl bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">{editMode? 'Editar Activo' : 'Nuevo Activo'}</h2>
      <form onSubmit={handle} className="space-y-3">
        <label>Nombre
          <input className="w-full border p-2 rounded" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
        </label>
        <label>Modelo
          <input className="w-full border p-2 rounded" value={form.model} onChange={e=>setForm({...form, model: e.target.value})} />
        </label>
        <label>Estado
          <select className="w-full border p-2 rounded" value={form.status} onChange={e=>setForm({...form, status: e.target.value})}>
            <option value="assigned">assigned</option>
            <option value="available">available</option>
            <option value="maintenance">maintenance</option>
          </select>
        </label>
        <label>Asignar a
          <select className="w-full border p-2 rounded" value={form.userId || ''} onChange={e=>setForm({...form, userId: e.target.value})}>
            <option value="">-- Ninguno --</option>
            {employees.map(u=> <option key={u.id} value={u.id}>{u.name} ({u.email})</option>)}
          </select>
        </label>
        <div className="flex space-x-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Guardar</button>
          <button type="button" onClick={()=> nav('/assets')} className="px-4 py-2 border rounded">Cancelar</button>
        </div>
      </form>
    </div>
  )
}
