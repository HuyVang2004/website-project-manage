import projectTeamApi from "./projectTeamApi";
import projectApi from "./projectsApi";

const getListProjectData = async (userId) => {
  try {
    const projectTeamsResponse = await projectTeamApi.getProjectsByUser(userId);
    
    const projectIds = projectTeamsResponse.map((team) => team.project_id);

    // Lấy thông tin chi tiết của từng project theo `project_id`
    const projectsPromises = projectIds.map((projectId) => projectApi.getProjectById(projectId));
    const projectsResponse = await Promise.all(projectsPromises);

    // Định dạng dữ liệu
    const formattedProjects = projectsResponse.map((project) => ({
      projectId: project.project_id,
      projectName: project.project_name,
      description: project.description || "Chưa có mô tả",
      startDate: new Date(project.start_date).toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),

      dueDate: project.end_date ? new Date(project.end_date).toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }) : "Chưa có thời gian kết thúc",
      status: project.status || "Chưa xác định",
    }));

    console.log(formattedProjects);

    return formattedProjects;
  } catch (error) {
    console.error("Error fetching project teams or projects:", error);
    throw new Error("Failed to fetch projects");
  }
};

export default getListProjectData;
