import projectTeamApi from "./projectTeamApi";
import projectsApi from "./projectsApi";

const getProjectData = async (projectId) => {
    try {
        const projectData = await projectsApi.getProjectById(projectId);
        // const projectData = await projectResponse.json();

        const projectTeamData = await projectTeamApi.getProjectTeamByProjectId(projectId);
        // const projectTeamData = await projectTeamResponse.json();

        const formattedProjectData = {
            projectId: projectData.project_id,
            projectName: projectData.project_name,
            description: projectData.description || "Chưa có mô tả",
            startDate: new Date(projectData.start_date).toLocaleString("vi-VN", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }),
            dueDate: projectData.end_date
              ? new Date(projectData.end_date).toLocaleString("vi-VN", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Chưa có thời gian kết thúc",
            status: projectData.status || "Chưa xác định",
            budget: projectData.budget || "Không có ngân sách",
            target: projectData.target || "Không có mục tiêu",
            createdBy: projectData.created_by || "Không rõ",

            teamMembers: projectTeamData.map((item) => ({
              userId: item.user_id,
              role: item.role,
              joinTime: new Date(item.join_time).toLocaleString("vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }),
            })),
        };

        return formattedProjectData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export default getProjectData;
