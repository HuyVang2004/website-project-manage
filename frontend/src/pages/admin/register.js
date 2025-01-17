import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/pages/register.scss";
import userAPI from "../../api/userApi";
import { ROUTERS } from "../../utils/router";
import projectsApi from "../../api/projects/projectsApi";
import projectTeamApi from "../../api/projects/projectTeamApi";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    full_name: "",
    gender: "",
    job: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn reload trang
    setErrorMessage("");
    setSuccessMessage("");

    // Kiểm tra mật khẩu khớp
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }

    try {
      // Gửi yêu cầu POST tới API đăng ký
      const response = await userAPI.register({
        username: formData.name,
        password: formData.password,
        email: formData.email,
        full_name: formData.full_name,
        gender: formData.gender,
        job: formData.job,
      });

      setSuccessMessage("Đăng ký thành công!");

      const loginResponse = await userAPI.login({ email: formData.email, password: formData.password });
      console.log("Đăng nhập thành công:", loginResponse);

      // Lưu token và user profile vào localStorage
      const { access_token, refresh_token } = loginResponse;
      const expiryTime = new Date().getTime() + 2 * 24 * 60 * 60 * 1000; // Token hết hạn sau 2 ngày
      localStorage.setItem("auth_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("token_expiry", expiryTime);

      const userInfo = await userAPI.getCurrentUserInfo(access_token);
      localStorage.setItem("user_profile", JSON.stringify(userInfo));

      // Tạo dự án và thêm người vào nhóm
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

      // Lưu project ID vào localStorage
      localStorage.setItem("my_project_id", projectId); 
      navigate(ROUTERS.USER.HOME);

    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Đăng ký thất bại!");
    }
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <h1 className="title">Đăng kí tài khoản</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              id="name"
              className="form-control"
              type="text"
              name="name"
              placeholder="Tên đăng nhập"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <input
              id="name"
              className="form-control"
              type="text"
              name="full_name"
              placeholder="Tên đầy đủ"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <input
              id="email"
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <input
              id="password"
              className="form-control"
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <input
              id="confirm-password"
              className="form-control"
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit btn">
            Đăng Kí
          </button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="login-link">
          Bạn đã có tài khoản? <Link to="/dangnhap">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}
