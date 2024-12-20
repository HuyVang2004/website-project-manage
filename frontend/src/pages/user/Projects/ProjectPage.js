import React, { useEffect } from "react";
import gantt from "dhtmlx-gantt";  // Import dhtmlx-gantt
import "dhtmlx-gantt/codebase/dhtmlxgantt.css"; // Import CSS của gantt

const GanttChart = () => {
  useEffect(() => {
    // Dữ liệu mẫu cho biểu đồ Gantt
    const tasks = [
      { id: 1, text: "Task 1", start_date: "2024-12-01", duration: 5, progress: 0.5 },
      { id: 2, text: "Task 2", start_date: "2024-12-06", duration: 5, progress: 0.3 },
      { id: 3, text: "Task 3", start_date: "2024-12-11", duration: 5, progress: 0.2 },
    ];

    // Khởi tạo Gantt
    gantt.init("gantt-container"); // Khởi tạo Gantt trên phần tử có id 'gantt-container'
    gantt.parse({ data: tasks }); // Dữ liệu sẽ được nạp vào Gantt

    return () => {
      // Dọn dẹp khi component bị hủy bỏ
      gantt.clearAll();
    };
  }, []);

  return (
    <div>
      <h2>My Gantt Chart</h2>
      <div id="gantt-container" style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
};

export default GanttChart;
