import axiosClient from "../axiosClient";

const taskAPI = {
  // Fetch a task by ID
  getTaskById: (taskId) => {
    return axiosClient.get(`tasks/${taskId}`);
  },

  // Fetch tasks by project ID
  getTasksByProjectId: (projectId) => {
    return axiosClient.get(`tasks/project/${projectId}`);
  },
  // Delete a task by ID
  deleteTask: (taskId) => {
    return axiosClient.delete(`tasks/${taskId}`);
  },
};

export default taskAPI;
