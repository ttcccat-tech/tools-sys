import React, { useState, useEffect } from 'react'

console.log('🚀 極化版 Tools-Sys 啟動')

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  // ✅ 從 localStorage 讀取登入狀態
  useEffect(() => {
    const savedLoggedIn = localStorage.getItem('isLoggedIn')
    console.log('📦 已保存的登入狀態:', savedLoggedIn)
    
    if (savedLoggedIn === 'true') {
      setIsLoggedIn(true)
      const savedUsername = localStorage.getItem('username')
      const savedLoginTime = localStorage.getItem('loginTime')
      setMessage(`歡迎回來，${savedUsername}！登入時間：${new Date(savedLoginTime).toLocaleString('zh-TW')}`)
    } else {
      setMessage('請登入以使用系統功能')
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    
    console.log('🔑 開始登入...', {
      username,
      timestamp: new Date().toISOString()
    })
    
    // 模擬 API 調用
    setTimeout(() => {
      // ✅ 保存登入狀態到 localStorage
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('username', username)
      localStorage.setItem('loginTime', new Date().toISOString())
      
      // ✅ 更新本地狀態
      setIsLoggedIn(true)
      setMessage(`登入成功！歡迎，${username}！登入時間：${new Date().toLocaleString('zh-TW')}`)
      
      console.log('✅ 登入成功！登入狀態已保存到 localStorage')
      
      alert('登入成功！（尚未連接後端 API）')
    }, 500)
  }

  const handleLogout = () => {
    console.log('🚪 開始登出...')
    
    // ✅ 清除登入狀態
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('username')
    localStorage.removeItem('loginTime')
    
    // ✅ 更新本地狀態
    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
    setMessage('請登入以使用系統功能')
    
    console.log('✅ 登出成功！')
  }

  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#667eea',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        padding: '20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            Tools-Sys 登入
          </h1>
          
          <p style={{
            fontSize: '16px',
            marginBottom: '30px',
            textAlign: 'center',
            opacity: 0.8
          }}>
            {message}
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                用戶名：
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="請輸入用戶名"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
                密碼：
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="請輸入密碼"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  outline: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '18px',
                fontWeight: 'bold',
                backgroundColor: '#4ade80',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              登入系統
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#10b981',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '600px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
        }}>
          👤 {username || '用戶'}
        </h1>
        
        <p style={{
          fontSize: '24px',
          marginBottom: '10px',
          opacity: 0.9
        }}>
          歡迎回來！
        </p>

        <p style={{
          fontSize: '18px',
          marginBottom: '40px',
          opacity: 0.7',
          lineHeight: '1.6'
        }}>
          {message}
        </p>

        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          marginBottom: '40px'
        }}>
          <button
            onClick={() => alert('查詢功能開發中')}
            style={{
              padding: '15px 30px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            🎯 查詢
          </button>

          <button
            onClick={() => alert('報表功能開發中')}
            style={{
              padding: '15px 30px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            📊 報表
          </button>

          <button
            onClick={() => alert('設定功能開發中')}
            style={{
              padding: '15px 30px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            ⚙️ 設定
          </button>

          <button
            onClick={() => alert('搜索功能開發中')}
            style={{
              padding: '15px 30px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            🔍 搜索
          </button>
        </div>

        <p style={{
          fontSize: '16px',
          opacity: 0.6',
          marginBottom: '40px'
        }}>
          系統狀態：✅ 已登入
        </p>

        <button
          onClick={handleLogout}
          style={{
            padding: '16px 40px',
            fontSize: '18px',
            fontWeight: 'bold',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 6px rgba(239, 68, 68, 0.3)'
          }}
        >
          🚪 登出系統
        </button>
      </div>
    </div>
  )
}

export default App
