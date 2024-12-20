import React, { useEffect } from 'react';
import gantt from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

const DHTMLXGantt = () => {
  useEffect(() => {
    gantt.init("gantt_here");
    gantt.parse({
      data: [
        { id: 1, text: "Task #1", start_date: "2024-12-01", duration: 5 },
        { id: 2, text: "Task #2", start_date: "2024-12-06", duration: 4 }
      ]
    });
  }, []);

  return <div id="gantt_here" style={{ width: '100%', height: '500px' }} />;
};

export default DHTMLXGantt;
