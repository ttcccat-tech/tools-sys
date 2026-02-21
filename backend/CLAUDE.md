# Backend 開發規範

## 🎯 專案目標

開發一個**快速、安全、可擴展**的 FastAPI 後端服務。

---

## 🧪 技術棧

- **語言**: Python 3.11+
- **框架**: FastAPI
- **異步**: Uvicorn
- **數據庫**: SQLite (開發), PostgreSQL (生產)
- **認證**: JWT (JSON Web Tokens)

---

## 🏗 項目結構

```
backend/
├── CLAUDE.md              # 本文件
├── main.py               # 主應用入口
├── api/                   # API 端點
│   ├── auth.py           # 認證相關 API
│   ├── tools.py          # 工具管理 API
│   └── users.py          # 用戶管理 API
├── models/                # 數據模型
│   ├── user.py           # 用戶模型
│   ├── tool.py           # 工具模型
│   └── database.py       # 數據庫配置
├── schemas/               # Pydantic Schemas
│   ├── user.py           # 用戶 Schema
│   ├── tool.py           # 工具 Schema
│   └── auth.py           # 認證 Schema
├── services/              # 業務層
│   ├── auth_service.py   # 認證服務
│   └── database.py       # 數據庫服務
└── utils/                 # 工具函數
    ├── security.py        # 密碼哈希、JWT 驗證
    └── logger.py          # 日誌配置

# 檢案和目錄
├── requirements.txt        # Python 依賴
├── .env.example           # 環境變數範例
└── .gitignore
```

---

## 🚀 快速開始

### 1️⃣ 安裝依賴

```bash
cd backend
pip install -r requirements.txt
```

### 2️⃣ 配置環境變數

```bash
cp .env.example .env
# 編輯 .env 文件，設置以下變數：
# SECRET_KEY=your-secret-key-here
# DATABASE_URL=sqlite:///./tools.db
```

### 3️⃣ 初始化數據庫

```bash
python -c "from models.database import init_db; init_db()"
```

### 4️⃣ 啟動開發服務器

```bash
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

---

## 📦 主要 API 端點

### 認證 API

```python
# POST /api/auth/login
{
  "username": "string",
  "password": "string",
  "remember": "boolean"
}

# POST /api/auth/refresh
{
  "token": "string"
}

# GET /api/auth/me
# Headers: Authorization: Bearer <token>
```

### 工具 API

```python
# GET /api/tools
# Headers: Authorization: Bearer <token>

# GET /api/tools/{id}
# Headers: Authorization: Bearer <token>

# POST /api/tools (管理員)
{
  "name": "string",
  "description": "string",
  "version": "string",
  "route": "string",
  "icon": "string"
}

# PUT /api/tools/{id} (管理員)
{
  "name": "string",
  "description": "string",
  "version": "string",
  "route": "string",
  "icon": "string"
}

# DELETE /api/tools/{id} (管理員)
# Headers: Authorization: Bearer <token>
```

### 用戶 API

```python
# GET /api/users (管理員)
# Headers: Authorization: Bearer <token>

# POST /api/users (管理員)
{
  "username": "string",
  "password": "string",
  "is_admin": "boolean"
}

# PUT /api/users/{id} (管理員)
{
  "username": "string",
  "is_admin": "boolean",
  "is_active": "boolean"
}

