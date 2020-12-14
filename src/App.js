import {useEffect} from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import Login from "./pages/login/Login";
import Homepage from "./pages/homepage/Homepage"
import { auth } from './firebase'
import { signedIn } from './redux/actions';

function App({signedInUser, user}) {
    useEffect(() => {
      auth.onAuthStateChanged(user => {
        const { photoURL } = user;
        signedInUser(photoURL)
      })
    }, [signedInUser])

  return (
    <div className="app">
      <Switch>
        <Route path="/home" component={Homepage} />
        <Route path="/" render={() => user ? (<Redirect to='/home' />) : (<Login />)} />
      </Switch>
      
    </div>
  );
}

const mapStateToprops = ({user}) => ({
  user
})

const mapDispatchToProps = dispatch => ({
  signedInUser: (user) => dispatch(signedIn(user))
})

export default connect(mapStateToprops, mapDispatchToProps)(App);
