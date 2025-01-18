import axiosClient from '../axiosClient';

const projectTeamAPI = {
    // Lấy tất cả project teams
    getAllProjectTeams: () => {
        return axiosClient.get('/project_teams/');
    },

    // Tạo project team mới
    createProjectTeam: (data) => {
        return axiosClient.post('/project_teams/', data);
    },

    // Lấy số lượng dự án đang hoạt động của user
    getActiveProjectsCount: (userId) => {
        return axiosClient.get(`/project_teams/active-projects-count/${userId}`);
    },

    // Lấy số lượng dự án đã hoàn thành của user
    getCompletedProjectsCount: (userId) => {
        return axiosClient.get(`/project_teams/completed-projects-count/${userId}`);
    },

    // Lấy thông tin project team theo project ID
    getProjectTeamByProject: (projectId) => {
        return axiosClient.get(`/project_teams/by-project/${projectId}`);
    },

    // Cập nhật thông tin project team
    updateProjectTeam: (projectId, data) => {
        return axiosClient.put(`/project_teams/update-by-project/${projectId}`, data);
    },

    // Lấy vai trò của user trong project
    getUserRoleByProject: () => {
        return axiosClient.get('/project_teams/role-by-user-project');
    },

    // Xóa project team
    deleteProjectTeam: (projectId) => {
        return axiosClient.delete(`/project_teams/delete-by-project/${projectId}`);
    },

    // Lấy danh sách projects của user
    getProjectsByUser: (userId) => {
        return axiosClient.get(`/project_teams/projects-by-user/${userId}`);
    },

    // Lấy thông tin chi tiết của project team
    getProjectTeamInfo: (projectId) => {
        return axiosClient.get(`/project_teams/project-team-info/${projectId}`);
    }
};

export default projectTeamAPI;