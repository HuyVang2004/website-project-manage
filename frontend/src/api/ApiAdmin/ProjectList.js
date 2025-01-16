import axiosClient from '../axiosClient';

const projectListApi = {
    getAllProjects: () => {
        const url = '/projects/projects';
        return axiosClient.get(url);
    },

    getProjectById: (id) => {
        const url = `/projects/projects/${id}`;
        return axiosClient.get(url);
    },

    createProject: (data) => {
        const url = '/projects/projects';
        return axiosClient.post(url, data);
    },

    createProjectWithUser: (data) => {
        const url = '/projects/projects/by-username';
        return axiosClient.post(url, data);
    },

    updateProject: (id, data) => {
        const url = `/projects/projects/${id}`;
        return axiosClient.put(url, data);
    },

    deleteProject: (id) => {
        const url = `/projects/projects/${id}`;
        return axiosClient.delete(url);
    },

    uploadProjectImage: (projectId, imageData) => {
        const url = `/projects/projects/${projectId}/upload-image`;
        return axiosClient.post(url, imageData);
    },

    getProjectImage: (projectId) => {
        const url = `/projects/projects/${projectId}/image`;
        return axiosClient.get(url);
    }
};

export default projectListApi;