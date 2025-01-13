import { memo, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
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
import getListTaskInProject from "../../../../api/tasks/getTaskInProject";
import Calendar from "../Calendar/Calendar";


const ProjectDetails = () => {
  const { project_id } = useParams();
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("cong-viec");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //const [events, setEvents] = useState([]);

  const [tasks, setTasks] = useState([]);
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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        const tasks = await getListTaskInProject(project_id);
        setTasks(tasks);
        // console.log(tasks);
        if ((await tasks).length > 0) {
          const mappedEvents = tasks.map((task) => ({
            id: task.id,
            title: task.name,
            date: task.due_date,
          }));

          setEvents(mappedEvents);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
        // setError("Không thể tải danh sách công việc. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    if (project_id) {
      fetchTasks();
    }
  }, [project_id]);

  // Rendering content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "cong-viec":
        return (
          <div className="tab-content">
            <TableListProject data={tasks} />
          </div>
        );
        case "lich":
          return (
            <Calendar listEvent={events} projectId={project_id}/>
          );
        // case "gantt":
        //   return <GanttChart />;
      case "tai-lieu":
        return (
          <div className="tab-content">
            <h2>Tài liệu</h2>
            <p>Hiển thị danh sách tài liệu.</p>
          </div>
        );
      case "thao-luan":
        return (
            <ChatBox projectId={project_id}/>
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