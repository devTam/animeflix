import { useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import Loader from './components/loader/Loader';
import { auth } from './firebase';
import { signedIn } from './redux/actions';

const Homepage = lazy(() => import('./pages/homepage/Homepage'));
const Login = lazy(() => import('./pages/login/Login'));

function App({ signedInUser, user }) {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { photoURL } = user;
        signedInUser(photoURL);
      }
    });
  }, [signedInUser]);

  return (
    <div className="app">
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Route path="/home" component={Homepage} />
            <Route
              path="/"
              render={() => (user ? <Redirect to="/home" /> : <Login />)}
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
}

const mapStateToprops = ({ user }) => ({
  user,
});

const mapDispatchToProps = (dispatch) => ({
  signedInUser: (user) => dispatch(signedIn(user)),
});

export default connect(mapStateToprops, mapDispatchToProps)(App);
