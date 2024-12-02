from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from app.schemas.project_team import ProjectTeamCreate, ProjectTeamResponse, ProjectTeamUpdate
from app.services.project_team_service import create_project_team, get_project_team_by_id, get_project_teams_by_project, update_project_team, delete_project_team
from app.db.session import get_db

router = APIRouter()

@router.post("/", response_model=ProjectTeamResponse)
def create_project_team_endpoint(project_team: ProjectTeamCreate, db: Session = Depends(get_db)):
    return create_project_team(project_team, db)

@router.get("/{project_team_id}", response_model=ProjectTeamResponse)
def get_project_team_endpoint(project_team_id: str, db: Session = Depends(get_db)):
    project_team = get_project_team_by_id(project_team_id, db)
    if not project_team:
        raise HTTPException(status_code=404, detail="Project team not found")
    return project_team

@router.get("/project/{project_id}", response_model=list[ProjectTeamResponse])
def get_project_teams(project_id: str, db: Session = Depends(get_db)):
    project_teams = get_project_teams_by_project(project_id, db)
    if not project_teams:
        raise HTTPException(status_code=404, detail="No project teams found for this project")
    return project_teams

@router.put("/{project_team_id}", response_model=ProjectTeamResponse)
def update_project_team_endpoint(project_team_id: str, project_team_update: ProjectTeamUpdate, db: Session = Depends(get_db)):
    updated_project_team = update_project_team(project_team_id, project_team_update, db)
    if not updated_project_team:
        raise HTTPException(status_code=404, detail="Project team not found")
    return updated_project_team

@router.delete("/{project_team_id}", response_model=dict)
def delete_project_team_endpoint(project_team_id: str, db: Session = Depends(get_db)):
    project_team = delete_project_team(project_team_id, db)
    if not project_team:
        raise HTTPException(status_code=404, detail="Project team not found")
    return {"message": f"Project team with ID {project_team_id} has been deleted successfully"}
