import React, { useMemo } from 'react';
import { users } from './data/UserData';
import Sidebar from '../../components/SlideBar';
import TopBar from '../../components/topBar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './style/AdminPage.scss';

const AdminPage = () => {
  const navigate = useNavigate();
  
  // Calculate statistics
  const stats = useMemo(() => {
    const activeUsers = users.filter(user => user.status === 'Hoạt động').length;
    const inactiveUsers = users.filter(user => user.status === 'Bị khóa').length;
    const totalUsers = users.length;
    const totalProjects = new Set(users.flatMap(user => user.project)).size;
    return [
      { 
        title: 'Tổng số người dùng', 
        count: totalUsers,
        onClick: () => navigate('/admin/users')
      },
      { 
        title: 'Người dùng đang hoạt động', 
        count: activeUsers,
        onClick: () => navigate('/admin/users', { state: { filter: 'active' }})
      },
      { 
        title: 'Người dùng bị khóa', 
        count: inactiveUsers,
        onClick: () => navigate('/admin/users', { state: { filter: 'inactive' }})
      },
      { 
        title: 'Số dự án', 
        count: totalProjects,
        onClick: () => navigate('/admin/projects')
      }
    ];
  }, [navigate]);
  // Gender distribution data
  const genderData = useMemo(() => {
    const maleCount = users.filter(user => user.gender === 'Nam').length;
    const femaleCount = users.filter(user => user.gender === 'Nữ').length;
    return [
      { name: 'Nam', value: maleCount },
      { name: 'Nữ', value: femaleCount }
    ];
  }, []);

  // Age distribution data
  const ageData = useMemo(() => {
    const ageRanges = {
      '20-25': 0,
      '26-30': 0,
      '31-35': 0,
      '36-40': 0,
      '41-45': 0,
      '46-50': 0
    };

    users.forEach(user => {
      if (user.age <= 25) ageRanges['20-25']++;
      else if (user.age <= 30) ageRanges['26-30']++;
      else if (user.age <= 35) ageRanges['31-35']++;
      else if (user.age <= 40) ageRanges['36-40']++;
      else if (user.age <= 45) ageRanges['41-45']++;
      else ageRanges['46-50']++;
    });

    return Object.entries(ageRanges).map(([range, count]) => ({
      range,
      Nam: users.filter(u => 
        (range === '20-25' && u.age <= 25 && u.gender === 'Nam') ||
        (range === '26-30' && u.age > 25 && u.age <= 30 && u.gender === 'Nam') ||
        (range === '31-35' && u.age > 30 && u.age <= 35 && u.gender === 'Nam') ||
        (range === '36-40' && u.age > 35 && u.age <= 40 && u.gender === 'Nam') ||
        (range === '41-45' && u.age > 40 && u.age <= 45 && u.gender === 'Nam') ||
        (range === '46-50' && u.age > 45 && u.gender === 'Nam')
      ).length,
      Nữ: users.filter(u => 
        (range === '20-25' && u.age <= 25 && u.gender === 'Nữ') ||
        (range === '26-30' && u.age > 25 && u.age <= 30 && u.gender === 'Nữ') ||
        (range === '31-35' && u.age > 30 && u.age <= 35 && u.gender === 'Nữ') ||
        (range === '36-40' && u.age > 35 && u.age <= 40 && u.gender === 'Nữ') ||
        (range === '41-45' && u.age > 40 && u.age <= 45 && u.gender === 'Nữ') ||
        (range === '46-50' && u.age > 45 && u.gender === 'Nữ')
      ).length
    }));
  }, []);

  const COLORS = ['#8884d8', '#82ca9d'];

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        
        <div className="admin-content">
          <h1 className="page-title">Trang Quản Trị</h1>

          {/* Stats Grid */}
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

          {/* Charts Grid */}
          <div className="charts-grid">
            {/* Gender Distribution */}
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

            {/* Age Distribution */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Phân bố độ tuổi theo giới tính</h2>
              </div>
              <div className="card-content chart-container">
                <BarChart
                  width={500}
                  height={300}
                  data={ageData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="range" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Nam" fill="#8884d8" />
                  <Bar dataKey="Nữ" fill="#82ca9d" />
                </BarChart>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AdminPage;