# Tools-Sys - 開發者工具系統

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

一個簡潔俐落的前後端工具系統，採用工程師風格設計。

## 專案預覽

![專案截圖](https://via.placeholder.com/800x400?text=Tools-Sys+Dashboard)

## 技術棧

### 前端
- **框架**: React 18
- **路由**: React Router DOM v6
- **構建工具**: Vite 5
- **樣式**: Tailwind CSS
- **設計風格**: Glassmorphism

### 後端
- **框架**: FastAPI
- **伺服器**: Uvicorn
- **資料庫**: SQLite
- **認證**: JWT

### 部署
- **容器化**: Docker
- **編排工具**: Docker Compose
- **Web 服務器**: Nginx

## 功能

- ✅ 使用者登入 (JWT 認證)
- ✅ 工具卡片展示 (Grid 佈局)
- ✅ Glassmorphism 設計
- ✅ 工具詳情頁面
- ✅ 管理後台
  - 工具管理 (CRUD)
  - 使用者管理
  - 權限控制
- ✅ API Proxy

## 快速開始

### 部署
```bash
git clone https://github.com/ttcccat-tech/tools-sys.git
cd tools-sys/deploy
chmod +x start.sh
./start.sh
```

### 本地開發
```bash
# 前端
cd frontend
npm install
npm run dev

# 後端
cd backend-gateway/api
pip install -r requirements.txt
uvicorn main:app --reload
```

## 專案結構

```
tools-sys/
├── frontend/              # 前端
│   ├── src/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend-gateway/       # 後端
│   └── api/
│       ├── main.py
│       └── requirements.txt
├── db/                  # 資料庫
│   ├── schema.sql
│   └── init.sh
├── deploy/               # 部署
│   ├── Dockerfile
│   ├── docker-compose.yaml
│   └── nginx.conf
└── README.md
```

## API 端點

### 認證
- `POST /api/auth/login` - 使用者登入
- `POST /api/auth/refresh` - 刷新 Token

### 工具
- `GET /api/tools` - 取得所有工具
- `GET /api/tools/:id` - 取得單一工具
- `POST /api/tools` - 新增工具
- `PUT /api/tools/:id` - 更新工具
- `DELETE /api/tools/:id` - 刪除工具

### 使用者
- `GET /api/users` - 取得使用者列表
- `POST /api/users` - 新增使用者
- `PUT /api/users/:id` - 更新使用者
- `DELETE /api/users/:id` - 刪除使用者

## 開發規範

### API 回傳格式
```json
{
  "status": "success" | "error",
  "data": { ... },
  "message": "錯誤訊息"
}
```

### Git 提交訊息
- `feat:` 新功能
- `fix:` 修復錯誤
- `docs:` 文件更新
- `refactor:` 重構
- `test:` 測試

## 授權

MIT License - 詳見 [LICENSE](LICENSE)

## 聯絡方式

- 作者: Cat
- 專案: https://github.com/ttcccat-tech/tools-sys
- 問題回報: https://github.com/ttcccat-tech/tools-sys/issues
