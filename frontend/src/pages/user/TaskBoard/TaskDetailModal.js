import React from 'react';
import { X, Link as LinkIcon, File, Clock, MessageCircle, Plus, Paperclip } from 'lucide-react';
import './TaskDetailModal.scss';

const TaskDetailModal = ({ task, onClose }) => {
  if (!task) return null;
  console.log(task);
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
              />
              <div className="editor-toolbar">
                <button>B</button>
                <button>I</button>
                <button>...</button>
              </div>
            </div>
            <div className="comment-section">
              <div className="comment-input">
                <div className="commenter-avatar">V</div>
                <input type="text" placeholder="Thêm bình luận hoặc chú ý" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;