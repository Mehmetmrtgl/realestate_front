import React from 'react';
import PropertyList from './components/Property/Property';
import HomePage from './components/Home/Home';
import LoginForm from './components/Login/Login';
import RegisterForm from './components/Register/Register'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dealer from './components/Dealer/Dealer';
import PropertyUpdatePage from './components/PropertyUpdate/PropertyUpdate';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/customer/get-all-properties" element={<PropertyList />} />
        <Route path="/dealer*" element={<Dealer />} />
        <Route path="/dealer/property-update/:propertyId" element={<PropertyUpdatePage />}/>
        
      </Routes>
    </Router>
  );
}

export default App;
