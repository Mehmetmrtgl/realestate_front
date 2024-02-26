import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Home.css'; 
function HomePage() {
  const navigate = useNavigate(); 

  const handleRegisterClick = () => {
    navigate('/register'); 
  };

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  return (
    <div className="home-container">
      <h2>Welcome to Real Estate Web Page</h2>
      <div className="options">
        
        <button className="option" onClick={handleLoginClick}>Login</button>
        <button className="option" onClick={handleRegisterClick}>Register</button>
      </div>
    </div>
  );
}

export default HomePage;
