import React from 'react';
import './login.scss';
import { ReactComponent as Google } from '../../assets/google.svg';
import { signInWithGoogle } from '../../firebase'

const Login = () => {

  const signIn = () => {
    signInWithGoogle();
  }

  return (
    <div className="login">
      <h1 className="login__heading">
        ANIMEFLIX
        <small className="login__subheading">Netflix for Otaku</small>
      </h1>
      <button className="login__btn" onClick={signIn}>
        <Google className="login__svg" />
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
