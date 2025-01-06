import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { users } from './data/UserData';
import Sidebar from '../../components/SlideBar';
import TopBar from '../../components/Nav/TopBar';
import Footer from '../../components/Footer';
import './style/Statistics.scss';

const UserAnalytics = () => {
  const processSignupData = () => {
    const monthlySignups = Array(12).fill(0);
    users.forEach(user => {
      if (user.signup) {
        const [day, month] = user.signup.split('/');
        monthlySignups[parseInt(month) - 1]++;
      }
    });

    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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

    return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      .map((month, index) => ({
        name: month,
        logins: monthlyLogins[index]
      }));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-auto">
          <div className="analytics-container">
            <div className="chart-wrapper">
              <h2>Số lượng người dùng đăng ký theo tháng</h2>
              <div className="chart-content">
                <LineChart width={900} height={400} data={processSignupData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="signups"
                    stroke="#8884d8"
                    name="Số lượng đăng ký"
                    strokeWidth={2}
                  />
                </LineChart>
              </div>
            </div>
  
            <div className="chart-wrapper">
              <h2>Thống kê đăng nhập cuối theo tháng</h2>
              <div className="chart-content">
                <LineChart width={900} height={400} data={processLoginData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="logins"
                    stroke="#82ca9d"
                    name="Số lượng đăng nhập"
                    strokeWidth={2}
                  />
                </LineChart>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UserAnalytics;