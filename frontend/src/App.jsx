import React, { useState, useEffect } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'

console.log('🚀 Tools-Sys 啟動')

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  // 從 localStorage 讀取登入狀態
  useEffect(() => {
    const savedLoggedIn = localStorage.getItem('isLoggedIn')
    const savedUsername = localStorage.getItem('username')

    if (savedLoggedIn === 'true' && savedUsername) {
      setIsLoggedIn(true)
      setUsername(savedUsername)
    } else {
      // 未登入時重定向到登入頁面
      if (location.pathname !== '/login') {
        navigate('/login', { replace: true })
      }
    }
  }, [navigate, location.pathname])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('username')
    localStorage.removeItem('loginTime')
    setIsLoggedIn(false)
    setUsername('')
    navigate('/login')
  }

  // 登入頁面不顯示導航
  if (location.pathname === '/login' || !isLoggedIn) {
    return <Outlet />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* 頂部導航欄 */}
      <nav className="glass sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2 text-white hover:text-purple-300 transition">
                <span className="text-2xl">🔧</span>
                <span className="font-bold text-xl">Tools-Sys</span>
              </Link>
            </div>

            {/* 導航連結 */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg transition ${
                  location.pathname === '/'
                    ? 'bg-purple-500/20 text-purple-300'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                工具中心
              </Link>
              <Link
                to="/admin"
                className={`px-4 py-2 rounded-lg transition ${
                  location.pathname.startsWith('/admin')
                    ? 'bg-purple-500/20 text-purple-300'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                管理後台
              </Link>
            </div>

            {/* 使用者信息 */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2">
                <span className="text-gray-300">👤</span>
                <span className="text-white font-medium">{username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition"
              >
                登出
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要內容區域 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* 頁脚 */}
      <footer className="mt-auto py-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-sm">
            Tools-Sys © 2026 | Developed by Cat
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
