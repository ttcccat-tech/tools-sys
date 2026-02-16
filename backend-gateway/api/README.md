# Tools-Sys - API 說明

## API 規範

### 回傳格式
```json
{
  "status": "success" | "error",
  "data": { ... } | null,
  "message": "錯誤訊息"
}
```

### 錯誤代碼

| 代碼 | 說明 |
|------|------|
| 400 | 請求參數錯誤 |
| 401 | 未授權 |
| 404 | 資源不存在 |
| 500 | 伺服器錯誤 |

---

## API 端點

### 認證 API

#### POST /api/auth/login
**描述：** 使用者登入

**請求：**
```json
{
  "username": "string",
  "password": "string",
  "remember": "boolean"
}
```

**回傳：**
```json
{
  "status": "success",
  "data": {
    "token": "jwt_token",
    "user": {
      "id": 1,
      "username": "admin"
    }
  }
}
```

#### POST /api/auth/refresh
**描述：** 刷新 JWT Token

**請求：**
```json
{
  "token": "jwt_token"
}
```

**回傳：**
```json
{
  "status": "success",
  "data": {
    "token": "new_jwt_token"
  }
}
```

---

### 工具 API

#### GET /api/tools
**描述：** 取得所有工具列表

**回傳：**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "工具名稱",
      "description": "描述",
      "version": "v1.0.0",
      "route": "/tool-path",
      "icon": "icon-name"
    }
  ]
}
```

#### GET /api/tools/:id
**描述：** 取得單一工具詳情

**回傳：**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "工具名稱",
    "description": "描述",
    "version": "v1.0.0",
    "route": "/tool-path",
      "icon": "icon-name"
  }
}
```

#### POST /api/tools
**描述：** 新增工具（管理員）

**請求：**
```json
{
  "name": "工具名稱",
  "description": "描述",
  "version": "v1.0.0",
  "route": "/tool-path",
  "icon": "icon-name"
}
```

#### PUT /api/tools/:id
**描述：** 更新工具（管理員）

#### DELETE /api/tools/:id
**描述：** 刪除工具（管理員）

---

### 使用者 API

#### GET /api/users
**描述：** 取得使用者列表（管理員）

#### POST /api/users
**描述：** 新增使用者（管理員）

#### PUT /api/users/:id
**描述：** 更新使用者權限（管理員）

#### DELETE /api/users/:id
**描述：** 刪除使用者（管理員）
