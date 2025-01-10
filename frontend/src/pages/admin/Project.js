import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ROUTERS } from '../../utils/router';
import projectsApi from '../../api/projects/projectsApi';
import Sidebar from '../../components/SlideBar';
import TopBar from '../../components/Nav/TopBar';
import Footer from '../../components/Footer';
import './style/Project.scss';

const Project = () => {
  const navigate = useNavigate();
  const { project } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectsApi.getAllProjects({ skip: 0, limit: 100 });
        
        if (isMounted) {
          // Kiểm tra data trực tiếp vì axiosClient đã xử lý response.data
          if (Array.isArray(data)) {
            console.log('Projects data:', data);
            setProjects(data);
          } else {
            console.error('Invalid data format:', data);
            setError('Định dạng dữ liệu không hợp lệ');
            setProjects([]);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching projects:', err);
          setError('Có lỗi xảy ra khi tải danh sách dự án');
          setProjects([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  // Get current project details using project_name
  const currentProject = project 
    ? projects.find(p => p.project_name === decodeURIComponent(project))
    : null;

  if (loading) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="main-content">
          <TopBar />
          <div className="project-container">
            <div className="loading">Đang tải dữ liệu...</div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <Sidebar />
        <div className="main-content">
          <TopBar />
          <div className="project-container">
            <div className="error">{error}</div>
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
        <div className="project-container">
          {!project ? (
            <>
              <h2>Danh sách dự án</h2>
              {projects && projects.length > 0 ? (
                <div className="projects-grid">
                  {projects.map((projectItem) => (
                    <Link 
                      key={projectItem.project_id}
                      to={`/${ROUTERS.ADMIN.PROJECT}/${encodeURIComponent(projectItem.project_name)}`}
                      className="project-card"
                    >
                      <h3>{projectItem.project_name}</h3>
                      <div className="project-stats">
                        <p>Trạng thái: {projectItem.status}</p>
                        <p>Ngân sách: {projectItem.budget?.toLocaleString()} VND</p>
                        <p>Người tạo: {projectItem.created_by}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div>Không có dự án nào</div>
              )}
            </>
          ) : (
            <>
              <div className="project-detail-container">
                <Link to={`/${ROUTERS.ADMIN.PROJECT}`} className="back-button">
                  ← Quay lại
                </Link>
                
                {currentProject ? (
                  <div className="project-header">
                    <h2>{currentProject.project_name}</h2>
                    <div className="project-info">
                      <p>Mô tả: {currentProject.description || 'Không có mô tả'}</p>
                      <p>Trạng thái: {currentProject.status}</p>
                      <p>Ngân sách: {currentProject.budget?.toLocaleString()} VND</p>
                      <p>Ngày bắt đầu: {new Date(currentProject.start_date).toLocaleDateString('vi-VN')}</p>
                      <p>Ngày kết thúc: {new Date(currentProject.end_date).toLocaleDateString('vi-VN')}</p>
                      <p>Người tạo: {currentProject.created_by}</p>
                      {currentProject.target && <p>Mục tiêu: {currentProject.target}</p>}
                    </div>
                  </div>
                ) : (
                  <div>Không tìm thấy thông tin dự án</div>
                )}
              </div>
            </>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Project;