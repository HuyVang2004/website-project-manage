from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = 'mysql+pymysql://root:truong@localhost:3306/project_manager_database'

    class Config:
        env_file = ".env"

settings = Settings()
