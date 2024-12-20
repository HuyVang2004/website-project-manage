import { Home, FileText, Target, BarChart2, Users, Plus, HelpCircle } from 'lucide-react';
import '../styles/SlideBar.scss'; 
const Slidebar = () => {
  return (
    <div className="sidebar">
      {/* Sidebar Icons */}
      <div className="sidebar__icons">
        <Home className="sidebar__icon" />
        <FileText className="sidebar__icon" />
        <Target className="sidebar__icon" />
        <BarChart2 className="sidebar__icon" />
        <Users className="sidebar__icon" />
        <Plus className="sidebar__icon" />
      </div>

      {/* Sidebar Bottom Icons */}
      <div className="sidebar__bottom">
        <HelpCircle className="sidebar__icon" />
      </div>
    </div>
  );
};

export default Slidebar;
