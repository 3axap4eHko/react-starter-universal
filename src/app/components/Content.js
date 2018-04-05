import React, { Component } from 'react';
import { string, object, arrayOf } from 'prop-types';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import withStyles from 'react-jss';

const styles = theme => ({
  '@global': {
    '#app': {
      position: 'relative',
    },
  },
  root: {
    display: 'flex',
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    transition: '1000ms all ease',
  },
  caption: {
    textAlign: 'center',
    color: theme.palette.primaryLight,
  },
  ['enter-start']: {
    position: 'absolute',
    marginTop: 500,
    opacity: 0.1,
    transition: '0ms all ease',
  },
  ['enter-active']: {
    position: 'absolute',
    marginTop: 0,
    opacity: 1,
  },
  ['enter-done']: {
    position: 'absolute',
    marginTop: 0,
    opacity: 1,
  },
  ['exit-start']: {
    position: 'absolute',
    marginTop: 0,
    opacity: 0.5,
  },
  ['exit-active']: {
    position: 'absolute',
    marginTop: 500,
    opacity: 0,
  },
  ['exit-done']: {
    position: 'absolute',
    marginTop: 500,
    opacity: 0,
  },
});

export class Content extends Component {
  static propTypes = {
    title: string.isRequired,
    caption: string,
    description: string,
    tags: arrayOf(string),
    canonical: string,
    classes: object,
  };

  static defaultProps = {
    caption: '',
    description: '',
    tags: [],
    canonical: '',
  };

  componentDidUpdate() {
    this.content.scrollTop;
  }

  componentWillUpdate() {
    this.content.scrollTop;
  }

  render() {
    const { className, classes, children, title, caption, description, tags, canonical } = this.props;

    return (
      <div className={classNames(classes.root, classes[className])} ref={content => this.content = content}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={tags.join(',')} />
          <link rel="canonical" href={`/${canonical}`} />
        </Helmet>
        <h1 className={classes.caption}>{caption}</h1>
        {children}
      </div>
    );
  }
}

export default withStyles(styles)(Content);