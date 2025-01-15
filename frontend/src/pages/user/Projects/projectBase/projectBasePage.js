import { memo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './projectBasePage.scss';
import Sidebar from "../../../../components/SlideBar";
import TopBar from "../../../../components/Nav/TopBar";
import Footer from "../../../../components/Footer";
import getListProjectData from "../../../../api/projects/getListProjectData";
import projectsApi from "../../../../api/projects/projectsApi";
import { ROUTERS } from "../../../../utils/router";
import userAPI from "../../../../api/userApi";
import projectTeamApi from "../../../../api/projects/projectTeamApi";
import notificationsAPI from "../../../../api/notificationsAPI";


const ProjectBasePage = () => {
    
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [newProject, setNewProject] = useState({
        projectName: '',
        startDate: '',
        endDate: '',
        description: '',
        memberEmail: '',
        memberRole: 'Thành viên'
    });

    
    const userData = JSON.parse(localStorage.getItem("user_profile") || "{}");
    const userId = userData?.user_id || "";
    const userMail = userData?.email || "";
    const userName = userData.username;

    const [members, setMembers] = useState([
        {email: userMail,
         role : "Quản lý"
        },
    ]);

    const projectsPerPage = 4;
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                if (!userId) throw new Error("User ID not found");

                const data = await getListProjectData(userId);
                setProjects(data);
            } catch (error) {
                setError(error.message);
                setProjects([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProject(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddMember = async () => {
        if (newProject.memberEmail && newProject.memberRole) {
            setMembers(prev => [...prev, {
                email: newProject.memberEmail,
                role: newProject.memberRole
            }]);

            setNewProject(prev => ({
                ...prev,
                memberEmail: '',
                memberRole: 'member'
            }));
          
        }
        console.log("add member", members);
    };

    const handleRemoveMember = (email) => {
        setMembers(prev => prev.filter(member => member.email !== email));
    };

    const saveMemberToDatabase = async (member, project) => {
        console.log('member', member);
        try {
            const userInfo = await userAPI.getUserInfoEmail(member.email);
            console.log("data", {
                user_id: userInfo.user_id, 
                project_id: project.project_id,
                role: member.role,
            });

            const responseNotifi = await notificationsAPI.createNotification({
                user_id: userInfo.user_id,
                message: `${userName} đã thêm bạn vào dự án ${project.name}`
            })

            const response = await projectTeamApi.createProjectTeam({
                user_id: userInfo.user_id, 
                project_id: projectId,
                role: member.role,
            });

        } catch (error) {
            console.error(`Error saving member ${member.email}: ${error.message}`);
        }
    };

    const handleCreateProject = async () => {
        const projectData = {
            project_name: newProject.projectName,
            description: newProject.description,
            start_date: newProject.startDate,
            end_date: newProject.endDate,
            // status: "pending", // xóa 
            created_by: userId,
            // target: "default", // xóa
        };

        
        try {
            const response = await projectsApi.createProject(projectData);
            const promises = members.map((member) => 
                saveMemberToDatabase(member, response.project_id)
            );
            await Promise.all(promises);
    
            // setProjects(prev => [...prev, response]); // Thêm dự án mới vào danh sách
            setIsModalOpen(false);

            setNewProject({
                projectName: '',
                startDate: '',
                endDate: '',
                description: '',
                memberEmail: '',
                memberRole: 'Thành viên'
            });
            setMembers([
                {email: userMail,
                role : "Quản lý"
               }]);
            
            // const data = getProjectData(response.project_id);
            // setProjects(prev => [...prev, data]);

            const data = await getListProjectData(userId);
            setProjects(data);
            // console.log("data", projects);
            alert("Dự án đã được tạo thành công!");
        } catch (error) {
            alert(`Có lỗi xảy ra: ${error.message}`);
        }
    };

    const handleClickProject = (project) => {
        navigate(`${ROUTERS.USER.PROJECT.PROJECTDETAILS}/${project.projectId}`, { state: { projectData: project } });
    };

    const renderPagination = () => {
        return (
            <div className="pagination">
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={currentPage === i + 1 ? 'active' : ''}
                    >
                        {i + 1}
                    </button>
                ))}
                <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        );
    };

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
                            <button 
                                className="newproject"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Tạo dự án mới
                            </button>
                        </div>
                    </div>

                    {isModalOpen && (
                        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                            <div className="new_project" onClick={e => e.stopPropagation()}>
                                <div className="modal-header">
                                    <h3>Tạo dự án mới</h3>
                                    <button 
                                        className="close-btn"
                                        onClick={() => setIsModalOpen(false)}
                                        aria-label="Close"
                                    >
                                        ×
                                    </button>
                                </div>
                                <div className="input_project">
                                    <div className="form-group">
                                        <label htmlFor="projectName">Tên dự án:</label>
                                        <input
                                            type="text"
                                            id="projectName"
                                            name="projectName"
                                            className="name_project"
                                            value={newProject.projectName}
                                            onChange={handleInputChange}
                                            placeholder="Nhập tên dự án"
                                        />
                                    </div>

                                    <div className="form-group date-group">
                                        <div className="date-item">
                                            <label htmlFor="startDate">Thời gian bắt đầu:</label>
                                            <input
                                                type="date"
                                                id="startDate"
                                                name="startDate"
                                                className="name_project"
                                                value={newProject.startDate}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="date-item">
                                            <label htmlFor="endDate">Thời gian kết thúc:</label>
                                            <input
                                                type="date"
                                                id="endDate"
                                                name="endDate"
                                                className="name_project"
                                                value={newProject.endDate}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Mô tả:</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            className="name_project"
                                            value={newProject.description}
                                            onChange={handleInputChange}
                                            placeholder="Nhập mô tả"
                                        />
                                    </div>
                                    <div className="form-group members-group">
                                        <label>Thêm thành viên:</label>
                                        <div className="add-member">
                                            <input
                                                type="email"
                                                name="memberEmail"
                                                className="name_project"
                                                value={newProject.memberEmail}
                                                onChange={handleInputChange}
                                                placeholder="Email"
                                            />
                                            <select
                                                name="memberRole"
                                                className="name_project role-select"
                                                value={newProject.memberRole}
                                                onChange={handleInputChange}
                                            >
                                                <option value="Thành viên">Thành viên</option>
                                                <option value="Quản lý">Quản lý</option>
                                                {/* <option value="customer">Khách hàng</option> */}
                                            </select>
                                            <button 
                                                className="add-member-btn"
                                                onClick={handleAddMember}
                                            >
                                                Add
                                            </button>
                                        </div>
                                        <div className="members-list">
                                            {members.map((member, index) => (
                                                <div key={index} className="member-item">
                                                    <span className="member-info">
                                                        {member.email} <span className="member-role">({member.role})</span>
                                                    </span>
                                                    <button 
                                                        onClick={() => handleRemoveMember(member.email)}
                                                        className="remove-member"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="form-buttons">
                                        <button 
                                            className="create-btn"
                                            onClick={handleCreateProject}
                                        >
                                            Create
                                        </button>
                                        <button 
                                            className="delete-btn"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="project-list">
                        {loading ? (
                            <p>Loading projects...</p>
                        ) : error ? (
                            <p className="error">{error}</p>
                        ) : (
                            <>
                                {projects.map((project) => (
                                    <div 
                                        key={project.projectId}
                                        className="project-card"
                                        onClick={() => handleClickProject(project)}
                                    >
                                        <div className="project-card-content">
                                            <div className="project-image">
                                                <img 
                                                    src={project.image} 
                                                    alt={`${project.projectName} Image`} 
                                                />
                                            </div>
                                            <div className="project-info">
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
                                                        {project.teamMembers.slice(0, 3).map((member, index) => (
                                                            <img 
                                                                key={index}
                                                                src={member.avatar}
                                                                alt={member.name}
                                                                title={member.name}
                                                                className="team-avatar"
                                                            />
                                                        ))}
                                                        {project.teamMembers.length > 3 && (
                                                            <span className="more-members">
                                                                +{project.teamMembers.length - 3}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {renderPagination()}
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default memo(ProjectBasePage);