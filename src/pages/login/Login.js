import React from 'react';
import './login.scss';
import { ReactComponent as Google } from '../../assets/google.svg';
import { auth, provider } from '../../firebase';
import audio from '../../assets/netflix-sound.mp3';

const Login = () => {
  let sound = new Audio(audio);

  const signIn = () => {
    auth.signInWithPopup(provider).then(() => 
    {
      console.log("loggin in")
      sound.play()
    })

  };

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
