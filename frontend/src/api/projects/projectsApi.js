import axiosClient from "../axiosClient";

const projectsApi = {
  
  // Fetch a single project by ID
  getProjectById: (projectId) => {
    return axiosClient.get(`projects/projects/${projectId}`);
  },

  // Create a new project
  createProject: (projectData) => {
    return axiosClient.post(`projects/projects`, projectData);
  },

  // Create a project associated with a specific username
  createProjectWithUsername: (projectData, username) => {
    return axiosClient.post(`projects/projects/by-username`, {
      ...projectData,
      username,
    });
  },

  // Update an existing project by ID
  updateProject: (projectId, projectData) => {
    return axiosClient.put(`projects/projects/${projectId}`, projectData);
  },

  // Delete a project by ID
  deleteProject: (projectId) => {
    return axiosClient.delete(`projects/projects/${projectId}`);
  },
};

export default projectsApi;
