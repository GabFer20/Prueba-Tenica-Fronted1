import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import Card from '../components/Card'
import Spinner from '../components/Spinner'

export default function Dashboard(){
  const [loading,setLoading]=useState(true)
  const [stats,setStats]=useState({total:0,assigned:0,available:0})
  useEffect(()=>{
    async function load(){
      setLoading(true)
      try{
        const res = await api.get('/assets')
        const assets = res.data
        const total = assets.length
        const assigned = assets.filter(a=> a.status === 'assigned').length
        const available = assets.filter(a=> a.status === 'available').length
        setStats({total,assigned,available})
      }catch(err){}
      setLoading(false)
    }
    load()
  },[])

  if(loading) return <Spinner />
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Total de Activos">{stats.total}</Card>
        <Card title="Asignados">{stats.assigned}</Card>
        <Card title="Disponibles">{stats.available}</Card>
      </div>
    </div>
  )
}
