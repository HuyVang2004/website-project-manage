import axiosClient from "../axiosClient";

const projectDocumentAPI = {
    // Tạo mới tài liệu dự án
    createProjectDocument: ( data) => {
        return axiosClient.post('/project_documents/', data);
    },

    // Lấy danh sách tài liệu theo dự án
    getProjectDocumentsByProject: (projectId) => {
        return axiosClient.get(`/project_documents/${projectId}`);
    },

    // Cập nhật tài liệu dự án
    updateProjectDocument: (projectId, data) => {
        return axiosClient.put(`/project_documents/${projectId}`, data);
    },

    // Xóa tài liệu dự án
    deleteProjectDocument: (projectId) => {
        return axiosClient.delete(`/project_documents/${projectId}`);
    },

    // Upload PDF cho tài liệu dự án
    uploadPDFToProject: (projectDocumentId, file) => {
        const formData = new FormData();
        formData.append('file', file);

        return axiosClient.post(`/project_documents/upload-file/${projectDocumentId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};

export default projectDocumentAPI;
