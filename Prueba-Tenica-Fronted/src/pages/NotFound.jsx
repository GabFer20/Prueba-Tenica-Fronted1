import React from 'react'
import { Link } from 'react-router-dom'
export default function NotFound(){
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mb-4">Página no encontrada</p>
        <Link to="/" className="text-blue-600">Volver al inicio</Link>
      </div>
    </div>
  )
}
