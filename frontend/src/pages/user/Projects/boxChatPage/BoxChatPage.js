import React, { useState, useRef, useEffect } from 'react';
import './ChatBox.scss';

const ChatBox = ({ projectId, teamMembers }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [wsStatus, setWsStatus] = useState('connecting');
  const [error, setError] = useState('');
  const socketRef = useRef(null);
  const scrollRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('user_profile') || '{}');
  const userId = userData?.user_id;

  // Debug logging function
  const debugLog = (type, data) => {
    console.log(`[${type}]`, data);
  };

  // Convert local time to UTC+7 (Vietnam timezone)
  const getVietnamTime = () => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const vietnamOffset = 7 * 60 * 60000; // UTC+7 in milliseconds
    return new Date(utc + vietnamOffset).toISOString();
  };

  // Format timestamp to Vietnam time
  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('vi-VN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Ho_Chi_Minh'
      });
    } catch (error) {
      debugLog('Time format error', { timestamp, error });
      return '';
    }
  };

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // WebSocket connection
  useEffect(() => {
    const connectWebSocket = () => {
      if (!projectId || !userId) {
        debugLog('Error', 'Missing projectId or userId');
        return;
      }

      debugLog('Config', { projectId, userId });

      const wsUrl = `ws://localhost:8000/message/ws/projects/${projectId}/${userId}`;
      debugLog('Connecting to', wsUrl);
      
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        debugLog('WebSocket', 'Connected');
        setWsStatus('connected');
        setError('');
      };

      ws.onmessage = (event) => {
        try {
            const rawData = event.data;
            debugLog('Raw WebSocket message', rawData);
            
            const data = JSON.parse(rawData);
            debugLog('Parsed WebSocket message', data);
            
            switch (data.type) {
                case 'history':
                    // console.log("history received:", data);
                    setMessages(prevMessages => {
                        const newMessages = [...prevMessages];
                        
                        data.messages.forEach(historyMsg => {
                            if (!newMessages.some(msg => msg.message_id === historyMsg.message_id)) {
                                newMessages.push(historyMsg);
                            }
                        });
                        
                        // Sort messages by timestamp if needed
                        return newMessages.sort((a, b) => 
                            new Date(a.sent_time) - new Date(b.sent_time)
                        );
                    });
                    break;
                    
                case 'message':
                    console.log("new message received");
                    const newMsg = {
                        id: data.message.id || Date.now().toString(),
                        content: data.message.content,
                        sender_id: data.message.sender_id || userId,
                        sent_time: data.message.sent_time || getVietnamTime(),
                        project_id: projectId
                    };
                    
                    setMessages(prevMessages => {
                        const filteredMessages = prevMessages.filter(msg =>
                            !(msg.pending &&
                            msg.content === newMsg.content &&
                            msg.sender_id === newMsg.sender_id)
                        );
                        return [...filteredMessages, newMsg];
                    });
                    break;
                    
                case 'system':
                    console.log('system message received');
                    const systemMsg = {
                        id: 'system-' + Date.now(),
                        content: data.message,
                        type: 'system',
                        sent_time: getVietnamTime()
                    };
                    setMessages(prevMessages => [...prevMessages, systemMsg]);
                    break;
                    
                case 'error':
                    debugLog('Error message', data.message);
                    setError(data.message);
                    break;
                    
                default:
                    debugLog('Unknown message type', data);
            }
        } catch (error) {
            console.error('Error processing message:', error);
            debugLog('Error', { error: error.message, data: event.data });
        }
    };

      ws.onerror = (error) => {
        debugLog('WebSocket Error', error);
        setWsStatus('error');
        setError('Connection error occurred');
      };

      ws.onclose = () => {
        setWsStatus('disconnected');
        // Attempt to reconnect after 5 seconds
        reconnectTimeoutRef.current = setTimeout(connectWebSocket, 5000);
      };

      socketRef.current = ws;
    };

    connectWebSocket();

    // Cleanup on unmount
    return () => {
      debugLog('Cleanup', 'Closing WebSocket connection');
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [projectId, userId]);

  // Handle message submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || wsStatus !== 'connected') return;
    
    const messageContent = newMessage.trim();
    const messageData = {
      content: messageContent,
      sender_id: userId,
      project_id: projectId,
      sent_time: getVietnamTime() // Use Vietnam time
    };

    try {
      // Send message through WebSocket
      socketRef.current.send(JSON.stringify(messageData));
      
      // Add optimistic message
      const optimisticMessage = {
        ...messageData,
        id: `temp-${Date.now()}`,
        pending: true
      };
      setMessages(prevMessages => [...prevMessages, optimisticMessage]);
      
      // Clear input
      setNewMessage('');
    } catch (error) {
      debugLog('Send Error', error);
      setError('Failed to send message');
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (newMessage.trim() && wsStatus === 'connected') {
        handleSubmit(e);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Chat Box</h3>
        <span className={`status-indicator ${wsStatus}`}>
          {wsStatus === 'connected' ? '🟢' : wsStatus === 'connecting' ? '🟡' : '🔴'}
        </span>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="messages-container" ref={scrollRef}>
        {messages.map((message) => {
          // Lấy tên người gửi từ teamMembers
          const senderName =
            teamMembers.find((member) => member.userId === message.sender_id)?.username || "Unknown";

          return (
            <div
              key={message.id}
              className={`message-wrapper ${
                message.type === 'system'
                  ? 'system-message'
                  : message.sender_id === userId
                  ? 'user-message'
                  : 'other-message'
              }`}
            >
              {/* Hiển thị tên người gửi nếu không phải bạn */}
              {message.sender_id !== userId && (
                <div className="sender-name">{senderName}</div>
              )}

              <div className={`message ${message.pending ? 'pending' : ''}`}>
                <p>{message.content}</p>
                <span className="timestamp">{formatTime(message.sent_time)}</span>
              </div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter message..."
          className="message-input"
          disabled={wsStatus !== 'connected'}
        />
        <button 
          type="submit" 
          className="send-button" 
          disabled={wsStatus !== 'connected'}
        >
          Send
        </button>
      </form>

      <div className="debug-info" style={{ fontSize: '10px', color: '#666' }}>
        Status: {wsStatus} | Messages: {messages.length}
      </div>
    </div>
  );
};

export default ChatBox;