from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = 'mysql+pymysql://root:11012004@localhost:3306/projects_manage_website'

    class Config: 
        env_file = ".env"

settings = Settings()
