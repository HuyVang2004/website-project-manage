import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ROUTERS } from '../../utils/router';
import Sidebar from '../../components/SlideBar';
import TopBar from '../../components/Nav/TopBar';;
import Footer from '../../components/Footer';
import './style/UserDetails.scss';

const UserDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = location.state || {};
  const handleDelete = (userId, e) => {
    e.stopPropagation();
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
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
                  <span>{user.name}</span>
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
                  <span className="label">Số điện thoại: </span>
                  <span>{user.phone}</span>
                </div>
              
              </div>

              <div className="info-card">
              <div>
                  <span className="label">Trạng thái: </span>
                  <span>{user.status}</span>
                </div>
                <div>
                  <span className="label">Các dự án: </span>
                  <span>{" "+user.project}</span>
                </div>
              </div>
            </div>

            <div className="stats-card">
              <div className="stats-grid">
                <div>
                  <span className="label">Số dự án tham gia:</span>
                  <span>{user.project.length}</span>
                </div>
                <div>
                  <span className="label">Lần truy cập gần nhất:</span>
                  <span>{user.lastLogin}</span>
                </div>
                <div>
                  <span className="label">Thời gian truy cập trung bình:</span>
                  <span>10 lần / tuần</span>
                </div>
              </div>
            </div>

            <div className="projects-section">
              <h3>Các dự án tham gia</h3>
              <div className="projects-list">
              {user.project.map((project, index) => (
                  <div key={index} className="project-item"> 
                    <span>Dự án {project}</span>
                    <button onClick={() => navigate(`/${ROUTERS.ADMIN.PROJECT}/${project}`)} className="view-details">
                      Xem chi tiết
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UserDetail;