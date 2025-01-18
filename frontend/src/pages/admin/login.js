import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import userAPI from "../../api/userApi";
import '../../styles/pages/login.scss';
import { ROUTERS } from "../../utils/router";
import projectTeamApi from "../../api/projects/projectTeamApi";
import projectsApi from "../../api/projects/projectsApi";

const findProjectByName = async (userId, projectName = "My project") => {
  try {
    const projectTeamResponse = await projectTeamApi.getProjectsByUser(userId);
    
    if (!projectTeamResponse || projectTeamResponse.length === 0) {
      console.log("User has no projects");
      return null;
    }

    for (const project of projectTeamResponse) {
      const responseProject = await projectsApi.getProjectById(project.project_id);
      if (project && responseProject.project_name === projectName) {
        console.log("Project found:", project);
        return responseProject.project_id;
      }
    }
    console.log(`No project with name "${projectName}" found.`);
    return null;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log("User has no projects yet");
      return null;
    }
    console.error("Error fetching project:", error);
    return null;
  }
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    const expireTime = localStorage.getItem('token_expiry');
    const currentTime = new Date().getTime();

    if (savedToken && expireTime && currentTime < Number(expireTime)) {
      const userProfile = JSON.parse(localStorage.getItem('user_profile') || '{}');
      console.log("Stored user profile:", userProfile); // Debug log
      
      // Kiểm tra role một cách chi tiết hơn
      if (userProfile && userProfile.role === 'admin') {
        console.log("Redirecting to admin page"); // Debug log
        navigate('/admin');
      } else {
        console.log("Redirecting to home page"); // Debug log
        navigate('/trangchu');
      }
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
      console.log('Login response:', response); // Debug log
  
      const { access_token, refresh_token } = response;
      const expiryTime = new Date().getTime() + 2 * 24 * 60 * 60 * 1000;
      localStorage.setItem('auth_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      localStorage.setItem('token_expiry', expiryTime);
      
      const userInfo = await userAPI.getCurrentUserInfo(access_token);
      console.log('User info from API:', userInfo); // Debug log
      
      try {
        const myProjectId = await findProjectByName(userInfo.user_id);
  
        if (myProjectId) {
          localStorage.setItem("my_project_id", myProjectId);
        } else {
          const userId = userInfo.user_id;
  
          const projectData = {
            project_name: "My project",
            description: "",
            status: "Đang tiến hành",
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
      } catch (projectError) {
        console.error('Lỗi khi xử lý project:', projectError);
      }
  
      localStorage.setItem("user_profile", JSON.stringify(userInfo));
      
      // Kiểm tra role một cách chi tiết hơn
      console.log('Checking role:', userInfo.role); // Debug log
      
      if (userInfo && userInfo.role === 'admin') {
        console.log('Navigating to admin page'); // Debug log
        navigate('/admin');
      } else {
        console.log('Navigating to home page'); // Debug log
        navigate('/trangchu');
      }
      
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