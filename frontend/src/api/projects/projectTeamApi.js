import axiosClient from "../axiosClient";

const projectTeamApi = {
  // Fetch all project teams
  getAllProjectTeams: () => {
    return axiosClient.get('project-teams');
  },

  // Fetch a single project team by ID
  getProjectTeamById: (projectTeamId) => {
    return axiosClient.get(`project-teams/${projectTeamId}`);
  },

  // Create a new project team
  createProjectTeam: (userId, projectId, role) => {
    return axiosClient.post('project-teams', {
      user_id: userId,
      project_id: projectId,
      role: role,
    });
  },

  // Create a project team from username and project name
  createProjectTeamFromNames: (username, projectName, role) => {
    return axiosClient.post('project-teams/from-names', {
      username: username,
      project_name: projectName,
      role: role,
    });
  },

  // Update an existing project team by ID
  updateProjectTeam: (projectTeamId, data) => {
    return axiosClient.put(`project-teams/${projectTeamId}`, data);
  },

  // Delete a project team by ID
  deleteProjectTeam: (projectTeamId) => {
    return axiosClient.delete(`project-teams/${projectTeamId}`);
  },

  // Fetch all projects associated with a user
  getProjectsByUser: (userId) => {
    return axiosClient.get(`project_teams/projects-by-user/${userId}`);
  },
};

export default projectTeamApi;
