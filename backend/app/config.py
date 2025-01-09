from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    AWS_ACCESS_KEY: str
    AWS_SECRET_KEY: str
    AWS_REGION: str
    AWS_BUCKET_NAME: str

    class Config:
        env_file = ".backend_env"

try:
    settings = Settings()
    print(settings)
except Exception as e:
    print("Error loading settings:", e)
