import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTERS } from '../../utils/router';
import Sidebar from '../../components/SlideBar';
import TopBar from '../../components/Nav/TopBar';
import Footer from '../../components/Footer';
import userAPI from '../../api/userApi';
import './style/UserDetails.scss';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [projectStats, setProjectStats] = useState({
    active: 0,
    completed: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        // Fetch user info
        const userResponse = await userAPI.getUserInfo(id);
        const userData = userResponse.data || userResponse;
        setUser(userData);

        if (userData && userData.projects) {
          setProjects(userData.projects);
          
          // Calculate project statistics
          const activeProjects = userData.projects.filter(p => p.status === 'active');
          const completedProjects = userData.projects.filter(p => p.status === 'completed');
          
          setProjectStats({
            active: activeProjects.length,
            completed: completedProjects.length
          });
        }

      } catch (err) {
        setError('Không thể tải thông tin người dùng');
        console.error('Error fetching user details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleBack = () => {
    navigate('/admin/users');
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        await userAPI.deleteUser(userId);
        navigate('/admin/users');
      } catch (err) {
        setError('Không thể xóa người dùng');
        console.error('Error deleting user:', err);
      }
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>Có lỗi xảy ra: {error}</div>;
  }

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

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="user-detail-page">
          <div className="user-detail-container">
            <button onClick={handleBack} className="back-btn">
              ← Quay lại
            </button>

            <div className="header">
              <h2>Chi tiết người dùng</h2>
              <div className="actions">
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(user.user_id)}
                >
                  <span>🗑️</span>
                  Xóa tài khoản
                </button>
                <button 
                  className="mail-btn"
                  onClick={() => window.location.href = `mailto:${user.email}`}
                >
                  <span>✉️</span>
                  Gửi mail
                </button>
              </div>
            </div>

            <div className="info-grid">
              <div className="info-card">
                <div>
                  <span className="label">Tên người dùng: </span>
                  <span>{user.username}</span>
                </div>
                <div>
                  <span className="label">Họ và tên: </span>
                  <span>{user.full_name}</span>
                </div>
                <div>
                  <span className="label">Giới tính: </span>
                  <span>{user.gender}</span>
                </div>
                <div>
                  <span className="label">Email: </span>
                  <span>{user.email}</span>
                </div>
                <div>
                  <span className="label">Công việc: </span>
                  <span>{user.job}</span>
                </div>
                <div>
                  <span className="label">Ngày tạo: </span>
                  <span>{new Date(user.created_at).toLocaleDateString('vi-VN')}</span>
                </div>
              </div>

              <div className="stats-card">
                <div className="stats-grid">
                  <div>
                    <span className="label">Dự án đang hoạt động:</span>
                    <span>{projectStats.active}</span>
                  </div>
                  <div>
                    <span className="label">Dự án đã hoàn thành:</span>
                    <span>{projectStats.completed}</span>
                  </div>
                  <div>
                    <span className="label">Tổng số dự án:</span>
                    <span>{projectStats.active + projectStats.completed}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="projects-section">
              <h3>Các dự án tham gia</h3>
              <div className="projects-list">
                {projects.map((project) => (
                  <div key={project.id} className="project-item">
                    <span>{project.name}</span>
                    <div className="project-actions">
                      <span className="project-status">
                        {project.status === 'active' ? 'Đang hoạt động' : 'Đã hoàn thành'}
                      </span>
                      <button 
                        onClick={() => navigate(`/${ROUTERS.ADMIN.PROJECT}/${project.id}`)} 
                        className="view-details"
                      >
                        Xem chi tiết
                      </button>
                    </div>
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