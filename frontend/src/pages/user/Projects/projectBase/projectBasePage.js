import { memo, useState, useEffect } from "react";
import './projectBasePage.scss';
import Sidebar from "../../../../components/SlideBar";
import TopBar from "../../../../components/Nav/TopBar";
import Footer from "../../../../components/Footer";
import getListProjectData from "../../../../api/projects/getListProjectData";
import { ROUTERS } from "../../../../utils/router";
import { useNavigate } from "react-router-dom";

const ProjectBasePage = () => {
    const [isProject, setIsProject] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const toggleProject = () => {
        setIsProject(prev => !prev);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Fetch projects from API
    const userData = JSON.parse(localStorage.getItem("user_profile") || "{}");
    const userId = userData?.user_id || "";
    useEffect(() => {
        const fetchProjects = async (userId) => {
            try {
              const data = await getListProjectData(userId);
              setProjects(data);
            } catch (error) {
              // setError(error.message);
              setProjects([]);
            } finally {
              setLoading(false);
            }
        };

        fetchProjects(userId);
    }, []);

    const handleModalClose = (e) => {
        e.stopPropagation();
        toggleProject();
    };
    const navigate = useNavigate();
    
    const handleClickProject = (project_id) => {
        localStorage.setItem("current_project_id", project_id);
        navigate(ROUTERS.USER.PROJECT.PROJECTDETAILS);
    }

    return (
        <div className={`dashboard ${scrolled ? 'scrolled' : ''}`}>
            <Sidebar />
            <div className="main-content">
                <TopBar />
                <div className="header">
                    <div className="row">
                        <div className="col-6 header-left">
                            <h2 className="title">Danh sách dự án</h2>
                        </div>
                        <div className="col-6 header-right">
                            <div 
                                className={`project ${isProject ? 'open' : ''}`}
                                onClick={toggleProject}
                                role="button" 
                                tabIndex={0}
                            >
                                <div className="newproject">Tạo dự án mới</div>
                                {isProject && (
                                    <div className="modal-overlay" onClick={handleModalClose}>
                                        <div className="new_project" onClick={(e) => e.stopPropagation()}>
                                            <div className="input_project">
                                                <div className="form-group">
                                                    <label htmlFor="projectName">Tên dự án:</label>
                                                    <input type="text" id="projectName" className="name_project" placeholder="Nhập tên dự án" />
                                                </div>
                                                <div className="form-group date-group">
                                                    <div className="date-item">
                                                        <label htmlFor="startDate">Thời gian bắt đầu:</label>
                                                        <input type="date" id="startDate" className="name_project" />
                                                    </div>
                                                    <div className="date-item">
                                                        <label htmlFor="endDate">Thời gian kết thúc:</label>
                                                        <input type="date" id="endDate" className="name_project" />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="description">Mô tả:</label>
                                                    <textarea id="description" className="name_project" placeholder="Nhập mô tả" />
                                                </div>
                                                <div className="form-buttons">
                                                    <button className="create-btn">Create</button>
                                                    <button className="delete-btn">Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="project-list">
                        {loading ? (
                            <p>Loading projects...</p>
                        ) : error ? (
                            <p className="error">{error}</p>
                        ) : (
                            projects.map((project) => (
                                <div key={project.projectID} className="project-card" onClick={handleClickProject}>
                                    <div className="card-header">
                                        <h3 className="project-title">{project.projectName}</h3>
                                        <div className="status">{project.status}</div>
                                    </div>
                                    <p className="project-description">{project.description}</p>
                                    <div className="card-footer">
                                        <span className="deadline">
                                            Deadline: <span className="date">{project.dueDate}</span>
                                        </span>
                                        <div className="team">
                                            {project.teamMembers.map((member, index) => (
                                                <img key={index} src={member.avatar} alt={member.name} />
                                            ))}
                                            {project.teamMembers.length > 3 && (
                                                <span className="more-members">+{project.teamMembers.length - 3}</span>
                                            )}
                                        </div>
                                        {/* <span className="issues">{project.issues} Issues</span> */}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default memo(ProjectBasePage);
