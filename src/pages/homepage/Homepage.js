import React, { useEffect, useRef, lazy, Suspense } from 'react';
import './homepage.scss';
import { ReactComponent as Logo } from '../../assets/ANIMEFLIX.svg';
import { connect } from 'react-redux';
import loaderAnimation from '../../animations/loader';
import Nav from '../../components/nav/Nav';
import Jumbotron from '../../components/jumbotron/Jumbotron';
import Loader from '../../components/loader/Loader';
import ErrorBoundary from '../../components/error-boundary/ErrorBoundary';
const Row = lazy(() => import('../../components/row/Row'));

const Homepage = ({ firstLoad }) => {
  const homepageRef = useRef(null);
  const logoRef = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    loaderAnimation(homepageRef, loaderRef, logoRef, firstLoad);
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
      <Nav />
      <Jumbotron />
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Row title="Favorites" url="favorites" />
          <Row title="Action" url="action" />
          <Row title="Adventure" url="adventure" />
          <Row title="Comedy" url="comedy" />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const mapStateToProps = ({ firstLoad }) => ({
  firstLoad,
});

export default connect(mapStateToProps)(Homepage);
