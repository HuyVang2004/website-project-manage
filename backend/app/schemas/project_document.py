from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ProjectDocumentCreate(BaseModel):
    document_id: str
    project_id: str
    file_name: str
    file_path: str
    uploaded_by: str
    description: Optional[str] = None

class ProjectDocumentResponse(BaseModel):
    document_id: str
    project_id: str
    file_name: str
    file_path: str
    uploaded_by: str
    uploaded_time: datetime
    description: Optional[str] = None

class ProjectDocumentUpdate(BaseModel):
    file_name: Optional[str] = None
    file_path: Optional[str] = None
    description: Optional[str] = None
