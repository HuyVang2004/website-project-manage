import React, { useState, useRef, useEffect } from 'react';
import './ChatBox.scss';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
    inputRef.current?.focus();
  }, [messages]);

  // Ngăn scroll của window khi focus vào chatbox
  useEffect(() => {
    const handleWheel = (e) => {
      if (chatContainerRef.current?.contains(e.target)) {
        e.preventDefault(); // Thêm preventDefault để chặn cuộn mặc định
        e.stopPropagation();
      }
    };
  
    const container = chatContainerRef.current?.parentElement;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
  
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
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
    e.stopPropagation(); // Ngăn sự kiện lan ra container cha
    sendMessage();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation(); // Ngăn sự kiện lan ra container cha
      sendMessage();
    }
  };

  return (
    <div ref={chatContainerRef} className="chat-container" onWheel={e => e.stopPropagation()}>
      <div className="chat-header">
        <h3>Chat Box</h3>
      </div>
      
      <div className="messages-container">
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
        <div ref={messagesEndRef} />
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
  );
};

export default ChatBox;