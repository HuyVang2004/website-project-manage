from fastapi import FastAPI
from app.api import users, projects, tasks, project_teams, comments, notifications, activity_logs, project_documents, task_role, help, admins, messages
from app.db.session import engine
from app.db.base import Base
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  #
)

Base.metadata.create_all(bind=engine)

# Đăng ký router
app.include_router(admins.router, prefix="/admin", tags=["Admin"])
app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(projects.router, prefix="/projects", tags=["Projects"])
app.include_router(tasks.router, prefix="/tasks", tags=["tasks"])
app.include_router(project_teams.router, prefix="/project_teams", tags=["project_teams"])
app.include_router(comments.router, prefix="/comments", tags=["comments"])
app.include_router(notifications.router, prefix="/notifications", tags=["notifications"])
app.include_router(activity_logs.router, prefix="/activity_logs", tags=["activity_logs"])
app.include_router(project_documents.router, prefix="/project_documents", tags=["project_documents"])
app.include_router(task_role.router, prefix="/task_role", tags=["task_role"])
app.include_router(help.router, prefix="/help", tags=["help"])
app.include_router(messages.router, prefix="/message", tags=["message"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Project Manager API!"}
