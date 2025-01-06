from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = 'mysql+pymysql://root:truong@localhost:3306/web_database'
    
    AWS_ACCESS_KEY: str = "AKIAYS2NR4TTOSD5YFHG"
    AWS_SECRET_KEY: str = "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"
    AWS_REGION: str = "ap-southeast-2"
    AWS_BUCKET_NAME: str = "projects-manager-database"   

    class Config: 
        env_file = ".env"

settings = Settings()
