import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Admin() {
  const [tools, setTools] = useState([])
  const [users, setUsers] = useState([])
  const [activeTab, setActiveTab] = useState('tools') // 'tools' or 'users'

  useEffect(() => {
    // 取得工具列表
    fetch('/api/tools')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setTools(data.data)
        }
      })

    // 取得使用者列表（需要驗證）
    const token = localStorage.getItem('token')
    if (token) {
      fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'success') {
            setUsers(data.data)
          }
        })
    }
  }, [])

  return (
    <div className="max-w-7xl mx-auto">
      {/* 標題 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
          管理後台
        </h1>
        <p className="text-lg text-gray-400">
          管理工具與使用者
        </p>
      </div>

      {/* Tab 切換 */}
      <div className="flex justify-center mb-8 space-x-4">
        <button
          onClick={() => setActiveTab('tools')}
          className={`px-6 py-3 rounded-xl transition ${
            activeTab === 'tools'
              ? 'glass neon-glow'
              : 'glass opacity-60 hover:opacity-80'
          }`}
        >
          工具管理
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-6 py-3 rounded-xl transition ${
            activeTab === 'users'
              ? 'glass neon-glow'
              : 'glass opacity-60 hover:opacity-80'
          }`}
        >
          使用者管理
        </button>
      </div>

      {/* 工具管理 */}
      {activeTab === 'tools' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <Link
              to="/admin/tools/new"
              className="glass neon-glow px-6 py-3 rounded-xl text-white hover:bg-blue-500/30 transition"
            >
              + 新增工具
            </Link>
          </div>

          <div className="grid gap-4">
            {tools.map(tool => (
              <div key={tool.id} className="glass-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-6m0 0l-4 6m4-6v10m-4-4h14a2 2 0 002 2v14a2 2 0 00-2-2H7a2 2 0 00-2-2v-14a2 2 0 00-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {tool.name}
                      </h3>
                      <span className="text-xs font-mono text-purple-400 bg-purple-400/10 px-2 py-1 rounded">
                        v{tool.version || '1.0.0'}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/tools/${tool.id}/edit`}
                      className="text-gray-400 hover:text-white transition px-3 py-1 glass rounded-lg"
                    >
                      編輯
                    </Link>
                    <button className="text-red-400 hover:text-red-300 transition px-3 py-1 glass rounded-lg">
                      刪除
                    </button>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-2">
                  {tool.description || '沒有描述'}
                </p>
                <code className="block bg-black/30 px-3 py-1 rounded-lg text-blue-300 text-sm font-mono">
                  {tool.route}
                </code>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 使用者管理 */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button className="glass neon-glow px-6 py-3 rounded-xl text-white hover:bg-purple-500/30 transition">
              + 新增使用者
            </button>
          </div>

          <div className="grid gap-4">
            {users.map(user => (
              <div key={user.id} className="glass-card p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {user.username}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        {user.is_admin && (
                          <span className="text-xs font-mono text-purple-400 bg-purple-400/10 px-2 py-1 rounded">
                            管理員
                          </span>
                        )}
                        {user.is_active && (
                          <span className="text-xs font-mono text-green-400 bg-green-400/10 px-2 py-1 rounded">
                            啟用
                          </span>
                        )}
                        {!user.is_active && (
                          <span className="text-xs font-mono text-red-400 bg-red-400/10 px-2 py-1 rounded">
                            停用
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-white transition px-3 py-1 glass rounded-lg">
                      編輯權限
                    </button>
                    <button className="text-red-400 hover:text-red-300 transition px-3 py-1 glass rounded-lg">
                      停用
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin
