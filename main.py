"""
CS 饰品数据 API
"""
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
import sqlite3
from datetime import datetime

app = FastAPI(title="CS Market API")

# --- 数据库 ---
def init_db():
    conn = sqlite3.connect("market.db")
    c = conn.cursor()
    c.execute("""
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            market_hash_name TEXT UNIQUE,
            weapon TEXT,
            skin TEXT,
            quality TEXT,
            wear TEXT,
            price REAL,
            volume INTEGER,
            price_history TEXT,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    c.execute("""
        CREATE TABLE IF NOT EXISTS price_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_id INTEGER,
            price REAL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (item_id) REFERENCES items(id)
        )
    """)
    conn.commit()
    conn.close()

init_db()

# --- 数据模型 ---
class ItemCreate(BaseModel):
    market_hash_name: str
    weapon: str
    skin: str
    quality: str = "Normal"
    wear: Optional[str] = None
    price: float
    volume: int = 0

class ItemResponse(BaseModel):
    id: int
    market_hash_name: str
    weapon: str
    skin: str
    quality: str
    wear: Optional[str]
    price: float
    volume: int
    updated_at: str

# --- API 路由 ---
@app.get("/")
def root():
    return {"message": "CS Market API", "status": "running"}

@app.post("/items")
def create_item(item: ItemCreate):
    """新增/更新物品价格"""
    conn = sqlite3.connect("market.db")
    c = conn.cursor()
    c.execute("""
        INSERT INTO items (market_hash_name, weapon, skin, quality, wear, price, volume)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(market_hash_name) DO UPDATE SET
            price = excluded.price,
            volume = excluded.volume,
            updated_at = CURRENT_TIMESTAMP
    """, (item.market_hash_name, item.weapon, item.skin, item.quality, item.wear, item.price, item.volume))
    conn.commit()
    conn.close()
    return {"status": "ok"}

@app.get("/items/{weapon}/{skin}")
def get_items(weapon: str, skin: str):
    """查询某皮肤的行情"""
    conn = sqlite3.connect("market.db")
    c = conn.cursor()
    c.execute("""
        SELECT id, market_hash_name, weapon, skin, quality, wear, price, volume, updated_at
        FROM items WHERE weapon = ? AND skin = ? ORDER BY price ASC
    """, (weapon, skin))
    rows = c.fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.get("/hot")
def hot_items():
    """热门物品排行"""
    conn = sqlite3.connect("market.db")
    c = conn.cursor()
    c.execute("""
        SELECT id, market_hash_name, weapon, skin, quality, wear, price, volume, updated_at
        FROM items ORDER BY volume DESC LIMIT 20
    """)
    rows = c.fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.get("/stats")
def stats():
    """数据统计"""
    conn = sqlite3.connect("market.db")
    c = conn.cursor()
    c.execute("SELECT COUNT(*) FROM items")
    total = c.fetchone()[0]
    c.execute("SELECT AVG(price) FROM items")
    avg_price = c.fetchone()[0] or 0
    conn.close()
    return {"total_items": total, "avg_price": round(avg_price, 2)}
