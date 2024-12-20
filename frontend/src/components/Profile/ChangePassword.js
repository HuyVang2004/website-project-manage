import React, { useState } from "react";
import "./ChangePassword.scss";

const ChangePassword= ({ user }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error"); // "success" or "error"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setMessageType("error");
      setMessage("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    setMessageType("success");
    setMessage("Thay đổi mật khẩu thành công!");
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="change-password-container">
      <h2>🔒 Thay đổi mật khẩu</h2>
      
      {/* Header - User Info */}
      <div className="user-info">
        <img src={user.avatar} alt="User Avatar" className="user-avatar" />
        <div>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="change-password-form">
        <div className="form-group">
          <label htmlFor="currentPassword">Mật khẩu hiện tại</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Nhập mật khẩu hiện tại"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">Mật khẩu mới</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Nhập mật khẩu mới"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Xác nhận mật khẩu mới"
            required
          />
        </div>

        {message && (
          <p className={`message ${messageType}`}>
            {messageType === "success" ? "✅" : "⚠️"} {message}
          </p>
        )}

        <button type="submit" className="submit-button">
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
