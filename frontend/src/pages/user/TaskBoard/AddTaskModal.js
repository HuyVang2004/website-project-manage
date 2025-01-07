import React, { useState } from 'react';
import './AddTaskModal.scss';

const AddTaskModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    deadline: '',
    priority: '',
    description: '',
    image: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    onClose();
  };

  return (
    <div className="add-task-modal">
      <div className="add-task-modal__content">
        <div className="add-task-modal__header">
          <h2>Thêm công việc</h2>
          <button className="add-task-modal__close" onClick={onClose}>Go Back</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Ngày đến hạn</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Mức độ ưu tiên</label>
            <div className="priority-options">
              <label className="priority-option">
                <input
                  type="radio"
                  name="priority"
                  value="cao"
                  checked={formData.priority === 'cao'}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                />
                <span>Cao</span>
              </label>
              <label className="priority-option">
                <input
                  type="radio"
                  name="priority"
                  value="trung-binh"
                  checked={formData.priority === 'trung-binh'}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                />
                <span>Trung bình</span>
              </label>
              <label className="priority-option">
                <input
                  type="radio"
                  name="priority"
                  value="thap"
                  checked={formData.priority === 'thap'}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                />
                <span>Thấp</span>
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group description">
              <label>Mô tả</label>
              <textarea
                placeholder="Viết mô tả..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="form-group image-upload">
              <label>Thêm ảnh</label>
              <div className="upload-area">
                <img src="/placeholder-image.svg" alt="Upload" />
                <p>Drag&Drop files here</p>
                <p>or</p>
                <button type="button" className="browse-button">Browse</button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                  hidden
                />
              </div>
            </div>
          </div>

          <button type="submit" className="submit-button">Done</button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;