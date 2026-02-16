import React, { useState, useEffect } from 'react'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password,
          remember
        })
      })

      const data = await response.json()

      if (data.status === 'success') {
        // 儲存 token
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('user', JSON.stringify(data.data.user))

        // 重定向到管理後台
        window.location.href = '/admin'
      } else {
        alert(data.message || '登入失敗')
      }
    } catch (error) {
      console.error('登入錯誤:', error)
      alert('登入失敗，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="glass-card neon-glow p-8">
          {/* 標題 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
              登入系統
            </h1>
            <p className="text-gray-400">
              管理員專用
            </p>
          </div>

          {/* 登入表單 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 使用者名稱 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                使用者名稱
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                placeholder="輸入使用者名稱"
                required
              />
            </div>

            {/* 密碼 */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                密碼
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                placeholder="輸入密碼"
                required
              />
            </div>

            {/* 記住我 */}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 bg-black/30 border border-white/10 rounded text-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <label className="ml-3 text-sm text-gray-400">
                記住我
              </label>
            </div>

            {/* 登入按鈕 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '登入中...' : '登入'}
            </button>
          </form>

          {/* 頁尾 */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <Link
              to="/"
              className="text-sm text-gray-400 hover:text-white transition"
            >
              返回工具列表
            </Link>
          </div>
        </div>

        {/* 提示 */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            預設管理員帳號: <span className="font-mono text-blue-400">admin</span> / <span className="font-mono text-blue-400">admin</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
