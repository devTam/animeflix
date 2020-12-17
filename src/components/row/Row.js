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

const Row = ({ title, url }) => {
  const [movies, setMovies] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [slideCount, setSlideCount] = useState(7);
  const [showBtn, setShowBtn] = useState(false);
  const isFirstRender = useRef(true);
//   const rowpostersRef = useRef();

  const handleClick = (movie) => {
    setTrailer(movie.youtube);
  };
//   useEffect(() => {
//       console.log(rowpostersRef.current)
    
//   }, []);

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

//   MEDIA QUERIES FOR CAROUSEL RESIZE

  const desktop = window.matchMedia('(max-width: 1200px)');
  const smallDesktop = window.matchMedia('(max-width: 992px)');
  const tablet = window.matchMedia('(max-width: 768px)');
  const phone = window.matchMedia('(max-width: 576px)');
  const smallPhone = window.matchMedia('(max-width: 380px)');

//   FUNCTIONS FOR RESIZING CAROUSEL ITEMS
  const resizeDesktop = (e) => {
    if (e.matches) {
      setSlideCount(6);
    }
  };
  const resizeSmallDesktop = (e) => {
    if (e.matches) {
      setSlideCount(5);
    }
  };
  const resizeTablet = (e) => {
    if (e.matches) {
      setSlideCount(4);
    }
  };
  const resizePhone = (e) => {
    if (e.matches) {
      setSlideCount(3);
    }
  };
  const resizeSmallPhone = (e) => {
    if (e.matches) {
      setSlideCount(2);
    }
  };

//   EFFECT HOOK FOR EVENT LISTENERS ON CAROUSEL MEDIA QUERIES
  useEffect(() => {
    desktop.addEventListener('change', resizeDesktop);

    smallDesktop.addEventListener('change', resizeSmallDesktop);

    tablet.addEventListener('change', resizeTablet);

    phone.addEventListener('change', resizePhone);

    smallPhone.addEventListener('change', resizeSmallPhone);

    return () => {
      desktop.removeEventListener('change', resizeDesktop);
      smallDesktop.removeEventListener('change', resizeSmallDesktop);
      tablet.removeEventListener('change', resizeTablet);
      phone.removeEventListener('change', resizePhone);
      smallPhone.removeEventListener('change', resizeSmallPhone);
    };
  }, [desktop, smallDesktop, tablet, phone, smallPhone]);

  return (
    <main className="row">
      <h2 className="row__name">{title}</h2>
      <div className="row__posters" onMouseEnter={() => setShowBtn(true)} onMouseLeave={() => setShowBtn(false)}>
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
          <ButtonBack className={`slider-btn slider-btn--prev ${showBtn && "show-btn"}`}>
            <i className="fas fa-chevron-left"></i>
          </ButtonBack>
          <ButtonNext className={`slider-btn slider-btn--next ${showBtn && "show-btn"}`}>
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
