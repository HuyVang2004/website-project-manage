import { memo } from "react";
import Sidebar from '../../../components/SlideBar'; 
import TopBar from '../../../components/Nav/topBar'; 
import Footer from '../../../components/Footer'; 
import Profile from "../../../components/Profile/Profile";

const ProfilePage = () => {
  const user = {
    avatar: "https://via.placeholder.com/150",
    name: "Nguyễn Văn A",
    phone: "0987654321",
    email: "nguyenvana@gmail.com",
    gender: "Nam",
    job: "Giáo viên",
    address: "Đà Nẵng",
    description: "Một người yêu công nghệ và sáng tạo."
  };

  return (
    <div className="dashboard">
        {/* Sidebar Component */}
        <Sidebar />

        {/* Main Content */}
        <div className="main-content">
        {/* TopBar Component */}
        <TopBar />
        <div className="profile-container">
            <Profile user={user}/> 
        </div>
        {/* Footer Component */}
        </div>
        <Footer />
    </div>
  );
};

export default memo(ProfilePage);
