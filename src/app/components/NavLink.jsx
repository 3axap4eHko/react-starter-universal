/* eslint-disable */

import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

class NavLink2 extends Component {
  render() {
    const { to, ...rest } = this.props;
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
}

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
