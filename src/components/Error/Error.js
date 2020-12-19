import React from 'react';
import { Link } from 'react-router-dom';
import './error.scss';

const Error = () => {
  return (
    <div className="error">
      <div className="error__content">
        <h1 className="error__code">404</h1>
        <p className="error__message">Oops, something went wrong...</p>

        <div className="error__btn">
        <Link to="/">Animeflix Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
