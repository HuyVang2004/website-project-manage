import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Avatar, Box, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import "./User.scss"; 
import {useNavigate} from 'react-router-dom';
import {ROUTERS} from '../../utils/router';

const User = () => {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('user_profile'))
    const name = userData.full_name
    const image = userData.profile_picture
    const email = userData.email
    const handleEditProfile = () => {
        navigate(ROUTERS.USER.PROFILE);
    };
    
    const handleLogout = () => {
        localStorage.removeItem("user_profile");
        navigate("/dangnhap");

        alert(`${name} đã đăng xuất.`);
    };

    return (
        <Box className="user-container">
            <Box className="user-frame">
                {/* Avatar and Name */}
                <Box className="user-avatar">
                    <Avatar src={image} alt={name} className="avatar-img" />
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
