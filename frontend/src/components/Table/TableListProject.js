import React, { useState, useEffect } from 'react';
import './TableListProject.scss';
import { ROUTERS } from '../../utils/router';
import { useNavigate } from 'react-router-dom';

const TableListProject = ({data}) => {
    const [filters, setFilters] = useState({
        progress: '',
        status: '',
        dueDate: '',
    });
    const navigate = useNavigate()
    const [sortConfig, setSortConfig] = useState({
        key: '',
        direction: 'asc',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; // Number of items per page

    const handleFilterChange = (field, value) => {
        setFilters(prev => {
            const updatedFilters = { ...prev, [field]: value };

            // Reset filters if all are empty
            if (!updatedFilters.progress && !updatedFilters.status && !updatedFilters.dueDate) {
                return { progress: '', status: '', dueDate: '' };
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

    const handleRowClick = (projectId) => {
        navigate(`${ROUTERS.USER.PROJECT.PROJECTDETAILS}/${projectId}`); // Navigate to project details page
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
        const matchesProgress = filters.progress ? row.progress.toString().includes(filters.progress) : true;
        const matchesStatus = filters.status ? row.status === filters.status : true;
        const rowDateParts = row.dueDate.split(' '); // Tách giờ và ngày
        const rowDate = new Date(rowDateParts[1].split('/').reverse().join('-') + 'T' + rowDateParts[0]); // Chuyển sang định dạng yyyy-MM-dd
        const filterDate = filters.dueDate ? new Date(filters.dueDate) : null;
        const matchesDueDate = filterDate ? 
        rowDate.setHours(0, 0, 0, 0) === filterDate.setHours(0, 0, 0, 0) : true;
        // console.log(filters.dueDate);
        // console.log(row.dueDate);
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
                    <input
                        type="text"
                        placeholder="Filter by Progress (e.g., 80%)"
                        value={filters.progress}
                        onChange={(e) => handleFilterChange('progress', e.target.value)}
                        className="filter-input"
                    />
                    <select
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        onClick={() => {console.log("Click")}}
                        className="filter-select"
                    >
                        <option value="">Tất cả trạng thái</option>
                        <option value="đang tiến hành">Đang thực hiện</option>
                        <option value="chưa bắt đầu">Chưa bắt đầu</option>
                        <option value="hoàn thành">Hoàn thành</option>
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
                    <Row key={index} row={row} onClick={() => handleRowClick(row.projectId)} />
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
            label="Dự án"
            onClick={() => onSort('project')}
            isSorted={sortConfig.key === 'project'}
            direction={sortConfig.direction}
        />
        <ColumnHeader
            label="Tiến độ"
            onClick={() => onSort('progress')}
            isSorted={sortConfig.key === 'progress'}
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

const Row = ({ row , onClick}) => {
    const progressPercentage = parseInt(row.progress);
    const progressClass = progressPercentage === 100 ? 'progress-100' : 'progress-80';

    let statusClass = 'status';
    if (row.status === 'đang tiến hành') {
        statusClass = 'status in-progress';
    } else if (row.status === 'hhoàn thành') {
        statusClass = 'status finished';
    } else if (row.status === 'chưa bắt đầu') {
        statusClass = 'status unfinished';
    }
    return (
        <div className="row-container" onClick={onClick} style={{ cursor: 'pointer' }}>
            <Cell>
                <div className="project">
                    <div className="icon">
                        <img src={row.image} className='icon'></img>
                    </div>
                    <div>
                        <div className="project-title">{row.projectName}</div>
                    </div>
                </div>
            </Cell>
            <Cell>
                <div className="progress-container">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{
                                width: `${progressPercentage}%`,
                                background: progressPercentage === 100 ? '#1A9882' : '#F86624',
                            }}
                        />
                    </div>
                    <div className={`progress-text ${progressClass}`}>{`${progressPercentage}%`}</div>
                </div>
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

export default TableListProject; 

 