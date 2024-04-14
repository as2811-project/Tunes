import { NavBar } from './Components/NavBar';
import { LoginForm } from './Components/LoginForm';
import { HomePage } from './Components/HomePage';
import { RegForm } from './Components/SignUp';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import * as React from "react";
import {
  Routes,
  Route
} from "react-router-dom";
import Subscriptions from './Components/SubSection';

const Home = () => {
  return (
    <HomePage />
  )
};


const SubPage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const useremail = sessionStorage.getItem('useremail');
    if (!useremail) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <Subscriptions />
    </div>
  );
};

const Signup = () => {
  return (
    <RegForm />
  )
};

const Login = () => {
  return (
    <LoginForm />
  );
};

const handleLogout = () => {
  sessionStorage.removeItem('user');
}

export default function App() {
  return (
    <div>
      <NavBar handleLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/subscriptions"
          element={<SubPage />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </div>
  );
}
