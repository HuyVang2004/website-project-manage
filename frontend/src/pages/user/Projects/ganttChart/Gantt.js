// import React, { useEffect, useRef } from "react";
// import { gantt } from "dhtmlx-gantt";
// import "dhtmlx-gantt/codebase/dhtmlxgantt.css";

// const GanttChart = () => {
//   const ganttContainer = useRef(null);

//   // Sample data
//   const tasks = {
//     data: [
//       { id: 1, text: "Project #1", start_date: "2025-01-01", duration: 13, progress: 0.6 },
//       { id: 2, text: "Task #1", start_date: "2025-01-01", duration: 5, parent: 1 },
//       { id: 3, text: "Task #2", start_date: "2025-01-03", duration: 11, parent: 1 },
//       { id: 4, text: "Task #2.1", start_date: "2025-01-03", duration: 3, parent: 3 },
//     ],
//     links: [
//       { id: 1, source: 2, target: 3, type: "0" },
//       { id: 2, source: 3, target: 4, type: "0" },
//     ],
//   };

//   useEffect(() => {
//     // Cấu hình Gantt
//     gantt.config.date_format = "%Y-%m-%d";
//     gantt.config.scales = [
//       { unit: "month", step: 1, format: "%F, %Y" },
//       { unit: "week", step: 1, format: "Tuần %W" },
//       { unit: "day", step: 1, format: "%d" },
//     ];

//     // Tùy chỉnh cột bảng
//     gantt.config.columns = [
//       { name: "text", label: "Task name", width: 200, tree: true },
//       { name: "start_date", label: "Start time", width: 100, align: "center" },
//       { name: "duration", label: "Duration", width: 80, align: "center" },
//       {
//         name: "add",
//         label: "",
//         width: 50,
//         align: "center",
//         template: function () {
//           return "<button class='add-task-btn'>+</button>";
//         },
//       },
//     ];

//     // Khởi tạo Gantt
//     gantt.init(ganttContainer.current);

//     // Load dữ liệu
//     gantt.parse(tasks);

//     // Xử lý sự kiện nhấn nút "+"
//     ganttContainer.current.addEventListener("click", function (event) {
//       if (event.target.classList.contains("add-task-btn")) {
//         const taskId = gantt.locate(event.target); // Lấy ID của task hiện tại
//         const task = gantt.getTask(taskId);

//         // Thêm task con mới
//         const newTask = {
//           id: gantt.uid(),
//           text: "New Task",
//           start_date: task.start_date,
//           duration: 1,
//           parent: taskId,
//         };
//         gantt.addTask(newTask);
//       }
//     });

//     // Cleanup khi component unmount
//     return () => {
//       gantt.clearAll();
//     };
//   }, []);

//   return (
//     <div
//       ref={ganttContainer}
//       style={{ width: "100%", height: "500px" }}
//       className="gantt-container"
//     />
//   );
// };

// export default GanttChart;
