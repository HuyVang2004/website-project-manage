
import React, { useState } from 'react';
import Sidebar from '../../components/SlideBar';
import TopBar from '../../components/topBar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
import './style/UserManagement.scss';

const UserManagement = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([
    // Your users array here
      { id: 1, name: 'Lionel Messi', phone: '(225) 555-0118', email: 'messi@psg.com', lastLogin: '2024-12-12 23:00:00', status: 'Hoạt động' },
      { id: 2, name: 'Cristiano Ronaldo', phone: '(205) 555-0100', email: 'ronaldo@alnassr.com', lastLogin: '2024-12-12 23:00:00', status: 'Bị khóa' },
      { id: 3, name: 'Neymar Jr', phone: '(302) 555-0107', email: 'neymar@psg.com', lastLogin: '2024-12-12 23:00:00', status: 'Hoạt động' },
      { id: 4, name: 'Kylian Mbappé', phone: '(252) 555-0126', email: 'mbappe@psg.com', lastLogin: '2024-12-12 23:00:00', status: 'Hoạt động' },
      { id: 5, name: 'Robert Lewandowski', phone: '(629) 555-0129', email: 'lewandowski@barcelona.com', lastLogin: '2024-12-12 23:00:00', status: 'Bị khóa' },
      { id: 6, name: 'Kevin De Bruyne', phone: '(406) 555-0120', email: 'debruyne@manchestercity.com', lastLogin: '2024-12-12 23:00:00', status: 'Hoạt động' },
      { id: 7, name: 'Mohamed Salah', phone: '(208) 555-0112', email: 'salah@liverpool.com', lastLogin: '2024-12-12 23:00:00', status: 'Hoạt động' },
      { id: 8, name: 'Virgil Van Dijk', phone: '(704) 555-0127', email: 'vandijk@liverpool.com', lastLogin: '2024-12-12 23:00:00', status: 'Bị khóa' },
      { id: 9, name: 'Harry Kane', phone: '(611) 282-6448', email: 'kane@tottenham.com', lastLogin: '2024-01-01 11:33:28', status: 'Bị khóa' },
      { id: 10, name: 'Sadio Mané', phone: '(420) 460-3554', email: 'mane@bayernmunich.com', lastLogin: '2024-06-28 11:33:28', status: 'Hoạt động' },
      { id: 11, name: 'Erling Haaland', phone: '(586) 647-3541', email: 'haaland@manchestercity.com', lastLogin: '2024-06-23 11:33:28', status: 'Hoạt động' },
      { id: 12, name: 'Karim Benzema', phone: '(605) 297-1437', email: 'benzema@realmadrid.com', lastLogin: '2024-09-07 11:33:28', status: 'Bị khóa' },
      { id: 13, name: 'Luka Modrić', phone: '(928) 323-2751', email: 'modric@realmadrid.com', lastLogin: '2024-07-13 11:33:28', status: 'Hoạt động' },
      { id: 14, name: 'Toni Kroos', phone: '(612) 221-6640', email: 'kroos@realmadrid.com', lastLogin: '2024-10-10 11:33:28', status: 'Hoạt động' },
      { id: 15, name: 'Gareth Bale', phone: '(813) 757-4075', email: 'bale@realmadrid.com', lastLogin: '2024-05-29 11:33:28', status: 'Bị khóa' },
      { id: 16, name: 'Raheem Sterling', phone: '(570) 259-1318', email: 'sterling@chelsea.com', lastLogin: '2024-09-26 11:33:28', status: 'Bị khóa' },
      { id: 17, name: 'Sergio Ramos', phone: '(870) 975-7277', email: 'ramos@sevilla.com', lastLogin: '2024-08-01 11:33:28', status: 'Hoạt động' },
      { id: 18, name: 'Gerard Piqué', phone: '(505) 877-8624', email: 'pique@barcelona.com', lastLogin: '2024-07-05 11:33:28', status: 'Hoạt động' },
      { id: 19, name: 'Zlatan Ibrahimović', phone: '(912) 469-9083', email: 'zlatan@acmilan.com', lastLogin: '2024-07-16 11:33:28', status: 'Bị khóa' },
      { id: 20, name: 'Andrés Iniesta', phone: '(307) 386-5554', email: 'iniesta@vissel-kobe.com', lastLogin: '2023-12-24 11:33:28', status: 'Bị khóa' },
      { id: 21, name: 'Xavi Hernandez', phone: '(304) 277-8953', email: 'xavi@barcelona.com', lastLogin: '2024-01-10 11:33:28', status: 'Bị khóa' },
      { id: 22, name: 'Thomas Müller', phone: '(336) 929-2191', email: 'muller@bayernmunich.com', lastLogin: '2024-05-22 11:33:28', status: 'Hoạt động' },
      { id: 23, name: 'Manuel Neuer', phone: '(879) 973-7791', email: 'neuer@bayernmunich.com', lastLogin: '2023-12-24 11:33:28', status: 'Bị khóa' },
      { id: 24, name: 'Paul Pogba', phone: '(572) 833-2141', email: 'pogba@juventus.com', lastLogin: '2024-06-27 11:33:28', status: 'Bị khóa' },
      { id: 25, name: 'David Alaba', phone: '(774) 241-6595', email: 'alaba@realmadrid.com', lastLogin: '2024-12-12 11:33:28', status: 'Bị khóa' },
      { id: 26, name: 'Jadon Sancho', phone: '(724) 967-6749', email: 'sancho@manutd.com', lastLogin: '2024-04-14 11:33:28', status: 'Bị khóa' },
      { id: 27, name: 'Bruno Fernandes', phone: '(976) 869-6462', email: 'fernandes@manutd.com', lastLogin: '2024-04-30 11:33:28', status: 'Hoạt động' },
      { id: 28, name: 'Marcus Rashford', phone: '(679) 702-5885', email: 'rashford@manutd.com', lastLogin: '2024-05-06 11:33:28', status: 'Hoạt động' }
  
  ]);

  const usersPerPage = 10;
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Get current users for pagination
  const getCurrentUsers = () => {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    return users.slice(indexOfFirstUser, indexOfLastUser);
  };

  // Handle user selection for detailed view
  const handleUserSelect = (user) => {
    navigate(`/admin/users/details/${user.id}`, { state: { user } });
  };
  // Handle edit user
  const handleEdit = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
};


  // Handle delete user
  const handleDelete = (userId, e) => {
    e.stopPropagation();
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

   // Handle save edited user
   const handleSaveEdit = () => {
    setUsers(users.map(user => (user.id === editingUser.id ? editingUser : user)));
    setIsEditModalOpen(false);
};

  // Handle input change in edit form
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser(prev => ({ ...prev, [name]: value }));
};

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="user-management">
          <h1>Quản lý người dùng</h1>
          
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