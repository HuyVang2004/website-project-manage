from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = 'mysql+pymysql://root:Thach2003@localhost:3306/project_database'

    class Config: 
        env_file = ".env"

settings = Settings()
