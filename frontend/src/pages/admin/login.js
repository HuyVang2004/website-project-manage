import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import userAPI from "../../api/userApi";
import '../../styles/pages/login.scss';
import { ROUTERS } from "../../utils/router";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const response = await userAPI.login({username, password });
      console.log('Đăng nhập thành công:', response);
      // localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('user_profile', JSON.stringify(response));
      // const userProfile = JSON.parse(localStorage.getItem('user_profile'));
      // console.log(userProfile.user_id);
      navigate(ROUTERS.USER.HOME);
    } catch (err) {
      console.log("Lỗi", err);
      console.error('Lỗi đăng nhập:', err);
      setError(err.response?.data?.message || 'Đăng nhập thất bại, vui lòng thử lại.');
      navigate(ROUTERS.USER);
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
              value={username}
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
            </button>
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
