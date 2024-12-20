import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import "./Notifications.scss";


const Notifications = ({ notifications }) => {
  return (
    <Box className="notifications-container">
      <Box className="notifications-box">
        <Box className="notifications-list-container">
          <List>
            {notifications.map((notification, index) => (
              <ListItem key={index} className="notification-item">
              <ListItemText
                primary={
                  <>
                    <Typography variant="body2" component="span">
                      {notification.text}
                      <Typography
                        variant="caption"
                        component="span"
                        className="notification-time"
                      >
                        {notification.time}
                      </Typography>
                    </Typography>
                    {/* Priority on a new line */}
                    <Typography variant="caption" component="div" className="notification-priority">
                      Priority:{" "}
                      <Typography
                        variant="caption"
                        component="span"
                        className={`priority-${notification.priority
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {notification.priority}
                      </Typography>
                    </Typography>
                  </>
                }
              />
            </ListItem>
            ))}
          </List>
        </Box>
        <Box className="notifications-header">
          <Typography variant="h6" component="div" fontWeight="bold">
            Notifications
          </Typography>
          <Typography variant="body2" className="notification-subtitle">
            Today
          </Typography>
          <ArrowBackIcon className="back-icon" />
        </Box>
      </Box>
    </Box>
  );
};

export default Notifications;
