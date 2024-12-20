import { memo } from "react";
import Sidebar from '../../../components/SlideBar'; 
import TopBar from '../../../components/Nav/topBar'; 
import Footer from '../../../components/Footer'; 
import ChangePassword from "../../../components/Profile/ChangePassword";
import './ChangePasswordPage.scss';

const user = {
    name: "Phạm Hữu Vang",
    email: "vpham0838@gmail.com",
    avatar: "C:/Users/User/website-project-manage/frontend/public/images/image.png"
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