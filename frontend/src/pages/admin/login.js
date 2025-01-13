import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import userAPI from "../../api/userApi";
import '../../styles/pages/login.scss';
import { ROUTERS } from "../../utils/router";
import projectTeamApi from "../../api/projects/projectTeamApi";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists and is valid
    const savedToken = localStorage.getItem('auth_token');
    const expireTime = localStorage.getItem('token_expiry');
    const currentTime = new Date().getTime();

    if (savedToken && expireTime && currentTime < Number(expireTime)) {
      console.log("Token is valid, navigating to home...");
      navigate(ROUTERS.USER.HOME);
    }
  }, [navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await userAPI.login({ email, password });

      console.log('Đăng nhập thành công:', response);

      const { access_token, refresh_token } = response;
      const expiryTime = new Date().getTime() + 2 * 24 * 60 * 60 * 1000; // Token sẽ hết hạn sau 2 ngày
      localStorage.setItem('auth_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('token_expiry', expiryTime);
      
      const userInfo = await userAPI.getCurrentUserInfo(access_token);
      localStorage.setItem("user_profile", JSON.stringify(userInfo));

      const myProjectId = findProjectByName(userInfo.user_id);
      if (myProjectId) {
        localStorage.setItem("my_project_id", myProjectId);
      } else {
        const userId = loginResponse.user_id;
        const projectData = {
          project_name: "My project",
          description: "",
          start_date: new Date("2025-01-01").toISOString(),
          end_date: new Date("2099-01-01").toISOString(),
          created_by: userId,
        };

        const projectResponse = await projectsApi.createProject(projectData);
        const projectId = projectResponse.project_id;

        await projectTeamApi.createProjectTeam({
          user_id: userId,
          project_id: projectId,
          role: "Quản lý",
        });
        localStorage.setItem("my_project_id", projectId); 
      }
      navigate(ROUTERS.USER.HOME);
    } catch (err) {
      console.error('Lỗi đăng nhập:', err);
      setError(err.response?.data?.detail || 'Đăng nhập thất bại, vui lòng thử lại.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h1 className="title">Đăng nhập</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-2">
            <input
              id="email"
              className="form-control"
              type="text"
              name="Email"
              placeholder="Tên đăng nhập"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <input
              id="password"
              className="form-control"
              type={showPassword ? 'text' : 'password'}
              name="Password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-password-visibility"
              onClick={togglePasswordVisibility}
            >
              Hiển thị
            </button>
          </div>
          <div className="forgot-password">
            <Link to="./quenmatkhau">Quên mật khẩu?</Link>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit btn">
            Đăng Nhập
          </button>
        </form>
        <div className="login-link">
          <p>Bạn chưa có tài khoản? <Link to="/dangki">Đăng kí</Link></p>
          <p>Quên mật khẩu? <Link to="/quenmatkhau">Khôi phục mật khẩu</Link></p>
        </div>
      </div>
    </div>
  );
}

const findProjectByName = async (userId, projectName = "My project") => {
  try {
    const projectTeamResponse = await projectTeamApi.getProjectsByUser(userId);

    for (const project of projectTeamResponse) {
      
      if (project && project.project_name === projectName) {
        console.log("Project found:", project);
        return project.project_id;
      }
    }
    console.log(`No project with name "${projectName}" found.`);
    return null;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
};
