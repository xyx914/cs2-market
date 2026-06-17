"""
Steam 市场数据爬虫
"""
import requests
from bs4 import BeautifulSoup
import json
import time
from typing import Optional


class SteamScraper:
    """Steam 社区市场爬虫"""

    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        })
        # Steam 市场基础 URL
        self.base_url = "https://steamcommunity.com"

    def get_page(self, url: str, timeout: int = 15) -> Optional[str]:
        """获取网页 HTML"""
        try:
            response = self.session.get(url, timeout=timeout)
            response.encoding = response.apparent_encoding
            if response.status_code == 200:
                return response.text
            elif response.status_code == 429:
                print(f"[警告] 请求太频繁，等待 30 秒...")
                time.sleep(30)
                return self.get_page(url, timeout)
            else:
                print(f"[错误] 状态码 {response.status_code}")
                return None
        except Exception as e:
            print(f"[异常] {e}")
            return None

    def search_items(self, game_id: int = 730, keyword: str = "") -> list:
        """
        搜索某个游戏下的所有可交易物品

        Args:
            game_id: Steam 游戏 ID，CS2 是 730
            keyword: 关键词过滤（可选）

        Returns:
            物品列表 [{name, hash_name, ...}]
        """
        url = f"{self.base_url}/market/search?appid={game_id}"
        if keyword:
            url += f"#p_{keyword[:1].lower()}_popular"

        html = self.get_page(url)
        if not html:
            return []

        soup = BeautifulSoup(html, "html.parser")
        items = []

        for row in soup.select(".market_search_listing_row"):
            name_el = row.select_one(".market_table_link .market_listing_name")
            if not name_el:
                continue

            name = name_el.get_text(strip=True)
            if keyword and keyword.lower() not in name.lower():
                continue

            items.append({
                "name": name,
                "hash_name": row.get("data-market-hash", ""),
                "url": row.select_one("a")["href"] if row.select_one("a") else "",
            })

        return items

    def get_item_price(self, app_id: int, hash_name: str) -> Optional[dict]:
        """
        获取单个物品的价格数据

        Args:
            app_id: 游戏 ID（CS2 = 730）
            hash_name: 物品市场哈希名

        Returns:
            {price, volume, lowest_price, ...}
        """
        url = f"{self.base_url}/market/listings/{app_id}/{hash_name}"
        html = self.get_page(url)
        if not html:
            return None

        soup = BeautifulSoup(html, "html.parser")

        # 提取价格
        price_el = soup.select_one(".market_listing_price .market_listing_price_with_delivery")
        price_el_alt = soup.select_one(".market_listing_price .market_listing_price_standard")
        price_text = (price_el or price_el_alt).get_text(strip=True) if (price_el or price_el_alt) else ""

        # 提取成交量
        volume_el = soup.select_one(".market_listing_num_reported")
        volume = 0
        if volume_el:
            vol_text = volume_el.get_text(strip=True)
            # 清理 "Sold 1,234" 格式
            numbers = "".join(c for c in vol_text if c.isdigit())
            volume = int(numbers) if numbers else 0

        # 提取磨损度/属性
        wear = self._extract_wear(soup)

        return {
            "hash_name": hash_name,
            "price": price_text,
            "volume": volume,
            "wear": wear,
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        }

    def _extract_wear(self, soup: BeautifulSoup) -> str:
        """提取磨损度"""
        wear_map = {
            "Factory New": "崭新出厂",
            "Minimal Wear": "略有磨损",
            "Field-Tested": "久经沙场",
            "Well-Worn": "破损不堪",
            "Battle-Scarred": "战痕累累",
        }
        for el in soup.select(".market_listing_normal_price"):
            for en, cn in wear_map.items():
                if en in el.get_text():
                    return cn
        return ""

    def scrape_hot_items(self, game_id: int = 730, count: int = 50) -> list:
        """
        抓取热门物品价格

        Args:
            game_id: 游戏 ID
            count: 抓取数量

        Returns:
            价格数据列表
        """
        print(f"[爬虫] 开始抓取热门物品...")

        # 获取热门物品列表
        items = self.search_items(game_id)
        if not items:
            print("[爬虫] 未获取到物品列表")
            return []

        results = []
        for i, item in enumerate(items[:count]):
            print(f"[爬虫] 抓取 {i+1}/{count}: {item['name']}")

            data = self.get_item_price(game_id, item["hash_name"])
            if data:
                results.append(data)

            # 控制频率，避免被封
            time.sleep(3)

        print(f"[爬虫] 完成！共抓取 {len(results)} 个物品")
        return results

    def save_to_json(self, data: list, filename: str = "market_data.json"):
        """保存数据到 JSON 文件"""
        with open(filename, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"[保存] 已写入 {filename}")


# --- 使用示例 ---
if __name__ == "__main__":
    scraper = SteamScraper()

    # 方式1: 抓取单个物品
    # data = scraper.get_item_price(730, "AK-47%7CRedline")
    # print(json.dumps(data, ensure_ascii=False, indent=2))

    # 方式2: 抓取热门物品
    hot = scraper.scrape_hot_items(count=10)
    scraper.save_to_json(hot)
