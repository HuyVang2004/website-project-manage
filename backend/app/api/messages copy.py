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

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, Dict[str, WebSocket]] = {}
        self.pending_messages: Dict[str, List[MessageCreate]] = defaultdict(list)
        self.batch_size = 100  # Adjust based on your needs
        self.flush_interval = 60  # Seconds between periodic flushes

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
        """Flush pending messages to database"""
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

@router.websocket("/ws/projects/{project_id}/{client_id}")
async def websocket_endpoint(
    websocket: WebSocket, 
    project_id: str, 
    client_id: str,
    db: Session = Depends(get_db)
):
    # Start periodic flush task
    flush_task = asyncio.create_task(manager.periodic_flush(db))
    
    try:
        await manager.connect(websocket, project_id, client_id)
        
        # Send existing messages when client connects
        existing_messages = get_messages_by_project(project_id, db)
        if existing_messages:
            for message in existing_messages:
                await websocket.send_json({
                    "type": "history",
                    "message": MessageResponse.from_orm(message).dict()
                })
        
        while True:
            try:
                data = await websocket.receive_text()
                message_data = json.loads(data)
                
                # Create message object but don't save to database yet
                new_message = MessageCreate(
                    project_id=project_id,
                    sender_id=client_id,
                    content=message_data.get("content", ""),
                    timestamp=datetime.utcnow()
                )
                
                # Add to pending messages
                manager.pending_messages[project_id].append(new_message)
                
                # Broadcast to all clients in the project
                await manager.broadcast_to_project(
                    project_id,
                    {
                        "type": "message",
                        "message": new_message.dict()
                    }
                )
                
                # If batch size reached, flush to database
                if len(manager.pending_messages[project_id]) >= manager.batch_size:
                    await manager.flush_messages(project_id, db)
                
            except WebSocketDisconnect:
                # Flush remaining messages and disconnect
                created_messages = await manager.disconnect(project_id, client_id, db)
                
                # Broadcast disconnect message
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
        # Cancel periodic flush task
        flush_task.cancel()
        try:
            await flush_task
        except asyncio.CancelledError:
            pass