from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = 'mysql+pymysql://root:2694@localhost:3306/csdl'

    class Config:
        env_file = ".env"

settings = Settings()
