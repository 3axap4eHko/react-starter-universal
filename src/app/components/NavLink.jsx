/* eslint-disable */

import React from 'react';
import { Route, Link } from 'react-router-dom';

const NavLink = ({ to, ...rest }) => (
  <Route
    path={typeof to === 'object' ? to.pathname : to}
    exact={true}
    strict={false}
    children={({ location, match }) => (
      <li className={match && 'active'}>
        <Link
          to={to}
          {...rest}
        />
      </li>
    )}
  />
);

export default NavLink