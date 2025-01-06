import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/SlideBar';
import TopBar from '../../components/Nav/TopBar';
import Footer from '../../components/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import './style/UserManagement.scss';
import { users as initialUsers } from './data/UserData';

const UserManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);

  useEffect(() => {
    const filter = location.state?.filter;
    if (filter === 'active') {
      setFilteredUsers(initialUsers.filter(user => user.status === 'Hoạt động'));
    } else if (filter === 'inactive') {
      setFilteredUsers(initialUsers.filter(user => user.status === 'Bị khóa'));
    } else {
      setFilteredUsers(initialUsers);
    }
    setCurrentPage(1); // Reset về trang 1 khi thay đổi bộ lọc
  }, [location.state?.filter]);

  const usersPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const getCurrentUsers = () => {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    return filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  };

  const handleUserSelect = (user) => {
    navigate(`/admin/users/details/${user.id}`, { state: { user } });
  };

  const handleEdit = (user, e) => {
    e.stopPropagation();
    setEditingUser({ ...user });
    setIsEditModalOpen(true);
  };

  const handleDelete = (userId, e) => {
    e.stopPropagation();
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setFilteredUsers(filteredUsers.filter(user => user.id !== userId));
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setFilteredUsers(filteredUsers.map(user => (user.id === editingUser.id ? editingUser : user)));
    setIsEditModalOpen(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser(prev => ({ ...prev, [name]: value }));
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  // Thêm phần hiển thị tiêu đề theo trạng thái lọc
  const getFilterTitle = () => {
    const filter = location.state?.filter;
    if (filter === 'active') return 'Danh sách người dùng đang hoạt động';
    if (filter === 'inactive') return 'Danh sách người dùng bị khóa';
    return 'Danh sách tất cả người dùng';
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="user-management">
          <h1>{getFilterTitle()}</h1>

          {/* User List Table */}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên người dùng</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th>Lần truy cập gần nhất</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentUsers().map((user) => (
                <tr key={user.id} onClick={() => handleUserSelect(user)}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.lastLogin}</td>
                  <td>{user.status}</td>
                  <td>
                    <button className="edit-btn" onClick={(e) => handleEdit(user, e)}>
                      Chỉnh sửa
                    </button>
                    <button className="delete-btn" onClick={(e) => handleDelete(user.id, e)}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Edit Modal */}
          {isEditModalOpen && editingUser && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>Chỉnh sửa thông tin người dùng</h2>
                <form onSubmit={handleSaveEdit}>
                  <div className="form-group">
                    <label>Tên người dùng:</label>
                    <input
                      type="text"
                      name="name"
                      value={editingUser.name}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Giới tính:</label>
                    <select
                      name="gender"
                      value={editingUser.gender}
                      onChange={handleEditInputChange}
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Số điện thoại:</label>
                    <input
                      type="text"
                      name="phone"
                      value={editingUser.phone}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={editingUser.email}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Trạng thái:</label>
                    <select
                      name="status"
                      value={editingUser.status}
                      onChange={handleEditInputChange}
                    >
                      <option value="Hoạt động">Hoạt động</option>
                      <option value="Bị khóa">Bị khóa</option>
                    </select>
                  </div>
                  <div className="modal-buttons">
                    <button type="button" className="cancel-btn" onClick={handleCloseModal}>
                      Hủy
                    </button>
                    <button type="submit" className="save-btn">Lưu</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(prev => prev - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={currentPage === i + 1 ? 'active' : ''}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UserManagement;