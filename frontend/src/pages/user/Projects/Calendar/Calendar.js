import React, { useState, useRef, useEffect } from 'react';
import './Calendar.scss'
import EventForm from './FormCalender/EventForm';
import projectTeamApi from '../../../../api/projects/projectTeamApi';

// Helper functions
const formatTime = (date) => {
  return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
};

const getDurationInHours = (event) => {
  return (event.end - event.start) / (1000 * 60 * 60);
};

const getWeekDays = (date) => {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(new Date(start));
    start.setDate(start.getDate() + 1);
  }
  return days;
};

const Calendar = ({listEvent, projectId}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('month');
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formPosition, setFormPosition] = useState(null);
  const [draggedEvent, setDraggedEvent] = useState(null);
  
  const userData = JSON.parse(localStorage.getItem('user_profile') || '{}');
  const userId = userData?.user_id;

  console.log("event", listEvent);
  const [role, setRole] = useState('');
  useEffect(() => {
    const fetchRole = async () => {
      const fetchedRole = await projectTeamApi.getRole(projectId, userId);
      setRole(fetchedRole);
    };
    fetchRole();
  }, [projectId, userId]);

  
  useEffect(() => {
    setEvents(listEvent);
  });

  const dragCounter = useRef(0);
  const dragTarget = useRef(null);

  const eventTypes = {
    default: { color: '#3182ce' },
    meeting: { color: '#e53e3e' },
    task: { color: '#38a169' },
    reminder: { color: '#d69e2e' }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };
  const handleEventClick = (event, e) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setFormPosition({ x: e.clientX, y: e.clientY });
    setShowEventForm(true);
  };
  const handleDateClick = (date, e) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setShowEventForm(true);
  };

  const handleEventSave = (eventData) => {
    if (role !== 'Quản lý') {
      alert('Bạn không có quyền thực hiện thao tác này');
      return;
    }
  
    if (eventData === null) {
      // Xóa sự kiện
      setEvents(events.filter(e => e.id !== selectedEvent.id));
    } else if (selectedEvent) {
      // Cập nhật sự kiện
      setEvents(events.map(e => e.id === selectedEvent.id ? eventData : e));
    } else {
      // Thêm sự kiện mới
      setEvents([...events, eventData]);
    }
    setSelectedEvent(null);
  };

  const handleEventUpdate = (eventData) => {
    if (role !== 'Quản lý') {
      alert('Bạn không có quyền thực hiện thao tác này');
      return;
    }
  
    // Logic cập nhật sự kiện
    setEvents(events.map(e => e.id === selectedEvent.id ? eventData : e));
    setSelectedEvent(null);
  };

  // Drag and Drop Handlers
  const handleDragStart = (event, e) => {
    e.stopPropagation();
    setDraggedEvent(event);
    dragCounter.current = 0;
  };

  const handleDragOver = (date, e) => {
    e.preventDefault();
    dragTarget.current = date;
  };

  const handleDrop = (date, e) => {
    e.preventDefault();
    if (draggedEvent && dragTarget.current) {
      const timeDiff = dragTarget.current - draggedEvent.start;
      const newEvent = {
        ...draggedEvent,
        start: new Date(draggedEvent.start.getTime() + timeDiff),
        end: new Date(draggedEvent.end.getTime() + timeDiff)
      };
      handleEventSave(newEvent);
      setDraggedEvent(null);
      dragTarget.current = null;
    }
  };

  // Render Functions
  const renderEvent = (event, isWeekView = false) => {
    const eventStyle = {
      backgroundColor: eventTypes[event.type]?.color || eventTypes.default.color,
      height: isWeekView ? `${getDurationInHours(event) * 60}px` : 'auto'
    };
  
    const formatEventTime = (date) => {
      return new Date(date).toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    };
  
    return (
      <div
        key={event.id}
        className="event"
        style={eventStyle}
        onClick={(e) => handleEventClick(event, e)}
        draggable
        onDragStart={(e) => handleDragStart(event, e)}
      >
        <div className="event-content">
          <div className="event-header">
            <div className="event-time">
              {formatEventTime(event.start)} - {formatEventTime(event.end)}
            </div>
            <div className="event-title">{event.title}</div>
          </div>
          
          {event.members && event.members.length > 0 && (
            <div className="event-members">
              {event.members.slice(0, 3).map((member, index) => (
                <img 
                  key={index}
                  src={member.avatar}
                  alt={member.username}
                  className="member-avatar"
                  title={member.username}
                />
              ))}
              {event.members.length > 3 && (
                <div className="member-count">
                  +{event.members.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };
  

  const renderMonthView = () => {
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDate.getDay(); i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty" />);
    }

    // Add days of the month
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        const currentEvents = events.filter(event => {
          const eventStart = new Date(event.startDate);
          const eventEnd = new Date(event.endDate);
          const currentDate = new Date(date);
          
          return currentDate >= eventStart && currentDate <= eventEnd;
        });
  
        days.push(
          <div
            key={date.toISOString()}
            className={`calendar-day ${selectedDate?.toDateString() === date.toDateString() ? 'selected' : ''}`}
            onClick={(e) => handleDateClick(new Date(date), e)}
            onDragOver={(e) => handleDragOver(new Date(date), e)}
            onDrop={(e) => handleDrop(new Date(date), e)}
          >
            <div className="day-number">{date.getDate()}</div>
            {currentEvents.map(event => renderEvent(event))}
          </div>
        );
      }
  
      return <div className="month-view">{days}</div>;
  };

  const renderWeekView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i); // Tạo danh sách 24 giờ.
    const weekDays = getWeekDays(currentDate); // Lấy danh sách các ngày trong tuần hiện tại.
  
    return (
      <div className="week-view">
        {/* Cột thời gian */}
        <div className="time-column">
          {hours.map(hour => (
            <div key={hour} className="hour-cell">
              {`${hour}:00`}
            </div>
          ))}
        </div>
  
        {/* Các cột ngày trong tuần */}
        {weekDays.map(day => (
          <div key={day.toISOString()} className="day-column">
            {/* Tiêu đề ngày trong tuần */}
            <div className="weekday-header">
              {day.toLocaleDateString('vi-VN', { weekday: 'short', month: 'numeric', day: 'numeric' })}
            </div>
  
            {/* Các ô giờ trong ngày */}
            {hours.map(hour => {
              const hourDate = new Date(day); // Tạo đối tượng Date cho từng giờ.
              hourDate.setHours(hour, 0, 0, 0);
  
              // Lọc các sự kiện có khoảng thời gian bao phủ giờ này.
              const currentEvents = events.filter(event => {
                const eventStart = new Date(`${event.startDate}T${event.startTime}`);
                const eventEnd = new Date(`${event.endDate}T${event.endTime}`);
                return hourDate >= eventStart && hourDate < eventEnd; // Kiểm tra nếu giờ nằm trong khoảng thời gian.
              });
  
              return (
                <div
                  key={hour}
                  className="hour-cell"
                  onClick={(e) => handleDateClick(new Date(hourDate), e)}
                  onDragOver={(e) => handleDragOver(new Date(hourDate), e)}
                  onDrop={(e) => handleDrop(new Date(hourDate), e)}
                >
                  {/* Hiển thị các sự kiện phù hợp */}
                  {currentEvents.map(event => renderEvent(event, true))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };
  

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="header-left">
          <button className="today-btn" onClick={goToToday}>
            Today
          </button>
          <div className="nav-buttons">
            {view === 'week' ? (
              <>
                <button className="nav-button" onClick={() => navigateWeek(-1)}>
                  Tuần trước
                </button>
                <button className="nav-button" onClick={() => navigateWeek(1)}>
                  Tuần sau
                </button>
              </>
            ) : (
              <>
                <button className="nav-button" onClick={() => navigateMonth(-1)}>
                  Tháng trước
                </button>
                <button className="nav-button" onClick={() => navigateMonth(1)}>
                  Tháng sau
                </button>
              </>
            )}
          </div>
        </div>
        <h2 className="current-date">
          {view === 'week' ? (
            // Hiển thị range của tuần
            `${getWeekDays(currentDate)[0].toLocaleDateString('vi-VN', { 
              month: 'long', 
              day: 'numeric' 
            })} - ${getWeekDays(currentDate)[6].toLocaleDateString('vi-VN', { 
              month: 'long', 
              day: 'numeric',
              year: 'numeric'
            })}`
          ) : (
            // Hiển thị tháng và năm
            currentDate.toLocaleDateString('vi-VN', { 
              month: 'long', 
              year: 'numeric' 
            })
          )}
        </h2>
      </div>

      <div className="view-switcher">
        <button
          className={`view-button ${view === 'month' ? 'active' : ''}`}
          onClick={() => setView('month')}
        >
          Tháng
        </button>
        <button
          className={`view-button ${view === 'week' ? 'active' : ''}`}
          onClick={() => setView('week')}
        >
          Tuần
        </button>
      </div>

      {view === 'month' ? renderMonthView() : renderWeekView()}

      {showEventForm && (
        <EventForm
            event={selectedEvent || { dueDate: selectedDate?.toISOString().split('T')[0] }}
            onSave={handleEventSave}
            onClose={() => setShowEventForm(false)}
            projectId={projectId}
        />
        )}
    </div>
  );
};

export default Calendar;