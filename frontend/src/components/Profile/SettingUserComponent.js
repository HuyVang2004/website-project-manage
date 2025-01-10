import React, { useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import userApi from "../../api/userApi"; 
import "./SettingUserComponent.scss"; 

const PersonalInformation = ({ userId }) => {
  const [formData, setFormData] = useState({
    name: "",
    firstName: "",
    email: "",
    username: "",
    phone: "",
    job: "",
    address: "",
    introduction: "Normal text",
    bio: "",
  });
  const [loading, setLoading] = useState(false); // Trạng thái tải
  const [error, setError] = useState(""); // Trạng thái lỗi
  const [success, setSuccess] = useState(""); // Trạng thái thành công

  // Xử lý thay đổi input
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Xử lý gửi thông tin cập nhật
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(""); // Reset lỗi
    setSuccess(""); // Reset thông báo thành công

    try {
      // Gọi API để cập nhật thông tin người dùng
      const response = await userApi.updateUserInfo(userId, formData);
      setSuccess("Cập nhật thông tin thành công!");
      console.log("Updated successfully:", response);
    } catch (error) {
      setError("Có lỗi xảy ra khi cập nhật thông tin. Vui lòng thử lại.");
      console.error("Error:", error);
    } finally {
      setLoading(false); // Đặt trạng thái tải là false
    }
  };

  return (
    <Box className="box-container">
      <Box className="form-wrapper">
        <Typography variant="h5" className="header-title">
          Cập nhật thông tin
        </Typography>

        <Box
          component="img"
          src="https://via.placeholder.com/750x1"
          alt="Vector"
          className="line-divider"
        />
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} className="form-container">
            <Grid item xs={12} sm={6} className="form-field">
              <FormControl fullWidth>
                <InputLabel htmlFor="name">Họ tên</InputLabel>
                <TextField
                  id="name"
                  placeholder="Nhập họ tên"
                  variant="outlined"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  className="textfield"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} className="form-field">
              <FormControl fullWidth>
                <InputLabel htmlFor="first-name">Tên</InputLabel>
                <TextField
                  id="first-name"
                  placeholder="Nhập tên"
                  variant="outlined"
                   value={formData.firstName}
                  onChange={handleChange}
                  fullWidth
                  className="textfield"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} className="form-field">
              <FormControl fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <TextField
                  id="email"
                  placeholder="Nhập email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  className="textfield"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} className="form-field">
              <FormControl fullWidth>
                <InputLabel htmlFor="username">Tên đăng nhập</InputLabel>
                <TextField
                  id="username"
                  placeholder="Nhập tên đăng nhập"
                  variant="outlined"
                  value={formData.username}
                  onChange={handleChange}
                  fullWidth
                  className="textfield"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} className="form-field">
              <FormControl fullWidth>
                <InputLabel htmlFor="phone">Số điện thoại</InputLabel>
                <TextField
                  id="phone"
                  placeholder="Nhập số điện thoại"
                  variant="outlined"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                  className="textfield"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} className="form-field">
              <FormControl fullWidth>
                <InputLabel htmlFor="job">Công việc</InputLabel>
                <TextField
                  id="job"
                  placeholder="Nhập công việc"
                  variant="outlined"
                  value={formData.job}
                  onChange={handleChange}
                  fullWidth
                  className="textfield"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} className="form-field">
              <FormControl fullWidth>
                <InputLabel htmlFor="address">Địa chỉ</InputLabel>
                <TextField
                  id="address"
                  placeholder="Nhập địa chỉ"
                  variant="outlined"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                  className="textfield"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6} className="form-field">
              <FormControl fullWidth>
                <InputLabel htmlFor="introduction">Giới thiệu</InputLabel>
                <Select
                  id="introduction"
                  value={formData.introduction}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                >
                  <MenuItem value="Normal text">Normal text</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="bio"
                placeholder="Viết giới thiệu về bản thân"
                variant="outlined"
                fullWidth
                multiline  
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                className="textfield"
              />
            </Grid>
          </Grid>

          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            className="button-submit"
            disabled={loading}
          >
            {loading ? "Đang cập nhật..." : "Lưu thông tin"}
          </Button>
        </form>

        {error && <Typography variant="body2" color="error">{error}</Typography>}
        {success && <Typography variant="body2" color="primary">{success}</Typography>}
      </Box>
    </Box>
  );
};

export default PersonalInformation;
