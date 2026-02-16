import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function ToolDetail() {
  const { id } = useParams()
  const [tool, setTool] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 從 API 取得工具詳情
    fetch(`/api/tools/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setTool(data.data)
        } else {
          console.error('API 錯誤:', data.message)
        }
        setLoading(false)
      })
      .catch(err => {
        console.error('無法取得工具詳情:', err)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-gray-400">載入中...</div>
      </div>
    )
  }

  if (!tool) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-2xl text-gray-400 mb-4">工具不存在</p>
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            返回工具列表
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      {/* 返回按鈕 */}
      <Link
        to="/"
        className="inline-flex items-center text-gray-400 hover:text-white transition mb-8"
      >
        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7 7m0 0l-7 7" />
        </svg>
        返回工具列表
      </Link>

      {/* 工具詳情卡片 */}
      <div className="glass-card neon-glow">
        {/* 標題區塊 */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
              <svg className="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-6m0 0l-4 6m4-6v10m-4-4h14a2 2 0 002 2v14a2 2 0 00-2-2H7a2 2 0 00-2-2v-14a2 2 0 00-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {tool.name}
              </h1>
              <span className="text-sm font-mono text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full">
                v{tool.version || '1.0.0'}
              </span>
            </div>
          </div>
        </div>

        {/* 描述區塊 */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-300 mb-3">工具描述</h2>
          <p className="text-gray-400 leading-relaxed">
            {tool.description || '沒有描述'}
          </p>
        </div>

        {/* 路由資訊區塊 */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-300 mb-3">路由</h2>
          <code className="block bg-black/30 px-4 py-2 rounded-lg text-blue-300 font-mono">
            {tool.route}
          </code>
        </div>

        {/* 操作按鈕區塊 */}
        <div className="flex space-x-4 pt-6 border-t border-white/10">
          <button className="flex-1 glass px-6 py-3 rounded-xl text-white hover:bg-blue-500/20 transition">
            開啟工具
          </button>
          <Link
            to={`/tools/${tool.id}/edit`}
            className="flex-1 glass px-6 py-3 rounded-xl text-center text-white hover:bg-purple-500/20 transition"
          >
            編輯
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ToolDetail
