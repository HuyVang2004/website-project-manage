import projectTeamApi from "./projectTeamApi";
import projectsApi from "./projectsApi";
import userAPI from "../userApi";

const getProjectData = async (projectId) => {
    const getAvatar = async (userID) => {
      const response = await userAPI.getUserImage(userID); 
      const imageUrl = URL.createObjectURL(response);
      return imageUrl;
    };

    const getProjectImage = async (projectid) => {
      const response = await projectsApi.getProjectImage(projectid);
      const imageUrl = URL.createObjectURL(response);
      return imageUrl;
    };

    try {
      console.log("project_id", projectId);
      const projectData = await projectsApi.getProjectById(projectId);
      const projectTeamData = await projectTeamApi.getProjectTeamByProjectId(projectId);

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
          // budget: projectData.budget || "Không có ngân sách",
          // target: projectData.target || "Không có mục tiêu",
          createdBy: projectData.created_by || "Không rõ",
          image: await getProjectImage(projectData.project_id),
          teamMembers: await Promise.all(projectTeamData.map(async (item) => {
            const avatar = await getAvatar(item.user_id); 
            const responseUser = await userAPI.getUserInfo(item.user_id)
            return {
              userId: item.user_id,
              role: item.role,
              username: responseUser.username,
              joinTime: new Date(item.join_time).toLocaleString("vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              }),
              avatar: avatar,
            };
          })),
        };

        return formattedProjectData;
    } catch (error) {
      console.error('Error fetching data:', projectId);
      throw error;
    }
};

export default getProjectData;
