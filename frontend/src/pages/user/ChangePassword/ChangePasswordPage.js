import { memo } from "react";
import Sidebar from '../../../components/SlideBar'; 
import TopBar from "../../../components/Nav/TopBar";
import Footer from '../../../components/Footer'; 
import ChangePassword from "../../../components/Profile/ChangePassword";
import './ChangePasswordPage.scss';
import userAPI from "../../../api/userApi";

const ChangePasswordPage = () => {
    return (
        <div className="dashboard">
            {/* Sidebar Component */}
            <Sidebar />
            <TopBar />
            {/* Main Content */}
            <div className="main-content">
            
            <div className="change-container">
                <ChangePassword></ChangePassword>
            </div>
            </div>
            {/* Footer Component */}
            <Footer />
        </div>
      );
};

export default memo(ChangePasswordPage)  