import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../../components/SlideBar';
import TopBar from '../../components/Nav/TopBar';
import Footer from '../../components/Footer';
import './style/ChatBox.scss';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom of messages container
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const { scrollHeight, clientHeight } = messagesContainerRef.current;
      messagesContainerRef.current.scrollTop = scrollHeight - clientHeight;
    }
  };

  // Only scroll messages container when new message is added
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prevMessages => [...prevMessages, message]);
      setNewMessage('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app-container">
      <TopBar />
      <div className="main-content">
        <Sidebar />
        <div className="chat-wrapper">
          <div className="chat-container">
            <div className="chat-header">
              <h3>Trò chuyện</h3>
            </div>
            
            <div ref={messagesContainerRef} className="messages-container">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message-wrapper ${message.sender === 'user' ? 'user-message' : 'other-message'}`}
                >
                  <div className="message">
                    <p>{message.text}</p>
                    <span className="timestamp">{message.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="input-form">
              <input
                ref={inputRef}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập tin nhắn..."
                className="message-input"
              />
              <button type="submit" className="send-button">
                Gửi
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatBox;