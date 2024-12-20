import { memo } from "react";
import Sidebar from '../../../components/SlideBar'; 
import TopBar from '../../../components/Nav/topBar'; 
import Footer from '../../../components/Footer'; 
import PersonalInformation from "../../../components/Profile/SettingUserComponent";
import './PersonalInfomationPage.scss';
const PersonalInfomationPage = () => {
    return (
        <div className="dashboard">
            {/* Sidebar Component */}
            <Sidebar />
            <TopBar />
            {/* Main Content */}
            <div className="main-content">
            
            <div className="personal-container">
                <PersonalInformation></PersonalInformation>
            </div>
            </div>
            {/* Footer Component */}
            <Footer />
        </div>
      );
};

export default memo(PersonalInfomationPage)