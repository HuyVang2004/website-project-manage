import { memo } from "react";
import { Home, FileText, Target, BarChart2, Users, Plus, HelpCircle } from 'lucide-react';
import './styles.scss';

const HomePage = () => {
  const stats = [
    { title: 'Số dự án đang làm', count: 0 },
    { title: 'Số công việc đang làm', count: 0 },
    { title: 'Số dự án đã làm', count: 0 },
    { title: 'Số công việc đã làm', count: 0 }
  ];

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar__icons">
          <Home className="sidebar__icon" />
          <FileText className="sidebar__icon" />
          <Target className="sidebar__icon" />
          <BarChart2 className="sidebar__icon" />
          <Users className="sidebar__icon" />
          <Plus className="sidebar__icon" />
        </div>
        <div className="sidebar__bottom">
          <HelpCircle className="sidebar__icon" />
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
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
    </div>
  );
};

export default memo(HomePage);