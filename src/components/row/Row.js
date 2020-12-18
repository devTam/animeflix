import React, { useState, useEffect, useRef } from 'react';
import { db } from '../../firebase';
import './row.scss';
import ModalVideo from 'react-modal-video';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import mediaQuery from '../../utility/mediaQuery';

const Row = ({ title, url }) => {
  const [movies, setMovies] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [slideCount, setSlideCount] = useState(7);
  const [showBtn, setShowBtn] = useState(false);
  const isFirstRender = useRef(true);

  const handleClick = (movie) => {
    setTrailer(movie.youtube);
  };

  //   FETCHING DATA FROM DB
  useEffect(() => {
    db.collection('anime')
      .doc('oA4ytS11nTZdBwWdGYrj')
      .onSnapshot((snapshot) => {
        setMovies(snapshot.data()[url]);
      });
  }, [url]);

  useEffect(() => {
    if (!isFirstRender.current) {
      setOpen(true);
    }
  }, [trailer]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  useEffect(() => {
    setSlideCount(7);
    window.addEventListener('resize', mediaQuery(setSlideCount, setShowBtn));
    return () =>
      window.removeEventListener(
        'resize',
        mediaQuery(setSlideCount, setShowBtn)
      );
  }, []);

  return (
    <main className="row">
      <h2 className="row__name">{title}</h2>
      <div
        className="row__posters"
        onMouseEnter={() => setShowBtn(true)}
        onMouseLeave={() => setShowBtn(false)}
      >
        <CarouselProvider
          naturalSlideWidth={160}
          naturalSlideHeight={220}
          totalSlides={10}
          visibleSlides={slideCount}
          isIntrinsicHeight={true}
          orientation="horizontal"
        >
          <Slider className="slider">
            {movies.map((movie, i) => {
              return (
                <Slide index={i} key={movie.id}>
                  <div
                    className="row__poster-container"
                    onClick={() => handleClick(movie)}
                  >
                    <img
                      className="row__poster"
                      alt={movie.name}
                      src={movie.photo}
                    />
                    <div className="row__poster-name">{movie.name}</div>
                  </div>
                </Slide>
              );
            })}
          </Slider>
          <ButtonBack
            className={`slider-btn slider-btn--prev ${showBtn && 'show-btn'}`}
          >
            <i className="fas fa-chevron-left"></i>
          </ButtonBack>
          <ButtonNext
            className={`slider-btn slider-btn--next ${showBtn && 'show-btn'}`}
          >
            <i className="fas fa-chevron-right"></i>
          </ButtonNext>
          {showBtn && (
            <DotGroup
              showAsSelectedForCurrentSlideOnly={true}
              className="indicator"
            />
          )}
        </CarouselProvider>
      </div>
      {trailer && (
        <ModalVideo
          channel="youtube"
          autoplay
          isOpen={isOpen}
          videoId={trailer}
          onClose={() => setOpen(false)}
        />
      )}
    </main>
  );
};

export default Row;
