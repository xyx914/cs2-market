# CS Market API 爬虫

## 启动
```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

## 爬虫模块 (待实现)
```python
# scraper.py
import asyncio
from playwright.async_api import async_playwright

async def scrape_steam_market(weapon: str, skin: str):
    """抓取 Steam 市场指定皮肤的价格数据"""
    # TODO: 实现 Playwright 抓取逻辑
    pass
```

## 数据库
SQLite，自动创建表结构

## API 端点
- `GET /` — 健康检查
- `POST /items` — 新增/更新物品
- `GET /items/{weapon}/{skin}` — 查询某皮肤
- `GET /hot` — 热门排行
- `GET /stats` — 统计
