import axiosClient from './axiosClient';

const userAPI = {
    // Đăng ký
    register: (data) => {
        return axiosClient.post('/users/register', data);
    },

    // Đăng nhập 
    login: (credentials) => {
      // const { email, password } = credentials;
    
      // // Tạo query string với encodeURIComponent để đảm bảo dữ liệu an toàn
      // const query = `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    
      // Gửi request GET hoặc POST với query string
      return axiosClient.post('/users/login', credentials);
    },

    getCurrentUserInfo: (token) => {
      return axiosClient.get('/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,  // Đảm bảo gửi token trong header
        },
      });
    },

    // Lấy thông tin user
    getUserInfo: (id) => {
        return axiosClient.get(`/users/get-user-info/${id}`);
    },

    getUserInfoEmail: (email) => {
      return axiosClient.get(`/users/get-user-info-email/${email}`);
    },

    // Cập nhật thông tin
    updateUserInfo: (userId, data) => {
        return axiosClient.put(`/users/update-user-info/${userId}`, data);
    },

    // Thay đổi mật khẩu
    changePassword: async (userId, data) => {
        const passwordData = {
          old_password: data.oldPassword,
          new_password: data.newPassword,
        };
        return axiosClient.put(
          `/users/change-password/${userId}?old_password=${encodeURIComponent(passwordData.old_password)}&new_password=${encodeURIComponent(passwordData.new_password)}`
        );
      },
    forgotPassword: (email) => {
      return axiosClient.post(`/users/forgot-password?email=${email}`);
    },

    verifyToken: (token) => {
      return axiosClient.post(`/users/verify-token?token=${token}`);
    },

    // Đặt lại mật khẩu
    resetPassword: (token, newPassword) => {
      return axiosClient.post(`/users/reset-password?token=${token}&new_password=${newPassword}`);
    },

    getUserImage: (userId) => {
      return axiosClient.get(`users/get-image/${userId}`, {
          responseType: 'blob', // Đảm bảo nhận dữ liệu dạng nhị phân (ảnh)
      });
  },
   getAllUsers: () => {
    return axiosClient.get('/admin/users');
},
// Xóa user
deleteUser: (username) => {
  return axiosClient.delete(`/admin/delete-user?username=${encodeURIComponent(username)}`);
},


};

export default userAPI;
