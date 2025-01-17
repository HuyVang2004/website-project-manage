import axiosClient from './axiosClient';

const helpAPI = {
    // Tạo mới yêu cầu hỗ trợ
    createHelp: (data) => {
        return axiosClient.post('/help', data);
    },

    // Lấy thông tin yêu cầu hỗ trợ bằng ID
    getHelpById: (helpId) => {
        return axiosClient.get(`/help/${helpId}`);
    },

    // Lấy danh sách yêu cầu hỗ trợ của một user
    getHelpByUser: (userId) => {
        return axiosClient.get(`/help/user/${userId}`);
    },

    // Cập nhật yêu cầu hỗ trợ
    updateHelp: (helpId, data) => {
        return axiosClient.put(`/help/${helpId}`, data);
    },

    // Xóa yêu cầu hỗ trợ
    deleteHelp: (helpId) => {
        return axiosClient.delete(`/help/${helpId}`);
    },

    getAllUser: () => {
        return axiosClient.get('/help/');
    }
};

export default helpAPI;
