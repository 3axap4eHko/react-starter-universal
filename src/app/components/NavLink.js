import React from 'react';
import withStyles from 'react-jss';
import classNames from 'classnames';
import createLink from 'react-steersman/createLink';

const styles = ({ palette }) => ({
  item: {
    padding: 10,
  },
  activeItem: {
    backgroundColor: palette.defaultDark,
  },
  link: {
    color: palette.defaultText,
  },
  activeLink: {
    color: palette.secondaryLight,
  },
});

export const NavLink = createLink(({ to, classes, title, navigate, active }) => (
  <li className={classNames(classes.item, { [classes.activeItem]: active })}>
    <a
      href={to}
      className={classNames(classes.link, { [classes.activeLink]: active })}
      title={title}
      onClick={navigate}
    >
      {title}
    </a>
  </li>
));

export default withStyles(styles)(NavLink);
