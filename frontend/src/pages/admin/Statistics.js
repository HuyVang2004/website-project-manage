import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import userAPI from '../../api/userApi';
import taskAPI from '../../api/ApiAdmin/TaskApi';
import projectListApi from '../../api/ApiAdmin/ProjectList';
import Sidebar from '../../components/SlideBar';
import TopBar from '../../components/Nav/TopBar';
import Footer from '../../components/Footer';
import './style/Statistics.scss';

const UserAnalytics = () => {
  const [monthlyData, setMonthlyData] = useState({
    signups: [],
    lastLogins: []
  });
  const [projectProgress, setProjectProgress] = useState([]);
  const [taskStatusData, setTaskStatusData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAndProcessUserData();
    fetchAllProjectsAndTasks();
    fetchTaskStatusDistribution();
  }, []);

  const processMonthlyData = (users, dateField) => {
    const monthlyCount = Array(12).fill(0);
    const months = [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 
      'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
      'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];
    
    users.forEach(user => {
      if (user[dateField]) {
        const date = new Date(user[dateField]);
        if (!isNaN(date.getTime())) {
          const month = date.getMonth();
          monthlyCount[month]++;
        }
      }
    });

    return months.map((month, index) => ({
      name: month,
      value: monthlyCount[index]
    }));
  };

  const fetchAndProcessUserData = async () => {
    try {
      const response = await userAPI.getAllUsers();
      const userData = response.data || response;
      const processedData = processMonthlyData(userData, 'created_at');
      
      setMonthlyData({
        signups: processedData,
        lastLogins: processedData
      });
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const fetchAllProjectsAndTasks = async () => {
    try {
      const projectsResponse = await projectListApi.getAllProjects();
      const projects = projectsResponse.data || projectsResponse;

      const progressData = await Promise.all(
        projects.map(async (project) => {
          try {
            const tasksResponse = await taskAPI.getTasksByProjectId(project.project_id);
            const tasks = tasksResponse.data || tasksResponse;

            const totalTasks = tasks.length;
            const inProgressTasks = tasks.filter(task => 
              task.status === "Đang tiến hành"
            ).length;

            const progress = totalTasks > 0 
              ? Math.round((inProgressTasks / totalTasks) * 100)
              : 0;

            return {
              name: project.project_name,
              progress: progress
            };
          } catch (error) {
            console.error(`Error fetching tasks for project ${project.project_id}:`, error);
            return {
              name: project.project_name,
              progress: 0
            };
          }
        })
      );

      setProjectProgress(progressData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchTaskStatusDistribution = async () => {
    try {
      const projectsResponse = await projectListApi.getAllProjects();
      const projects = projectsResponse.data || projectsResponse;

      let totalTasks = 0;
      let inProgressCount = 0;
      let notStartedCount = 0;

      await Promise.all(
        projects.map(async (project) => {
          try {
            const tasksResponse = await taskAPI.getTasksByProjectId(project.project_id);
            const tasks = tasksResponse.data || tasksResponse;

            totalTasks += tasks.length;
            inProgressCount += tasks.filter(task => task.status === "Đang tiến hành").length;
            notStartedCount += tasks.filter(task => task.status === "Chưa bắt đầu").length;
          } catch (error) {
            console.error(`Error fetching tasks for project ${project.project_id}:`, error);
          }
        })
      );

      const statusData = [
        {
          name: "Đang tiến hành",
          percentage: totalTasks > 0 ? Math.round((inProgressCount / totalTasks) * 100) : 0
        },
        {
          name: "Chưa bắt đầu",
          percentage: totalTasks > 0 ? Math.round((notStartedCount / totalTasks) * 100) : 0
        }
      ];

      setTaskStatusData(statusData);
    } catch (error) {
      console.error('Error fetching task status distribution:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="main-container">
      <Sidebar />
      <div className="content-wrapper">
        <TopBar />
        <div className="analytics-container">
          <div className="charts-grid">
            {/* Project Progress Chart */}
            <div className="chart-wrapper">
              <h2>Tiến độ hoàn thành của các dự án (%)</h2>
              <div className="chart-content">
                <BarChart width={500} height={300} data={projectProgress}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="progress" fill="#818cf8" name="Tiến độ (%)" />
                </BarChart>
              </div>
            </div>

            {/* Monthly Signups Chart */}
            <div className="chart-wrapper">
              <h2>Số lượng người dùng đăng ký theo tháng</h2>
              <div className="chart-content">
                <LineChart width={500} height={300} data={monthlyData.signups}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#818cf8" name="Số lượng đăng ký" />
                </LineChart>
              </div>
            </div>

            {/* Monthly Last Logins Chart */}
            <div className="chart-wrapper">
              <h2>Thống kê đăng nhập cuối theo tháng</h2>
              <div className="chart-content">
                <LineChart width={500} height={300} data={monthlyData.lastLogins}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#818cf8" name="Số lượng đăng nhập cuối" />
                </LineChart>
              </div>
            </div>

            {/* Task Status Distribution Chart */}
            <div className="chart-wrapper">
              <h2>Tỉ lệ trạng thái công việc (%)</h2>
              <div className="chart-content">
                <BarChart width={500} height={300} data={taskStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="percentage" fill="#34d399" name="Tỉ lệ (%)" />
                </BarChart>
              </div>
            </div>
          </div>
        </div>
        <Footer className="footer" />
      </div>
    </div>
  );
};

export default UserAnalytics;