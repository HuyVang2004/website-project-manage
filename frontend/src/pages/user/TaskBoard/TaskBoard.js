import React, { useState } from 'react';
import { Plus, MessageCircle, Paperclip, Clock } from 'lucide-react';
import "./TaskBoard.scss";
import TopBar from '../../../components/Nav/TopBar';
import Slidebar from '../../../components/SlideBar';
import TaskDetailModal from './TaskDetailModal';
import AddTaskModal from './AddTaskModal';  // Add this import

const TaskBoard = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);  // Add this state
  const [tasks, setTasks] = useState({
    todo: [
      { 
        id: 1, 
        title: 'Thiết kế cơ sở dữ liệu', 
        frame: 'Frame 12',
        priority: 'High',
        status: 'Completed',
        manager: { id: '1', name: 'Vang', avatar: '/avatar1.jpg' },
        members: [{ id: '2', name: 'Truong', avatar: '/avatar2.jpg' }],
        deadline: '24-12-2024',
        days: 12, 
        comments: 0, 
        attachments: 0
      },
      // ... other tasks
    ],
    inProgress: [/* ... */],
    completed: [/* ... */]
  });

  const TaskCard = ({ task }) => (
    <div className="task-board__card" onClick={() => setSelectedTask(task)}>
      <h3 className="task-board__card-title">{task.title}</h3>
      <div className="task-board__card-priority">medium priority</div>
      <div className="task-board__card-footer">
        <div className="metrics">
          <div className="metrics-item">
            <Clock />
            <span>{task.days} Days</span>
          </div>
          <div className="metrics-item">
            <Paperclip />
            <span>{task.attachments}</span>
          </div>
          <div className="metrics-item">
            <MessageCircle />
            <span>{task.comments}</span>
          </div>
        </div>
        <div className="assignees">
          {task.members.map((member, idx) => (
            <div key={idx} className="assignees-avatar">
              {member.name[0]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Modified Column component to handle add button click
  const Column = ({ title, tasks, showAddButton }) => (
    <div className="task-board__column">
      <h2 className="task-board__column-header">{title}</h2>
      <div className="task-board__column-content">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
        {showAddButton && (
          <button 
            className="task-board__add-button"
            onClick={() => setShowAddTaskModal(true)}  // Modified this line
          >
            <Plus />
            <span>Thêm công việc</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <TopBar />
      <Slidebar />
      <div className="main-content">
        <div className="task-board">
          <div className="task-board__header">
            <h1>Danh sách công việc của tôi</h1>
            <div className="task-board__header-controls">
              <input
                type="text"
                placeholder="Filter by task name..."
              />
              <select>
                <option>Sort By</option>
                <option>Priority</option>
                <option>Due Date</option>
                <option>Name</option>
              </select>
            </div>
          </div>
          
          <div className="task-board__container">
            <Column title="VIỆC CẦN LÀM" tasks={tasks.todo} showAddButton={true} />
            <Column title="VIỆC ĐANG LÀM" tasks={tasks.inProgress} showAddButton={true} />
            <Column title="VIỆC ĐÃ HOÀN THÀNH" tasks={tasks.completed} showAddButton={false} />
          </div>
        </div>
      </div>
      {selectedTask && (
        <TaskDetailModal 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
        />
      )}
      {showAddTaskModal && (  // Add this block
        <AddTaskModal 
          onClose={() => setShowAddTaskModal(false)} 
        />
      )}
    </div>
  );
};

export default TaskBoard;