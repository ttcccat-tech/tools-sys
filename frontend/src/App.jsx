import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ToolDetail from './pages/ToolDetail'
import Admin from './pages/Admin'
import Login from './pages/Login'

function App() {
  return (
    <div className="min-h-screen">
      {/* 頂部導航 */}
      <nav className="glass fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Tools-Sys
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-300 hover:text-white transition">
              工具
            </Link>
            <Link to="/admin" className="text-gray-300 hover:text-white transition">
              管理
            </Link>
            <Link to="/login" className="text-gray-300 hover:text-white transition">
              登入
            </Link>
          </div>
        </div>
      </nav>

      {/* 主要內容 */}
      <main className="pt-24 px-6 pb-12">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tools/:id" element={<ToolDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
