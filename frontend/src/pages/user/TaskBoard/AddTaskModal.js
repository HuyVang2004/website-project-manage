import React, { useState, useRef, useEffect } from 'react';
import './AddTaskModal.scss';
import taskAPI from '../../../api/tasks/tasksApi';
import taskRoleAPI from '../../../api/tasks/taskRoleApi';

const AddTaskModal = ({status, onClose }) => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    task_name: '',
    due_date: '',
    priority: '',
    assigned_to: "",
    description: '',
    // file: null,
  });
  const userData = JSON.parse(localStorage.getItem("user_profile") || "{}");
  const userId = userData?.user_id || "";

  const myProjectId = localStorage.getItem('my_project_id') || "";

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { task_name, due_date, priority, description, file } = formData;

    if (!task_name || !due_date || !priority) {
      alert('Vui lòng nhập đầy đủ các thông tin bắt buộc.');
      return;
    }

    try {

      if (file) {
        // Đẩy ảnh lên aws s3
        console.log('file AddTaskModal.js');
      } 
      
      const responseTask = await taskAPI.createTask({
        project_id: myProjectId, 
        task_name: formData.task_name,
        assigned_to: userId,
        // status: 'pending',
        status: status,
        due_date: formData.due_date,
        priority: formData.priority,
        description: formData.description,
        // budget : 5,
      }); 

      await taskRoleAPI.createTaskRole({
        task_id : responseTask.task_id,
        user_id: userId,
        can_read: true,
        can_change: true
      });
      
      alert('Thêm công việc thành công!');
      onClose();
    } catch (error) {
      console.log("data", {
        project_id: myProjectId, 
        task_name: formData.task_name,
        assigned_to: '',
        due_date: formData.due_date,
        priority: formData.priority,
        description: formData.description,
      });
      console.error('Lỗi khi thêm công việc:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File quá lớn. Vui lòng chọn file nhỏ hơn 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn file ảnh');
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setFormData({ ...formData, file });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File quá lớn. Vui lòng chọn file nhỏ hơn 5MB');
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setFormData({ ...formData, file });
    } else {
      alert('Vui lòng chọn file ảnh');
    }
  };

  return (
    <div className="add-task-modal">
      <div className="add-task-modal__content">
        <div className="add-task-modal__header">
          <h2>Thêm công việc</h2>
          <button className="add-task-modal__close" onClick={onClose}>
            Go Back
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên công việc</label>
            <input
              type="text"
              value={formData.task_name}
              onChange={(e) => setFormData({ ...formData, task_name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Ngày đến hạn</label>
            <input
              type="date"
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
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
              <div
                className="upload-area"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Preview"
                    style={{ width: '100%', maxHeight: '200px', objectFit: 'contain' }}
                  />
                ) : (
                  <img src="/placeholder-image.svg" alt="Upload" />
                )}
                <p>Drag&Drop files here</p>
                <p>or</p>
                <button
                  type="button"
                  className="browse-button"
                  onClick={handleBrowseClick}
                >
                  Browse
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  hidden
                />
              </div>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Done
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
