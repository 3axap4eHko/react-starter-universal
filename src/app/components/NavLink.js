import React from 'react';
import withStyles from 'react-jss';
import classNames from 'classnames';
import createLink from 'react-steersman/createLink';

const styles = theme => ({
  item: {
    padding: 10,
  },
  activeItem: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  link: {
    color: theme.palette.text,
  },
  activeLink: {
    color: theme.palette.accent,
  },
});

export default withStyles(styles)(createLink(({ to, classes, title, navigate, match }) => (
  <li className={classNames(classes.item, { [classes.activeItem]: match })}>
    <a
      href={to}
      className={classNames(classes.link, { [classes.activeLink]: match })}
      title={title}
      onClick={navigate}
    >
      {title}
    </a>
  </li>
)));
