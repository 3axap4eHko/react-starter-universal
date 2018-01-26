import React, { Component } from 'react';
import withStyles from 'react-jss';
import Content from '../components/Content';
import Cargo from './Cargo.svg';

const styles = theme => ({
  image: {
    padding: 10,
    ...theme.shadows.elevation4,
  }
});

@withStyles(styles)
export default class Home extends Component {
  render() {
    const { classes, transitionClass } = this.props;

    return (
      <Content
        title="Home Page"
        caption="Create your application faster."
        description="React Starter Universal Home Page"
        className={transitionClass}
      >
        <img className={classes.image} src={Cargo} alt="React Starter Universal" />
      </Content>
    );
  }
}

