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
  const isFirstRender = useRef(true);

  const handleClick = (movie) => {
    setTrailer(movie.youtube);
  };

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

  return (
    <main className="row">
      <h2 className="row__name">{title}</h2>
      <div className="row__posters">
        <CarouselProvider
          naturalSlideWidth={160}
          naturalSlideHeight={220}
          totalSlides={10}
          visibleSlides={7}
          isIntrinsicHeight={true}
          orientation="horizontal"
        >
          <Slider>
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
          <ButtonBack>Back</ButtonBack>
          <ButtonNext>Next</ButtonNext>
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
