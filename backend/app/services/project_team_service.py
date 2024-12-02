# services/project_team_service.py

from sqlalchemy.orm import Session
from app.models.project_team import ProjectTeam
from app.schemas.project_team import ProjectTeamCreate, ProjectTeamUpdate
from app.db.session import get_db

def create_project_team(project_team: ProjectTeamCreate, db: Session = next(get_db())):
    new_project_team = ProjectTeam(**project_team.dict())
    db.add(new_project_team)
    db.commit()
    db.refresh(new_project_team)
    return new_project_team

def get_project_team_by_id(project_team_id: str, db: Session = next(get_db())):
    return db.query(ProjectTeam).filter(ProjectTeam.project_team_id == project_team_id).first()

def get_project_teams_by_project(project_id: str, db: Session = next(get_db())):
    return db.query(ProjectTeam).filter(ProjectTeam.project_id == project_id).all()

def update_project_team(project_team_id: str, project_team_update: ProjectTeamUpdate, db: Session = next(get_db())):
    project_team = db.query(ProjectTeam).filter(ProjectTeam.project_team_id == project_team_id).first()
    if not project_team:
        return None
    for field, value in project_team_update.dict(exclude_unset=True).items():
        setattr(project_team, field, value)
    db.commit()
    db.refresh(project_team)
    return project_team

def delete_project_team(project_team_id: str, db: Session = next(get_db())):
    project_team = db.query(ProjectTeam).filter(ProjectTeam.project_team_id == project_team_id).first()
    if not project_team:
        return None
    db.delete(project_team)
    db.commit()
    return project_team
