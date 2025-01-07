from pydantic_settings import BaseSettings

class Settings(BaseSettings):
<<<<<<< HEAD
    DATABASE_URL: str = 'mysql+pymysql://root:truong@localhost:3306/project_manager_database'
=======

    # DATABASE_URL: str = 'mysql+pymysql://root:Thach2003@localhost:3306/project_database'


#     DATABASE_URL: str = 'mysql+pymysql://root:truong@localhost:3306/web_database'
    DATABASE_URL: str = 'mysql+pymysql://root:11012004@localhost:3306/projects_manage_website'
>>>>>>> 5fccb28ebbb7d21eaceabe8f4de4294430cd8ac2
    
    AWS_ACCESS_KEY: str = "AKIAYS2NR4TTOSD5YFHG"
    AWS_SECRET_KEY: str = "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"
    AWS_REGION: str = "ap-southeast-2"
    AWS_BUCKET_NAME: str = "projects-manager-database"   
<<<<<<< HEAD
=======
    # DATABASE_URL: str = 'mysql+pymysql://root:2694@localhost:3306/csdl'

>>>>>>> 5fccb28ebbb7d21eaceabe8f4de4294430cd8ac2

    class Config: 
        env_file = ".env"

settings = Settings()
