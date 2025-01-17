import React, { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import "./Notifications.scss";
import notificationsAPI from "../../api/notificationsAPI";
import { useNavigate } from "react-router-dom";
const Notifications = () => {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem('user_profile'));
  let userId = ""
  try {
    userId = userData.user_id;
  } catch (err) {
    console.log(err);
  }

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const response = await notificationsAPI.getNotificationsByUserId(userId);
        // console.log(response);

        setNotifications(
          response.map((notification) => ({
            id: notification.notification_id,
            message: notification.message,
            createdTime: new Date(notification.created_time).toLocaleString('vi-VN', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            }),
            isRead: notification.is_read,
            link: notification.link,
          }))
        );
        setLoading(false);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to load notifications. Please try again.");
        setLoading(false);
      }
    };

    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  if (loading) {
    return <Typography>Loading notifications...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }
  const handleClick = (notification) => {
    navigate(notification.link);
  }

  return (
    <Box className="notifications-container">
      <Box className="notifications-box">
        <Box className="notifications-header">
          <Typography variant="h6" component="div" fontWeight="bold">
            Thông báo
          </Typography>
          <ArrowBackIcon className="back-icon" />
        </Box>
        <Box className="notifications-list-container">
          <List>
            {notifications.map((notification) => (
              <ListItem key={notification.id} 
                onClick={() => handleClick(notification)}
                className={`notification-item ${notification.isRead ? 'read' : 'unread'}`}>
                <ListItemText
                  primary={
                    <>
                      <Typography variant="body2" component="span">
                        {notification.message}
                      </Typography>
                      {/* <div>
                        <Typography
                          variant="caption"
                          component="span"
                          className="notification-time"
                        >
                          {notification.createdTime}
                        </Typography>
                    </div> */}
                    </>
                  }
                  
                  secondary={
                    <>
                      <Typography
                        variant="caption"
                        component="span"
                        className="notification-time"
                      >
                        {notification.createdTime}
                      </Typography>
                    </>
                  }
                
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Notifications;
