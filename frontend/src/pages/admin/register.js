import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../../styles/pages/register.scss';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="register-page">
      <div className="register-form-container">
        <h1 className="title">Đăng kí tài khoản</h1>
        <form>
          <div className="mb-2">
            <input
              id="name"
              className="form-control"
              type="text"  
              name="Name"
              placeholder="Tên đăng nhập"
            />
          </div>

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
              type="password"
              name="Password"
              placeholder="Mật khẩu"
            />
          </div>

          <div className="mb-2">
            <input
              id="confirm-password"
              className="form-control"
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
            />
          </div>

          <button type="submit" className="submit btn">
            Đăng Ký
          </button>
        </form>
        <div className="login-link">
          Bạn đã có tài khoản? <Link to="/dangnhap">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}