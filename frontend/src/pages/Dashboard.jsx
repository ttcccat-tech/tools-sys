import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Dashboard() {
  const [tools, setTools] = useState([])

  useEffect(() => {
    // 從 API 取得工具列表
    fetch('/api/tools')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setTools(data.data)
        }
      })
      .catch(err => console.error('無法取得工具列表:', err))
  }, [])

  return (
    <div className="max-w-7xl mx-auto">
      {/* 標題 */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          工具中心
        </h1>
        <p className="text-xl text-gray-400">
          探索所有開發者工具，提升你的工作效率
        </p>
      </div>

      {/* Grid 佈局 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(tool => (
          <Link
            key={tool.id}
            to={`/tools/${tool.id}`}
            className="glass-card neon-glow group"
          >
            {/* 工具圖示 */}
            <div className="w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-6m0 0l-4 6m4-6v10m-4-4h14a2 2 0 002 2v14a2 2 0 00-2-2H7a2 2 0 00-2-2v-14a2 2 0 00-2 2z" />
              </svg>
            </div>

            {/* 工具名稱 */}
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition">
              {tool.name}
            </h3>

            {/* 工具描述 */}
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {tool.description || '沒有描述'}
            </p>

            {/* 版本號 */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-purple-400 bg-purple-400/10 px-2 py-1 rounded">
                v{tool.version || '1.0.0'}
              </span>
              <span className="text-gray-500 text-xs">
                查看 →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* 空狀態 */}
      {tools.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-500">還沒有工具</p>
          <Link to="/admin" className="text-blue-400 hover:text-blue-300">
            前往管理後台新增工具
          </Link>
        </div>
      )}
    </div>
  )
}

export default Dashboard
