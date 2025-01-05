from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.project_team import ProjectTeamCreate, ProjectTeamResponse, ProjectTeamUpdate
from app.services.project_team_service import ProjectTeamService
from app.db.session import get_db
from typing import List
from app.models.project import Project  
from app.schemas.project import ProjectResponse 

router = APIRouter()

@router.get("/", response_model=List[ProjectTeamResponse])
def get_all_project_teams(db: Session = Depends(get_db)):
    return ProjectTeamService.get_all_project_teams(db)

@router.get("/active-projects-count/{user_id}", response_model=int)
def get_active_projects_count_by_user(user_id: str, db: Session = Depends(get_db)):
    count = ProjectTeamService.get_active_projects_count_by_user(db, user_id)
    # if count == 0:
    #     raise HTTPException(
    #         status_code=status.HTTP_404_NOT_FOUND, detail="No active projects found for the given user"
    #     )
    return count

@router.get("/completed-projects-count/{user_id}", response_model=int)
def get_completed_projects_count_by_user(user_id: str, db: Session = Depends(get_db)):
    count = ProjectTeamService.get_completed_projects_count_by_user(db, user_id)
    # if count == 0:
    #     raise HTTPException(
    #         status_code=status.HTTP_404_NOT_FOUND, detail="No completed projects found for the given user"
    #     )
    return count

@router.get("/{project_team_id}", response_model=ProjectTeamResponse)
def get_project_team_by_id(project_team_id: str, db: Session = Depends(get_db)):
    project_team = ProjectTeamService.get_project_team_by_id(db, project_team_id)
    if not project_team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Project team not found"
        )
    return project_team

@router.post("/", response_model=ProjectTeamResponse, status_code=status.HTTP_201_CREATED)
def create_project_team(
    project_team_data: ProjectTeamCreate, db: Session = Depends(get_db)
):
    return ProjectTeamService.create_project_team(db, project_team_data)

@router.put("/{project_team_id}", response_model=ProjectTeamResponse)
def update_project_team(
    project_team_id: str, project_team_data: ProjectTeamUpdate, db: Session = Depends(get_db)
):
    project_team = ProjectTeamService.update_project_team(db, project_team_id, project_team_data)
    if not project_team:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Project team not found"
        )
    return project_team

@router.delete("/{project_team_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project_team(project_team_id: str, db: Session = Depends(get_db)):
    success = ProjectTeamService.delete_project_team(db, project_team_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Project team not found"
        )
    return {"detail": "Project team deleted successfully"}


@router.post("/from-names", response_model=ProjectTeamResponse, status_code=status.HTTP_201_CREATED)
def create_project_team_from_names(
    username: str, project_name: str, role: str, db: Session = Depends(get_db)
):
    ids = ProjectTeamService.get_user_and_project_ids(db, username, project_name)
    if not ids:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User or Project not found"
        )

    project_team_data = ProjectTeamCreate(
        user_id=ids["user_id"],
        project_id=ids["project_id"],
        role=role
    )
    return ProjectTeamService.create_project_team(db, project_team_data)

@router.get("/projects-by-user/{user_id}", response_model=List[ProjectResponse])
def get_projects_by_user(user_id: str, db: Session = Depends(get_db)):
    projects = ProjectTeamService.get_projects_by_user(db, user_id)
    if not projects:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="No projects found for the given user ID"
        )
    return projects




