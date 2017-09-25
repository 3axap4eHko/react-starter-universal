/* eslint-disable */

import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

export default function NavLink({ to, ...rest }) {
  return (
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
}
