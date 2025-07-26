import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI travel assistant. How can I help you plan your trip?',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        content: inputValue,
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputValue('');
      
      setTimeout(() => {
        const assistantResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content: 'I understand you want to plan a trip. Could you tell me more about your destination preferences, budget, and travel dates?',
          sender: 'assistant',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-sidebar">
      <div className="chat-header">
        <h3>AI Travel Assistant</h3>
        <button onClick={onClose} className="close-btn">×</button>
      </div>
      
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">{message.content}</div>
            <div className="message-time">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="chat-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about your trip..."
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-btn">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatSidebar;