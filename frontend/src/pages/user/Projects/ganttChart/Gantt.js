import React, { useEffect, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

const GanttChart = () => {
  const ganttContainer = useRef(null);

  // Sample data
  const tasks = {
    data: [
      { id: 1, text: 'Task #1', start_date: '2025-01-01', duration: 3, progress: 0.6 },
      { id: 2, text: 'Task #2', start_date: '2025-01-03', duration: 4, progress: 0.4 },
      { id: 3, text: 'Task #3', start_date: '2025-01-05', duration: 5, progress: 0.2 }
    ],
    links: [
      { id: 1, source: 1, target: 2, type: '0' },
      { id: 2, source: 2, target: 3, type: '0' }
    ]
  };

  useEffect(() => {
    // Cấu hình Gantt
    gantt.config.date_format = "%Y-%m-%d";
    gantt.config.scales = [
      { unit: "month", step: 1, format: "%F, %Y" },
      { unit: "week", step: 1, format: "Tuần %W" },
      { unit: "day", step: 1, format: "%d" }
    ];

    // Tùy chỉnh giao diện
    gantt.config.columns = [
      { name: "text", label: "Tên công việc", width: 200, tree: true },
      { name: "start_date", label: "Bắt đầu", width: 100 },
      { name: "duration", label: "Thời lượng", width: 80 },
      { name: "progress", label: "Tiến độ", width: 80 }
    ];

    // Khởi tạo Gantt
    gantt.init(ganttContainer.current);
    
    // Load dữ liệu
    gantt.parse(tasks);

    // Cleanup khi component unmount
    return () => {
      gantt.clearAll();
    };
  }, []);

  return (
    <div 
      ref={ganttContainer} 
      style={{ width: '100%', height: '500px' }} 
      className="gantt-container"
    />
  );
};

export default GanttChart;