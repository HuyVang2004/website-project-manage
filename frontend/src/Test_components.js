import React, { useEffect } from "react";
import gantt from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";

const App = () => {
  useEffect(() => {
    // Khởi tạo Gantt chart với id 'gantt_here'
    gantt.init("gantt_here");

    // Dữ liệu mẫu cho các công việc trong Gantt chart
    const tasks = {
      data: [
        { id: 1, text: "Task 1", start_date: "2024-12-01", duration: 5 },
        { id: 2, text: "Task 2", start_date: "2024-12-06", duration: 10 },
        { id: 3, text: "Milestone", start_date: "2024-12-10", duration: 0, type: "milestone" },
        { id: 4, text: "Task 3", start_date: "2024-12-12", duration: 7 },
      ],
    };

    // Cấu hình các cột chỉ hiển thị tên công việc (text)
    gantt.config.columns = [
      { name: "text", label: "Task", width: "*" }, // Chỉ hiển thị tên công việc
    ];

    // Cấu hình scale (hiển thị theo tháng, tuần và ngày)
    gantt.config.scale_unit = "month"; 
    gantt.config.date_scale = "%F, %Y";  // Format tháng/năm
    gantt.config.subscales = [
      { unit: "day", step: 1, date: "%d" },
      { unit: "week", step: 1, date: "%W" },
    ];

    // Cấu hình tooltip khi hover vào task
    gantt.templates.tooltip_text = function (start, end, task) {
      return `<b>Task:</b> ${task.text}<br/><b>Start:</b> ${start}<br/><b>End:</b> ${end}<br/><b>Duration:</b> ${task.duration} days`;
    };

    // Cập nhật sự kiện hover để hiển thị thông tin chi tiết
    gantt.attachEvent("onMouseMove", function (id) {
      const task = gantt.getTask(id);
      if (task) {
        const tooltip = document.getElementById("tooltip");
        tooltip.innerHTML = `<b>Task:</b> ${task.text}<br/><b>Start:</b> ${task.start_date}<br/><b>End:</b> ${task.end_date || ""}<br/><b>Duration:</b> ${task.duration} days`;
        tooltip.style.left = `${gantt.mouse.x + 10}px`; // Vị trí hover tooltip
        tooltip.style.top = `${gantt.mouse.y + 10}px`;
        tooltip.style.display = "block"; // Hiển thị tooltip khi hover
      }
    });

    gantt.attachEvent("onMouseOut", function () {
      const tooltip = document.getElementById("tooltip");
      tooltip.style.display = "none"; // Ẩn tooltip khi di chuột ra ngoài
    });

    // Parse và hiển thị dữ liệu lên Gantt chart
    gantt.parse(tasks);

    return () => gantt.clearAll(); // Dọn dẹp khi component bị unmount
  }, []);

  return (
    <div>
      <div
        id="gantt_here"
        style={{
          width: "100%",
          height: "500px", // Chiều cao biểu đồ
          overflow: "auto", // Cho phép cuộn ngang/dọc
        }}
      ></div>
      {/* Tooltip để hiển thị thông tin chi tiết khi hover */}
      <div
        id="tooltip"
        style={{
          position: "absolute",
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
          display: "none",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          fontSize: "14px",
          borderRadius: "5px",
          zIndex: 1000,
        }}
      ></div>
    </div>
  );
};

export default App;
