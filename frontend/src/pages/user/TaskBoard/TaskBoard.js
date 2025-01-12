import React, { useState, useCallback } from 'react';
import { Plus, MessageCircle, Paperclip, Clock } from 'lucide-react';
import "./TaskBoard.scss";
import TopBar from '../../../components/Nav/TopBar';
import Slidebar from '../../../components/SlideBar';
import TaskDetailModal from './TaskDetailModal';
import AddTaskModal from './AddTaskModal';

const TaskBoard = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
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
    ],
    inProgress: [],
    completed: []
  });

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
                  return new Date(a?.deadline || 0) - new Date(b?.deadline || 0);
                case 'name':
                  return (a?.title || '').localeCompare(b?.title || '');
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
        return task?.title?.toLowerCase().includes(searchTerm.toLowerCase());
      } catch (error) {
        console.error('Filter error:', error);
        return false;
      }
    });
  }, [searchTerm]);

  const TaskCard = React.memo(({ task }) => (
    <div className="task-board__card" onClick={() => setSelectedTask(task)}>
      <h3 className="task-board__card-title">{task?.title || 'Untitled Task'}</h3>
      <div className={`task-board__card-priority ${task?.priority?.toLowerCase() || 'medium'}`}>
        {task?.priority || 'Medium'} priority
      </div>
      <div className="task-board__card-footer">
        <div className="metrics">
          <div className="metrics-item">
            <Clock className="icon" />
            <span>{task?.days || 0} Days</span>
          </div>
          <div className="metrics-item">
            <Paperclip className="icon" />
            <span>{task?.attachments || 0}</span>
          </div>
          <div className="metrics-item">
            <MessageCircle className="icon" />
            <span>{task?.comments || 0}</span>
          </div>
        </div>
        <div className="assignees">
          {(task?.members || []).map((member) => (
            <div key={member?.id} className="assignees-avatar">
              {member?.name?.[0] || '?'}
            </div>
          ))}
        </div>
      </div>
    </div>
  ));

  const Column = React.memo(({ title, tasks = [], showAddButton }) => (
    <div className="task-board__column">
      <h2 className="task-board__column-header">{title}</h2>
      <div className="task-board__column-content">
        {getFilteredTasks(tasks).map(task => (
          <TaskCard key={task?.id} task={task} />
        ))}
        {showAddButton && (
          <button 
            className="task-board__add-button"
            onClick={() => setShowAddTaskModal(true)}
          >
            <Plus />
            <span>Thêm công việc</span>
          </button>
        )}
      </div>
    </div>
  ));

  const handleAddTask = useCallback((newTask) => {
    try {
      setTasks(prev => ({
        ...prev,
        todo: [...(prev.todo || []), newTask]
      }));
      setShowAddTaskModal(false);
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
      {showAddTaskModal && (
        <AddTaskModal 
          onClose={() => setShowAddTaskModal(false)}
          onAddTask={handleAddTask}
        />
      )}
    </div>
  );
};

export default TaskBoard;