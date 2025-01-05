import { memo, useState, useEffect } from "react";
import './styles.scss'
import Sidebar from "../../../components/SlideBar";
import TopBar from "../../../components/topBar"; 
import Footer from "../../../components/Footer";

const ProfilePage = () => {
    const [isProject, setIsProject] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
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
        // Ngăn chặn sự kiện lan rộng (event propagation)
        e.stopPropagation();
        toggleProject();
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
                        <a href="http://localhost:3000/duan/chitiet" className="project-link">
                            <div className="project-card">
                                <div className="card-header">
                                <h3 className="project-title">Dự án A</h3>
                                <div className="status">Completed</div>
                                </div>
                                <p className="project-description">Mô tả ....</p>
                                <div className="card-footer">
                                <span className="deadline">Deadline: <span className="date">05 APRIL 2023</span></span>
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
                        {/* Thêm các card khác tương tự */}
                        <div className="project-card"> 
                        <div className="card-header">
                            <h3 className="project-title">Dự án B</h3>
                            <div className="status">Completed</div>
                            </div>
                            <p className="project-description">Mô tả ....</p>
                            <div className="card-footer">
                            <span className="deadline">Deadline: <span className="date">05 APRIL 2023</span></span>
                            <div className="team">
                                <img src="avatar1.jpg" alt="avatar" />
                                <img src="avatar2.jpg" alt="avatar" />
                                <img src="avatar3.jpg" alt="avatar" />
                                <span className="more-members">+2</span>
                            </div>
                            <span className="issues">14 Issues</span>
                            </div>
                        </div>
                        <div className="project-card">
                        <div className="card-header">
                            <h3 className="project-title">Dự án C</h3>
                            <div className="status">Completed</div>
                            </div>
                            <p className="project-description">Mô tả ....</p>
                            <div className="card-footer">
                            <span className="deadline">Deadline: <span className="date">05 APRIL 2023</span></span>
                            <div className="team">
                                <img src="avatar1.jpg" alt="avatar" />
                                <img src="avatar2.jpg" alt="avatar" />
                                <img src="avatar3.jpg" alt="avatar" />
                                <span className="more-members">+2</span>
                            </div>
                            <span className="issues">14 Issues</span>
                            </div>
                        </div>
                        <div className="project-card">
                        <div className="card-header">
                            <h3 className="project-title">Dự án D</h3>
                            <div className="status">Completed</div>
                            </div>
                            <p className="project-description">Mô tả ....</p>
                            <div className="card-footer">
                            <span className="deadline">Deadline: <span className="date">05 APRIL 2023</span></span>
                            <div className="team">
                                <img src="avatar1.jpg" alt="avatar" />
                                <img src="avatar2.jpg" alt="avatar" />
                                <img src="avatar3.jpg" alt="avatar" />
                                <span className="more-members">+2</span>
                            </div>
                            <span className="issues">14 Issues</span>
                            </div>
                        </div>
                        </div>

                        <div className="pagination">
                        <button className="page-btn">Previous</button>
                        <button className="page-btn active">1</button>
                        <button className="page-btn">2</button>
                        <button className="page-btn">3</button>
                        <button className="page-btn">Next</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default memo(ProfilePage);