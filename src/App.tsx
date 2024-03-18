import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './page/register/Register';
import LoginPage from './page/login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='register' element={<RegisterPage />}/>
        <Route path='login' element={<LoginPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
