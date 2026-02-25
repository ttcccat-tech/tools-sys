import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// 導入組件
import App from './App'
import Login from './components/Login'
import Dashboard from './pages/Dashboard'
import ToolDetail from './pages/ToolDetail'
import Admin from './pages/Admin'

console.log('🚀 Tools-Sys 應用已啟動')

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 登入路由 */}
        <Route path="/login" element={<Login />} />

        {/* 主應用路由 */}
        <Route path="/" element={<App />}>

          {/* Dashboard 頁面 */}
          <Route index element={<Dashboard />} />

          {/* 工具詳情頁面 */}
          <Route path="tools/:id" element={<ToolDetail />} />

          {/* 管理後台 */}
          <Route path="admin" element={<Admin />} />

          {/* 404 重定向 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const rootElement = document.getElementById('root')

console.log('✅ 根元素已找到')

// 渲染主應用（包含路由）
console.log('🎨 開始渲染主應用（包含路由）...')
const root = ReactDOM.createRoot(rootElement)
root.render(<Main />)

console.log('✅ 主應用（包含路由）渲染完成！')

console.log('🏁 應用加載完成')
