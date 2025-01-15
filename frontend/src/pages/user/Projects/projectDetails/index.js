import { memo, useState, useEffect, useCallback } from "react";
import { useParams, useLocation } from "react-router";
import "./style.scss";
import Sidebar from "../../../../components/SlideBar";
import TopBar from "../../../../components/Nav/TopBar";
import { FaListUl } from "react-icons/fa";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { HiChartBar } from "react-icons/hi";
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaCommentAlt } from "react-icons/fa";
import TableListTask from "../../../../components/Table/TableListTask";
import ChatBox from "../boxChatPage/BoxChatPage";
import getListTaskInProject from "../../../../api/tasks/getTaskInProject";
import Calendar from "../Calendar/Calendar";
import ProjectDocuments from "../../projectDocument/projectDocument";
import getProjectData from "../../../../api/projects/getProjectData";
const ProjectDetails = () => {
  const { project_id } = useParams();
  const location = useLocation();
  const [projectData, setProjectData] = useState(location.state?.projectData || null);
  
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("cong-viec");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!projectData) {
        setLoading(true);
        try {
          const data = await getProjectData(project_id); // Assuming getProjectData accepts project_id
          setProjectData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProjectData();
  }, [projectData, project_id]);

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
        const listTask = await getListTaskInProject(project_id);
        setTasks(listTask);
        console.log("List task",listTask); 
        if (listTask.length > 0) {
          const mappedEvents = listTask.map((task) => {
            const [startDate, startTime] = task.startDate.split("T");
            const [endDate, endTime] = task.dueDate.split("T");
      
            return {
              task_id: task.task_id,
              title: task.taskName,
              startDate: startDate, // Lấy ngày từ dueDate
              startTime: startTime, // Lấy giờ từ dueDate
              endDate: endDate,     // Lấy ngày từ endDate
              endTime: endTime,     // Lấy giờ từ endDate
              priority: task.priority,
              description: task.description,
              members: task.attendees
            };
          });
      
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
  // console.log("listevent", events);

  // Rendering content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "cong-viec":
        return (
          <div className="tab-content">
            <TableListTask tasks={tasks} />
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
            <ProjectDocuments projectId={project_id}/>
          </div>
        );
      case "thao-luan":
        return (
            <ChatBox projectId={project_id} teamMembers={projectData.teamMembers}/>
        );
      default:
        return <div className="tab-content">Chọn tab hợp lệ để xem nội dung</div>;
    }
  };

  return (
    <div className={`dashboard ${scrolled ? "scrolled" : ""}`}>
      <Sidebar />
      <TopBar />
      <div className="main-content">
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