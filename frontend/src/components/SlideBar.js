import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  Target, 
  BarChart2, 
  Users, 
  Plus, 
  HelpCircle, 
  ListTodo, 
  ChartNoAxesCombined, 
  MonitorCog, 
  MessageCircleMore 
} from 'lucide-react';
import '../styles/SlideBar.scss';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const defaultIcons = [
    { id: 1, Icon: Home, label: 'Trang chủ' },
    { id: 2, Icon: FileText, label: 'Công việc' },
    { id: 3, Icon: Target, label: 'Mục tiêu' },
    { id: 4, Icon: BarChart2, label: 'Báo cáo' },
    { id: 5, Icon: Users, label: 'Người dùng' },
    { id: 6, Icon: Plus, label: 'Thêm mới' },
  ];

  const adminIcons = [
    { id: 1, Icon: Home, label: 'Trang chủ', onClick: () => navigate('/admin') },
    { id: 2, Icon: ListTodo, label: 'Dự án', onClick: () => navigate('/admin/projects') },
    { id: 3, Icon: Users, label: 'Quản lý người dùng', onClick: () => navigate('/admin/users')},
    { id: 4, Icon: ChartNoAxesCombined, label: 'Thống kê', onClick: () => navigate('/admin/statistics') },
    { id: 5, Icon: MonitorCog, label: 'Cài đặt hệ thống', onClick: () => navigate('/admin/system') },
    { id: 6, Icon: MessageCircleMore, label: 'Hỗ trợ', onClick: () => navigate('/admin/support') },
  ];

  const icons = location.pathname.startsWith('/admin') ? adminIcons : defaultIcons;

  return (
    <div className="sidebar">
      <div className="sidebar__icons">
        {icons.map(({ id, Icon, label,onClick }) => (
          <div key={id} className="sidebar__item"  onClick={onClick}>
            <Icon className="sidebar__icon" />
            <span className="sidebar__label">{label}</span>
          </div>
        ))}
      </div>


      <div className="sidebar__bottom">
        <div className="sidebar__item">
          <HelpCircle className="sidebar__icon" />
          <span className="sidebar__label">Trợ giúp</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
