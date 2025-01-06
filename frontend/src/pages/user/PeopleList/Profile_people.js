import React, { useEffect, useState } from "react";
import { Avatar, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useParams, useNavigate } from "react-router-dom";
import userAPI from "../../api/userApi";
import "./Profile_people.scss";

const Profile = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        // Gọi API hoặc lấy từ localStorage theo id
        const userData = await userAPI.getUserById(id); // Giả sử bạn có hàm này
        setUser(userData);
      } catch (err) {
        setError("Không thể tải thông tin người dùng. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  if (loading) {
    return <Typography variant="h6">Đang tải thông tin...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  if (!user) {
    return <Typography variant="h6">Không tìm thấy thông tin người dùng.</Typography>;
  }

  const handleClose = () => {
    navigate("/team"); // Điều hướng về trang danh sách
  };

  return (
    <Box className="profile-frame">
      <Typography variant="h4" className="profile-title">
        Thông tin người dùng
      </Typography>
      <Box className="profile-avatar-container">
        <Avatar
          src={user.profile_picture || "https://via.placeholder.com/150"}
          alt="Avatar"
          className="profile-avatar"
        />
        <Typography variant="h5" className="profile-name">
          {user.full_name || "Tên chưa xác định"}
        </Typography>
      </Box>
      <Box className="profile-info">
        <Typography variant="h6" className="profile-info-title">Số điện thoại</Typography>
        <Typography variant="h6" className="profile-info-content">{user.phone || "Chưa cập nhật"}</Typography>

        <Typography variant="h6" className="profile-info-title">Email</Typography>
        <Typography variant="h6" className="profile-info-content">{user.email || "Chưa cập nhật"}</Typography>

        <Typography variant="h6" className="profile-info-title">Địa chỉ</Typography>
        <Typography variant="h6" className="profile-info-content">{user.address || "Chưa cập nhật"}</Typography>
      </Box>

      <IconButton className="close-button" onClick={handleClose}>
        <CloseIcon className="icon" />
      </IconButton>
    </Box>
  );
};

export default Profile;
