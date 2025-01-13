import { memo } from "react";
import Slidebar from '../../components/SlideBar'; 
import TopBar from '../../components/Nav/TopBar'; 
import Footer from '../../components/Footer'; 
import '../../styles/pages/HomePage.scss';
import TableListProject from "../../components/Table/TableListProject";
import TableListTask from "../../components/Table/TableListTask";
import MyCalendar from "../../components/Calendar/Calendar";
import getListTaskData from "../../api/tasks/getListTaskData";
import React, { useState, useEffect } from 'react';
import getListProjectData from "../../api/projects/getListProjectData";
import projectTeamApi from "../../api/projects/projectTeamApi";
import taskRoleAPI from "../../api/tasks/taskRoleApi";
const HomePage = () => {

  const userData = JSON.parse(localStorage.getItem("user_profile") || "{}");
  const userId = userData?.user_id || "";

  const [stats, setStats] = useState([
    { title: 'Số dự án đang làm', count: 0 },
    { title: 'Số công việc đang làm', count: 0 },
    { title: 'Số dự án đã làm', count: 0 },
    { title: 'Số công việc đã làm', count: 0 },
  ]);

  const fetchStats = async () => {
    try {
      // Gọi các API để lấy dữ liệu
      const [activeProjects, completedProjects, processTasks, completedTasks] = await Promise.all([
        projectTeamApi.getNumActiveProject(userId),
        taskRoleAPI.getNumProcessTask(userId),
        projectTeamApi.getNumCompletedProject(userId),
        taskRoleAPI.getNumCompletedTask(userId),
      ]);

      // Cập nhật state với dữ liệu từ API
      setStats([
        { title: 'Số dự án đang làm', count: activeProjects || 0 },
        { title: 'Số công việc đang làm', count: processTasks || 0 },
        { title: 'Số dự án đã làm', count: completedProjects || 0 },
        { title: 'Số công việc đã làm', count: completedTasks || 0 },
      ]);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  }

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [listProject, setListProject] = useState([]);
  
  // Lấy danh sách công việc của người dùng
  const fetchTasks = async (userId) => {
    try {
      const data = await getListTaskData(userId);
      setTasks(data);
    } catch (error) {
      // setError(error.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // Lấy danh sách dự án của người dùng
  const fetchProjects = async (userId) => {
    try {
      const data = await getListProjectData(userId);
      console.log("data project",data)
      setListProject(data);
    } catch (error) {
      // setError(error.message);
      setListProject([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      setLoading(true);
      fetchTasks(userId);
      fetchProjects(userId);
      fetchStats();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      {/* Sidebar Component */}
      <TopBar />
      <Slidebar />

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
              {/* Add content for announcements here */}
            </div>
          </div>

          {/* Calendar */}
          <div className="card">
            <div className="card__header">
              <h2 className="card__title">Lịch</h2>
            </div>
            <MyCalendar tasks={tasks} />
          </div>
        </div>

        {/* My Projects */}
        <div className="card projects">
          <div className="card__header">
            <h2 className="card__title">Dự án của tôi</h2>
          </div>
          <TableListProject data={listProject} />
        </div>

        {/* My Tasks */}
        <div className="card tasks">
          <div className="card__header">
            <h2 className="card__title">Công việc của tôi</h2>
          </div>
          <TableListTask tasks={tasks} />
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
    
  );
};

export default memo(HomePage);
