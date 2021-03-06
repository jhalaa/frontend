import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, session, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (session.username) {
        return <Component {...props} />;
      }

      if (loggedIn === false) {
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        );
      }

      return null;
    }}
  />
);

const mapStateToProps = state => ({
  session: state.SessionsReducer.session,
  loggedIn: state.SessionsReducer.loggedIn,
});

export default connect(
  mapStateToProps,
  null,
)(PrivateRoute);
