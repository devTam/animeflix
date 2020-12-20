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
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import mediaQuery from '../../utility/mediaQuery';
import ProgressiveImage from 'react-progressive-image';

const Row = ({ title, url }) => {
  const [movies, setMovies] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [slideCount, setSlideCount] = useState(7);
  const [showBtn, setShowBtn] = useState(false);
  const isFirstRender = useRef(true);

  //   FETCHING DATA FROM DB
  useEffect(() => {
    db.collection('anime')
      .doc('oA4ytS11nTZdBwWdGYrj')
      .onSnapshot((snapshot) => {
        setMovies(snapshot.data()[url]);
      });
  }, [url]);

  //   MIMICK COMPONENTDIDUPDATE WITHOUT COMPONENTDIDMOUNT FIRING IN USEEFFECT
  useEffect(() => {
    if (!isFirstRender.current) {
      setOpen(true);
    }
  }, [trailer]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  //   UPDATE NUMBER OF ITEMS DISPLAYED BY SLIDER ON WINDOW RESIZE
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
                    onClick={() => setTrailer(movie?.youtube)}
                  >
                    {movie?.photo && (
                      <ProgressiveImage
                        src={movie.photo}
                        placeholder="../../assets/placeholder-min.png"
                      >
                        {(src, loading) => (
                          <img
                            style={{ opacity: loading ? 0.5 : 1 }}
                            src={src}
                            className="row__poster"
                            alt={movie.name}
                          />
                        )}
                      </ProgressiveImage>
                    )}

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
