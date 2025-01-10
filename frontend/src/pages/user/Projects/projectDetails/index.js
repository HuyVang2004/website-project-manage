import { memo, useState, useEffect, useCallback } from "react";
import "./style.scss";
import Sidebar from "../../../../components/SlideBar";
import TopBar from "../../../../components/Nav/TopBar";
import { FaListUl } from "react-icons/fa";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { HiChartBar } from "react-icons/hi";
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaCommentAlt } from "react-icons/fa";
import TableListProject from "../../../../components/Table/TableListProject";
import ChatBox from "../boxChatPage/BoxChatPage";
import Gantt from "../ganttChart/Gantt";
import getListProjectData from "../../../../api/projects/getListProjectData";
import Calendar from "../Calendar/Calendar";
const ProjectDetails = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("cong-viec");
  const [listProject, setListProject] = useState(null);
  const [events, setEvents] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user_profile") || "{}");
  const userId = userData?.user_id || "";



  useEffect(() => {
    // Scroll event handling
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [userId]);

  // Handling calendar events
  const initialEvents = [
    { id: 'legacy-1', title: 'Họp dự án', date: '2024-12-20' },
    { id: 'legacy-2', title: 'Deadline báo cáo', date: '2024-12-28' }
  ];

  const migrateOldEvent = (event) => {
    if (!event.id) {
      return {
        ...event,
        id: `legacy-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      };
    }
    return event;
  };

  useEffect(() => {
    setEvents(initialEvents.map(migrateOldEvent));
  }, []);


  // Rendering content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "cong-viec":
        return (
          <div className="tab-content">
            {/* <TableListProject data={listProject} /> */}
          </div>
        );
      case "lich":
        return (
          <Calendar />
        );
      case "gantt":
        return (
          <Gantt />
        );
      case "tai-lieu":
        return (
          <div className="tab-content">
            <h2>Tài liệu</h2>
            <p>Hiển thị danh sách tài liệu.</p>
          </div>
        );
      case "thao-luan":
        return (
            <ChatBox />
        );
      default:
        return <div className="tab-content">Chọn tab hợp lệ để xem nội dung</div>;
    }
  };

  return (
    <div className={`dashboard ${scrolled ? "scrolled" : ""}`}>
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="header_top">
          <div
            className={`menu-item ${activeTab === "cong-viec" ? "active" : ""}`}
            onClick={() => setActiveTab("cong-viec")}
          >
            <FaListUl />
            <p>Công việc</p>
          </div>
          <div
            className={`menu-item ${activeTab === "lich" ? "active" : ""}`}
            onClick={() => setActiveTab("lich")}
          >
            <IoCalendarNumberSharp />
            <p>Lịch</p>
          </div>
          <div
            className={`menu-item ${activeTab === "gantt" ? "active" : ""}`}
            onClick={() => setActiveTab("gantt")}
          >
            <HiChartBar />
            <p>Gantt</p>
          </div>
          <div
            className={`menu-item ${activeTab === "tai-lieu" ? "active" : ""}`}
            onClick={() => setActiveTab("tai-lieu")}
          >
            <IoDocumentTextSharp />
            <p>Tài liệu</p>
          </div>
          <div
            className={`menu-item ${activeTab === "thao-luan" ? "active" : ""}`}
            onClick={() => setActiveTab("thao-luan")}
          >
            <FaCommentAlt />
            <p>Thảo luận</p>
          </div>
        </div>

        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default memo(ProjectDetails);
