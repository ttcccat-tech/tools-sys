# Frontend 開發規範

## 🎯 專案目標

開發一個**用戶友好、響應迅速、視覺精美**的 React 應用。

---

## 🧪 技術棧

- **框架**: React 18.2+
- **構建工具**: Vite 5.0+
- **路由**: React Router DOM v6
- **狀態管理**: React Hooks (useState, useEffect)
- **樣式**: Tailwind CSS
- **HTTP 客戶端**: Axios

---

## 🏗 項目結構

```
frontend/
├── CLAUDE.md              # 本文件
├── src/
│   ├── main.jsx            # 應用入口
│   ├── App.jsx              # 主應用組件
│   ├── components/          # 可複用組件
│   │   ├── Login.jsx      # 登入組件
│   │   ├── Dashboard.jsx  # 儀表板組件
│   │   ├── ToolCard.jsx    # 工具卡片組件
│   │   └── ...
│   ├── pages/              # 頁面組件
│   │   ├── Home.jsx       # 主頁
│   │   ├── Tools.jsx      # 工具頁
│   │   └── ...
│   ├── hooks/              # 自定義 Hooks
│   │   ├── useAuth.js     # 認證 Hook
│   │   ├── useTools.js    # 工具 Hook
│   │   └── ...
│   ├── services/            # API 服務
│   │   ├── api.js         # API 客戶端
│   │   ├── auth.js        # 認證 API
│   │   └── ...
│   ├── utils/              # 工具函數
│   │   ├── validation.js   # 表單驗證
│   │   ├── helpers.js      # 幫助函數
│   │   └── ...
│   ├── context/            # Context
│   │   ├── AuthContext.jsx  # 認證 Context
│   │   └── ...
│   └── styles/             # 全侷樣式
│       ├── index.css      # Tailwind CSS 導入
│       └── components.css # 組件樣式
├── index.html              # HTML 模板
├── vite.config.js         # Vite 配置
├── package.json            # 項目依賴
└── .env                   # 環境變數
```

---

## 🚀 快速開始

### 1️⃣ 安裝依賴

```bash
cd frontend
npm install
```

### 2️⃣ 啟動開發服務器

```bash
npm run dev
```

訪問: http://localhost:3000

### 3️⃣ 生產構建

```bash
npm run build
```

---

## 📦 主要組件

### Login.jsx
登入表單組件，包含：
- 用戶名/密碼輸入框
- 記住我選項
- 表單驗證
- 錯誤提示

### Dashboard.jsx
主頁面組件，包含：
- 應用標題
- 登入/登出按鈕
- 用戶信息顯示
- 系統狀態

### ToolCard.jsx
工具卡片組件，包含：
- 工具名稱
- 工具描述
- 工具版本
- 點擊跳轉

---

## 🎨 組件開發規範

### 組件結構
```jsx
export default function ComponentName() {
  // 1. Hooks
  const [state, setState] = useState(initialValue);

  // 2. Effects
  useEffect(() => {
    // 副作用
    return () => {
      // 清理函數
    };
  }, [dependencies]);

  // 3. Event Handlers
  const handleClick = () => {
    // 處理函數
  };

  // 4. Helper Functions
  const helperFunction = () => {
    // 幫助函數
  };

  // 5. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Props 規範
```jsx
// 定義 Props 接口
interface ComponentProps {
  title: string;
  description?: string;
  onClick: () => void;
  disabled?: boolean;
}

// 使用解構
export default function Component({ title, description, onClick, disabled }) {
  return <button onClick={onClick} disabled={disabled}>{title}</button>;
}
```

### 狀態規範
```jsx
// ❌ 避免：直接修改 Props
props.title = "New Title";  // 不要這樣做

// ✅ 推薦：使用 setState
const [title, setTitle] = useState(props.title);
setTitle("New Title");
```

---

## 🎨 Tailwind CSS 規範

### 使用方式
```jsx
// 直接使用 className
<div className="bg-blue-500 text-white p-4 rounded">

// 動態使用 className
<div className={`p-4 ${isActive ? 'bg-green-500' : 'bg-gray-500'}`}>

