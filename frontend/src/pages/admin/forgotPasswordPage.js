import React, { useState } from "react";
import userAPI from "../../api/userApi";
import '../../styles/pages/forgot-password.scss';
import { Link, useNavigate } from "react-router-dom";
import { ROUTERS } from "../../utils/router";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isTokenSent, setIsTokenSent] = useState(false);
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const navigate = useNavigate();
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await userAPI.forgotPassword(email);
      setMessage('Yêu cầu đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra email của bạn.');
      setIsTokenSent(true);
    } catch (err) {
      console.error("Lỗi quên mật khẩu:", err);
      setError(err.response?.data?.message || 'Không thể gửi yêu cầu, vui lòng thử lại sau.');
      setEmail('');
    }
  };

  const handleSubmitToken = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await userAPI.verifyToken(token);
      setMessage('Mã xác nhận hợp lệ, vui lòng đặt lại mật khẩu.');
      setIsTokenVerified(true);
    } catch (err) {
      console.error("Lỗi xác nhận token:", err);
      setError(err.response?.data?.message || 'Mã xác nhận không hợp lệ.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      await userAPI.resetPassword(token,newPassword);
      setMessage('Mật khẩu của bạn đã được đặt lại thành công.');
      setIsTokenVerified(false);
      setIsTokenSent(false);
      navigate(ROUTERS.USER.LOGIN);
    } catch (err) {
      console.error("Lỗi đặt lại mật khẩu:", err);
      setError(err.response?.data?.message || 'Không thể đặt lại mật khẩu, vui lòng thử lại sau.');
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-form-container">
        <h1 className="title">Quên mật khẩu</h1>
        {!isTokenSent ? (
          <form onSubmit={handleForgotPassword}>
            <div className="mb-2">
              <input
                id="email"
                className="form-control"
                type="email"
                name="Email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="submit btn">
              Gửi yêu cầu
            </button>
          </form>
        ) : !isTokenVerified ? (
          <form onSubmit={handleSubmitToken}>
            <div className="mb-2">
              <input
                id="token"
                className="form-control"
                type="text"
                name="Token"
                placeholder="Nhập mã xác nhận"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </div>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="submit btn">
              Xác nhận mã
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div className="mb-2">
              <input
                id="newPassword"
                className="form-control"
                type="password"
                name="NewPassword"
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="submit btn">
              Đặt lại mật khẩu
            </button>
          </form>
        )}
        <div className="back-to-login-link">
          <button onClick={() => window.history.back()} className="back-button">Quay lại đăng nhập</button>
        </div>
      </div>
    </div>
  );
}
