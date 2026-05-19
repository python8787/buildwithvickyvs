from fastapi import APIRouter
from app.schemas.schemas import HealthOut
from app.core.config import settings

router = APIRouter()


@router.get("/health", response_model=HealthOut)
async def health():
    return HealthOut(status="ok", version="1.0.0", environment=settings.APP_ENV)
