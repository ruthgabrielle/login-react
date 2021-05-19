import React, { useContext } from 'react';
import AuthContext from '../../context/auth-context';

import classes from './Navigation.module.css';

const Navigation = (props) => {
  const ctx = useContext(AuthContext)
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
  );
};

export default Navigation;
