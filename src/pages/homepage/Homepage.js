import React, { useEffect, useState } from 'react';
import './homepage.scss';
import { ReactComponent as Logo } from '../../assets/ANIMEFLIX.svg';
import gsap from 'gsap';
import { auth } from '../../firebase';

const Homepage = () => {
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to('.homepage', {
      duration: 0,
      visibility: 'visible',
    })
      .to('.loader__logo', {
        duration: 0,
        fill: '#E50914',
      })
      .from('.loader__logo', {
        duration: 1,
        y: 100,
        skewY: 20,
      })
      .to(".loader", {
        duration: 1,
        ease: "power3.in",
        delay: .5,
        opacity: 0, 
      })
      .to(".loader", {
          display: "none"
      })
  }, []);

  return (
    <div className="homepage">
      {firstLoad && (
          <div className="loader">
        <div className="loader__logo-container">
          <Logo className="loader__logo" />
        </div>

          </div>
      )}
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
};

export default Homepage;
