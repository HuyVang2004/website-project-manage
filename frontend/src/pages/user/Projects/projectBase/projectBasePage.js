import { memo, useState, useEffect } from "react";
import './projectBasePage.scss'
import Sidebar from "../../../../components/SlideBar";
import TopBar from "../../../../components/Nav/TopBar";
import Footer from "../../../../components/Footer";

const projectBasePage = () => {
    const [isProject, setIsProject] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    // Thêm state cho danh sách dự án và phân trang
    const [projects, setProjects] = useState([
        { id: 1, title: "Dự án A", status: "Completed", description: "Mô tả....", deadline: "05 APRIL 2023" },
        { id: 2, title: "Dự án B", status: "Completed", description: "Mô tả....", deadline: "05 APRIL 2023" },
        { id: 3, title: "Dự án C", status: "Completed", description: "Mô tả....", deadline: "05 APRIL 2023" },
        { id: 4, title: "Dự án D", status: "Completed", description: "Mô tả....", deadline: "05 APRIL 2023" },
        { id: 5, title: "Dự án E", status: "Completed", description: "Mô tả....", deadline: "05 APRIL 2023" },
        { id: 6, title: "Dự án F", status: "Completed", description: "Mô tả....", deadline: "05 APRIL 2023" },
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 4;

    // Tính toán phân trang
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(projects.length / projectsPerPage);
    
    const toggleProject = () => {
        console.log("Current state:");   
        setIsProject(prev => !prev);
    }
    
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleModalClose = (e) => {
        e.stopPropagation();
        toggleProject();
    }

    // Thêm các handlers cho phân trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    // Tạo mảng số trang
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
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
                                                {/* ... (modal-header) */}
                                                <div className="modal-header">
                                                    <h3>Tạo dự án mới</h3>
                                                    <button 
                                                        className="close-btn"
                                                        onClick={handleModalClose}
                                                        aria-label="Close"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                                <div className="input_project"> 
                                                <div className="form-group">
                                                    <label htmlFor="projectName">Tên dự án:</label>
                                                    <input type="text" id="projectName" className="name_project" placeholder="Nhập tên dự án" />
                                                </div>
                                                    <div className="form-group date-group"> {/* Thêm class date-group */}
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
                                                    <div className="form-group members-group"> {/* Thêm class members-group */}
                                                        <label htmlFor="memberEmail">Thêm thành viên:</label>
                                                        <div className="add-member">
                                                            <input type="email" id="memberEmail" className="name_project" placeholder="Email" />
                                                            <select id="memberRole" className="name_project role-select"> {/* Thêm select box */}
                                                                <option value="member">Thành viên</option>
                                                                <option value="manager">Quản lý</option>
                                                                <option value="customer">Khách hàng</option>
                                                            </select>
                                                            <button className="add-member-btn">add</button>
                                                        </div>
                                                        <div className="members-list">
                                                            {/* Hiển thị danh sách thành viên ở đây */}
                                                        </div>
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
                        {currentProjects.map(project => (
                            <a key={project.id} href="http://localhost:3000/duan/chitiet" className="project-link">
                                <div className="project-card">
                                    <div className="card-header">
                                        <h3 className="project-title">{project.title}</h3>
                                        <div className="status">{project.status}</div>
                                    </div>
                                    <p className="project-description">{project.description}</p>
                                    <div className="card-footer">
                                        <span className="deadline">Deadline: <span className="date">{project.deadline}</span></span>
                                        <div className="team">
                                            <img src="avatar1.jpg" alt="avatar" />
                                            <img src="avatar2.jpg" alt="avatar" />
                                            <img src="avatar3.jpg" alt="avatar" />
                                            <span className="more-members">+2</span>
                                        </div>
                                        <span className="issues">14 Issues</span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Cập nhật phần phân trang */}
                    <div className="pagination">
                        <button 
                            className="page-btn" 
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {pageNumbers.map(number => (
                            <button
                                key={number}
                                className={`page-btn ${currentPage === number ? 'active' : ''}`}
                                onClick={() => handlePageChange(number)}
                            >
                                {number}
                            </button>
                        ))}
                        <button 
                            className="page-btn" 
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default memo(projectBasePage);