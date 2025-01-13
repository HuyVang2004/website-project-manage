import axiosClient from './axiosClient';

const messageAPI = {
  // Tạo mới tin nhắn
  createMessage: (data) => {
    return axiosClient.post('/messages', data);
  },

  // Lấy tin nhắn theo project
  getMessagesForProject: (projectId, limit = 50, offset = 0) => {
    return axiosClient.get(`/messages/project/${projectId}`, {
      params: { limit, offset },
    });
  },

  // Lấy tin nhắn theo user
  getMessagesForUser: (senderId, limit = 50, offset = 0) => {
    return axiosClient.get(`/messages/user/${senderId}`, {
      params: { limit, offset },
    });
  },

  // Cập nhật nội dung tin nhắn
  updateMessageContent: (messageId, data) => {
    return axiosClient.put(`/messages/${messageId}`, data);
  },

  // Xóa tin nhắn
  deleteMessage: (messageId) => {
    return axiosClient.delete(`/messages/${messageId}`);
  },
};

export default messageAPI;
