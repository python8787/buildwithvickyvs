import re
import unicodedata


def slugify(text: str) -> str:
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode()
    text = re.sub(r"[^\w\s-]", "", text.lower().strip())
    return re.sub(r"[\s_-]+", "-", text).strip("-")


def estimate_read_time(content: str, wpm: int = 200) -> int:
    return max(1, round(len(content.split()) / wpm))
