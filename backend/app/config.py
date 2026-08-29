from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Fails at startup if a required secret is missing, not at first request."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "postgresql+psycopg://localhost:5432/hem"
    cors_origins: list[str] = ["http://localhost:5174"]
    environment: str = "development"


@lru_cache
def get_settings() -> Settings:
    return Settings()
