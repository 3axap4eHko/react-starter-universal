import React, { Component } from 'react';
import withStyles from 'react-jss';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
  },
  link: {
    color: theme.palette.text,
  }
});

@withStyles(styles)
export default class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <a className={classes.link} href="https://github.com/3axap4eHko/react-starter-universal">React Redux Starter Universal</a>, by
        <a className={classes.link} href="https://twitter.com/3axap4eHko"> @3axap4eHko</a>.
      </div>
    );
  }
}
