"""
FastAPI 後端服務
"""
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List, Optional
import sqlite3
import hashlib
import jwt
from datetime import datetime, timedelta
import os

app = FastAPI(title="Tools-Sys API", version="1.0.0")

# CORS 配置
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 配置
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-this")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 小時

# 資料庫連線
DB_PATH = os.getenv("DB_PATH", "../db/tools.db")

# Security
security = HTTPBearer()

# ===== 資料庫連線 =====
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# ===== Pydantic 模型 =====
class LoginRequest(BaseModel):
    username: str
    password: str
    remember: bool = False

class TokenResponse(BaseModel):
    status: str
    data: dict

class ToolCreate(BaseModel):
    name: str
    description: Optional[str] = None
    version: Optional[str] = None
    route: str
    icon: Optional[str] = None

class UserCreate(BaseModel):
    username: str
    password: str
    is_admin: bool = False

# ===== 認證相關 =====
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.PyJWTError:
        raise credentials_exception

# ===== API 端點 =====

@app.get("/")
async def root():
    return {"status": "success", "data": {"message": "Tools-Sys API v1.0.0"}}

@app.post("/api/auth/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    conn = get_db()
    cursor = conn.cursor()
    
    # 查詢使用者
    cursor.execute("SELECT * FROM users WHERE username = ?", (request.username,))
    user = cursor.fetchone()
    conn.close()
    
    if not user:
        return {"status": "error", "message": "使用者名稱或密碼錯誤"}
    
    # 驗證密碼
    password_hash = hashlib.sha256(request.password.encode()).hexdigest()
    if user["password_hash"] != password_hash:
        return {"status": "error", "message": "使用者名稱或密碼錯誤"}
    
    # 生成 Token
    access_token = create_access_token(data={"sub": user["username"]})
    
    return {
        "status": "success",
        "data": {
            "token": access_token,
            "user": {
                "id": user["id"],
                "username": user["username"]
            }
        }
    }

@app.get("/api/tools")
async def get_tools():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tools ORDER BY created_at DESC")
    tools = cursor.fetchall()
    conn.close()
    
    return {"status": "success", "data": [dict(t) for t in tools]}

@app.get("/api/tools/{tool_id}")
async def get_tool(tool_id: int):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tools WHERE id = ?", (tool_id,))
    tool = cursor.fetchone()
    conn.close()
    
    if not tool:
        return {"status": "error", "message": "工具不存在"}
    
    return {"status": "success", "data": dict(tool)}

@app.post("/api/tools")
async def create_tool(tool: ToolCreate):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO tools (name, description, version, route, icon) VALUES (?, ?, ?, ?, ?)",
        (tool.name, tool.description, tool.version, tool.route, tool.icon)
    )
    conn.commit()
    tool_id = cursor.lastrowid
    conn.close()

    return {"status": "success", "data": {"id": tool_id, "message": "工具已建立"}}

@app.put("/api/tools/{tool_id}")
async def update_tool(tool_id: int, tool: ToolCreate):
    conn = get_db()
    cursor = conn.cursor()

    # 檢查工具是否存在
    cursor.execute("SELECT id FROM tools WHERE id = ?", (tool_id,))
    if not cursor.fetchone():
        conn.close()
        return {"status": "error", "message": "工具不存在"}

    # 更新工具
    cursor.execute(
        "UPDATE tools SET name = ?, description = ?, version = ?, route = ?, icon = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
        (tool.name, tool.description, tool.version, tool.route, tool.icon, tool_id)
    )
    conn.commit()
    conn.close()

    return {"status": "success", "data": {"message": "工具已更新"}}

@app.delete("/api/tools/{tool_id}")
async def delete_tool(tool_id: int):
    conn = get_db()
    cursor = conn.cursor()

    # 檢查工具是否存在
    cursor.execute("SELECT id FROM tools WHERE id = ?", (tool_id,))
    if not cursor.fetchone():
        conn.close()
        return {"status": "error", "message": "工具不存在"}

    # 刪除工具
    cursor.execute("DELETE FROM tools WHERE id = ?", (tool_id,))
    conn.commit()
    conn.close()

    return {"status": "success", "data": {"message": "工具已刪除"}}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
