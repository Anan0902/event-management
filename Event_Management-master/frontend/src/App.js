import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import LoginPage from './LoginPage';
import SignInPage from './SignInPage';
import WelcomePage from './WelcomePage';
import AccountChoice from './AccountChoice';
import SignupHost from './SignupHost';
import SignupParticipant from './SignupParticipant';
import About from './About';
import HostDashboard from './HostDashboard';
import ParticipantDashboard from './ParticipantDashboard'; 
import EventDetails from './EventDetails';
import './App.css';
import EditEventForm from './EditEventForm';

const AppContent = () => {
  const location = useLocation();
  
  const allowedNavbarRoutes = [
    '/login',
    '/account-choice',
    '/signup-participant',
    '/signup-host'
  ];
  
  const showNavbar = allowedNavbarRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      {showNavbar && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/account-choice" element={<AccountChoice />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/host-dashboard/:username/edit/:eventId" element={<EditEventForm />} />
          <Route path="/event/:eventId" element={<EventDetails />} />
          <Route path="/signup-host" element={<SignupHost />} />
          <Route path="/signup-participant" element={<SignupParticipant />} />
          <Route path="/host-dashboard/:username" element={<HostDashboard />} />
          <Route path="/participant/dashboard/:username" element={<ParticipantDashboard />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
