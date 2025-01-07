import { memo, useState, useEffect } from "react";
import "./style.scss";
import Sidebar from "../../../../components/SlideBar";
import TopBar from "../../../../components/Nav/TopBar";
// import Footer from "../../../../components/Footer";
import { FaListUl } from "react-icons/fa";
import { IoCalendarNumberSharp } from "react-icons/io5";
import { HiChartBar } from "react-icons/hi";
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaCommentAlt } from "react-icons/fa";
import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import interactionPlugin from '@fullcalendar/interaction'; // Cho phép tương tác (kéo thả, chọn)
import timeGridPlugin from '@fullcalendar/timegrid';
import './calendar-styles.scss';
import TableListProject from "../../../../components/Table/TableListProject";
import ChatBox from "../boxChatPage/BoxChatPage";
import Gantt from "../ganttChart/Gantt";



const ProjectDetails = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("cong-viec"); // Tab mặc định là Công việc
   
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // phần mới thêm 
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

  const [events, setEvents] = useState(initialEvents.map(migrateOldEvent));

  // Thêm useEffect để chuyển đổi các event cũ
  useEffect(() => {
    setEvents(prevEvents => prevEvents.map(migrateOldEvent));
  }, []);


  const handleDateSelect = (selectInfo) => {
    const title = prompt('Nhập tên sự kiện:');
    if (title) {
      const newEvent = {
        id: String(Date.now()), // Convert to string
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      };
      
      setEvents(prevEvents => [...prevEvents, newEvent]);
    }
    selectInfo.view.calendar.unselect();
  };

  const handleEventClick = (clickInfo) => {
    if (confirm('Bạn có muốn xóa sự kiện này không?')) {
      const eventId = clickInfo.event.id;
      setEvents(prevEvents => {
        // Log để debug
        console.log('Event to delete:', eventId);
        console.log('Current events:', prevEvents);
        
        return prevEvents.filter(event => {
          // Log để debug
          console.log('Comparing:', event.id, eventId, event.id !== eventId);
          return event.id !== eventId;
        });
      });
    }
  };
  // đến đây


  // Chức năng render nội dung theo tab đã chọn
  const renderContent = () => {
    switch (activeTab) {
      case "cong-viec":
        return (
          <div className="tab-content">
          <TableListProject />
          </div>
        );
      case "lich":
        return (
          <div className="tab-content">
            <div className="calendar-wrapper">
              <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                selectable={true}
                select={handleDateSelect}
                eventClick={handleEventClick}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                height={"800px"}
                editable={true}
                eventDrop={(info) => {
                  const droppedEventId = info.event.id;
                  setEvents(prevEvents => {
                    const updatedEvents = prevEvents.filter(
                      event => event.id !== droppedEventId
                    );
                    return [...updatedEvents, {
                      id: droppedEventId,
                      title: info.event.title,
                      start: info.event.startStr,
                      end: info.event.endStr,
                      allDay: info.event.allDay
                    }];
                  });
                }}
              />
            </div>
          </div>
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

        {/* Phần nội dung bên dưới */}
        <div className="content">{renderContent()}</div>
      </div>
      {/*<Footer /> */}
    </div>
  );
};

export default memo(ProjectDetails);
