import React, { Component } from 'react';
import withStyles from 'react-jss';
import NavLink from './NavLink';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '0 10px',
    ...theme.shadows.elevation4,
  },
  title: {
    textTransform: 'uppercase',
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    listStyle: 'none',
  },
  item: {

  },
  activeItem: {

  }
});

@withStyles(styles)
export default class Nav extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <h2 className={classes.title}>React Redux Starter Universal</h2>
        <nav>
          <ul className={classes.menu}>
            <NavLink to="/" title="Home" />
            <NavLink to="/about" title="About" />
          </ul>
        </nav>
      </div>
    );
  }
}
