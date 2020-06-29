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


function App(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const loadCurrentUser = () => {
    setIsLoading(true);
    getCurrentUser().then(res => {
      setCurrentUser(res);
      setIsAuthenticated(true);
      setIsLoading(true);
    }).catch(err => {
      setIsLoading(false);
    })
  }

  const handleLogout = (redirectTo="/", type="success", description="You're successfully logged out.") => {
    localStorage.removeItem(ACCESS_TOKEN);
    setCurrentUser(null);
    setIsAuthenticated(false);

    props.history.push(redirectTo);
  }

  const handleLogin = () => {
    loadCurrentUser();
    props.history.push("/");
  }

  useEffect(() => {
    loadCurrentUser();
  }, [])
  return (
    <div>
      <AppHeader currentUser={currentUser}/>
      <div>
        <Switch>
          <Route exact path="/" render={(props) => <Store isAuthenticated={isAuthenticated} currentUser={currentUser}/>}/>
          <Route path="/login" render={(props) => <Login onLogin={handleLogin} {...props}/>}/>
          <Route path="/signup" component={SignUp}></Route>
          <Route component={NotFound}></Route>
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
