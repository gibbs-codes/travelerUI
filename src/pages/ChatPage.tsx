import React, { useState } from 'react';
import ChatSidebar from '../components/ChatSidebar';

const ChatPage: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);

  return (
    <div className="chat-page">
      <div className="main-content">
        <div className="chat-intro">
          <h1>Plan Your Trip with AI</h1>
          <p>Start a conversation with our AI travel assistant to create your perfect itinerary.</p>
          
          <div className="suggested-prompts">
            <h3>Try asking:</h3>
            <div className="prompt-cards">
              <div className="prompt-card">
                "Plan a 7-day trip to Japan for $3000"
              </div>
              <div className="prompt-card">
                "What are the best activities in Paris for families?"
              </div>
              <div className="prompt-card">
                "Create an itinerary for a romantic weekend getaway"
              </div>
              <div className="prompt-card">
                "I want to visit multiple cities in Europe, help me plan the route"
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ChatSidebar 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
      
      {!isChatOpen && (
        <button 
          className="chat-toggle-btn"
          onClick={() => setIsChatOpen(true)}
        >
          💬 Open Chat
        </button>
      )}
    </div>
  );
};

export default ChatPage;