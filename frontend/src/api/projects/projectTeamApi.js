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
  
  getProjectTeamByProjectId: (projectId) => {
    return axiosClient.get(`project_teams/by-project/${projectId}`);
  },

  // Create a new project team
  createProjectTeam: (data) => {
    return axiosClient.post('project_teams', data);
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

  getNumActiveProject: (userId) => {
    return axiosClient.get(`project_teams/active-projects-count/${userId}`);
  },

  getNumCompletedProject: (projectId) => {
    return axiosClient.get(`project_teams/completed-projects-count/${projectId}`);
  },

  getRole: (projectId, userId) => {
    return axiosClient.get(`project_teams/role-by-user-project?project_id=${projectId}&user_id=${userId}`);
  },
};

export default projectTeamApi;
