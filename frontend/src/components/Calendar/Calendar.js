import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calendar.scss";  

const MyCalendar = ({ tasks }) => {
  const [date, setDate] = useState(new Date());

  const formatDateKey = (date) => {
    const taskDate = new Date(date); // Chuyển đổi chuỗi ngày tháng thành đối tượng Date
    if (isNaN(taskDate)) {  // Kiểm tra xem có phải là một ngày hợp lệ không
      return null;
    }
    return `${taskDate.getFullYear()}-${taskDate.getMonth() + 1}-${taskDate.getDate()}`;
  };

  const taskMap = tasks.reduce((acc, task) => {
    const key = formatDateKey(task.dueDate);
    if (key) {
      acc[key] = task.task;
    }
    return acc;
  }, {});

  const getTaskForDate = (date) => taskMap[formatDateKey(date)] || null;

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <span className="selected-date">
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date }) =>
          getTaskForDate(date) ? "has-deadline" : null
        }
        tileContent={({ date }) => {
          const task = getTaskForDate(date);
          console.log(`Task for ${date}:`, task);
          return task ? (
            <div className="tile-tooltip">
              <span className="tooltip-content">{task}</span>
            </div>
          ) : null;
        }}
      />
    </div>
  );
};

export default MyCalendar;
