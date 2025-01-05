import { memo } from "react";
import Slidebar from '../../components/SlideBar'; 
import TopBar from '../../components/Nav/TopBar'; 
import Footer from '../../components/Footer'; 
import '../../styles/pages/HomePage.scss';
import TableListProject from "../../components/Table/TableListProject";
import TableListTask from "../../components/Table/TableListTask";
import MyCalendar from "../../components/Calendar/Calendar";
const HomePage = () => {
  const stats = [
    { title: 'Số dự án đang làm', count: 0 },
    { title: 'Số công việc đang làm', count: 0 },  
    { title: 'Số dự án đã làm', count: 0 },
    { title: 'Số công việc đã làm', count: 0 }
  ];
  const listProject = [
    { project: "Cloud Infrastructure Setup", progress: 100, dueDate: "2025-11-11", status: "Đang thực hiện" },
    { project: "Database Migration", progress: 52, dueDate: "2025-03-09", status: "Chờ phê duyệt" },
    { project: "UI/UX Overhaul", progress: 56, dueDate: "2025-01-19", status: "Đang thực hiện" },
    { project: "Landing Page Redesign", progress: 60, dueDate: "2025-08-21", status: "Đang thực hiện" },
    { project: "Cloud Infrastructure Setup", progress: 49, dueDate: "2025-04-20", status: "Chờ phê duyệt" },
    { project: "Database Migration", progress: 65, dueDate: "2025-08-15", status: "Chưa bắt đầu" },
    { project: "E-commerce Platform", progress: 80, dueDate: "2025-12-14", status: "Chờ phê duyệt" },
    { project: "SEO Optimization", progress: 29, dueDate: "2025-01-16", status: "Hoàn thành" },
    { project: "Database Migration", progress: 13, dueDate: "2024-12-29", status: "Đang thực hiện" },
    { project: "Content Marketing Strategy", progress: 81, dueDate: "2025-08-06", status: "Đang gặp vấn đề" },
    { project: "Content Marketing Strategy", progress: 33, dueDate: "2024-12-20", status: "Đang gặp vấn đề" },
    { project: "Content Marketing Strategy", progress: 61, dueDate: "2025-03-17", status: "Đang thực hiện" },
    { project: "Mobile App Development", progress: 24, dueDate: "2025-07-13", status: "Chờ phê duyệt" },
    { project: "Social Media Campaign", progress: 68, dueDate: "2025-08-02", status: "Chưa bắt đầu" },
    { project: "Cloud Infrastructure Setup", progress: 19, dueDate: "2025-08-24", status: "Chờ phê duyệt" },
    { project: "Database Migration", progress: 14, dueDate: "2025-03-06", status: "Chưa bắt đầu" },
    { project: "Cloud Infrastructure Setup", progress: 47, dueDate: "2025-09-13", status: "Đang thực hiện" },
    { project: "SEO Optimization", progress: 15, dueDate: "2025-05-09", status: "Chờ phê duyệt" },
    { project: "UI/UX Overhaul", progress: 55, dueDate: "2025-10-07", status: "Chưa bắt đầu" },
    { project: "Mobile App Development", progress: 17, dueDate: "2025-08-27", status: "Chờ phê duyệt" }
  ];

  const listTask = [
    { task: "Customer Support Platform", priority: "Thấp", dueDate: "2025-01-15", status: "Đang thực hiện" },
    { task: "Database Migration", priority: "Thấp", dueDate: "2025-06-10", status: "Chưa bắt đầu" },
    { task: "Backend System Upgrade", priority: "Thấp", dueDate: "2025-02-07", status: "Chưa bắt đầu" },
    { task: "Marketing Automation", priority: "Cao", dueDate: "2025-04-22", status: "Chờ phê duyệt" },
    { task: "Backend System Upgrade", priority: "Thấp", dueDate: "2025-04-06", status: "Đang thực hiện" },
    { task: "Product Launch", priority: "Cao", dueDate: "2025-05-26", status: "Chưa bắt đầu" },
    { task: "Cloud Infrastructure Setup", priority: "Thấp", dueDate: "2025-06-01", status: "Chưa bắt đầu" },
    { task: "App Performance Optimization", priority: "Cao", dueDate: "2025-02-15", status: "Đang thực hiện" },
    { task: "Security Patch Deployment", priority: "Cao", dueDate: "2025-03-14", status: "Đang thực hiện" },
    { task: "E-commerce Platform", priority: "Thấp", dueDate: "2025-03-28", status: "Chờ phê duyệt" },
    { task: "UI/UX Overhaul", priority: "Thấp", dueDate: "2025-02-16", status: "Chờ phê duyệt" },
    { task: "Website Speed Improvement", priority: "Cao", dueDate: "2025-06-12", status: "Chờ phê duyệt" },
    { task: "Customer Support Platform", priority: "Cao", dueDate: "2025-02-03", status: "Chưa bắt đầu" },
    { task: "Database Migration", priority: "Thấp", dueDate: "2024-12-28", status: "Chưa bắt đầu" },
    { task: "Social Media Campaign", priority: "Thấp", dueDate: "2025-01-01", status: "Đang thực hiện" },
    { task: "App Performance Optimization", priority: "Thấp", dueDate: "2025-04-18", status: "Đang gặp vấn đề" },
    { task: "Security Patch Deployment", priority: "Thấp", dueDate: "2025-04-22", status: "Đang gặp vấn đề" },
    { task: "Product Launch", priority: "Cao", dueDate: "2025-04-22", status: "Chưa bắt đầu" },
    { task: "Customer Support Platform", priority: "Cao", dueDate: "2025-03-24", status: "Chưa bắt đầu" },
    { task: "Cloud Infrastructure Setup", priority: "Trung bình", dueDate: "2025-02-11", status: "Chưa bắt đầu" }
  ];
  
  
  return (
    <div className="dashboard">
      {/* Sidebar Component */}
      <TopBar />
      <Slidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* TopBar Component */}
        

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
            <MyCalendar tasks={listTask}></MyCalendar>
          </div>
        </div>

        {/* My Projects */}
        <div className="card projects">
          <div className="card__header">
            <h2 className="card__title">Dự án của tôi</h2>
          </div>
          <TableListProject data={listProject}></TableListProject>
        </div>

        <div className="card tasks">
          <div className="card__header">
            <h2 className="card__title">Công việc của tôi</h2>
          </div>
          <TableListTask data={listTask}></TableListTask>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
    
  );
};

export default memo(HomePage);
