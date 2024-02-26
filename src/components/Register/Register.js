import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; 
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedOption, setSelectedOption] = useState('dealer');
  const [errorMessages, setErrorMessages] = useState({});
  const [userType, setUserType] = useState('DEALER'); 
  const navigate = useNavigate(); 

  const handleRegister = () => {
    if (!firstName || !lastName || !email || !password || !mobileNumber) {
      setErrorMessages({ general: 'Tüm alanları doldurunuz.' });
      return;
    }

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      mobileNumber: mobileNumber,
      userType: userType 
    };

    const url = selectedOption === 'dealer' ? 'http://localhost:8080/dealers/add' : 'http://localhost:8080/customers/add';

    axios.post(url, newUser)
      .then(response => {
        console.log('User registered successfully:', response.data);
       
        navigate('/');
      })
      .catch(error => {
        console.error('Error registering user:', error);
        if (error.response && error.response.status === 500) {
          
          setErrorMessages({ ...errorMessages, email: 'Bu e-posta adresi zaten kullanımda.' });
        } else {
          
          setErrorMessages({ ...errorMessages, general: 'Kayıt işlemi sırasında bir hata oluştu.' });
        }
      });
  };

  const clearErrorMessages = () => {
    setErrorMessages({});
  };

  return (
    <div className="register-container">
      <div className="register-form">
      <input type="text" placeholder="First Name" className="input-field" value={firstName} onChange={(e) => {setFirstName(e.target.value); clearErrorMessages();}} />
      <input type="text" placeholder="Last Name" className="input-field" value={lastName} onChange={(e) => {setLastName(e.target.value); clearErrorMessages();}} />
      <input type="email" placeholder="Email" className="input-field" value={email} onChange={(e) => {setEmail(e.target.value); clearErrorMessages();}} />
      <input type="password" placeholder="Password" className="input-field" value={password} onChange={(e) => {setPassword(e.target.value); clearErrorMessages();}} />
      <input type="text" placeholder="Mobile Number" className="input-field" value={mobileNumber} onChange={(e) => {setMobileNumber(e.target.value); clearErrorMessages();}} />

        <div className="options">
          <div className="option">
            <input type="radio" id="dealer" name="userType" value="dealer" checked={selectedOption === 'dealer'} onChange={() => {setSelectedOption('dealer'); clearErrorMessages(); setUserType('DEALER');}} />
            <label htmlFor="dealer">Dealer</label>
          </div>
          <div className="option">
            <input type="radio" id="customer" name="userType" value="customer" checked={selectedOption === 'customer'} onChange={() => {setSelectedOption('customer'); clearErrorMessages(); setUserType('CUSTOMER');}} />
            <label htmlFor="customer">Customer</label>
          </div>
        </div>

        <button onClick={handleRegister}>Register</button>
      </div>

      {errorMessages.general && <div className="error-message">{errorMessages.general}</div>}
      {errorMessages.email && <div className="error-message">{errorMessages.email}</div>}

      <button className="back-home-button" onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
}

export default RegisterForm;
