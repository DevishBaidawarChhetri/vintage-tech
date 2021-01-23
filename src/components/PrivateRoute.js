import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../context/user';

const PrivateRoute = ({ children }) => {
  const { user } = React.useContext(UserContext);
  return (
    <Route render={() => { return user.token ? children : <Redirect to='/login' /> }} />
  )
}

export default PrivateRoute
