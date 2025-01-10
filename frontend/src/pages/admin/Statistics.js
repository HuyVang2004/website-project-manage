
import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { users } from './data/UserData';
import { projects } from './data/ProjectData';
import Sidebar from '../../components/SlideBar';
import TopBar from '../../components/Nav/TopBar';
import Footer from '../../components/Footer';
import './style/Statistics.scss';

const UserAnalytics = () => {
  const processProjectData = () => {
    return projects.map(project => ({
      name: project.name,
      progress: project.progress
    }));
  };

  const processSignupData = () => {
    const monthlySignups = Array(12).fill(0);
    users.forEach(user => {
      if (user.signup) {
        const [day, month] = user.signup.split('/');
        monthlySignups[parseInt(month) - 1]++;
      }
    });

    return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
      .map((month, index) => ({
        name: month,
        signups: monthlySignups[index]
      }));
  };

  const processLoginData = () => {
    const monthlyLogins = Array(12).fill(0);
    users.forEach(user => {
      const date = new Date(user.lastLogin);
      monthlyLogins[date.getMonth()]++;
    });

    return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
      .map((month, index) => ({
        name: month,
        logins: monthlyLogins[index]
      }));
  };

  const processActiveDaysData = () => {
    const daysCount = {
      'Thứ 2': 0,
      'Thứ 3': 0,
      'Thứ 4': 0,
      'Thứ 5': 0,
      'Thứ 6': 0,
      'Thứ 7': 0,
      'CN': 0
    };

    users.forEach(user => {
      if (user.active_days) {
        user.active_days.forEach(day => {
          daysCount[day]++;
        });
      }
    });

    return Object.entries(daysCount).map(([day, count]) => ({
      name: day,
      users: count
    }));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <div className="analytics-container">
        <div className="charts-grid">
          {/* Biểu đồ 1 */}
          <div className="chart-wrapper">
            <h2>Tiến độ hoàn thành của các dự án (%)</h2>
            <BarChart width={400} height={300} data={processProjectData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="progress" fill="#8884d8" />
            </BarChart>
          </div>

          {/* Biểu đồ 2 */}
          <div className="chart-wrapper">
            <h2>Số lượng người dùng đăng ký theo tháng</h2>
            <LineChart width={400} height={300} data={processSignupData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="signups" stroke="#8884d8" />
            </LineChart>
          </div>

          {/* Biểu đồ 3 */}
          <div className="chart-wrapper">
            <h2>Thống kê đăng nhập cuối theo tháng</h2>
            <LineChart width={400} height={300} data={processLoginData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="logins" stroke="#82ca9d" />
            </LineChart>
          </div>

          {/* Biểu đồ 4 */}
          <div className="chart-wrapper">
            <h2>Thống kê số người dùng theo ngày hoạt động</h2>
            <BarChart width={400} height={300} data={processActiveDaysData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>
      </div>
      </div>
      <Footer />
      </div>
    
  );
};

export default UserAnalytics;