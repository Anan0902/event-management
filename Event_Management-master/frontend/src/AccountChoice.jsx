import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountChoice.css';

const AccountChoice = () => {
  const navigate = useNavigate();

  return (
    <div className="account-choice-wrapper">
      <div className="account-choice-box">
        <h2 className="account-choice-heading">Choose Your Account</h2>
        <div className="account-choice-buttons">
          <button className="account-button" onClick={() => navigate('/signup-participant')}>
            🧑‍🎓 Participant
          </button>
          <button className="account-button" onClick={() => navigate('/signup-host')}>
            🧑‍💼 Host
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountChoice;
