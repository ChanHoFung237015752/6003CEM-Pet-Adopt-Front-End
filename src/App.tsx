import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './page/register/Register';
import LoginPage from './page/login/Login';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/Auth';
import  HomePage  from './page/home/Home';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path='' index element={<HomePage />} />
          <Route path='register' element={<RegisterPage />}/>
          <Route path='login' element={<LoginPage />}/>
        </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
