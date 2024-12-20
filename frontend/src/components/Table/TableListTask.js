import React, { useState } from 'react';
import './TableListTask.scss';


/*Dữ liệu đầu vào dạng như sau: const tableData = [
      { task: "Website Redesign", priority: "Cao", dueDate: "2024-12-23", status: "Đang thực hiện" },
      { task: "Landing Page Redesign",  priority: "Cao", dueDate: "2024-12-30", status: "Hoàn thành" },
*/

const TableListTask = ({ data }) => {
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
    const itemsPerPage = 4; // Number of items per page

    const handleFilterChange = (field, value) => {
      setFilters(prev => {
        const updatedFilters = { ...prev, [field]: value };

        // Kiểm tra nếu tất cả bộ lọc đều rỗng
        if (!updatedFilters.priority && !updatedFilters.status && !updatedFilters.dueDate) {
            return { priority: '', status: '', dueDate: '' }; // Reset về trạng thái ban đầu
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

    const sortedData = [...data].sort((a, b) => {
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

    const filteredData = sortedData.filter(row => {
        const matchesPriority = filters.priority ? row.priority.includes(filters.priority) : true;
        const matchesStatus = filters.status ? row.status.includes(filters.status) : true;
        const matchesDueDate = filters.dueDate ? row.dueDate === filters.dueDate : true;
        return matchesPriority && matchesStatus && matchesDueDate;
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
                        <option value="Cao">Cao</option>
                        <option value="Trung bình">Trung bình</option>
                        <option value="Thấp">Thấp</option>
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
      onClick={() => onSort('task')}
      isSorted={sortConfig.key === 'task'}
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
  }

  let priorityClass = 'priority';
  if (row.priority === 'Cao'){
    priorityClass = 'priority high';
  } else if (row.priority === 'Trung bình'){
    priorityClass = 'priority avg';
  } else if (row.priority === 'Thấp'){
    priorityClass = 'priority low';
  }
  return (
    <div className="row-container">
      <Cell>
              <div className="project">
                  <div className="icon"></div>
                  <div>
                      <div className="project-title">{row.task}</div>
                  </div>
              </div>
      </Cell>
      <Cell>
        <div className={priorityClass}>
          {row.priority}
        </div>
      </Cell>
      <Cell>{row.dueDate}</Cell>
      <Cell>
        <div className={statusClass}>
          {row.status}
        </div>
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

