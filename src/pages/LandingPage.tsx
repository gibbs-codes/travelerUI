import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Plan Your Perfect Trip with AI</h1>
          <p>Let our intelligent travel assistant help you create amazing journeys tailored to your preferences.</p>
          <div className="cta-buttons">
            <Link to="/plan" className="btn btn-primary">Start Planning</Link>
            <Link to="/trips" className="btn btn-secondary">View My Trips</Link>
          </div>
        </div>
      </div>
      
      <div className="features-section">
        <div className="container">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>AI-Powered Planning</h3>
              <p>Get personalized recommendations based on your preferences, budget, and travel style.</p>
            </div>
            <div className="feature-card">
              <h3>Interactive Calendar</h3>
              <p>Visualize your itinerary with our intuitive calendar interface.</p>
            </div>
            <div className="feature-card">
              <h3>Smart Maps</h3>
              <p>Explore destinations and plan routes with integrated mapping features.</p>
            </div>
            <div className="feature-card">
              <h3>Detailed Itineraries</h3>
              <p>Get comprehensive trip details with activities, bookings, and important information.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;