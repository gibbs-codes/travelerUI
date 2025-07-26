import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import TripDetailsPage from './pages/TripDetailsPage';
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">
            <Link to="/">TravelAI</Link>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/plan" className="nav-link">Plan Trip</Link>
            <Link to="/trips" className="nav-link">My Trips</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/plan" element={<ChatPage />} />
            <Route path="/trips" element={<TripDetailsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
