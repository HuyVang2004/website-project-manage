import { memo } from "react";
import './styles.scss'
import { Home, FileText, Target, BarChart2, Users, Plus, HelpCircle } from 'lucide-react';


const ProfilePage = () => {
    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className="sidebar__icons">
                    <Home className="sidebar__icon" />
                    <FileText className="sidebar__icon" />
                    <Target className="sidebar__icon" />
                    <BarChart2 className="sidebar__icon" />
                    <Users className="sidebar__icon" />
                    <Plus className="sidebar__icon" />
                </div>
                <div className="sidebar__bottom">
                <HelpCircle className="sidebar__icon" />
                </div>
            </div>
            <div className="main-content">
                <div className="header">
                    <div className="col-6 header-left ">
                        <h1 className="header-title">Danh sách dự án</h1>
                    </div>
                    <div className="col-6 header-right">
                        <h1>
                            Tạo dự án mới 
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default memo(ProfilePage);