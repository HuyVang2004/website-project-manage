from fastapi import FastAPI
from app.api import users, projects
from app.db.session import engine
from app.db.base import Base


app = FastAPI()

Base.metadata.create_all(bind=engine)

# Đăng ký router
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(projects.router, prefix="/projects", tags=["Projects"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Project Manager API!"}
