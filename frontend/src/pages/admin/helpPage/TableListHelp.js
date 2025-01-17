import React, { useState } from "react";
import "./TableListHelp.scss";
import AdminHelpResponse from "./adminHelpRep";
import userAPI from "../../../api/userApi";

const TableListHelp = ({ listHelp }) => {
  const [filters, setFilters] = useState({
    helpType: "",
    createTime: "",
    status: "",
  });

  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [selectedHelp, setSelectedHelp] = useState(null);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const sortedData = Array.isArray(listHelp)
    ? [...listHelp].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (sortConfig.key === "create_time") {
          return sortConfig.direction === "asc"
            ? new Date(aValue) - new Date(bValue)
            : new Date(bValue) - new Date(aValue);
        }
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      })
    : [];

  const filteredData = sortedData.filter((row) => {
    const matchesType = !filters.helpType || row.help_type === filters.helpType;
    const matchesStatus =
      !filters.status || (filters.status === "Đã trả lời" ? row.is_replied : !row.is_replied);
    const matchesDate =
      !filters.createTime || new Date(row.create_time).toISOString().split("T")[0] === filters.createTime;
    return matchesType && matchesStatus && matchesDate;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClickRow = (row) => {
    const fetchData = async () => {
      const userData = await userAPI.getUserInfo(row.user_id);
      setSelectedHelp({
        content: row.content,
        content_admin: row.content_admin,
        create_time: row.create_time,
        help_id: row.help_id,
        help_type: row.help_type,
        is_replied: row.is_replied,
        user_id: row.user_id,
        user: userData,
      });
    };
    fetchData();
  };

  const handleBack = () => {
    setSelectedHelp(null);
  };

  return (
    <div className="wrapper">
      {selectedHelp ? (
        <AdminHelpResponse helpData={selectedHelp} onBack={handleBack} />
      ) : (
        <>
          <div className="filterContainer">
            <select
              value={filters.helpType}
              onChange={(e) => handleFilterChange("helpType", e.target.value)}
            >
              <option value="">Tất cả loại lỗi</option>
              <option value="Tài khoản">Tài khoản</option>
              <option value="Giao diện">Giao diện</option>
              <option value="Dữ liệu">Dữ liệu</option>
              <option value="Khác">Khác</option>
            </select>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="Đã trả lời">Đã trả lời</option>
              <option value="Chưa trả lời">Chưa trả lời</option>
            </select>
            <input
              type="date"
              value={filters.createTime}
              onChange={(e) => handleFilterChange("createTime", e.target.value)}
            />
          </div>

          <div className="tableContainer">
            <div className="headerRow">
              <ColumnHeader
                label="ID người dùng"
                onClick={() => handleSort("user_id")}
                sortConfig={sortConfig}
              />
              <ColumnHeader
                label="Loại lỗi"
                onClick={() => handleSort("help_type")}
                sortConfig={sortConfig}
              />
              <ColumnHeader
                label="Mô tả lỗi"
                onClick={() => handleSort("content")}
                sortConfig={sortConfig}
              />
              <ColumnHeader
                label="Ngày tạo"
                onClick={() => handleSort("create_time")}
                sortConfig={sortConfig}
              />
              <ColumnHeader
                label="Trạng thái"
                onClick={() => handleSort("is_replied")}
                sortConfig={sortConfig}
              />
            </div>

            {currentItems.map((row) => (
              <div
                key={row.help_id}
                className="dataRow clickable"
                onClick={() => handleClickRow(row)}
              >
                <div>{row.user_id}</div>
                <div>{row.help_type}</div>
                <div>{row.content}</div>
                <div>{new Date(row.create_time).toLocaleString("vi-VN")}</div>
                <div className={`status ${row.is_replied ? "replied" : "unreplied"}`}>
                  {row.is_replied ? "Đã trả lời" : "Chưa trả lời"}
                </div>
              </div>
            ))}

            {filteredData.length === 0 && (
              <div className="noData">Không tìm thấy dữ liệu phù hợp.</div>
            )}
          </div>

          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Trước
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Sau
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const ColumnHeader = ({ label, onClick, sortConfig }) => (
  <button onClick={onClick}>
    {label} {sortConfig.key === label && (sortConfig.direction === "asc" ? "↑" : "↓")}
  </button>
);

export default TableListHelp;
