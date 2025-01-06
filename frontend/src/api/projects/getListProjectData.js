import projectTeamApi from "./projectTeamApi";
import projectApi from "./projectsApi";
import getProjectData from "./getProjectData";

const getListProjectData = async (userId) => {
  try {
    const projectTeamsResponse = await projectTeamApi.getProjectsByUser(userId);
    
    const projectIds = projectTeamsResponse.map((team) => team.project_id);

    // Lấy thông tin chi tiết của từng project theo `project_id`
    const projectsPromises = projectIds.map((projectId) => getProjectData(projectId));
    const projectsResponse = await Promise.all(projectsPromises);

    return projectsResponse;
  } catch (error) {
    console.log("Error fetching project teams or projects:", error)
    console.error("Error fetching project teams or projects:", error);
    throw new Error("Failed to fetch projects");
  }
};

export default getListProjectData;
