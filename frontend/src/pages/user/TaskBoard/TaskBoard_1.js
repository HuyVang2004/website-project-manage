import React, { useState, useEffect } from 'react';
import { Plus, MessageCircle, Paperclip, Clock } from 'lucide-react';
import "./TaskBoard.scss";
import TopBar from '../../../components/Nav/TopBar';
import Slidebar from '../../../components/SlideBar';
import TaskDetailModal from './TaskDetailModal';
import AddTaskModal from './AddTaskModal';  // Add this import
import getListTaskData from '../../../api/tasks/getListTaskData';

const TaskBoard = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddTaskModal, setShowAddTaskModal] = useState({ isOpen: false, status: "" });  // Add this state
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: []
  });
  const userData = JSON.parse(localStorage.getItem("user_profile") || "{}");
  const userId = userData?.user_id || "";

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskList = await getListTaskData(userId);
        // Phân loại các công việc vào các trạng thái khác nhau
        const todo = taskList.filter((task) => task.status === 'chưa bắt đầu');
        const inProgress = taskList.filter((task) => task.status === 'đang tiến hành');
        const completed = taskList.filter((task) => task.status === 'đã hoàn thành');
        
        setTasks({ todo, inProgress, completed });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [userId]);

  const TaskCard = ({ task }) => (
    <div className="task-board__card" onClick={() => setSelectedTask(task)}>
      <h3 className="task-board__card-title">{task.taskName}</h3>
      <div className="task-board__card-priority">{task.priority}</div>
      <div className="task-board__card-footer">
        <div className="metrics">
          <div className="metrics-item">
            <Clock />
            <span>{task.dueDate} Days</span>
          </div>
          <div className="metrics-item">
            <Paperclip />
            <span>{task.attachments || 0}</span>
          </div>
          <div className="metrics-item">
            <MessageCircle />
            <span>{task.comments || 0}</span>
          </div>
        </div>
        {/* <div className="assignees">
          {task.members.map((member, idx) => (
            <div key={idx} className="assignees-avatar">
              {member.name[0]}
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );

  // Modified Column component to handle add button click
  const Column = ({ title, tasks, showAddButton, status }) => (
    <div className="task-board__column">
      <h2 className="task-board__column-header">{title}</h2>
      <div className="task-board__column-content">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
        {showAddButton && (
          <button 
            className="task-board__add-button"
            onClick={() => setShowAddTaskModal({ isOpen: true, status })}  // Modified this line
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
            <Column title="VIỆC CẦN LÀM" tasks={tasks.todo} showAddButton={true} status={"Chưa bắt đầu"}/>
            <Column title="VIỆC ĐANG LÀM" tasks={tasks.inProgress} showAddButton={true} status={"Đang tiến hành"} />
            <Column title="VIỆC ĐÃ HOÀN THÀNH" tasks={tasks.completed} showAddButton={false} status={"Đã hoàn thành"}/>
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
          status={showAddTaskModal.status}
          onClose={() => setShowAddTaskModal(false)} 
        />
      )}
    </div>
  );
};

export default TaskBoard;