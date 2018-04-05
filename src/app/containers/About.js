import React, { Component } from 'react';
import Content from '../components/Content';
import withStyles from 'react-jss';

const styles = theme => ({
  image: {
    padding: 10,
    ...theme.shadows.elevation4,
  },
  link: {
    color: theme.palette.defaultText,
  }
});

@withStyles(styles)
export default class About extends Component {
  render() {
    const { classes, transitionClass } = this.props;

    return (
      <Content
        title="About Page"
        caption="Read more about React Starter Universal"
        description="React Starter Universal About Page"
        className={transitionClass}
      >
        <p className="lead" />
        <p className="lead">
          <a href="https://github.com/3axap4eHko/react-starter-universal" className={classes.link}>{'READ MORE >>'}</a>
        </p>
      </Content>
    );
  }
}
