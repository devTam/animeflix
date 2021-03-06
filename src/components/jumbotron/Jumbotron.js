import React, { useState, useEffect } from 'react';

import './jumbotron.scss';
import ModalVideo from 'react-modal-video';

import truncate from '../../utility/truncate';
import fetchBanner from '../../utility/fetchBanner';

const Jumbotron = () => {
  const [anime, setAnime] = useState([]);
  const [isOpen, setOpen] = useState(false);



  useEffect(() => {
    // Fetch data from db
    fetchBanner(setAnime);

    return () => fetchBanner(setAnime);
  }, []);

  return (
    <header
      className="jumbotron"
      style={{
        backgroundImage: `linear-gradient(77deg,rgba(0,0,0,.6) 0,rgba(0,0,0,0) 85%),url("${anime?.photo}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className="jumbotron__contents">
        <h1 className="jumbotron__title">{anime?.name}</h1>
        <p className="jumbotron__desc">{truncate(anime?.summary, 150)}</p>
        <div className="jumbotron__btns">
          <button className="jumbotron__btn" onClick={() => setOpen(true)}>
            <svg viewBox="0 0 24 24">
              <path d="M6 4l15 8-15 8z" fill="currentColor"></path>
            </svg>
            Play
          </button>
          <button className="jumbotron__btn secondary__btn">
            <svg viewBox="0 0 24 24">
              <path
                d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zm-2 0a8 8 0 0 0-8-8 8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 0 8-8zm-9 6v-7h2v7h-2zm1-8.75a1.21 1.21 0 0 1-.877-.364A1.188 1.188 0 0 1 10.75 8c0-.348.123-.644.372-.886.247-.242.54-.364.878-.364.337 0 .63.122.877.364.248.242.373.538.373.886s-.124.644-.373.886A1.21 1.21 0 0 1 12 9.25z"
                fill="currentColor"
              ></path>
            </svg>
            More Info
          </button>
        </div>
      </div>
      <div className="jumbotron--fadeBottom"></div>
      {anime?.youtube && (
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={isOpen}
          videoId={anime?.youtube}
          onClose={() => setOpen(false)}
        />
      )}
    </header>
  );
};

export default Jumbotron;
