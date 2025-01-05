import React, { useState, useEffect } from 'react';
import './TableListTask.scss';
import taskRoleAPI from '../../api/taskRoleApi';
import taskAPI from '../../api/tasksApi';

const TableListTask = () => {
  const userData = JSON.parse(localStorage.getItem('user_profile'));
  let userId = ""
  try {
    userId = userData.user_id;
  } catch (err) {
    console.log(err);
  }
  const [filters, setFilters] = useState({
    priority: '',
    status: '',
    dueDate: '',
  });
  const [sortConfig, setSortConfig] = useState({
    key: '',
    direction: 'asc',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; 

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch task roles by user
    const fetchTaskRoles = async (userId) => {
      try {
        // Get task roles for the user
        const taskRolesResponse = await taskRoleAPI.getTaskRolesByUser(userId);
        const taskIds = taskRolesResponse.map((role) => role.task_id);
        console.log("Task ID",taskIds);
        // Fetch tasks by their task_ids
        const tasksPromises = taskIds.map((taskId) => taskAPI.getTaskById(taskId));
        const tasksResponse = await Promise.all(tasksPromises);
        console.log("task", tasksResponse)
        // Format and set tasks state
        const formattedTasks = tasksResponse.map((task) => ({
          taskId: task.task_id,
          taskName: task.task_name,
          status: task.status,
          dueDate: new Date(task.due_date).toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }),
          priority: task.priority || 'Không xác định', // Default if priority is not provided
        }));
        localStorage.setItem('list_task', formattedTasks);
        setTasks(formattedTasks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching task roles or tasks:', error);
        setError('Failed to fetch tasks');
        setLoading(false);
      }
    };

    fetchTaskRoles(userId); // Pass userID from props to fetch task roles
  }, [userId]); // Dependency array to re-fetch tasks when userID changes

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleFilterChange = (field, value) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev, [field]: value };

      // Reset filters if all are empty
      if (!updatedFilters.priority && !updatedFilters.status && !updatedFilters.dueDate) {
        return { priority: '', status: '', dueDate: '' }; // Reset to initial state
      }

      return updatedFilters;
    });
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sorting function
  const sortedData = [...tasks].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  // Filtering data
  const filteredData = sortedData.filter(row => {
    const matchesProgress = filters.progress ? row.progress.toString().includes(filters.progress) : true;
    const matchesStatus = filters.status ? row.status === filters.status : true;
    const rowDateParts = row.dueDate.split(' '); // Tách giờ và ngày
    const rowDate = new Date(rowDateParts[1].split('/').reverse().join('-') + 'T' + rowDateParts[0]); // Chuyển sang định dạng yyyy-MM-dd
    const filterDate = filters.dueDate ? new Date(filters.dueDate) : null;
    const matchesDueDate = filterDate ? 
    rowDate.setHours(0, 0, 0, 0) === filterDate.setHours(0, 0, 0, 0) : true;
    console.log(filters.dueDate);
    console.log(row.dueDate);
    return matchesProgress && matchesStatus && matchesDueDate;
});

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div className="table-container">
        <div className="filters">
          <select
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="filter-select"
          >
            <option value="">Tất cả độ ưu tiên</option>
            <option value="cao">Cao</option>
            <option value="trung bình">Trung bình</option>
            <option value="thấp">Thấp</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="filter-select"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="Đang thực hiện">Đang thực hiện</option>
            <option value="Không hoàn thành">Không hoàn thành</option>
            <option value="Đã hoàn thành">Đã hoàn thành</option>
            <option value="chưa bắt đầu">Chưa bắt đầu</option>
          </select>

          <input
            type="date"
            value={filters.dueDate}
            onChange={(e) => handleFilterChange('dueDate', e.target.value)}
            className="filter-input"
          />
        </div>
        <Header onSort={handleSort} sortConfig={sortConfig} />
        {currentItems.map((row, index) => (
          <Row key={index} row={row} />
        ))}
        {filteredData.length === 0 && <div className="no-data">No data matches your filters.</div>}

        {/* Pagination Controls */}
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

const Header = ({ onSort, sortConfig }) => (
  <div className="header-container">
    <ColumnHeader
      label="Công việc"
      onClick={() => onSort('taskName')}
      isSorted={sortConfig.key === 'taskName'}
      direction={sortConfig.direction}
    />
    <ColumnHeader
      label="Mức độ ưu tiên"
      onClick={() => onSort('priority')}
      isSorted={sortConfig.key === 'priority'}
      direction={sortConfig.direction}
    />
    <ColumnHeader
      label="Ngày đến hạn"
      onClick={() => onSort('dueDate')}
      isSorted={sortConfig.key === 'dueDate'}
      direction={sortConfig.direction}
    />
    <ColumnHeader
      label="Trạng thái"
      onClick={() => onSort('status')}
      isSorted={sortConfig.key === 'status'}
      direction={sortConfig.direction}
    />
  </div>
);

const Row = ({ row }) => {
  let statusClass = 'status';
  if (row.status === 'Đang thực hiện') {
    statusClass = 'status in-progress';
  } else if (row.status === 'Hoàn thành') {
    statusClass = 'status finished';
  } else if (row.status === 'Không hoàn thành') {
    statusClass = 'status unfinished';
  } else if (row.status === 'chưa bắt đầu') {
    statusClass = 'status begin';
  }

  let priorityClass = 'priority';
  if (row.priority === 'Cao') {
    priorityClass = 'priority high';
  } else if (row.priority === 'Trung bình') {
    priorityClass = 'priority avg';
  } else if (row.priority === 'Thấp') {
    priorityClass = 'priority low';
  }
  return (
    <div className="row-container">
      <Cell>
        <div className="project">
          <div className="icon"></div>
          <div>
            <div className="project-title">{row.taskName}</div>
          </div>
        </div>
      </Cell>
      <Cell>
        <div className={priorityClass}>{row.priority}</div>
      </Cell>
      <Cell>{row.dueDate}</Cell>
      <Cell>
        <div className={statusClass}>{row.status}</div>
      </Cell>
    </div>
  );
};

const ColumnHeader = ({ label, onClick, isSorted, direction }) => (
  <div className={`column-header ${isSorted ? 'sorted' : ''}`} onClick={onClick}>
    {label}
    {isSorted && (direction === 'asc' ? ' ↑' : ' ↓')}
  </div>
);

const Cell = ({ children }) => <div className="cell">{children}</div>;

export default TableListTask;
