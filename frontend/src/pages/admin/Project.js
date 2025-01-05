import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ROUTERS } from '../../utils/router';
import { users } from './data/UserData';
import Sidebar from '../../components/SlideBar';
import TopBar from '../../components/Nav/TopBar';
import Footer from '../../components/Footer';
import './style/Project.scss';

const Project = () => {
  const navigate = useNavigate();
  const { project } = useParams();
  
  // Get unique projects
  const allProjects = [...new Set(users.flatMap(user => user.project))].sort();
  
  // Get users for current project if project is selected
  const projectUsers = project 
    ? users.filter(user => user.project.includes(project))
    : [];

  const handleUserClick = (user) => {
    navigate(`/${ROUTERS.ADMIN.USERDETAILS.replace(':id', user.id)}`, { state: { user } });
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="project-container">
          {!project ? (
            // Project List View
            <>
              <h2>Danh sách dự án</h2>
              <div className="projects-grid">
                {allProjects.map((projectName) => (
                  <Link 
                    key={projectName}
                    to={`/${ROUTERS.ADMIN.PROJECT}/${projectName}`}
                    className="project-card"
                  >
                    <h3>Dự án {projectName}</h3>
                    <div className="project-stats">
                      <span>
                        {users.filter(user => user.project.includes(projectName)).length} thành viên
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            // Project Detail View
            <>
              <div className="project-detail-container">
            <Link to={`/${ROUTERS.ADMIN.PROJECT}`} className="back-button">
                ← Quay lại
            </Link>
            
            <div className="project-header">
                <h2>
                Dự án {project}
                <span className="member-count">
                    ({projectUsers.length} thành viên)
                </span>
                </h2>
            </div>
            </div>
              <div className="project-details">
                <h3>Danh sách thành viên dự án </h3>
                <div className="users-grid">
                  {projectUsers.map((user) => (
                    <div
                      key={user.id}
                      className="user-card"
                      onClick={() => handleUserClick(user)}
                    >
                      <div className="user-info">
                        <h4>{user.name}</h4>
                        <p>{user.phone}</p>
                        <p>{user.email}</p>
                        <p className={`status ${user.status === 'Hoạt động' ? 'active' : 'locked'}`}>
                          {user.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
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