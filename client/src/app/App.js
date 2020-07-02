import React, {useState, useEffect} from 'react';
import {
  Route,
  withRouter,
  Switch
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [snackBar, setSnackBar] = useState({open: false, message: "", severity: ""});
  const [isLoading, setIsLoading] = useState(false);
  
  const loadCurrentUser = () => {
    setIsLoading(true);
    getCurrentUser().then(res => {
      setCurrentUser(res);
      setIsAuthenticated(true);
      setIsLoading(false);
      props.history.push("/");
      setSnackBar({
        open: true,
        message: "You're successfully signed in",
        severity: "success"
      });
    }).catch(err => {
      setIsLoading(false);
      setSnackBar({
        open: true,
        message: "Something went wrong",
        severity: "error"
      })
    })
  }

  const handleLogout = (redirectTo="/", message="You're successfully signed out.") => {
    localStorage.removeItem(ACCESS_TOKEN);
    setCurrentUser(null);
    setIsAuthenticated(false);

    props.history.push(redirectTo);
    setSnackBar({
      open: true,
      message,
      severity: "success"
    })
  }

  const handleLogin = () => {
    loadCurrentUser();
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
    <div>
      <AppHeader onLogout={handleLogout} currentUser={currentUser}/>
      <div>
        <Switch>
          <Route exact path="/" render={(props) => <Store isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/>
          <Route path="/login" render={(props) => <Login setSnackBar={setSnackBar} onLogin={handleLogin} {...props}/>}/>
          <Route path="/signup" render={(props) => <SignUp setSnackBar={setSnackBar} {...props}/>}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </div>
      <Snackbar autoHideDuration={5000} open={snackBar.open} onClose={() => controlSnackBar(false)}>
        <Alert onClose={() => controlSnackBar(false)} severity={snackBar.severity}>
          {snackBar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default withRouter(App);
