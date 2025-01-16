import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../components/SlideBar';
import TopBar from '../../components/Nav/TopBar';
import Footer from '../../components/Footer';
import './style/UserDetails.scss';

const UserDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = location.state || {};

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa xác định";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (!user) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="main-content">
          <TopBar />
          <div className="user-detail-page">
            <div>Không tìm thấy thông tin người dùng</div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  const handleBack = () => {
    navigate('/admin/users');
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="user-detail-page">
          <div className="user-detail-container">
            {/* Back button */}
            <button onClick={handleBack} className="back-btn">
              ← Quay lại
            </button>

            {/* Header */}
            <div className="header">
              <h2>Chi tiết người dùng</h2>
              <div className="actions">
                <button className="delete-btn">
                  <span>🗑️</span>
                  Xóa tài khoản
                </button>
                <button className="mail-btn">
                  <span>✉️</span>
                  Gửi mail
                </button>
              </div>
            </div>

            {/* User Info */}
            <div className="info-grid">
              <div className="info-card">
                <div>
                  <span className="label">Tên người dùng: </span>
                  <span>{user.full_name}</span>
                </div>
                <div>
                  <span className="label">Giới tính: </span>
                  <span>{user.gender}</span>
                </div>
                <div>
                  <span className="label">Mail: </span>
                  <span>{user.email}</span>
                </div>
                <div>
                  <span className="label">Vai trò: </span>
                  <span>{user.role}</span>
                </div>
              </div>

              <div className="info-card">
                <div>
                  <span className="label">Ngày tạo tài khoản: </span>
                  <span>{formatDate(user.created_at)}</span>
                </div>
                <div>
                  <span className="label">Trạng thái: </span>
                  <span className={`status ${user.status?.toLowerCase()}`}>
                    {user.status === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}
                  </span>
                </div>
                <div>
                  <span className="label">Các dự án: </span>
                  <span>{user.projects?.join(', ') || 'Chưa tham gia dự án nào'}</span>
                </div>
              </div>
            </div>

            <div className="stats-card">
              <div className="stats-grid">
                <div>
                  <span className="label">Số dự án tham gia:</span>
                  <span>{user.projects?.length || 0}</span>
                </div>
                <div>
                  <span className="label">Ngày tạo:</span>
                  <span>{formatDate(user.created_at)}</span>
                </div>
              </div>
            </div>

            {user.projects && user.projects.length > 0 && (
              <div className="projects-section">
                <h3>Các dự án tham gia</h3>
                <div className="projects-list">
                  {user.projects.map((project, index) => (
                    <div key={index} className="project-item">
                      <span>Dự án {project}</span>
                      <button
                        onClick={() => navigate(`/admin/project/${project}`)}
                        className="view-details"
                      >
                        Xem chi tiết
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UserDetail;