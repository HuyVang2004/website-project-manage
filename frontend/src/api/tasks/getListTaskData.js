import taskAPI from "./tasksApi";
import taskRoleAPI from "./taskRoleApi";

const getListTaskData = async (userId) => {
    try {
      // Lấy danh sách vai trò nhiệm vụ của người dùng
      const taskRolesResponse = await taskRoleAPI.getTaskRolesByUser(userId);
      const taskIds = taskRolesResponse.map((role) => role.task_id);
  
      // Lấy thông tin chi tiết của từng nhiệm vụ theo `task_id`
      const tasksPromises = taskIds.map((taskId) => taskAPI.getTaskById(taskId));
      const tasksResponse = await Promise.all(tasksPromises);
  
      // Định dạng dữ liệu
      const formattedTasks = tasksResponse.map((task) => ({
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
      }));
  
      return formattedTasks;
    } catch (error) {
      console.error("Error fetching task roles or tasks:", error);
      throw new Error("Failed to fetch tasks");
    }
  };
  
  export default getListTaskData;