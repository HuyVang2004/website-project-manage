import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../../styles/pages/login.scss';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h1 className="title">Đăng nhập</h1>
        <form>
          <div className="mb-2">
            <input
              id="email"
              className="form-control"
              type="text"
              name="Email"
              placeholder="Email"
            />
          </div>

          <div className="mb-2">
            <input
              id="password"
              className="form-control"
              type={showPassword ? 'text' : 'password'}
              name="Password"
              placeholder="Mật khẩu"
            />
          </div>

          <button type="submit" className="submit btn">
            Đăng Nhập
          </button>
        </form>
        <div className="login-link">
          Bạn chưa có tài khoản? <Link to="/dangki">Đăng kí</Link>
        </div>
      </div>
    </div>
  );
}