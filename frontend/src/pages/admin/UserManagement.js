import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/SlideBar';
import TopBar from '../../components/Nav/TopBar';
import Footer from '../../components/Footer';
import userAPI from '../../api/userApi';
import './style/UserManagement.scss';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserDetail, setShowUserDetail] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAllUsers();
      setUsers(response.data || response);
      setLoading(false);
    } catch (err) {
      setError('Không thể tải danh sách người dùng');
      setLoading(false);
      console.error('Error fetching users:', err);
    }
  };

  const handleUserSelect = async (userId) => {
    try {
      const userInfo = await userAPI.getUserInfo(userId);
      setSelectedUser(userInfo);
      setShowUserDetail(true);
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };

  const handleDeleteUser = async (username, e) => {
    e.stopPropagation();
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        await userAPI.deleteUser(username);
        fetchUsers();
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    }
  };

  const handleCloseDetail = () => {
    setShowUserDetail(false);
    setSelectedUser(null);
  };

  // Pagination logic
  const usersPerPage = 10;
  const totalPages = Math.ceil(users.length / usersPerPage);
  
  const getCurrentUsers = () => {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    return users.slice(indexOfFirstUser, indexOfLastUser);
  };

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="user-management">
          <h1>Danh sách người dùng</h1>

          <div className="user-table-container">
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên người dùng</th>
                  <th>Email</th>
                  <th>Ngày đăng kí</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentUsers().map((user, index) => (
                  <tr key={user.id} onClick={() => handleUserSelect(user.id)}>
                    <td>{(currentPage - 1) * usersPerPage + index + 1}</td>
                    <td>{user.full_name}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.created_at).toLocaleDateString('vi-VN')}</td>
                    <td>
                      <button 
                        className="edit-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUserSelect(user.id);
                        }}
                      >
                        Chỉnh sửa
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={(e) => handleDeleteUser(user.username, e)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>

          {/* User Detail Modal */}
          {showUserDetail && selectedUser && (
            <div className="user-detail-modal">
              <div className="modal-content">
                <h2>Thông tin chi tiết người dùng</h2>
                <div className="user-info">
                  <div className="info-row">
                    <label>ID:</label>
                    <span>{selectedUser.id}</span>
                  </div>
                  <div className="info-row">
                    <label>Tên:</label>
                    <span>{selectedUser.full_name}</span>
                  </div>
                  <div className="info-row">
                    <label>Email:</label>
                    <span>{selectedUser.email}</span>
                  </div>
                  <div className="info-row">
                    <label>Ngày đăng kí:</label>
                    <span>{new Date(selectedUser.created_at).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>
                <div className="modal-actions">
                  <button className="close-btn" onClick={handleCloseDetail}>
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UserManagement;