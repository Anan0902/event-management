import React from 'react';
import { useParams } from 'react-router-dom';

const Dashboard = () => {
  const { username } = useParams();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to your dashboard, {username}!</h1>
      <p>This is a personalized dashboard page.</p>
    </div>
  );
};

export default Dashboard;
