import taskAPI from "./tasksApi";
import taskRoleAPI from "./taskRoleApi";
import userAPI from "../userApi";

const getAvatar = async (userId) => {
  try {
    const response = await userAPI.getUserImage(userId);
    const imageUrl = URL.createObjectURL(response);
    return imageUrl;
  } catch (error) {
    console.error(`Error fetching avatar for user ${userId}:`, error);
    return null;
  }
};


const getListTaskData = async (userId) => {
  try {
    // Lấy danh sách vai trò nhiệm vụ của người dùng
    const taskRolesResponse = await taskRoleAPI.getTaskRolesByUser(userId);
    const taskIds = taskRolesResponse.map((role) => role.task_id);
  
    // Lấy thông tin chi tiết của từng nhiệm vụ theo `task_id`
    const tasksPromises = taskIds.map((taskId) => taskAPI.getTaskById(taskId));
    const tasksResponse = await Promise.all(tasksPromises);
  
    // Định dạng dữ liệu
    const formattedTasks = await Promise.all(
      tasksResponse.map(async (task) => {
        const taskRoles = await taskRoleAPI.getTaskRolesByTask(task.task_id);
        // Lọc ra những user khác user_id với userId
        const roles = taskRoles.filter(role => role.user_id !== userId);
  
        const attendees = await Promise.all(
          roles.map(async (role) => {
            const userInfo = await userAPI.getUserInfo(role.user_id);
            const avatar = await getAvatar(role.user_id);
  
            return {
              user_id: userInfo.user_id,
              username: userInfo.username,
              email: userInfo.email,
              full_name: userInfo.full_name,
              avatar: avatar,
            };
          })
        );
  
        return {
          taskId: task.task_id,
          taskName: task.task_name,
          status: task.status,
          dueDate: new Date(task.due_date).toLocaleString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }),
          priority: task.priority || "Không xác định",
          attendees: attendees,
        };
      })
    );
  
    return formattedTasks;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
  
export default getListTaskData;