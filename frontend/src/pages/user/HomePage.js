import { memo } from "react";
import Sidebar from '../../components/SlideBar'; 
import TopBar from '../../components/topBar'; 
import Footer from '../../components/Footer'; 
import '../../styles/pages/AdminPage.scss';

const HomePage = () => {
  const stats = [
    { title: 'Số dự án đang làm', count: 0 },
    { title: 'Số công việc đang làm', count: 0 },
    { title: 'Số dự án đã làm', count: 0 },
    { title: 'Số công việc đã làm', count: 0 }
  ];

  return (
    <div className="dashboard">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* TopBar Component */}
        <TopBar />

        <div className="header">
          <h1 className="header__title">Xin chào,</h1>

          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <p className="stat-card__title">{stat.title}</p>
                <p className="stat-card__count">{stat.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Sections */}
        <div className="info-grid">
          {/* Announcements */}
          <div className="card">
            <div className="card__header">
              <h2 className="card__title">Thông báo mới nhất</h2>
            </div>
            <div className="card__content">
              {/* Add content for announcements here */}
            </div>
          </div>

          {/* Calendar */}
          <div className="card">
            <div className="card__header">
              <h2 className="card__title">Lịch</h2>
            </div>
            <div className="card__content">
              <p>Tạo lịch, đánh dấu các thời gian quan trọng</p>
            </div>
          </div>
        </div>

        {/* My Projects */}
        <div className="card projects">
          <div className="card__header">
            <h2 className="card__title">Dự án của tôi</h2>
          </div>
          <div className="card__content">
            <p>Liệt kê danh sách dự án tham gia: tên dự án, thành viên, tiến độ, ngày hết hạn</p>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default memo(HomePage);
