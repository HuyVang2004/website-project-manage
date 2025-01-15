import asyncio
from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect, Query
from sqlalchemy.orm import Session
from app.schemas.message import MessageCreate, MessageResponse, MessageUpdate
from app.services.message_service import create_message, update_message, get_messages_by_project, get_messages_by_user, batch_create_messages
from app.db.session import get_db
from typing import Dict, List, Optional
from datetime import datetime
import json
from collections import defaultdict
import pytz

router = APIRouter()

# Tạo timezone cho Việt Nam
vietnam_tz = pytz.timezone('Asia/Ho_Chi_Minh')

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, Dict[str, WebSocket]] = {}
        self.pending_messages: Dict[str, List[MessageCreate]] = defaultdict(list)
        self.batch_size = 100
        self.flush_interval = 60
        self.message_history_limit = 50  # Giới hạn tin nhắn lịch sử

    async def connect(self, websocket: WebSocket, project_id: str, client_id: str):
        try:
            await websocket.accept()
            if project_id not in self.active_connections:
                self.active_connections[project_id] = {}
            self.active_connections[project_id][client_id] = websocket
            print(f"Client {client_id} connected to project {project_id}")
        except Exception as e:
            print(f"Error connecting websocket: {str(e)}")
            raise

    async def flush_messages(self, project_id: str, db: Session):
        if project_id in self.pending_messages and self.pending_messages[project_id]:
            messages = self.pending_messages[project_id]
            try:
                created_messages = await batch_create_messages(messages, db)
                self.pending_messages[project_id] = []
                return created_messages
            except Exception as e:
                print(f"Error flushing messages: {str(e)}")
                return []

    async def periodic_flush(self, db: Session):
        """Periodically flush messages to database"""
        while True:
            await asyncio.sleep(self.flush_interval)
            for project_id in list(self.pending_messages.keys()):
                await self.flush_messages(project_id, db)

    async def disconnect(self, project_id: str, client_id: str, db: Session):
        try:
            if project_id in self.active_connections:
                if client_id in self.active_connections[project_id]:
                    self.active_connections[project_id].pop(client_id)
                    print(f"Client {client_id} disconnected from project {project_id}")
                
                # Flush pending messages when client disconnects
                created_messages = await self.flush_messages(project_id, db)
                
                if not self.active_connections[project_id]:
                    self.active_connections.pop(project_id)
                
                return created_messages
        except Exception as e:
            print(f"Error disconnecting websocket: {str(e)}")

    async def broadcast_to_project(self, project_id: str, message: dict):
        if project_id in self.active_connections:
            disconnected_clients = []
            for client_id, connection in self.active_connections[project_id].items():
                try:
                    await connection.send_json(message)
                except Exception as e:
                    print(f"Error broadcasting to client {client_id}: {str(e)}")
                    disconnected_clients.append(client_id)
            
            # Cleanup disconnected clients
            for client_id in disconnected_clients:
                await self.disconnect(project_id, client_id, None)

manager = ConnectionManager()

def serialize_datetime(dt):
    return dt.isoformat() if isinstance(dt, datetime) else dt

def serialize_message(message):
    """Convert SQLAlchemy message model to serializable dict"""
    return {
        "message_id": str(message.message_id),
        "content": message.content,
        "project_id": str(message.project_id),
        "sender_id": str(message.sender_id),
        "sent_time": serialize_datetime(message.sent_time)
    }

def get_vietnam_time():
    """Lấy thời gian hiện tại theo múi giờ Việt Nam"""
    utc_now = datetime.utcnow()
    return pytz.utc.localize(utc_now).astimezone(vietnam_tz)

@router.websocket("/ws/projects/{project_id}/{client_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    project_id: str,
    client_id: str,
    db: Session = Depends(get_db)
):
    flush_task = asyncio.create_task(manager.periodic_flush(db))
    
    try:
        await manager.connect(websocket, project_id, client_id)
        
        # Lấy tin nhắn lịch sử với giới hạn
        existing_messages = await  get_messages_by_project(
            project_id,
            db,
            limit=manager.message_history_limit,
            order_by_desc=True  # Lấy tin nhắn mới nhất
        )
        
        if existing_messages:
            await websocket.send_json({
                "type": "history",
                "messages": [serialize_message(msg) for msg in existing_messages]
            })
        
        while True:
            try:
                data = await websocket.receive_text()
                message_data = json.loads(data)
                
                # Tạo message với thời gian Việt Nam
                new_message = MessageCreate(
                    project_id=project_id,
                    sender_id=client_id,
                    content=message_data.get("content", ""),
                    sent_time=get_vietnam_time()
                )
                
                # Khởi tạo list nếu chưa tồn tại
                if project_id not in manager.pending_messages:
                    manager.pending_messages[project_id] = []
                
                manager.pending_messages[project_id].append(new_message)
                
                message_dict = {
                    "content": new_message.content,
                    "project_id": new_message.project_id,
                    "sender_id": new_message.sender_id,
                    "sent_time": serialize_datetime(new_message.sent_time)
                }
                
                await manager.broadcast_to_project(
                    project_id,
                    {
                        "type": "message",
                        "message": message_dict
                    }
                )
                
                if len(manager.pending_messages[project_id]) >= manager.batch_size:
                    await manager.flush_messages(project_id, db)
                    
            except WebSocketDisconnect:
                created_messages = await manager.disconnect(project_id, client_id, db)
                await manager.broadcast_to_project(
                    project_id,
                    {
                        "type": "system",
                        "message": f"Client {client_id} has left the chat"
                    }
                )
                break
            except Exception as e:
                print(f"Error processing message: {str(e)}")
                await websocket.send_json({
                    "type": "error",
                    "message": "Error processing your message"
                })
                
    except Exception as e:
        print(f"WebSocket error: {str(e)}")
        await manager.disconnect(project_id, client_id, db)
    finally:
        flush_task.cancel()
        try:
            await flush_task
        except asyncio.CancelledError:
            pass