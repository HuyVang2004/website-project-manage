import axiosClient from "./axiosClient";

const taskRoleAPI = {
  // Create a new task role
  createTaskRole: (taskRoleData) => {
    return axiosClient.post("task_roles/", taskRoleData);
  },

  // Get a task role by ID
  getTaskRoleById: (taskRoleId) => {
    return axiosClient.get(`task_role/${taskRoleId}`);
  },

  // Get task roles by task ID
  getTaskRolesByTask: (taskId) => {
    return axiosClient.get(`task_role/task/${taskId}`);
  },

  // Get task roles by user ID
  getTaskRolesByUser: (userId) => {
    return axiosClient.get(`task_role/user/${userId}`);
  },

  // Update an existing task role by ID
  updateTaskRole: (taskRoleId, taskRoleData) => {
    return axiosClient.put(`task_role/${taskRoleId}`, taskRoleData);
  },

  // Delete a task role by ID
  deleteTaskRole: (taskRoleId) => {
    return axiosClient.delete(`task_role/${taskRoleId}`);
  },
};

export default taskRoleAPI;
