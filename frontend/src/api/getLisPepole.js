import projectTeamApi from "./projects/projectTeamApi";
import userAPI from "./userApi";
import projectsApi from "./projects/projectsApi";

const getListPeopleData = async () => {
  try {
    const userData = JSON.parse(localStorage.getItem("user_profile") || "{}");
    const userId = userData?.user_id || "";

    if (!userId) {
      throw new Error("User ID không hợp lệ");
    }

    // Lấy danh sách các dự án mà user tham gia
    const projectsResponse = await projectTeamApi.getProjectsByUser(userId);

    if (projectsResponse.length === 0) {
      console.log("User không tham gia project nào");
      return [];
    }

    // Tạo một bản đồ chứa tên dự án cho mỗi projectId
    const projectIdToNameMap = {};
    const projectDetailsPromises = projectsResponse.map(async (project) => {
      const projectInfo = await projectsApi.getProjectById(project.project_id);
      projectIdToNameMap[project.project_id] = projectInfo.project_name;
    });

    // Chờ tất cả các thông tin dự án được lấy
    await Promise.all(projectDetailsPromises);

    // Lấy thông tin thành viên
    const allMemberInfo = new Map();
    const memberPromises = projectsResponse.map(async (project) => {
      const projectId = project.project_id;
      const teamMembers = await projectTeamApi.getProjectTeamByProjectId(projectId);

      teamMembers.forEach((member) => {
        const memberId = member.user_id;
        if (memberId !== userId) {
          if (!allMemberInfo.has(memberId)) {
            allMemberInfo.set(memberId, {
              user_id: memberId,
              project_names: [projectIdToNameMap[projectId]],
            });
          } else {
            const memberInfo = allMemberInfo.get(memberId);
            if (!memberInfo.project_names.includes(projectIdToNameMap[projectId])) {
              memberInfo.project_names.push(projectIdToNameMap[projectId]);
            }
          }
        }
      });
    });

    // Chờ tất cả thông tin thành viên được lấy
    await Promise.all(memberPromises);

    // Lấy thông tin chi tiết từng thành viên và ảnh đại diện của họ
    const memberDetails = await Promise.all(
      Array.from(allMemberInfo.keys()).map(async (memberId) => {
        const [userInfo, userImageResponse] = await Promise.all([
          userAPI.getUserInfo(memberId),
          userAPI.getUserImage(memberId),
        ]);
        const imageUrl = URL.createObjectURL(userImageResponse);

        return {
          ...userInfo,
          avatarUrl: imageUrl,
          project_names: allMemberInfo.get(memberId).project_names,
        };
      })
    );

    console.log("Danh sách thông tin các thành viên:", memberDetails);
    return memberDetails;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin thành viên:", error);
    return [];
  }
};

export default getListPeopleData;
