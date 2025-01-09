import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // plugin tương tác với sự kiện
import './Calendar.scss';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    priority: "medium", // Mức độ ưu tiên
    attendees: [], // Danh sách email thành viên
  });

  // Hàm mở modal khi chọn ngày
  const handleDateSelect = (selectInfo) => {
    setEventData({
      title: "",
      description: "",
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      priority: "medium",
      attendees: [],
    });
    setIsModalOpen(true);
  };

  // Hàm thêm sự kiện sau khi người dùng điền thông tin
  const handleEventAdd = () => {
    if (eventData.title.trim() === "") {
      alert("Tiêu đề sự kiện không thể trống!");
      return;
    }

    const newEvent = {
      id: `event-${Date.now()}`,
      title: eventData.title,
      description: eventData.description,
      start: eventData.start,
      end: eventData.end,
      priority: eventData.priority,
      attendees: eventData.attendees.map(email => ({
        email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=random`, // Sử dụng avatar tạm
      })),
      backgroundColor: getPriorityColor(eventData.priority), // Màu sắc sự kiện
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setIsModalOpen(false); // Đóng modal
  };

  // Hàm lấy màu sắc dựa trên mức độ ưu tiên
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#ff4d4d"; // Đỏ cho cao
      case "medium":
        return "#ffcc00"; // Vàng cho trung bình
      case "low":
        return "#66cc66"; // Xanh lá cho thấp
      default:
        return "#ffcc00"; // Màu vàng mặc định
    }
  };

  // Hàm xóa sự kiện khi click vào sự kiện
  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Bạn có muốn xóa sự kiện '${clickInfo.event.title}' không?`)) {
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== clickInfo.event.id)
      );
      clickInfo.event.remove(); // Xóa sự kiện khỏi FullCalendar
    }
  };

  // Hàm thêm email thành viên
  const handleAddAttendee = () => {
    const email = prompt("Nhập email thành viên:");
    if (email && email.includes("@")) {
      setEventData((prevData) => ({
        ...prevData,
        attendees: [...prevData.attendees, email],
      }));
    } else {
      alert("Email không hợp lệ.");
    }
  };

  return (
    <div className="header">
      <div className="calendar-container">
        <div>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            initialView="dayGridMonth"
            events={events} // Hiển thị danh sách sự kiện
            selectable={true} // Cho phép chọn ngày
            select={handleDateSelect} // Hàm khi người dùng chọn ngày
            eventClick={handleEventClick} // Hàm khi click vào sự kiện
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            locale="vi" 
            eventContent={(arg) => {
              const { title, extendedProps } = arg.event;
              const { attendees, priority } = extendedProps;

              return (
                <div className="custom-event">
                  <div className="event-header">
                    <span className="event-priority" style={{ backgroundColor: getPriorityColor(priority) }}></span>
                    <strong>{title}</strong>
                  </div>
                  <div className="event-attendees">
                    {attendees &&
                      attendees.map((attendee, index) => (
                        <img
                          key={index}
                          src={attendee.avatar}
                          alt={attendee.email}
                          className="event-avatar"
                        />
                      ))}
                  </div>
                </div>
              );
            }}
          />

          {/* Modal thêm sự kiện */}
          {isModalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h3>Thêm sự kiện mới</h3>
                <label>Tiêu đề:</label>
                <input
                  type="text"
                  value={eventData.title}
                  onChange={(e) =>
                    setEventData({ ...eventData, title: e.target.value })
                  }
                />
                <label>Mô tả:</label>
                <textarea
                  value={eventData.description}
                  onChange={(e) =>
                    setEventData({ ...eventData, description: e.target.value })
                  }
                />
                <label>Thời gian bắt đầu:</label>
                <input
                  type="datetime-local"
                  value={eventData.start}
                  onChange={(e) =>
                    setEventData({ ...eventData, start: e.target.value })
                  }
                />
                <label>Thời gian kết thúc:</label>
                <input
                  type="datetime-local"
                  value={eventData.end}
                  onChange={(e) =>
                    setEventData({ ...eventData, end: e.target.value })
                  }
                />
                <label>Mức độ ưu tiên:</label>
                <select
                  value={eventData.priority}
                  onChange={(e) =>
                    setEventData({ ...eventData, priority: e.target.value })
                  }
                >
                  <option value="high">Cao</option>
                  <option value="medium">Trung bình</option>
                  <option value="low">Thấp</option>
                </select>
                <div>
                  <label>Thêm thành viên (Email):</label>
                  <button onClick={handleAddAttendee}>Thêm thành viên</button>
                  <div>
                    <h4>Thành viên:</h4>
                    <ul>
                      {eventData.attendees.map((email, index) => (
                        <li key={index}>{email}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <button onClick={handleEventAdd}>Thêm sự kiện</button>
                <button onClick={() => setIsModalOpen(false)}>Hủy</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
