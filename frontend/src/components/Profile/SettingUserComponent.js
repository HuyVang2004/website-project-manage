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
import "./SettingUserComponent.scss"; // Import file SCSS

const PersonalInformation = () => {
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

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://your-api-endpoint.com/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("There was an error submitting the data");
      }

      const data = await response.json();
      console.log("Data submitted successfully", data);
    } catch (error) {
      console.error("Error:", error);
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
          <Button type="submit" variant="contained" color="primary" className="button-submit">
            Lưu thông tin
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default PersonalInformation;
