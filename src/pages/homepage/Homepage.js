import React, { useEffect, useRef } from 'react';
import './homepage.scss';
import { ReactComponent as Logo } from '../../assets/ANIMEFLIX.svg';
import { auth } from '../../firebase';
import { connect } from 'react-redux';
import { signedOut } from '../../redux/actions';
import loaderAnimation from '../../animations/loader';

const Homepage = ({ firstLoad, signedOut }) => {
  const homepageRef = useRef(null);
  const logoRef = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    loaderAnimation(homepageRef, loaderRef, logoRef, firstLoad)
  }, [firstLoad]);

  return (
    <div className="homepage" ref={homepageRef}>
      {firstLoad && (
        <div className="loader" ref={loaderRef}>
          <div className="loader__logo-container">
            <Logo className="loader__logo" ref={logoRef} />
          </div>
        </div>
      )}
      <button
        onClick={() => {
          auth.signOut();
          signedOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

const mapStateToProps = ({ firstLoad }) => ({
  firstLoad,
});

const mapDispatchToProps = (dispatch) => ({
  signedOut: () => dispatch(signedOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
