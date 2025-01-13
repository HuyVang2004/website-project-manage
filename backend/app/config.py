from pydantic_settings import BaseSettings
import os 
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


    # DATABASE_URL: str = 'mysql+pymysql://root:Thach2003@localhost:3306/project_database'


#     DATABASE_URL: str = 'mysql+pymysql://root:truong@localhost:3306/web_database'
#     DATABASE_URL: str = 'mysql+pymysql://root:11012004@localhost:3306/projects_manage_website'
    
#     AWS_ACCESS_KEY: str = "AKIAYS2NR4TTOSD5YFHG"
#     AWS_SECRET_KEY: str = "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"
#     AWS_REGION: str = "ap-southeast-2"
#     AWS_BUCKET_NAME: str = "projects-manager-database"   
    # DATABASE_URL: str = 'mysql+pymysql://root:2694@localhost:3306/csdl'

