import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import userAPI from "../../api/userApi";
import '../../styles/pages/forgot-password.scss';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isTokenSent, setIsTokenSent] = useState(false);  // Kiểm tra xem đã gửi yêu cầu đặt lại mật khẩu chưa
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      console.log(email);
      await userAPI.forgotPassword(email);
      setMessage('Yêu cầu đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra email của bạn.');
      setIsTokenSent(true); // Chuyển sang nhập mã token sau khi gửi email thành công
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
      // Gửi mã token xác nhận
      await userAPI.verifyToken(email, token);
      setMessage('Mã xác nhận hợp lệ, vui lòng đặt lại mật khẩu.');
      navigate('/reset-password');  // Chuyển đến trang reset mật khẩu
    } catch (err) {
      console.error("Lỗi xác nhận token:", err);
      setError(err.response?.data?.message || 'Mã xác nhận không hợp lệ.');
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
        ) : (
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
        )}
        <div className="back-to-login-link">
          <button onClick={() => navigate(-1)} className="back-button">Quay lại đăng nhập</button>
        </div>
      </div>
    </div>
  );
}
