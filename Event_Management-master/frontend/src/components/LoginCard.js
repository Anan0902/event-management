import React from 'react';
import './LoginCard.css';

const LoginCard = () => (
  <div className="login-card">
    <h2>Login</h2>
    <input type="text" placeholder="Username or Email" />
    <input type="password" placeholder="Password" />
    <button className="btn">Sign in</button>
    <div className="or">OR</div>
    import { Link } from 'react-router-dom';

// Inside your return
<Link to="/signin" className="signin-link">Sign In</Link>

  </div>
);

export default LoginCard;
