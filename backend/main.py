from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.logging import setup_logging
from app.middleware.rate_limit import RateLimitMiddleware
from app.routers import health, projects, blog, contact, ai_tools

setup_logging()

app = FastAPI(
    title="buildwithvickyvs.ai API",
    description="Backend for buildwithvickyvs.ai",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── Middleware (order matters — added last runs first) ────────────────────────
app.add_middleware(RateLimitMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(health.router,    prefix="/api/v1", tags=["health"])
app.include_router(projects.router,  prefix="/api/v1", tags=["projects"])
app.include_router(blog.router,      prefix="/api/v1", tags=["blog"])
app.include_router(contact.router,   prefix="/api/v1", tags=["contact"])
app.include_router(ai_tools.router,  prefix="/api/v1", tags=["ai-tools"])


@app.get("/")
async def root():
    return {"message": "buildwithvickyvs.ai API", "docs": "/docs"}
