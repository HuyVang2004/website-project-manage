import axiosClient from "./axiosClient";

const notificationsAPI = {
  // Fetch a notification by ID
  getNotificationById: (notificationId) => {
    return axiosClient.get(`notifications/${notificationId}`);
  },

  // Fetch notifications by user ID
  getNotificationsByUserId: (userId) => {
    return axiosClient.get(`notifications/user/${userId}`);
  },

  // Create a new notification
  createNotification: (notificationData) => {
    return axiosClient.post(`notifications/`, notificationData);
  },

  // Update an existing notification by ID
  updateNotification: (notificationId, notificationData) => {
    return axiosClient.put(`notifications/${notificationId}`, notificationData);
  },

  // Delete a notification by ID
  deleteNotification: (notificationId) => {
    return axiosClient.delete(`notifications/${notificationId}`);
  },
};

export default notificationsAPI;
