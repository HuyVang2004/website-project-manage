from sqlalchemy.orm import Session
from app.models.project_team import ProjectTeam
from app.schemas.project_team import ProjectTeamCreate, ProjectTeamUpdate
from typing import List, Optional
from uuid import uuid4
from app.models.project import Project
from app.models.user import User

class ProjectTeamService:
    @staticmethod
    def create_project_team(db: Session, project_team_data: ProjectTeamCreate) -> ProjectTeam:
        project_team = ProjectTeam(**project_team_data.dict()) 
        project_team.project_team_id = str(uuid4()) 
        db.add(project_team)
        db.commit()
        db.refresh(project_team)
        return project_team


    @staticmethod
    def get_project_team_by_project_id(db: Session, project_id: str) -> List[ProjectTeam]:
        return db.query(ProjectTeam).filter(ProjectTeam.project_id == project_id).all()

    @staticmethod
    def get_all_project_teams(db: Session) -> List[ProjectTeam]:
        return db.query(ProjectTeam).all()

    @staticmethod
    def update_project_team_by_project_id(db: Session, project_id: str, project_team_data: ProjectTeamUpdate) -> Optional[ProjectTeam]:
        project_team = db.query(ProjectTeam).filter(ProjectTeam.project_id == project_id).first()
        if not project_team:
            return None

        for key, value in project_team_data.dict(exclude_unset=True).items():
            setattr(project_team, key, value)

        db.commit()
        db.refresh(project_team)
        return project_team


    @staticmethod
    def delete_project_team_by_project_id(db: Session, project_id: str) -> bool:
        project_team = db.query(ProjectTeam).filter(ProjectTeam.project_id == project_id).first()
        if not project_team:
            return False

        db.delete(project_team)
        db.commit()
        return True


    @staticmethod
    def get_user_and_project_ids(db: Session, username: str, project_name: str) -> Optional[dict]:
        user = db.query(User).filter(User.username == username).first()
        project = db.query(Project).filter(Project.project_name == project_name).first()

        if not user or not project:
            return None

        return {"user_id": user.user_id, "project_id": project.project_id}
    
    @staticmethod
    def get_projects_by_user(db: Session, user_id: str) -> List[Project]:
        project_teams = (
            db.query(Project)
            .join(ProjectTeam, Project.project_id == ProjectTeam.project_id)
            .filter(ProjectTeam.user_id == user_id)
            .all()
        )
        return project_teams

    @staticmethod
    def get_active_projects_count_by_user(db: Session, user_id: str) -> int:
        return db.query(Project).join(ProjectTeam).filter(
            Project.status == 'đang tiến hành',
            ProjectTeam.user_id == user_id
        ).count()

    @staticmethod
    def get_completed_projects_count_by_user(db: Session, user_id: str) -> int:
        return db.query(Project).join(ProjectTeam).filter(
            Project.status == 'hoàn thành',
            ProjectTeam.user_id == user_id
        ).count()
        
    @staticmethod
    def get_project_team_info_by_project_id(db: Session, project_id: str):
        # Query the database to get user_id and role from the project team table
        result = db.query(ProjectTeam).filter(ProjectTeam.project_id == project_id).all()
        
        if not result:
            return None
        
        # Map the result to a list of dictionaries containing only user_id and role
        return [{"user_id": team.user_id, "role": team.role} for team in result]