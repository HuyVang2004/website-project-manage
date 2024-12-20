import React from "react";
import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import "./Profile.scss";
import { ROUTERS } from "../../utils/router";

const Profile = ({ user }) => {
  // Khai báo useNavigate trong thân component
  const navigate = useNavigate();

  // Sử dụng navigate trong các hàm xử lý sự kiện
  const handleEditClick = () => {
    navigate(ROUTERS.USER.SETTINGUSER); // Dùng navigate thay vì gọi useNavigate trực tiếp
  };

  const handlePasswordClick = () => {
    navigate(ROUTERS.USER.CHANGEPASSWORD);
  };

  const handleClose = () => {
    navigate(ROUTERS.USER.HOME);
  };

  return (
    <Box className="profile-frame">
      <Typography variant="h4" className="profile-title">
        Thông tin người dùng
      </Typography>

      <Box className="profile-avatar-container">
        <Avatar
          src={user.avatar || "https://via.placeholder.com/150"}
          alt="Avatar"
          className="profile-avatar"
        />
        <Typography variant="h5" className="profile-name">
          {user.name || "Phạm Hữu Vang"}
        </Typography>
      </Box>

      <Box className="profile-info">
        <Typography variant="h6" className="profile-info-title">Số điện thoại</Typography>
        <Typography variant="h6" className="profile-info-content">{user.phone || "0123456789"}</Typography>

        <Typography variant="h6" className="profile-info-title">Email</Typography>
        <Typography variant="h6" className="profile-info-content">{user.email || "vpham0838@gmail.com"}</Typography>

        <Typography variant="h6" className="profile-info-title">Giới tính</Typography>
        <Typography variant="h6" className="profile-info-content">{user.gender || "Nam"}</Typography>

        <Typography variant="h6" className="profile-info-title">Công việc</Typography>
        <Typography variant="h6" className="profile-info-content">{user.job || "Kỹ sư phần mềm"}</Typography>

        <Typography variant="h6" className="profile-info-title">Địa chỉ</Typography>
        <Typography variant="h6" className="profile-info-content">{user.address || "Hà Nội"}</Typography>

        <Typography variant="h6" className="profile-info-title">Mô tả</Typography>
        <Typography variant="h6" className="profile-info-content">{user.description || "Đây là mô tả của người dùng."}</Typography>
      </Box>

      <Grid container spacing={2} className="profile-actions">
        <Grid item>
          <IconButton onClick={handleEditClick}>
            <EditIcon className="icon" />
          </IconButton>
          <Typography variant="h6" className="profile-action-text">Chỉnh sửa</Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={handlePasswordClick}>
            <LockIcon className="icon" />
          </IconButton>
          <Typography variant="h6" className="profile-action-text">Thay đổi mật khẩu</Typography>
        </Grid>
      </Grid>

      <IconButton className="close-button" onClick={handleClose}>
        <CloseIcon className="icon" />
      </IconButton>
    </Box>
  );
};

export default Profile;
