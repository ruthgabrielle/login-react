import React from 'react';
import AuthContext from '../../context/auth-context';

import classes from './Navigation.module.css';

const Navigation = (props) => {
  return (
    <AuthContext.Consumer>
      {(ctx) => {
        return (
          <nav className={classes.nav}>
            <ul>
              {ctx.isLogged && (
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {ctx.isLogged && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {ctx.isLogged && (
                <li>
                  <button onClick={props.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        )
      }}

    </AuthContext.Consumer>
  );
};

export default Navigation;
