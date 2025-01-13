import React, { useState } from 'react';
import './EvenForm.scss'
const EventForm = ({ event, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    startDate: event?.startDate || '',
    startTime: event?.startTime || '00:00',
    endDate: event?.endDate || '',
    endTime: event?.endTime || '00:00',
    priority: event?.priority || 'high',
    description: event?.description || '',
    image: event?.image || null,
    members: event?.members || []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Tạo đối tượng Date cho thời gian bắt đầu
    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    // Tạo đối tượng Date cho thời gian kết thúc
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);
    
    const eventData = {
      id: event?.id || Date.now(),
      title: formData.title,
      start: startDateTime,
      end: endDateTime,
      type: 'default',
      description: formData.description,
      priority: formData.priority,
      image: formData.image,
      members: formData.members
    };

    onSave(eventData);
    onClose();
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sự kiện này?')) {
      onSave(null); // Truyền null để báo hiệu xóa sự kiện
      onClose();
    }
  };
  const [emailInput, setEmailInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const addMember = () => {
    if (emailInput && !formData.members.find(m => m.email === emailInput)) {
      setFormData({
        ...formData,
        members: [...formData.members, { 
          email: emailInput,
          avatar: `https://ui-avatars.com/api/?name=${emailInput.split('@')[0]}`,
          name: emailInput.split('@')[0]
        }]
      });
      setEmailInput(''); // Reset email input sau khi thêm
    }
  };

  
  // Xử lý kéo thả file
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageFile(file);
    } else {
      alert('Vui lòng chỉ kéo thả file ảnh');
    }
  };

  // Xử lý file ảnh
  const handleImageFile = (file) => {
    if (file.size > 5 * 1024 * 1024) { // Giới hạn 5MB
      alert('File ảnh không được vượt quá 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // Xử lý click nút Browse
  const handleBrowseClick = () => {
    const fileInput = document.getElementById('imageInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageFile(file);
    }
  };

  // Xử lý xóa ảnh
  const handleRemoveImage = () => {
    setFormData({ ...formData, image: null });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <div className="modal-header">
          <h2>{event?.id ? 'Chỉnh sửa công việc' : 'Thêm công việc'}</h2>
          <button onClick={onClose} className="go-back-btn">Go Back</button>
        </div>


        <form onSubmit={handleSubmit}>
          <div className="form-layout">
            <div className="form-main">
              <div className="form-group">
                <label>Tên</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="form-input"
                />
              </div>

              {/* <div className="form-group">
                <label>Ngày bắt đầu</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Ngày kết thúc</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  required
                  className="form-input"
                  min={formData.startDate} // Không cho chọn ngày kết thúc trước ngày bắt đầu
                />
              </div> */}
              <div className="form-group">
            <label>Thời gian bắt đầu</label>
            <div className="time-inputs">
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
                className="form-input"
              />
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
                className="form-input"
              />
            </div>
          </div>
          <div className="form-group">
        <label>Thời gian kết thúc</label>
          <div className="time-inputs">
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
              className="form-input"
              min={formData.startDate}
            />
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              required
              className="form-input"
            />
          </div>
        </div>

              <div className="form-group">
                <label>Mức độ ưu tiên</label>
                <div className="priority-options">
                  <label className="priority-option">
                    <input
                      type="radio"
                      name="priority"
                      value="high"
                      checked={formData.priority === 'high'}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    />
                    <span className="priority-dot high"></span>
                    Cao
                  </label>
                  <label className="priority-option">
                    <input
                      type="radio"
                      name="priority"
                      value="medium"
                      checked={formData.priority === 'medium'}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    />
                    <span className="priority-dot medium"></span>
                    Trung bình
                  </label>
                  <label className="priority-option">
                    <input
                      type="radio"
                      name="priority"
                      value="low"
                      checked={formData.priority === 'low'}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    />
                    <span className="priority-dot low"></span>
                    Thấp
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Mô tả</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="form-textarea"
                  rows="4"
                />
              </div>
            </div>

            <div className="form-sidebar">
            <div className="image-upload">
            <label>Thêm ảnh</label>
            <div 
              className={`image-preview ${isDragging ? 'dragging' : ''}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {formData.image ? (
                <div className="preview-container">
                  <img src={formData.image} alt="Preview" className="preview-image" />
                  <button 
                    type="button" 
                    className="remove-image-btn"
                    onClick={handleRemoveImage}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="image-placeholder">
                  <span>Drag&Drop files here</span>
                  <span>or</span>
                  <button 
                    type="button" 
                    className="browse-btn"
                    onClick={handleBrowseClick}
                  >
                    Browse
                  </button>
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                  />
                </div>
              )}
            </div>
          </div>
          

              <div className="members-section">
                <div className="email-input-group">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Email"
                    className="form-input"
                  />
                  <button
                    type="button"
                    onClick={addMember}
                    className="add-member-btn"
                  >
                    Thêm viên
                  </button>
                </div>

                <div className="members-list">
                  {formData.members.map((member, index) => (
                    <div key={index} className="member-item">
                      <img src={member.avatar} alt={member.name} className="member-avatar" />
                      <span className="member-name">{member.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="done-btn">Done</button>
            {event?.id && ( // Chỉ hiển thị nút Delete khi đang edit sự kiện
              <button 
                type="button" 
                onClick={handleDelete} 
                className="delete-btn"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;