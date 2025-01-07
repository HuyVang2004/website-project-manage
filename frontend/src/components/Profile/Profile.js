import React, { useEffect, useState } from "react";
import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import userAPI from "../../api/userApi";
import "./Profile.scss";
import { ROUTERS } from "../../utils/router";

const Profile = () => {
  const [user, setUser] = useState(null); // State để lưu thông tin người dùng
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); // State để lưu lỗi nếu có
  const navigate = useNavigate();

  // Lấy thông tin người dùng khi component được mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const userData = JSON.parse(localStorage.getItem('user_profile')); // Lấy data từ API
        setUser(userData); // Lưu thông tin
      } catch (err) {
        setError("Không thể tải thông tin người dùng. Vui lòng thử lại sau."); // Xử lý lỗi nếu có
      } finally {
        setLoading(false); 
      }
    };

    fetchUserProfile();
  }, []);


  if (loading) {
    return <Typography variant="h6">Đang tải thông tin...</Typography>;
  }

  // Nếu có lỗi, hiển thị thông báo lỗi
  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  // Nếu không tìm thấy dữ liệu người dùng, hiển thị thông báo
  if (!user) {
    return <Typography variant="h6">Không tìm thấy thông tin người dùng.</Typography>;
  }

  // Các hàm xử lý sự kiện
  const handleEditClick = () => {
    navigate(ROUTERS.USER.SETTINGUSER); // Điều hướng đến trang chỉnh sửa thông tin người dùng
  };

  const handlePasswordClick = () => {
    navigate(ROUTERS.USER.CHANGEPASSWORD); // Điều hướng đến trang thay đổi mật khẩu
  };

  const handleClose = () => {
    navigate(ROUTERS.USER.HOME); // Điều hướng về trang chủ
  };

  return (
    <Box className="profile-frame">
      <Typography variant="h4" className="profile-title">
        Thông tin người dùng
      </Typography>

      <Box className="profile-avatar-container">
        <Avatar
          src={user.profile_picture || "https://via.placeholder.com/150"} // Hiển thị avatar nếu có, nếu không sẽ dùng avatar mặc định
          alt="Avatar"
          className="profile-avatar"
        />
        <Typography variant="h5" className="profile-name">
          {user.full_name || "Phạm Hữu Vang"} {/* Hiển thị tên người dùng nếu có */}
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
