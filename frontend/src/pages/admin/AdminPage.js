import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from '../../components/SlideBar';
import TopBar from '../../components/Nav/TopBar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import projectListApi from '../../api/ApiAdmin/ProjectList';
import userAPI from '../../api/userApi';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import './style/AdminPage.scss';

const AdminPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  
  // Fetch users and projects data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all users
        const usersResponse = await userAPI.getAllUsers();
        setUsers(usersResponse || []); // Assuming the response has a data property

        // Fetch all projects
        const projectsResponse = await projectListApi.getAllProjects();
        setProjects(projectsResponse || []); // Assuming the response has a data property
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Calculate statistics
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

  // Gender distribution data
  const genderData = useMemo(() => {
    const maleCount = users.filter(user => user.gender === 'Nam').length;
    const femaleCount = users.filter(user => user.gender === 'Nữ').length;
    const nullCount = users.filter(user => !user.gender).length;
    
    const data = [
      { name: 'Nam', value: maleCount },
      { name: 'Nữ', value: femaleCount }
    ];
    
    // Only add null gender if there are any
    if (nullCount > 0) {
      data.push({ name: 'Không xác định', value: nullCount });
    }
    
    return data;
  }, [users]);

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

    return Object.entries(ageRanges).map(([range, _]) => ({
      range,
      Nam: users.filter(u => 
        u.gender === 'Nam' && (
          (range === '20-25' && u.age <= 25) ||
          (range === '26-30' && u.age > 25 && u.age <= 30) ||
          (range === '31-35' && u.age > 30 && u.age <= 35) ||
          (range === '36-40' && u.age > 35 && u.age <= 40) ||
          (range === '41-45' && u.age > 40 && u.age <= 45) ||
          (range === '46-50' && u.age > 45)
        )
      ).length,
      Nữ: users.filter(u => 
        u.gender === 'Nữ' && (
          (range === '20-25' && u.age <= 25) ||
          (range === '26-30' && u.age > 25 && u.age <= 30) ||
          (range === '31-35' && u.age > 30 && u.age <= 35) ||
          (range === '36-40' && u.age > 35 && u.age <= 40) ||
          (range === '41-45' && u.age > 40 && u.age <= 45) ||
          (range === '46-50' && u.age > 45)
        )
      ).length
    }));
  }, [users]);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658']; // Added a third color for null gender

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