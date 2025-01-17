import { memo } from "react";
import TopBar from '../../../components/Nav/TopBar'; 
import Footer from '../../../components/Footer'; 
import Profile from "../../../components/Profile/Profile";
import SlideBar from "../../../components/SlideBar";

const ProfilePage = () => {
  const userData = JSON.parse(localStorage.getItem("user_profile") || "{}");
  const userId = userData?.user_id || "";
  return (
    <div className="dashboard">
        {/* Sidebar Component */}
        <SlideBar />
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
