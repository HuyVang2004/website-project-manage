import React from 'react';
import Sidebar from '../../components/SlideBar'; 
import TopBar from '../../components/topBar'; 
import Footer from '../../components/Footer'; 
import '../../styles/pages/AdminPage.scss';

const AdminPage = () => {
  const stats = [
    { title: 'Số dự án mới', count: 0 },
    { title: 'Số người dùng', count: 0 },
    { title: 'Số người dùng dừng sử dụng dịch vụ', count: 0 },
    { title: 'Số lượt truy cập', count: 0 }
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
          <h1 className="header__title">Trang Quản Trị</h1>

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
          {/* User Management */}
          <div className="card">
            <div className="card__header">
              <h2 className="card__title">Các biểu đồ</h2>
            </div>
            <div className="card__content">
              <p>Các biểu đồ phân tích tổng quan</p>
            </div>
          </div>

          {/* Project Management */}
          <div className="card">
            <div className="card__header">
              <h2 className="card__title">Cảnh báo</h2>
            </div>
            <div className="card__content">
              <p>Cảnh báo lỗi hệ thống</p>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="card projects">
          <div className="card__header">
            <h2 className="card__title">Phản hồi từ khách hàng</h2>
          </div>
          <div className="card__content">
            <p>Nhật ký hoạt động của hệ thống, các thay đổi mới nhất</p>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default React.memo(AdminPage);