// 條件使用 className
<div className="p-4 border ${error ? 'border-red-500' : 'border-gray-300'} rounded">
```

### 常用類別
```jsx
// 佈局
.container mx-auto px-4 max-w-7xl

// Flexbox
.flex flex-row items-center justify-between

// Grid
.grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4

// 距離
.mt-4 mb-4 py-2 px-4

// 內邊距
.p-4

// 文本
.text-sm text-lg font-bold

// 背景
.bg-white bg-gray-100 bg-blue-500

// 圓角
.rounded-lg rounded-full

// 陰影
.shadow-md shadow-lg
```

### 響應式設計
```jsx
// 移動優先
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

// 桌面優先
<div className="hidden lg:block lg:grid-cols-4">

// 斷點控制
<div className="block sm:hidden">
  <div className="hidden sm:block lg:hidden">
    <div className="hidden lg:block">
```

---

## 🚀 路由規範

### 使用 React Router
```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/:id" element={<ToolDetail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 程序導航
```jsx
import { useNavigate } from 'react-router-dom';

function ToolDetail() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/tools');
  };

  return <button onClick={handleClick}>返回工具列表</button>;
}
```

---

## 🔒 安全規範

### XSS 防護
```jsx
// ❌ 避免：直接渲染用戶輸入
<div>{userInput}</div>

// ✅ 推薦：轉義或驗證
<div>{userInput.replace(/</g, '&lt;')}</div>
```

### 數據驗證
```jsx
// 使用 Props 類型檢查
interface Props {
  title: string;
  count: number;
}

function Component({ title, count }: Props) {
  // TypeScript 會自動驗證
  return <div>{title}: {count}</div>;
}
```

### 認證狀態管理
```jsx
// 使用 Context + Hooks
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

---

## 🧪 測試規範

### 組件測試
```jsx
// 使用 React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';

test('renders login form', () => {
  render(<Login />);
  expect(screen.getByText('登入系統')).toBeInTheDocument();
});

test('allows user to type username', () => {
  render(<Login />);
  const input = screen.getByPlaceholderText('輸入使用者名稱');
  fireEvent.change(input, { target: { value: 'testuser' } });
  expect(input.value).toBe('testuser');
});
```

### Hook 測試
```jsx
import { renderHook, act } from '@testing-library/react';

test('useAuth returns correct initial state', () => {
  const { result } = renderHook(() => useAuth());
  expect(result.current.user).toBeNull();
});
```

---

## 📚 性能優化

### 代碼分割
```jsx
// 使用 lazy loading
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  );
}
```

### 記憶化
```jsx
// 使用 useMemo
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);
```

### 防抖
```jsx
const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);

  return useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};
```

---

## 📚 文檔規範

### 組件文檔
```jsx
/**
 * Login Component
 * @description 用戶登入表單組件
 * @example
 * <Login />
 * @see {@link AuthContext}
 */
export default function Login() {
  // ...
}
```

### README
- 項目說明
- 安裝說明
- 開發啟動說明
- 生產構建說明

---

## 🔧 故障排除

### 常見問題

**1. 組件不渲染**
```jsx
// 檢查 React 版本
console.log(React.version);  // 應該 >= 18.0

// 檢查組件是否正確導入
import Login from './components/Login';
```

**2. 狀態更新失效**
```jsx
// 檢查是否使用了正確的依賴
const [count, setCount] = useState(0);

// 檢查是否正確調用 setCount
setCount(count + 1);  // 而不是 count + 1
```

**3. 樣式不生效**
```jsx
// 檢查 Tailwind CSS 是否正確導入
import './index.css';

// 檢查 Tailwind 配置
tailwind.config.js
```

---

## 📚 推薦資源

- [React 官方文檔](https://react.dev/)
- [React Router 文檔](https://reactrouter.com/)
- [Vite 文檔](https://vitejs.dev/)
- [Tailwind CSS 文檔](https://tailwindcss.com/)
- [Axios 文檔](https://axios-http.com/docs/intro)

---

*最後更新：2026-02-21*
*維護者：Cat*
