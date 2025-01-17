import React, { useState, useRef, useEffect, cache } from 'react';
import './projectDocument.scss';
import projectDocumentAPI from '../../../api/projects/projectDocumentApi';
const ProjectDocuments = ({project}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('');
  const fileInputRef = useRef(null);

  // Mock data
  const [documents, setDocuments] = useState([]); // Khởi tạo state là mảng rỗng
  const userData = JSON.parse(localStorage.getItem("user_profile") || "{}");
  const userId = userData?.user_id || "";

  const projectId = project.project_id || project.projectId;
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // Gọi API để lấy dữ liệu
        const response = await projectDocumentAPI.getProjectDocumentsByProject(projectId);

        if (response && Array.isArray(response)) {
          setDocuments(response);
        } else {
          console.error("API response is not an array", response);
        }
      } catch (error) {
        console.error("Failed to fetch documents", error);
      }
    };
    if (projectId) {
      fetchDocuments();
    }
  }, [projectId]);

  const filteredDocs = documents.filter(doc => 
    doc.file_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePreview = (doc) => {
    setSelectedDoc(doc);
    setShowPreview(true);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !description) {
      setUploadStatus('error');
      return;
    }

    setUploadStatus('uploading');
    
    // Simulate API call
    setTimeout(async () => {
      const newDoc = {
        project_id: projectId,
        file_name: selectedFile.name || "",
        file_path: URL.createObjectURL(selectedFile),
        uploaded_by: userId,
        uploaded_time: new Date().toISOString(),
        description: description,
      };
      console.log("Doc", newDoc);
      try {
        const responseDocuments = await projectDocumentAPI.createProjectDocument(newDoc);
        await projectDocumentAPI.uploadPDFToProject(responseDocuments.document_id, selectedFile);

        for (const member of project.teamMembers) {
          if (member.userId !== userData.user_id) {
            await notificationsAPI.createNotification({
              user_id: member.userId,
              message: `${userData.username} đã thêm 1 tài liệu vào dự án ${project.projectName}`,
              is_read: false,
              link: `${ROUTERS.USER.PROJECT.PROJECTDETAILS}/${projectId}`,
            });
          }
        }
       
      } catch {
        setUploadStatus('error');
      }

      setDocuments([...documents, newDoc]);
      setUploadStatus('success');
      
      setTimeout(() => {
        setShowUpload(false);
        setSelectedFile(null);
        setDescription('');
        setUploadStatus('');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="project-documents">
      {/* Header with Search and Upload Button */}
      <div className="header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="search-icon"></i>
        </div>
        <button className="add-button" onClick={() => setShowUpload(true)}>
          <i className="plus-icon"></i>
          <span>Thêm tài liệu</span>
        </button>
      </div>

      {/* Documents List */}
      <div className="documents-grid">
        {filteredDocs.map((doc) => (
          <div key={doc.document_id} className="document-card">
            <div className="document-content">
              <div className="document-info">
                <i className="file-icon"></i>
                <div className="document-details">
                  <h3>{doc.file_name}</h3>
                  <p>{doc.description}</p>
                  <div className="meta-info">
                    <div className="uploader">
                      <i className="user-icon"></i>
                      {doc.uploaded_by}
                    </div>
                    <div className="timestamp">
                      <i className="clock-icon"></i>
                      {formatDate(doc.uploaded_time)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="document-actions">
                <button onClick={() => handlePreview(doc)}>
                  <i className="eye-icon"></i>
                </button>
                <button onClick={() => window.open(doc.file_path, '_blank')}>
                  <i className="download-icon"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

    {/* Preview Modal */}
    {showPreview && (
    <div className="modal preview-modal">
        <div className="modal-content">
        <div className="modal-header">
            <h2>{selectedDoc?.file_name}</h2>
            <button 
            className="close-button"
            onClick={() => setShowPreview(false)}
            aria-label="Close preview"
            >
            <i className="close-icon" />
            </button>
        </div>
        <div className="preview-content">
            <div className="preview-placeholder">
            <p>Xem trước tài liệu</p>
            </div>
            <div className="document-details">
            <h4>Chi tiết tài liệu:</h4>
            <p>{selectedDoc?.description}</p>
            <div className="meta-info">
                <p>
                <i className="user-icon"></i>
                Người tải lên: {selectedDoc?.uploaded_by}
                </p>
                <p>
                <i className="clock-icon"></i>
                Thời gian: {selectedDoc && formatDate(selectedDoc.uploaded_time)}
                </p>
            </div>
            </div>
        </div>
        </div>
    </div>
    )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="modal upload-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Thêm tài liệu mới</h2>
              <button onClick={() => setShowUpload(false)} className="close-button">
                <i className="close-icon"></i>
              </button>
            </div>
            <div className="upload-content">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileSelect}
              />
              <div 
                className={`upload-area ${selectedFile ? 'has-file' : ''}`}
                onClick={() => fileInputRef.current?.click()}
              >
                {selectedFile ? (
                  <div className="selected-file">
                    <i className="file-icon"></i>
                    <span>{selectedFile.name}</span>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <i className="upload-icon"></i>
                    <p>Chọn file hoặc kéo thả vào đây</p>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="description">Mô tả</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Nhập mô tả cho tài liệu..."
                />
              </div>
              {uploadStatus === 'error' && (
                <div className="alert error">
                  Vui lòng chọn file và nhập mô tả
                </div>
              )}
              {uploadStatus === 'uploading' && (
                <div className="alert info">
                  Đang tải lên...
                </div>
              )}
              {uploadStatus === 'success' && (
                <div className="alert success">
                  Tải lên thành công!
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-button"
                onClick={() => setShowUpload(false)}
              >
                Hủy
              </button>
              <button 
                className="upload-button"
                onClick={handleUpload}
                disabled={uploadStatus === 'uploading'}
              >
                Tải lên
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDocuments;