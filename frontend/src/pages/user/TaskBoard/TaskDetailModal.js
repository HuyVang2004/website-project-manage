import React, { useState } from 'react';
import { X, Link as LinkIcon, File, Clock, MessageCircle, Plus, Paperclip } from 'lucide-react';
import './TaskDetailModal.scss';
import commentAPI from '../../../api/commentApi';

const TaskDetailModal = ({ task, onClose, onAddTask }) => {
  if (!task) return null;
  console.log(task);

  const userData = JSON.parse(localStorage.getItem("user_profile") || "{}");
  const userId = userData?.user_id || "";
  const [commentContent, setCommentContent] = useState("");

  

  const handleAddComment = async () => {
    if (commentContent.trim() === "") return; // Prevent empty comments
    try {
      await commentAPI.createComment({
        task_id: task.task_id,
        create_by: userId,
        content: commentContent,
      });
      setCommentContent(""); // Clear the comment input after successful submission
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="task-modal-overlay" onClick={onClose}>
      <div className="task-modal-content" onClick={e => e.stopPropagation()}>
        <div className="task-modal-header">
          <h2>{task.title}</h2>
          <div className="task-modal-frame">{task.frame}</div>
          <button className="task-modal-close" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="task-modal-body">
          <div className="task-info-row">
            <div className="task-info-label">
              <LinkIcon size={16} />
              Mức độ ưu tiên
            </div>
            <div className="priority-badge high">{task.priority}</div>
          </div>

          <div className="task-info-row">
            <div className="task-info-label">
              <Clock size={16} />
              Trạng thái
            </div>
            <div className="status-badge completed">{task.status}</div>
          </div>

          <div className="task-info-row">
            <div className="task-info-label">
              <MessageCircle size={16} />
              Thành viên
            </div>
            <div className="member-info">
              {task.attendees.map(member => (
                <div key={member.user_id} className="member-item">
                  <div className="member-avatar">{member.username[0]}</div>
                  <span>{member.username}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="task-info-row">
            <div className="task-info-label">
              <Clock size={16} />
              Hạn
            </div>
            <div className="deadline-info">{task.dueDate}</div>
          </div>

          {/* <div className="task-files-section">
            <h3>Tài liệu</h3>
            <div className="document-links">
              <a href="#" className="document-link">
                <Paperclip size={16} />
                Document Links
              </a>
            </div>
            <button className="add-file-button">
              <Plus size={16} />
              Thêm tài liệu
            </button>
          </div> */}

          <div className="task-description-section">
            <h3>Mô tả</h3>
            <div className="description-editor">
              <textarea 
                placeholder="Viết mô tả..." 
                rows={4} 
                value={task.description || ""} // Hiển thị task.description
                onChange={(e) => updateTaskDescription(e.target.value)} // Hàm để cập nhật mô tả
              />
              <div className="editor-toolbar">
                <button><b>B</b></button>
                <button><i>I</i></button>
                <button>...</button>
              </div>
            </div>

            <div className="comment-section">
              <div className="comment-input">
                <div className="commenter-avatar">V</div>
                <input 
                  type="text" 
                  placeholder="Thêm bình luận hoặc chú ý" 
                  value={commentContent} 
                  onChange={(e) => setCommentContent(e.target.value)} 
                  onKeyDown={(e) => e.key === "Enter" && handleAddComment()} 
                />
              </div>
              <button onClick={handleAddComment} className="add-comment-btn">
                Thêm bình luận
              </button>
              <div className="comments-list">
                {task.comments?.map((comment, index) => (
                  <div key={index} className="comment-item">
                    <div className="comment-header">
                      <span className="commenter-name">{comment.username}</span>
                      <span className="comment-time">{new Date(comment.created_time).toLocaleString()}</span>
                    </div>
                    <div className="comment-content">{comment.content}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
