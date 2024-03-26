import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';
import RegisterForm from '../components/register/RegisterFrom';

const PrivateRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
};

export default PrivateRoute;