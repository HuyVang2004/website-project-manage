import { memo } from "react";
import Sidebar from '../../../components/SlideBar'; 
import TopBar from "../../../components/Nav/TopBar";
import Footer from '../../../components/Footer'; 
import ChangePassword from "../../../components/Profile/ChangePassword";
import './ChangePasswordPage.scss';

const user = {
    id : "07e4797a-9cab-463b-8938-75a00bc2fde9",
    name: "Phạm Hữu Vang",
    email: "vpham0838@gmail.com",
    avatar: "C:/Users/User/website-project-manage/frontend/public/images/image.png",
    password: "$2b$12$f4vQoqpbYG6Qkytie1zi4O.nSVeloUUqJqCE8DbAJpjvgfZwIRH1i"
  };
const ChangePasswordPage = () => {
    return (
        <div className="dashboard">
            {/* Sidebar Component */}
            <Sidebar />
            <TopBar />
            {/* Main Content */}
            <div className="main-content">
            
            <div className="change-container">
                <ChangePassword user={user}></ChangePassword>
            </div>
            </div>
            {/* Footer Component */}
            <Footer />
        </div>
      );
};

export default memo(ChangePasswordPage)  