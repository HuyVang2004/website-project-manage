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

const getListTaskInProject = async (projectId) => {
  try {

    const tasks = await taskAPI.getTasksByProjectId(projectId);

    const validTasks = Array.isArray(tasks) ? tasks : [];
    // console.log(validTasks);

    const tasksWithDetails = await Promise.all(
      validTasks.map(async (task) => {
        const roles = await taskRoleAPI.getTaskRolesByTask(task.task_id);

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
          task_id: task.task_id,
          taskName: task.task_name,
          description: task.description,
          startDate: task.start_time,
          dueDate: task.due_date,
          status: task.status, 
          priority: task.priority,
          attendees: attendees,
        };
      })
    );

    return tasksWithDetails;
  } catch (error) {
    console.error("Error fetching tasks in project:", error);
    throw [];
  }
};

export default getListTaskInProject;
