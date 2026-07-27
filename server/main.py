"""FastAPI 后端 - 茂名旅游网站"""
import hashlib
import hmac
import json
import base64
import sqlite3
import os
import time
from pathlib import Path
from datetime import datetime
from typing import Optional

from fastapi import FastAPI, Request, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse

# ── 路径 ──
BASE_DIR = Path(__file__).parent
FRONTEND_DIR = BASE_DIR.parent
DB_FILE = BASE_DIR / "data.db"
SECRET = "maoming-travel-secret-2025"

# ── 数据库 ──
conn = sqlite3.connect(str(DB_FILE), check_same_thread=False)
conn.row_factory = sqlite3.Row
conn.execute("PRAGMA journal_mode=WAL")

def init_db():
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TEXT
        );
        CREATE TABLE IF NOT EXISTS routes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            destination TEXT NOT NULL,
            price REAL NOT NULL,
            days INTEGER NOT NULL,
            img TEXT,
            description TEXT
        );
        CREATE TABLE IF NOT EXISTS news (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            date TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS bookings (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           route_id INTEGER NOT NULL,
           user_id INTEGER,
           customer_name TEXT NOT NULL,
           phone TEXT NOT NULL,
           people INTEGER DEFAULT 1,
           remark TEXT DEFAULT '',
           created_at TEXT,
           FOREIGN KEY (route_id) REFERENCES routes(id),
           FOREIGN KEY (user_id) REFERENCES users(id)
       );
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            route_id INTEGER NOT NULL,
            username TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at TEXT,
            FOREIGN KEY (route_id) REFERENCES routes(id)
        );
    """)
    cur = conn.execute("SELECT COUNT(*) FROM routes")
    if cur.fetchone()[0] == 0:
        seed_data()

def seed_data():
    routes = [
        ("露天矿生态公园一日游", "coastal", 120, 1, "img/1122.jpg",
         "游览茂名露天矿生态公园，欣赏碧波荡漾的湖水与城市绿肺"),
        ("三官顶日出露营2日游", "mountain", 399, 2, "img/615.jpg",
         "夜爬三官顶，观赏绝美日出，包含露营装备、早餐和专业向导服务"),
        ("放鸡岛海岛度假3日游", "coastal", 899, 3, "img/4631.jpg",
         "畅游放鸡岛，体验浮潜、海钓等水上项目，含住宿和三餐"),
        ("茂名古城文化一日游", "cultural", 180, 1, "img/02.jpg",
         "探访茂名古城遗址，了解当地历史文化，含特色午餐"),
    ]
    conn.executemany(
        "INSERT INTO routes (title, destination, price, days, img, description) VALUES (?, ?, ?, ?, ?, ?)",
        routes
    )
    news_data = [
        ("茂名荔枝文化节盛大开幕，邀您共享荔枝自由甜蜜盛宴", "2025-06-20"),
        ("投资近百亿！中煤茂名电厂项目落地零碳园区", "2025-06-18"),
        ("中国第一滩夏季旅游旺季开启，滨海休闲游热度攀升", "2025-06-15"),
        ("茂名扎实推进百千万工程，乡村振兴焕发新活力", "2025-06-12"),
        ("茂名冼太夫人故里文化旅游区获评省级研学基地", "2025-06-10"),
        ("茂名新增两条高速公路，进一步完善粤西交通网络", "2025-06-08"),
        ("广湛高铁茂名段建设提速，未来广州到茂名仅需1.5小时", "2025-06-05"),
        ("茂名打造中国月饼名城，月饼产业年产值突破百亿", "2025-06-01"),
        ("茂名好心文化品牌亮相深圳文博会，吸引大量关注", "2025-05-28"),
        ("茂名推进绿美生态建设，连续三年空气质量排名全省前列", "2025-05-25"),
    ]
    conn.executemany("INSERT INTO news (title, date) VALUES (?, ?)", news_data)
    conn.commit()

# ── App ──
app = FastAPI(title="茂名旅游网站 API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

# ── 自定义异常处理器：保持 {ok, msg} 格式 ──
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    content = exc.detail if isinstance(exc.detail, dict) else {"ok": False, "msg": str(exc.detail)}
    return JSONResponse(status_code=exc.status_code, content=content)

# ══════════════════════════════════════════
#  工具函数
# ══════════════════════════════════════════

def rows_to_list(rows):
    return [dict(r) for r in rows]

def b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode()

def b64url_decode(s: str) -> bytes:
    padding = 4 - len(s) % 4
    if padding != 4:
        s += "=" * padding
    return base64.urlsafe_b64decode(s)

def generate_token(user: dict) -> str:
    header = b64url(json.dumps({"alg": "HS256", "typ": "JWT"}).encode())
    payload_data = {
        "id": user["id"],
        "username": user["username"],
        "email": user["email"],
        "exp": int(time.time()) + 86400 * 7
    }
    payload = b64url(json.dumps(payload_data, ensure_ascii=False).encode())
    sig = hmac.new(SECRET.encode(), f"{header}.{payload}".encode(), hashlib.sha256).digest()
    return f"{header}.{payload}.{b64url(sig)}"

def verify_token(token: str):
    try:
        parts = token.split(".")
        if len(parts) != 3:
            return None
        expected_sig = hmac.new(SECRET.encode(), f"{parts[0]}.{parts[1]}".encode(), hashlib.sha256).digest()
        if b64url(expected_sig) != parts[2]:
            return None
        payload = json.loads(b64url_decode(parts[1]))
        if payload["exp"] < time.time():
            return None
        return payload
    except Exception:
        return None

def get_current_user(request: Request):
    auth = request.headers.get("authorization", "")
    if not auth.startswith("Bearer "):
        return None
    return verify_token(auth[7:])

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

# ══════════════════════════════════════════
#  API 路由
# ══════════════════════════════════════════

@app.get("/api/health")
async def health():
    return {"ok": True, "msg": "茂名旅游网站服务运行中", "time": datetime.now().strftime("%Y/%m/%d %H:%M:%S")}

@app.post("/api/auth/register")
async def register(request: Request):
    body = await request.json()
    username = body.get("username", "").strip()
    email = body.get("email", "").strip()
    password = body.get("password", "")
    if not username or not email or not password:
        raise HTTPException(status_code=400, detail={"ok": False, "msg": "请填写完整信息"})
    if conn.execute("SELECT id FROM users WHERE username = ?", (username,)).fetchone():
        raise HTTPException(status_code=400, detail={"ok": False, "msg": "用户名已被注册"})
    if conn.execute("SELECT id FROM users WHERE email = ?", (email,)).fetchone():
        raise HTTPException(status_code=400, detail={"ok": False, "msg": "邮箱已被注册"})
    now = datetime.now().strftime("%Y/%m/%d %H:%M:%S")
    conn.execute("INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, ?)",
                 (username, email, hash_password(password), now))
    conn.commit()
    user = dict(conn.execute("SELECT id, username, email FROM users WHERE username = ?", (username,)).fetchone())
    return {"ok": True, "msg": "注册成功", "data": {"token": generate_token(user), "username": username}}

@app.post("/api/auth/login")
async def login(request: Request):
    body = await request.json()
    username = body.get("username", "").strip()
    password = body.get("password", "")
    if not username or not password:
        raise HTTPException(status_code=400, detail={"ok": False, "msg": "请输入用户名和密码"})
    user = conn.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
    if not user or user["password"] != hash_password(password):
        raise HTTPException(status_code=401, detail={"ok": False, "msg": "用户名或密码错误"})
    return {"ok": True, "msg": "登录成功", "data": {"token": generate_token(dict(user)), "username": username}}

@app.get("/api/auth/me")
async def me(request: Request):
    user = get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail={"ok": False, "msg": "未登录或登录已过期"})
    return {"ok": True, "data": {"username": user["username"], "email": user["email"]}}

@app.get("/api/routes")
async def list_routes(
    destination: Optional[str] = Query(None),
    days: Optional[str] = Query(None),
    priceMin: Optional[float] = Query(None),
    priceMax: Optional[float] = Query(None),
):
    sql = "SELECT * FROM routes WHERE 1=1"
    params = []
    if destination and destination != "all":
        sql += " AND destination = ?"; params.append(destination)
    if days and days != "all":
        parts = days.split("-")
        if len(parts) == 1 and parts[0].endswith("+"):
            sql += " AND days >= ?"; params.append(int(parts[0]))
        elif len(parts) == 2 and parts[1]:
            sql += " AND days >= ? AND days <= ?"; params.extend([int(parts[0]), int(parts[1])])
        else:
            sql += " AND days = ?"; params.append(int(parts[0]))
    if priceMin is not None:
        sql += " AND price >= ?"; params.append(priceMin)
    if priceMax is not None:
        sql += " AND price <= ?"; params.append(priceMax)
    rows = conn.execute(sql + " ORDER BY id", params).fetchall()
    return {"ok": True, "data": rows_to_list(rows)}

@app.get("/api/routes/{route_id}")
async def get_route(route_id: int):
    row = conn.execute("SELECT * FROM routes WHERE id = ?", (route_id,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail={"ok": False, "msg": "线路不存在"})
    return {"ok": True, "data": dict(row)}

@app.post("/api/routes/{route_id}/book")
async def book_route(route_id: int, request: Request):
    if not conn.execute("SELECT id FROM routes WHERE id = ?", (route_id,)).fetchone():
        raise HTTPException(status_code=404, detail={"ok": False, "msg": "线路不存在"})
    user = get_current_user(request)
    body = await request.json()
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    people = body.get("people", 1)
    remark = body.get("remark", "")
    if not name or not phone:
        raise HTTPException(status_code=400, detail={"ok": False, "msg": "请填写姓名和电话"})
    now = datetime.now().strftime("%Y/%m/%d %H:%M:%S")
    conn.execute(
        "INSERT INTO bookings (route_id, user_id, customer_name, phone, people, remark, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
        (route_id, user["id"] if user else None, name, phone, people, remark, now)
    )
    conn.commit()
    return {"ok": True, "msg": "预订成功！工作人员将尽快与您联系"}

@app.get("/api/routes/{route_id}/comments")
async def list_comments(route_id: int):
    rows = conn.execute("SELECT * FROM comments WHERE route_id = ? ORDER BY created_at DESC", (route_id,)).fetchall()
    return {"ok": True, "data": rows_to_list(rows)}

@app.get("/api/comments")
async def list_all_comments():
    rows = conn.execute("SELECT c.*, r.title as route_title FROM comments c LEFT JOIN routes r ON c.route_id = r.id ORDER BY c.created_at DESC LIMIT 50").fetchall()
    return {"ok": True, "data": rows_to_list(rows)}

@app.post("/api/routes/{route_id}/comments")
async def create_comment(route_id: int, request: Request):
    if not conn.execute("SELECT id FROM routes WHERE id = ?", (route_id,)).fetchone():
        raise HTTPException(status_code=404, detail={"ok": False, "msg": "线路不存在"})
    body = await request.json()
    username = body.get("username", "").strip()
    content = body.get("content", "").strip()
    if not username or not content:
        raise HTTPException(status_code=400, detail={"ok": False, "msg": "请填写用户名和评论内容"})
    now = datetime.now().strftime("%Y/%m/%d %H:%M:%S")
    conn.execute(
        "INSERT INTO comments (route_id, username, content, created_at) VALUES (?, ?, ?, ?)",
        (route_id, username, content, now)
    )
    conn.commit()
    return {"ok": True, "msg": "评论成功"}

@app.get("/api/news")
async def list_news():
    rows = conn.execute("SELECT * FROM news ORDER BY date DESC, id DESC").fetchall()
    return {"ok": True, "data": rows_to_list(rows)}

@app.get("/api/news/{news_id}")
async def get_news(news_id: int):
    row = conn.execute("SELECT * FROM news WHERE id = ?", (news_id,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail={"ok": False, "msg": "新闻不存在"})
    return {"ok": True, "data": dict(row)}

# ══════════════════════════════════════════
#  静态文件
# ══════════════════════════════════════════
MIME_MAP = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".webp": "image/webp",
}

@app.api_route("/{path:path}", methods=["GET"])
async def serve_static(path: str):
    if path.startswith("api/"):
        raise HTTPException(status_code=404, detail="Not Found")
    if not path:
        filepath = FRONTEND_DIR / "index.html"
    else:
        filepath = FRONTEND_DIR / path
        if not filepath.exists():
            filepath = FRONTEND_DIR / "index.html"
    if not filepath.exists():
        raise HTTPException(status_code=404, detail="Not Found")
    ext = filepath.suffix.lower()
    return FileResponse(str(filepath), media_type=MIME_MAP.get(ext, "application/octet-stream"))

if __name__ == "__main__":
    import uvicorn
    print(f"\n  {'='*40}")
    print(f"  茂名旅游网站 - 后端服务已启动")
    print(f"  {'='*40}")
    print(f"  地址: http://localhost:3001")
    print(f"  API:  http://localhost:3001/api")
    print(f"  {'='*40}\n")
    uvicorn.run(app, host="0.0.0.0", port=3001)
