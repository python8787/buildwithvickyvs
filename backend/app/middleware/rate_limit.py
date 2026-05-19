import time
from collections import defaultdict
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware


class RateLimitMiddleware(BaseHTTPMiddleware):
    """60 req/min globally, 10 req/min for /ai/* endpoints."""

    def __init__(self, app, default_limit: int = 60, ai_limit: int = 10, window: int = 60):
        super().__init__(app)
        self.default_limit = default_limit
        self.ai_limit = ai_limit
        self.window = window
        self._store: dict[str, list[float]] = defaultdict(list)

    def _ip(self, request: Request) -> str:
        fwd = request.headers.get("X-Forwarded-For")
        return fwd.split(",")[0].strip() if fwd else (request.client.host if request.client else "unknown")

    async def dispatch(self, request: Request, call_next) -> Response:
        ip = self._ip(request)
        now = time.time()
        cutoff = now - self.window
        limit = self.ai_limit if "/ai/" in request.url.path else self.default_limit

        self._store[ip] = [t for t in self._store[ip] if t > cutoff]

        if len(self._store[ip]) >= limit:
            return Response(
                content='{"detail":"Rate limit exceeded. Slow down."}',
                status_code=429,
                media_type="application/json",
            )

        self._store[ip].append(now)
        return await call_next(request)
