import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/SlideBar';
import TopBar from '../../components/Nav/TopBar';
import Footer from '../../components/Footer';
import userAPI from '../../api/userApi';
import './style/UserManagement.scss';

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
        setLoading(true);
        const response = await userAPI.getAllUsers();
        console.log('Users data:', response.data || response);
        // Log chi tiết một user để xem cấu trúc
        if ((response.data || response).length > 0) {
            console.log('Sample user structure:', (response.data || response)[0]);
        }
        setUsers(response.data || response);
        setLoading(false);
    } catch (err) {
        setError('Không thể tải danh sách người dùng');
        setLoading(false);
        console.error('Error fetching users:', err);
    }
};

  const handleUserClick = (user) => {
    // Log để debug
    console.log('Clicked user:', user);
    
    // Kiểm tra và sử dụng user_id hoặc id
    const userId = user.user_id || user.id;
    
    if (!userId) {
      console.error('User ID is undefined:', user);
      return;
    }
    
    navigate(`/admin/users/details/${userId}`);
  };

  const handleDelete = async (user, e) => {
    e.stopPropagation();
    // Log để debug
    console.log('Attempting to delete user:', user);
    console.log('Username:', user.username);
    
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
        try {
            // Đảm bảo username tồn tại trước khi gọi API
            if (!user.username) {
                throw new Error('Username không tồn tại');
            }
            
            await userAPI.deleteUser(user.username);
            await fetchUsers();
            alert('Người dùng đã được xóa thành công.');
        } catch (error) {
            console.error('Lỗi khi xóa người dùng:', error);
            alert('Đã xảy ra lỗi khi xóa người dùng: ' + error.message);
        }
    }
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
                  <th>STT</th>
                  <th>Tên người dùng</th>
                  <th>Email</th>
                  <th>Ngày đăng kí</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentUsers().map((user, index) => (
                  <tr 
                    key={user.user_id || user.id || index} 
                    onClick={() => handleUserClick(user)}
                    style={{ cursor: 'pointer' }}
                    className="user-row"
                  >
                    <td>{(currentPage - 1) * usersPerPage + index + 1}</td>
                    <td>{user.full_name}</td>
                    <td>{user.email}</td>
                    <td>{new Date(user.created_at).toLocaleDateString('vi-VN')}</td>
                    <td>
                      <button 
                        className="edit-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUserClick(user);
                        }}
                      >
                        Chi tiết
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={(e) => handleDelete(user,e)}
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
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UserManagement;