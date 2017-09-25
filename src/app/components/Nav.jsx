import React from 'react';
import NavLink from './NavLink';

export default function Nav() {
  return (
    <div className="masthead clearfix">
      <div className="inner">
        <h3 className="masthead-brand">React Redux Starter Universal</h3>
        <nav>
          <ul className="nav masthead-nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/article1">The First Article</NavLink>
            <NavLink to="/article2">The Second Article</NavLink>
            <NavLink to="/about">About</NavLink>
          </ul>
        </nav>
      </div>
    </div>
  );
}
