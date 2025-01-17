import React, { useState, useEffect } from 'react';
import helpAPI from '../../../api/helpApi';
import './adminHelpRep.scss';

const AdminHelpResponse = ({ helpData, onBack }) => {
  const [adminResponse, setAdminResponse] = useState('');
  const [responseHistory, setResponseHistory] = useState([]);

  // Handle submission of admin's response
  const handleSubmitResponse = () => {
    if (adminResponse.trim() === "") {
      // Prevent submission of empty responses
      return;
    }

    const newResponse = {
      time: new Date().toISOString(),
      type: 'Admin Response',
      content: adminResponse
    };

    setResponseHistory(prevHistory => [...prevHistory, newResponse]);
    setAdminResponse('');
  };

  // Fetch historical help data when component mounts or when `helpData` changes
  useEffect(() => {
    const fetchHistoryHelp = async () => {
      try {
        const historyHelp = await helpAPI.getHelpByUser(helpData.user.user_id);

        const filteredHistory = historyHelp
          .filter((item) => item.help_id !== helpData.help_id)  // Exclude current help request
          .map((item) => ({
            create_time: new Date(item.create_time).toISOString(),
            help_type: item.help_type,
            content: item.content,
          }));

        setResponseHistory(filteredHistory);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistoryHelp();
  }, [helpData.user.user_id, helpData.help_id]);
  console.log(helpData);
  return (
    <div className="admin-help-container">
      <div className="header-admin">
        <button className="back-button" onClick={onBack}>
          <span className="icon">&larr;</span>
        </button>
        <h1 className="title">Phản hồi người dùng</h1>
      </div>

      <div className="card">
        <div className="card-content">
          <div className="user-info">
            <img 
              src={helpData.user.avatar || "/api/placeholder/40/40"} 
              alt="User avatar"
              className="avatar"
            />
            <div>
              <h3 className="user-name">{helpData.user.username}</h3>
              <p className="user-email">{helpData.user.email}</p>
            </div>
          </div>

          <div className="details">
            <div className="section">
              <h4>Thể loại: {helpData.helpType}</h4>
              <p className="content-text">{helpData.content}</p>
            </div>
          </div>

          <div className="history">
            <h4 className="history-title">Lịch sử phản hồi</h4>
            <div className="history-list">
              {responseHistory.map((response, index) => (
                <div key={index} className="history-item">
                  <div className="history-meta">
                    <span className="history-time">Thời gian: {new Date(response.create_time).toLocaleString()}</span>
                    <span className="history-type">Thể loại: {response.help_type}</span>
                  </div>
                  <p className="history-content">{response.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="response-form">
        <textarea
          value={adminResponse}
          onChange={(e) => setAdminResponse(e.target.value)}
          className="response-input"
          placeholder="Nhập nội dung phản hồi..."
        />
        <button
          onClick={handleSubmitResponse}
          className="response-button"
        >
          Trả lời
        </button>
      </div>
    </div>
  );
};

export default AdminHelpResponse;
