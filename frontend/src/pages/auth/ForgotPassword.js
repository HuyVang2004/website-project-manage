import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import '../admin/style/ForgotPassword.scss';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  
  // Thêm state để lưu giá trị mật khẩu
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleBack = () => {
    if (currentView === 'reset') {
      setCurrentView('verification');
    } else if (currentView === 'verification') {
      setCurrentView('email');
    } else {
      navigate('/dangnhap');
    }
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    setCurrentView('verification');
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    setCurrentView('reset');
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    
    // Kiểm tra mật khẩu trống
    if (!password || !confirmPassword) {
      setPasswordError('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    
    // Kiểm tra mật khẩu khớp nhau
    if (password !== confirmPassword) {
      setPasswordError('Mật khẩu không khớp');
      return;
    }

    // Nếu mọi thứ ok, xử lý đặt lại mật khẩu
    try {
      // Xử lý logic đặt lại mật khẩu ở đây
      console.log("Đặt lại mật khẩu thành công");
      
      // Chuyển về trang đăng nhập
      navigate('/dangnhap');
    } catch (error) {
      setPasswordError('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const handleResendCode = () => {
    console.log("Đang gửi lại mã...");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Xóa thông báo lỗi khi người dùng bắt đầu nhập lại
    if (passwordError) setPasswordError('');
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    // Xóa thông báo lỗi khi người dùng bắt đầu nhập lại
    if (passwordError) setPasswordError('');
  };

  const renderView = () => {
    switch (currentView) {
      case 'email':
        return (
          <>
            <h1 className="title">Bạn quên mật khẩu</h1>
            <p className="subtitle">Vui lòng nhập email để nhận mã xác nhận</p>
            
            <form onSubmit={handleSubmitEmail}>
              <div className="mb-2">
                <input
                  id="email"
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Nhập email của bạn"
                />
              </div>

              <button type="submit" className="submit btn">
                Gửi mã
              </button>
            </form>
          </>
        );

      case 'verification':
        return (
          <>
            <h1 className="title">Nhập mã xác nhận</h1>
            
            <form onSubmit={handleVerifyCode}>
              <div className="mb-2">
                <input
                  id="verificationCode"
                  className="form-control"
                  type="text"
                  name="verificationCode"
                  placeholder="Nhập mã"
                />
              </div>

              <button type="submit" className="submit btn">
                Xác nhận
              </button>
            </form>

            <div className="resend-code">
              <span>Bạn chưa nhận được mã? </span>
              <button onClick={handleResendCode} className="resend-link">
                Gửi lại mã
              </button>
            </div>
          </>
        );

      case 'reset':
        return (
          <>
            <h1 className="title">Cập nhật mật khẩu</h1>
            
            <form onSubmit={handleResetPassword}>
              <div className="mb-2 password-input">
                <input
                  id="password"
                  className="form-control"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Nhập mật khẩu mới"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="mb-2 password-input">
                <input
                  id="confirmPassword"
                  className="form-control"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Xác nhận mật khẩu mới"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {passwordError && (
                <div className="error-message">
                  {passwordError}
                </div>
              )}

              <button type="submit" className="submit btn">
                Xác nhận
              </button>
            </form>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-form-container">
        <div className="back-button" onClick={handleBack}>
          ←
        </div>
        {renderView()}
      </div>
    </div>
  );
}