import { Home, FileText, Target, BarChart2, Users, Plus, HelpCircle } from 'lucide-react';
import '../styles/SlideBar.scss'; 
import { memo } from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Sidebar Icons */}
      <div className="sidebar__icons">
        <a href="http://localhost:3000/trangchu" className="sidebar__link">
          <Home className="sidebar__icon" />
        </a>
        <a href="http://localhost:3000/duan" className="sidebar__link">
          <FileText className="sidebar__icon" />
        </a>
        <a href="/target" className="sidebar__link">
          <Target className="sidebar__icon" />
        </a>
        <a href="/stats" className="sidebar__link">
          <BarChart2 className="sidebar__icon" />
        </a>
        <a href="/users" className="sidebar__link">
          <Users className="sidebar__icon" />
        </a>
        <a href="/add" className="sidebar__link">
          <Plus className="sidebar__icon" />
        </a>
      </div>

      {/* Sidebar Bottom Icons */}
      <div className="sidebar__bottom">
        <a href="/help" className="sidebar__link">
          <HelpCircle className="sidebar__icon" />
        </a>
      </div>
    </div>
  );
};

export default memo(Sidebar);

    