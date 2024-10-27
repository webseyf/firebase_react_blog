import React from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Make sure to import your CSS file

function Login({ setIsAuth }) {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        localStorage.setItem('isAuth', true);
        setIsAuth(true);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  };

  return (
    <div className="loginPage">
      <p>Sign in with Google</p>
      <button onClick={signInWithGoogle} className="login-with-google">
        Sign in With Google
      </button>
    </div>
  );
}

export default Login;
