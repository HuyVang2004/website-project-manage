import axiosClient from './axiosClient';

const commentAPI = {
    // Tạo mới comment
    createComment: (data) => {
        return axiosClient.post('/comments', data);
    },

    // Lấy thông tin comment theo ID
    getCommentById: (commentId) => {
        return axiosClient.get(`/comments/${commentId}`);
    },

    // Lấy danh sách comment theo Task ID
    getCommentsByTask: (taskId) => {
        return axiosClient.get(`/comments/task/${taskId}`);
    },

    // Cập nhật comment
    updateComment: (commentId, data) => {
        return axiosClient.put(`/comments/${commentId}`, data);
    },

    // Xóa comment
    deleteComment: (commentId) => {
        return axiosClient.delete(`/comments/${commentId}`);
    },
};

export default commentAPI;
