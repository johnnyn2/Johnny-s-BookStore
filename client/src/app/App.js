import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch,
  useHistory
} from 'react-router-dom';
import Login from '../user/login';
import SignUp from '../user/signup';
import Profile from '../user/profile';
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import Store from '../pages/Store';
import { getCurrentUser } from '../util/api';
import { ACCESS_TOKEN } from '../constants/constants';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import css from './App.css';
import Grow from '@material-ui/core/Grow';
import { Payment } from '../pages/payment';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function GrowTransition(props) {
  return <Grow {...props} />;
}

function App(props) {
  const [currentUser, setCurrentUser] = useState({name: '', username: '', email: ''});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [snackBar, setSnackBar] = useState({open: false, message: "", severity: ""});
  const [isLoading, setIsLoading] = useState(false);
  
  async function loadCurrentUser() {
    setIsLoading(true);
    return getCurrentUser().then(res => {
      setCurrentUser(res);
      setIsAuthenticated(true);
      setIsLoading(false);
      setSnackBar({
        open: true,
        message: "You're successfully signed in",
        severity: "success"
      });
      console.log('set isLoggedin');
      return true;
    }).catch(err => {
      setIsLoading(false);
      setSnackBar({
        open: true,
        message: "Something went wrong",
        severity: "error"
      })
      return false;
    })
  }

  const handleLogout = (redirectTo="/", message="You're successfully signed out.") => {
    localStorage.removeItem(ACCESS_TOKEN);
    setCurrentUser({name: '', username: '', email: ''});
    setIsAuthenticated(false);
    window.location.replace("/");
  }

  const handleLogin = () => {
    loadCurrentUser().then(isLoggedIn => {
      if (isLoggedIn) {
        window.location.replace("/");
      }
    });
  }

  const controlSnackBar = (open) => setSnackBar((prevState) => ({...prevState, open,}));

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      setSnackBar({
        open: true,
        message: "Trying to sign in",
        severity: "info"
      })
      loadCurrentUser();
    }
  }, [])
  return (
    <Router>
    <div style={{width: '100%', height: '100%'}}>
      <AppHeader onLogout={handleLogout} currentUser={currentUser}/>
      <div style={{width: '100%', height: 'calc(100% - 64px)', display: 'flex'}}>
        <Switch>
          <Route exact path="/" render={(props) => <Store isAuthenticated={isAuthenticated} currentUser={currentUser} controlSnackBar={controlSnackBar} setSnackBar={setSnackBar} {...props}/>}/>
          <Route path="/login" render={(props) => <Login setSnackBar={setSnackBar} onLogin={handleLogin} {...props}/>}/>
          <Route path="/payment" render={(props) => <Payment isAuthenticated={isAuthenticated} currentUser={currentUser} controlSnackBar={controlSnackBar} setSnackBar={setSnackBar} {...props}/>}/>
          <Route path="/signup" render={(props) => <SignUp setSnackBar={setSnackBar} {...props}/>}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </div>
      <Snackbar autoHideDuration={5000} open={snackBar.open} onClose={() => controlSnackBar(false)} TransitionComponent={GrowTransition} key={GrowTransition.name}>
        <Alert onClose={() => controlSnackBar(false)} severity={snackBar.severity}>
          {snackBar.message}
        </Alert>
      </Snackbar>
    </div>
    </Router>
  );
}

export default App;
