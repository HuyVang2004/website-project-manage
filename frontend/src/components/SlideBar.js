import React, {useState} from 'react';
import { memo } from 'react';
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
import { ROUTERS } from '../utils/router';
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const defaultIcons = [
    { id: 1, Icon: Home, label: 'Trang chủ', onClick : () => navigate(ROUTERS.USER.HOME)},
    { id: 2, Icon: FileText, label: 'Dự án', onClick : () => navigate(ROUTERS.USER.PROJECT.BASE) },
    { id: 3, Icon: Target, label: 'Công việc', onClick: () => navigate(ROUTERS.USER.MYTASK)},
    { id: 4, Icon: BarChart2, label: 'Báo cáo'},
    { id: 5, Icon: Users, label: 'Người dùng', onClick: () => navigate(ROUTERS.USER.PEOPLELIST)},
    { id: 6, Icon: Plus, label: 'Thêm mới' },
  ];

  const adminIcons = [
    { id: 1, Icon: Home, label: 'Trang chủ', onClick: () => navigate('/admin') },
    { id: 2, Icon: ListTodo, label: 'Dự án', onClick: () => navigate('/admin/projects') },
    { id: 3, Icon: Users, label: 'Quản lý người dùng', onClick: () => navigate('/admin/users')},
    { id: 4, Icon: ChartNoAxesCombined, label: 'Thống kê', onClick: () => navigate('/admin/statistics') },
    { id: 5, Icon: MonitorCog, label: 'Cài đặt hệ thống', onClick: () => navigate('/admin/settings') },
    { id: 6, Icon: MessageCircleMore, label: 'Hỗ trợ', onClick: () => navigate('/admin/help') },
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


         {/* Chỉ hiển thị nút Trợ giúp nếu không phải trang Admin */}
         {!location.pathname.startsWith('/admin') && (
        <div className="sidebar__bottom">
          <div className="sidebar__item">
            <HelpCircle className="sidebar__icon" />
            <span className="sidebar__label">Trợ giúp</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Sidebar);

    