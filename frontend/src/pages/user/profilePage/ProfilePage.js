import { memo } from "react";
import Sidebar from '../../../components/SlideBar'; 
import TopBar from '../../../components/Nav/TopBar'; 
import Footer from '../../../components/Footer'; 
import Profile from "../../../components/Profile/Profile";

const ProfilePage = () => {
  const userData = JSON.parse(localStorage.getItem("user_profile") || "{}");
  const userId = userData?.user_id || "";
  return (
    <div className="dashboard">
        {/* Sidebar Component */}
        <Sidebar />
        <TopBar />
        {/* Main Content */}
        <div className="main-content">
          <div className="profile-container">
              <Profile userId={userId}/> 
          </div>
        {/* Footer Component */}
        </div>
        <Footer />
    </div>
  );
};

export default memo(ProfilePage);
