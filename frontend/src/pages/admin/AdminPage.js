
import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../../components/SlideBar';
import TopBar from '../../components/Nav/TopBar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import projectListApi from '../../api/ApiAdmin/ProjectList';
import userAPI from '../../api/userApi';
import HelpPageAdmin from './helpPage/HelpPageAdmin'
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import './style/AdminPage.scss';

const AdminPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [monthlySignups, setMonthlySignups] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await userAPI.getAllUsers();
        setUsers(usersResponse || []);
        const projectsResponse = await projectListApi.getAllProjects();
        setProjects(projectsResponse || []);
        
        // Process monthly signup data
        const monthlyData = processMonthlyData(usersResponse || [], 'created_at');
        setMonthlySignups(monthlyData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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

  const stats = useMemo(() => {
    return [
      { 
        title: 'Tổng số người dùng', 
        count: users.length,
        onClick: () => navigate('/admin/users')
      },
      { 
        title: 'Tổng số dự án', 
        count: projects.length,
        onClick: () => navigate('/admin/projects')
      }
    ];
  }, [navigate, users.length, projects.length]);

  const genderData = useMemo(() => {
    const maleCount = users.filter(user => user.gender === 'nam').length;
    const femaleCount = users.filter(user => user.gender === 'nữ').length;
    return [
      { name: 'Nam', value: maleCount },
      { name: 'Nữ', value: femaleCount }
    ];
  }, [users]);

  const COLORS = ['#8884d8', '#82ca9d'];

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        
        <div className="admin-content">
          <h1 className="page-title">Trang Quản Trị</h1>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="stat-card" 
                onClick={stat.onClick}
                style={{ cursor: 'pointer' }}
              >
                <p className="stat-card__title">{stat.title}</p>
                <p className="stat-card__count">{stat.count}</p>
              </div>
            ))}
          </div>

          <div className="charts-grid">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Phân bố giới tính</h2>
              </div>
              <div className="card-content chart-container">
                <PieChart width={300} height={300}>
                  <Pie
                    data={genderData}
                    cx={150}
                    cy={150}
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Số lượng người dùng đăng ký theo tháng</h2>
              </div>
              <div className="card-content chart-container">
                <LineChart width={500} height={300} data={monthlySignups}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#818cf8" name="Số lượng đăng ký" />
                </LineChart>
              </div>
            </div>
          </div>
        </div>
        <div className="table-help">
          <HelpPageAdmin />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminPage;