import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    axios.post('http://localhost:8080/login', { email, password })
      .then(response => {
        const userInfo = response.data;
        if (userInfo) {
          setError('');
          if (userInfo.userType === 'DEALER') {
            navigate('/dealer', { state: { id: userInfo.id } }); 
          } else if (userInfo.userType === 'CUSTOMER') {
            navigate('/customer/get-all-properties');
          }
        } else {
          setError('Invalid email or password');
        }
      })
      .catch(error => {
        console.error('Error logging in:', error);
        setError('An error occurred');
      });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button onClick={handleLogin}>Login</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <button className="back-home-button" onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}

export default LoginForm;
