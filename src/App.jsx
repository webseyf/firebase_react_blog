import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';

import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';

import { auth } from './firebase';
//import './App.css';
import { signOut } from 'firebase/auth';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
  const signout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/login';
    });
  };

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        {isAuth ? (
          <>
            <Link to="/createpost">Create Post</Link>
            <button onClick={signout}>Log Out</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