# DELETE /api/users/{id} (管理員)
# Headers: Authorization: Bearer <token>
```

---

## 🔒 安全規範

### 密碼安全
- ✅ 使用 bcrypt 進行密碼哈希
- ✅ 密碼長度至少 8 位
- ✅ 要求包含大小寫字母和數字

### JWT 安全
- ✅ 使用 HS256 算法
- ✅ 設置合理的過期時間 (24 小時)
- ✅ 在 HTTP-only cookies 中儲存

### API 安全
- ✅ 使用 HTTPS (生產環境)
- ✅ 實施速率限制
- ✅ 驗證所有請求 (除公開端點)
- ✅ 輸入驗證 (使用 Pydantic)
- ✅ 防止 SQL 注入 (使用參數化查詢)

### 數據安全
- ✅ 不要在日誌中記錄敏感信息
- ✅ 使用環境變數存儲密碼
- ✅ 定期備份數據庫

---

## 📝 代碼風格規範

### 命名規範
- **函數**: `snake_case`
- **變量**: `snake_case`
- **類別**: `PascalCase`
- **常量**: `UPPER_SNAKE_CASE`

### 文件命名規範
- **Python 檔案**: `snake_case.py`
- **測試文件**: `test_snake_case.py`
- **類文件**: `pascal_case.py`

### 導入順序
```python
# 1. 標準庫
import os
import sys
import json

# 2. 第三方庫
import fastapi
from fastapi import Depends, HTTPException

# 3. 項目模塊
from models import user, tool
from schemas import user_schema
from services import auth_service
```

### 類定義規範
```python
class UserService:
    """用戶服務類"""

    def __init__(self):
        """初始化用戶服務"""
        pass

    def get_user(self, user_id: int) -> User:
        """獲取用戶

        Args:
            user_id: 用戶 ID

        Returns:
            User: 用戶對象

        Raises:
            HTTPException: 用戶不存在
        """
        pass
```

---

## 🧪 測試規範

### 測試命名規範
- **測試文件**: `test_<module_name>.py`
- **測試類**: `Test<ClassName>`
- **測試方法**: `test_<functionality>`

### 測試結構
```python
class TestUserService:
    def test_create_user_success(self):
        """測試創建用戶成功"""
        pass

    def test_create_user_duplicate_username(self):
        """測試創建重複用戶名"""
        pass

    def test_get_user_not_found(self):
        """測試獲取不存在的用戶"""
        pass
```

### 測試覆蓋率
- 單元測試覆蓋率 > 90%
- 分支測試覆蓋率 > 80%

---

## 🚀 部署規範

### 開發環境
```bash
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 生產環境
```bash
python -m uvicorn main:app --workers 4 --host 0.0.0.0 --port 8000
```

### Docker 部署
```bash
docker build -t tools-sys-backend .
docker run -p 8000:8000 tools-sys-backend
```

### 環境變數
```bash
# 開發環境
export DEBUG=True
export LOG_LEVEL=DEBUG

# 生產環境
export DEBUG=False
export LOG_LEVEL=INFO
export WORKERS=4
```

---

## 📚 文檔規範

### API 文檔
- 使用 FastAPI 自動生成: `/docs`
- 確保所有端點都有描述
- 確保所有請求/響應模型都有示例

### 代碼註釋
- 所有類和函數都應有 docstring
- 使用 Google Python 風格指南

### README
- 項目說明
- 安裝說明
- API 端點文檔
- 環境變數說明

---

## 🔧 故障排除

### 常見問題

**1. 數據庫連接失敗**
```bash
# 檢查數據庫文件
ls -la *.db

# 檢查環境變數
echo $DATABASE_URL

# 重新初始化數據庫
python -c "from models.database import init_db; init_db()"
```

**2. JWT 驗證失敗**
```bash
# 檢查 SECRET_KEY
echo $SECRET_KEY

# 檢查 Token 是否過期
# 解碼 Token 並檢查 exp 字段
```

**3. 端口被佔用**
```bash
# 查找佔用端口的進程
lsof -i :8000

# 終束進程
kill -9 <PID>
```

---

## 📊 監控和日誌

### 日誌配置
```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)
```

### 監控端點
```python
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0"
    }
```

---

## 📚 推薦資源

- [FastAPI 官方文檔](https://fastapi.tiangolo.com/)
- [Uvicorn 文檔](https://www.uvicorn.org/)
- [Python 風格指南](https://peps.python.org/pep-0008/)
- [Pydantic 文檔](https://docs.pydantic.dev/)

---

*最後更新：2026-02-21*
*維護者：Cat*
