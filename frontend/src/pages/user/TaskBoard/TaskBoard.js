import React, { useState, useEffect, useCallback } from 'react';
import { Plus, MessageCircle, Paperclip, Clock } from 'lucide-react';
import "./TaskBoard.scss";
import TopBar from '../../../components/Nav/TopBar';
import Slidebar from '../../../components/SlideBar';
import TaskDetailModal from './TaskDetailModal';
import AddTaskModal from './AddTaskModal';  // Add this import
import getListTaskData from '../../../api/tasks/getListTaskData';
import commentAPI from '../../../api/commentApi';
import userAPI from '../../../api/userApi';

const TaskBoard = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
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
        console.log(taskList);
        // Phân loại các công việc vào các trạng thái khác nhau
        const todo = taskList.filter((task) => task.status === 'Chưa bắt đầu');
        const inProgress = taskList.filter((task) => task.status === 'Đang tiến hành');
        const completed = taskList.filter((task) => task.status === 'Đã hoàn thành');
        
        setTasks({ todo, inProgress, completed });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [userId]);

  
  const handleClick = async (task) => {
    try {
      // Gọi API để lấy danh sách comment của task
      const responseComment = await commentAPI.getCommentsByTask(task.taskId);
  
      // Tạo danh sách comments mới có thêm thông tin username
      const commentsWithUsernames = await Promise.all(
        responseComment.map(async (comment) => {
          // Gọi API lấy thông tin user dựa trên created_by
          const userInfo = await userAPI.getUserInfo(comment.created_by);
          return {
            ...comment,
            username: userInfo.username || "Unknown User", 
          };
        })
      );
      setSelectedTask({
        task,
        comments: commentsWithUsernames,
      });
    } catch (error) {
      console.error("Error fetching comments or user info:", error);
    }
  };


  // console.log(tasks);
  const handleSort = useCallback((e) => {
    try {
      const value = e.target.value;
      setSortBy(value);
      
      if (!value) return;

      setTasks(prevTasks => {
        const newTasks = {};
        Object.keys(prevTasks).forEach(key => {
          if (!Array.isArray(prevTasks[key])) {
            newTasks[key] = [];
            return;
          }
          
          newTasks[key] = [...prevTasks[key]].sort((a, b) => {
            try {
              switch(value) {
                case 'priority':
                  return (b?.priority || '').localeCompare(a?.priority || '');
                case 'dueDate':
                  return new Date(a?.dueDate || 0) - new Date(b?.dueDate || 0);
                case 'name':
                  return (a?.taskName || '').localeCompare(b?.taskName || ''); 
                default:
                  return 0;
              }
            } catch (error) {
              console.error('Sort comparison error:', error);
              return 0;
            }
          });
        });
        return newTasks;
      });
    } catch (error) {
      console.error('Sort error:', error);
    }
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const getFilteredTasks = useCallback((taskList) => {
    if (!Array.isArray(taskList)) return [];
    if (!searchTerm) return taskList;

    return taskList.filter(task => {
      try {
        return task?.taskName?.toLowerCase().includes(searchTerm.toLowerCase());
      } catch (error) {
        console.error('Filter error:', error);
        return false;
      }
    });
  }, [searchTerm]);


  const TaskCard = React.memo(({ task }) => (
    <div className="task-board__card" onClick={handleClick(task)}>
      <h3 className="task-board__card-title">{task?.taskName || 'Untitled Task'}</h3>
      <div className={`task-board__card-priority ${task?.priority?.toLowerCase() || 'Cao'}`}>
        {task?.priority || 'Cao'} priority
      </div>
      <div className="task-board__card-footer">
        <div className="metrics">
          <div className="metrics-item">
            <Clock className="icon" />
            <span>{task?.dueDate || 0} Days</span>
          </div>
          {/* <div className="metrics-item">
            <Paperclip className="icon" />
            <span>{task?.attachments || 0}</span>
          </div> */}
          <div className="metrics-item">
            <MessageCircle className="icon" />
            <span>{task?.comments || 0}</span>
          </div>
        </div>
        <div className="assignees">
          {(task?.attendees || []).map((member) => (
            <div key={member?.user_id} className="assignees-avatar">
              {member?.username?.[0] || '?'}
            </div>
          ))}
        </div>
      </div>
    </div>
  ));

  const Column = React.memo(({ title, tasks = [], status, showAddButton }) => (
    <div className="task-board__column">
      <h2 className="task-board__column-header">{title}</h2>
      <div className="task-board__column-content">
        {getFilteredTasks(tasks).map(task => (
          <TaskCard key={task?.task_id} task={task} />
        ))}
        {showAddButton && (
          <button 
            className="task-board__add-button"
            onClick={() => setShowAddTaskModal({ isOpen: true, status: status })}
          >
            <Plus />
            <span>Thêm công việc</span>
          </button>
        )}
      </div>
    </div>
  ));

  const handleAddTask = useCallback((status, newTask) => {
    try {
      if (status === "todo") {
        setTasks(prev => ({
          ...prev,
          todo: [...(prev.todo || []), newTask]
        }));
      } else if (status === "inProgress") {
        setTasks(prev => ({
          ...prev,
          inProgress: [...(prev.inProgress || []), newTask]
        }));
      }
      setShowAddTaskModal({ isOpen: false, status: "" });
    } catch (error) {
      console.error('Add task error:', error);
    }
  }, []);

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
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Filter by task name..."
              />
              <select value={sortBy} onChange={handleSort}>
                <option value="">Sort By</option>
                <option value="priority">Priority</option>
                <option value="dueDate">Due Date</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>  
          
          <div className="task-board__container">
            <Column title="VIỆC CẦN LÀM" tasks={tasks.todo} status="todo" showAddButton={true} />
            <Column title="VIỆC ĐANG LÀM" tasks={tasks.inProgress} status="inProgress" showAddButton={true} />
            <Column title="VIỆC ĐÃ HOÀN THÀNH" tasks={tasks.completed} status="completed" showAddButton={false} />
          </div>
        </div>
      </div>

      {selectedTask && (
        <TaskDetailModal 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
        />
      )}
      {showAddTaskModal.isOpen && (
        <AddTaskModal 
          status={showAddTaskModal.status}
          onClose={() => setShowAddTaskModal({ isOpen: false, status: "" })}
          onAddTask={handleAddTask}
        />
      )}
    </div>
  );
};

export default TaskBoard;