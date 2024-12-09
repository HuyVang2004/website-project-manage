import { memo } from "react";
import './styles.scss'
import Sidebar from "../../../components/SlideBar";
import TopBar from "../../../components/topBar";
import Footer from "../../../components/Footer";
import { useState, useEffect } from "react";



const ProfilePage = () => {
    
    const [isProject, setIsProject] = useState(false);
    const project = () => {
        setIsProject(!isProject)
    };
    useEffect(() => {
        const handleScroll = () => {
          setScrolled(window.scrollY > 50); // Khi cuộn xuống hơn 50px, thay đổi trạng thái
        };
    
        window.addEventListener("scroll", handleScroll); // Lắng nghe sự kiện cuộn trang
        return () => {
          window.removeEventListener("scroll", handleScroll); // Dọn dẹp sự kiện khi component unmount
        };
      }, []);
    return (
            <div className="dashboard">
                {/* sdsadsads*/ }
                <Sidebar />
                <div className="main-content">
                    <TopBar />
                    <div className="header">
                        <div className="row">
                            <div className=" header-left ">
                                <div className="title"> Danh sách dự án</div>
                                <div className="project-list">
                                    <div className="project-item">Dự án thứ nhất </div>
                                </div>
                            </div>
                            <div className="header-right" a role="button" tabIndex={0}>
                                <div className={`project ${isProject ? 'open' :''}`} onClick={project}>
                                    <div className="newproject">Tạo dự án mới </div>
                                    {isProject && (
                                        
                                        <div className="new_project">Tạo Dự Án Mới</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <Footer />  
            </div>
    )
};
export default memo(ProfilePage);