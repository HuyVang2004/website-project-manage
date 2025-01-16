import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTERS } from '../../utils/router';
import projectListApi from '../../api/ApiAdmin/ProjectList';
import Sidebar from '../../components/SlideBar';
import TopBar from '../../components/Nav/TopBar';
import Footer from '../../components/Footer';
import { CalendarDays, Clock, Users, AlertCircle } from 'lucide-react';
import './style/Project.scss';

const Project = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectListApi.getAllProjects();
      const formattedProjects = response.map(project => ({
        id: project.project_id,
        name: project.project_name,
        description: project.description || "Chưa có mô tả",
        startDate: formatDate(project.start_date),
        endDate: project.end_date ? formatDate(project.end_date) : "Chưa xác định",
        totalMembers: project.total_members || 0,
        status: project.status || "Chưa xác định",
        progress: project.progress || 0
      }));
      setProjects(formattedProjects);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Có lỗi xảy ra khi tải danh sách dự án');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Chưa xác định";
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Dự án: {project.name}</h2>
            <button className="close-button" onClick={onClose}>&times;</button>
          </div>
          
          <div className="modal-body">
            <div className="project-info">
              <div className="info-section">
                <h3>Thông tin chung</h3>
                <div className="info-item">
                  <CalendarDays />
                  <div>
                    <span>Ngày bắt đầu</span>
                    <p>{project.startDate}</p>
                  </div>
                </div>
                <div className="info-item">
                  <Clock />
                  <div>
                    <span>Ngày kết thúc</span>
                    <p>{project.endDate}</p>
                  </div>
                </div>
                <div className="info-item">
                  <Users />
                  <div>
                    <span>Số lượng thành viên</span>
                    <p>{project.totalMembers} thành viên</p>
                  </div>
                </div>
              </div>

              <div className="description-section">
                <h3>Mô tả dự án</h3>
                <p>{project.description}</p>
              </div>

              <div className="progress-section">
                <h3>Tiến độ dự án</h3>
                <div className="progress-bar-container">
                  <div className="progress-info">
                    <span>Hoàn thành</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1">
          <TopBar />
          <div className="loading">Loading...</div>
          <Footer />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1">
          <TopBar />
          <div className="error">{error}</div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <TopBar />
        <div className="project-container">
          <div className="project-header">
            <h1>Danh sách dự án</h1>
          </div>
          <div className="projects-grid">
            {projects.map(project => (
              <div 
                key={project.id} 
                className="project-card"
                onClick={() => handleProjectClick(project)}
              >
                <h3>{project.name}</h3>
                <div className="member-count">
                  <Users />
                  <span>{project.totalMembers} thành viên</span>
                </div>
              </div>
            ))}
          </div>

          {isModalOpen && (
            <ProjectModal 
              project={selectedProject} 
              onClose={() => setIsModalOpen(false)} 
            />
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Project;