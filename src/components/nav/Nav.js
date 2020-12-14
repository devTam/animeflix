import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/ANIMEFLIX.svg';
import { withRouter } from "react-router-dom";
import { signedOut } from '../../redux/actions';
import { auth } from '../../firebase';

import './nav.scss';

const Nav = ({ user, signedOut, history }) => {
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleScroll = () => {
    window.scrollY > 100 ? setShow(true) : setShow(false);
  }

  const handleClick = () => {
      auth.signOut();
      signedOut();
      history.push('/');
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className={`nav ${show && 'nav-black'}`}>
        <Logo className="nav__logo" />
        <img
          className="nav__avatar"
          src={user ? user : 'https://pbs.twimg.com/media/CW2i0pJW4AEYFI3.png'}
          alt="display"
          onClick={() => setShowDropdown(!showDropdown)}
        />
      </div>
      {
          showDropdown &&
      <div className="nav__dropdown">
          <button className="signout" onClick={handleClick}>Sign out of Animeflix</button>
      </div>
      }
    </>
  );
};

const mapStateToProps = ({ user }) => ({
  user,
});


const mapDispatchToProps = (dispatch) => ({
    signedOut: () => dispatch(signedOut()),
  });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
