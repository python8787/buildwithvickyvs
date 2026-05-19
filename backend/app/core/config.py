import json
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    APP_ENV: str = "development"
    DEBUG: bool = True

    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/vickyvs_db"

    JWT_SECRET: str = "change-me"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRY_MINUTES: int = 1440  # 24 hours

    SUPABASE_URL: str = ""
    SUPABASE_ANON_KEY: str = ""
    SUPABASE_SERVICE_KEY: str = ""

    OPENAI_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""

    RESEND_API_KEY: str = ""
    CONTACT_EMAIL: str = "hello@buildwithvickyvs.ai"

    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"

    def model_post_init(self, __context) -> None:  # type: ignore[override]
        # Allow ALLOWED_ORIGINS as a JSON string in env: '["https://..."]'
        if isinstance(self.ALLOWED_ORIGINS, str):
            object.__setattr__(self, "ALLOWED_ORIGINS", json.loads(self.ALLOWED_ORIGINS))


settings = Settings()
