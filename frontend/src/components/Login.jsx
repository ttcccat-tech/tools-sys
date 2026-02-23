import React, { useState } from 'react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // ✅ 從 localStorage 讀取登入狀態
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  )

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!username || !password) {
      setError('請輸入使用者名稱和密碼')
      return
    }

    setLoading(true)
    
    try {
      // TODO: 呼叫後端 API
      console.log('登入中...', {
        username,
        remember,
        timestamp: new Date().toISOString()
      })

      // 模擬 API 調用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // ✅ 保存登入狀態到 localStorage
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('loginTime', new Date().toISOString())
      localStorage.setItem('username', username)
      
      // ✅ 更新本地狀態
      setIsLoggedIn(true)
      
      alert('登入成功！（尚未連接後端 API）')
      
      // ✅ 跳轉到主應用
      window.location.href = '/'
      
    } catch (err) {
      console.error('登入失敗：', err)
      setError('登入失敗，請稍後再試')
      setIsLoggedIn(false)
      localStorage.removeItem('isLoggedIn')
    } finally {
      setLoading(false)
    }
  }

  // 如果已登入，重定向到主應用
  React.useEffect(() => {
    if (isLoggedIn) {
      const redirectTimer = setTimeout(() => {
        window.location.href = '/'
      }, 500)
      
      return () => clearTimeout(redirectTimer)
    }
  }, [isLoggedIn])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        background: 'rgba(30, 41, 59, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(148, 163, 184, 0.2)',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        {/* 標題 */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '48px',
              height: '1px',
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)'
            }}></div>
            <h1 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#f8fafc',
              margin: '0 16px',
              letterSpacing: '1px'
            }}>
              TOOLS-SYS
            </h1>
            <div style={{
              width: '48px',
              height: '1px',
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)'
            }}></div>
          </div>
          <p style={{
            fontSize: '14px',
            color: '#94a3b8',
            fontWeight: '500'
          }}>
            開發者工具系統 - 登入
          </p>
        </div>

        {/* 登入表單 */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* 使用者名稱 */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#e2e8f0',
              marginBottom: '8px'
            }}>
              <span style={{ color: '#3b82f6', marginRight: '8px', fontFamily: 'monospace' }}>
                &lt;
              </span>
              使用者名稱
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="輸入使用者名稱"
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '14px',
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#f8fafc',
                outline: 'none',
                transition: 'all 0.2s ease',
                fontFamily: 'Arial, sans-serif'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6'
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.3)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#334155'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          {/* 密碼 */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#e2e8f0',
              marginBottom: '8px'
            }}>
              <span style={{ color: '#3b82f6', marginRight: '8px', fontFamily: 'monospace' }}>
                &lt;/
              </span>
              密碼
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="輸入密碼"
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '14px',
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#f8fafc',
                outline: 'none',
                transition: 'all 0.2s ease',
                fontFamily: 'Arial, sans-serif'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6'
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.3)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#334155'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          {/* 記住我 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              style={{
                width: '16px',
                height: '16px',
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid #334155',
                borderRadius: '4px',
                cursor: 'pointer',
                accentColor: '#3b82f6'
              }}
            />
            <label
              htmlFor="remember"
              style={{
                fontSize: '14px',
                color: '#94a3b8',
                cursor: 'pointer',
                userSelect: 'none'
              }}
            >
              記住我
            </label>
          </div>

          {/* 錯誤提示 */}
          {error && (
            <div style={{
              padding: '12px 16px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: '8px',
              color: '#fca5a5',
              fontSize: '14px',
              fontWeight: '500',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          {/* 登入按鈕 */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px 24px',
              fontSize: '16px',
              fontWeight: '600',
              background: loading ? '#64748b' : 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              fontFamily: 'Arial, sans-serif',
              boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)',
              opacity: loading ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.background = 'linear-gradient(90deg, #2563eb, #7c3aed)'
                e.target.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4)'
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.background = 'linear-gradient(90deg, #3b82f6, #8b5cf6)'
                e.target.style.boxShadow = '0 4px 6px -1px rgba(59, 130, 246, 0.3)'
              }
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ 
                  display: 'inline-block',
                  width: '16px',
                  height: '16px',
                  border: '2px solid #ffffff',
                  borderRadius: '50%',
                  borderTopColor: 'transparent',
                  animation: 'spin 0.6s linear infinite'
                }}></span>
                <span style={{ marginLeft: '8px' }}>登入中...</span>
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginRight: '8px' }}
                >
                  <path d="M11 16l-4-4m0 0l4 4m-4-4h14a2 2 0 002 2v14a2 2 0 00-2-2h-7a2 2 0 00-2-2v14a2 2 0 002 2z" />
                </svg>
                <span>登入系統</span>
              </span>
            )}
          </button>
        </form>

        {/* 頁尾 */}
        <div style={{
          marginTop: '24px',
          paddingTop: '24px',
          borderTop: '1px solid rgba(148, 163, 184, 0.1)',
          textAlign: 'center',
          paddingBottom: '16px'
        }}>
          <p style={{
            fontSize: '12px',
            color: '#64748b',
            fontWeight: '500',
            fontFamily: 'monospace'
          }}>
            v1.0.0 // build 2024.02
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
