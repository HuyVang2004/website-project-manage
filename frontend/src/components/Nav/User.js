import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Avatar, Box, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../utils/router";
import userAPI from "../../api/userApi";
import "./User.scss";

const User = () => {
    const navigate = useNavigate();
    const [avatarUrl, setAvatarUrl] = useState("");
    const userData = JSON.parse(localStorage.getItem("user_profile")) || {};

    const name = userData.username;
    const email = userData.email
    const fetchUserImage = async () => {
        try {
            if (userData.user_id) {
                const response = await userAPI.getUserImage(userData.user_id);
                const imageUrl = URL.createObjectURL(response); 
                setAvatarUrl(imageUrl); // Lưu URL vào state
                // console.log("img url", imageUrl);
            }
        } catch (error) {
            console.error("Error fetching user image:", error);
        }
    };

    // Gọi hàm fetchUserImage khi component được render lần đầu
    useEffect(() => {
        fetchUserImage();
    }, []); // Chỉ chạy 1 lần khi component được mount

    const handleEditProfile = () => {
        navigate(ROUTERS.USER.PROFILE);
    };

    const handleLogout = () => {
        localStorage.removeItem("user_profile");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("token_expiry");
        localStorage.removeItem("refresh_token");
        alert(`${name} đã đăng xuất.`);
        navigate("/dangnhap");
    };

    return (
        <Box className="user-container">
            <Box className="user-frame">
                {/* Avatar and Name */}
                <Box className="user-avatar">
                    <Avatar src={avatarUrl} alt={name} className="avatar-img" />
                    
                    <Typography variant="h5" className="user-name">
                        {name}
                    </Typography>
                </Box>

                {/* Email */}
                <Typography variant="body1" className="user-email">
                    {email}
                </Typography>

                {/* Action Buttons */}
                <List className="user-actions">
                    {/* Edit Profile */}
                    <ListItem button onClick={handleEditProfile}>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                        <ListItemText primary="Chỉnh sửa hồ sơ" />
                    </ListItem>
                    {/* Logout */}
                    <ListItem button className="logout-btn" onClick={handleLogout}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Đăng xuất" />
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
};

export default User;
