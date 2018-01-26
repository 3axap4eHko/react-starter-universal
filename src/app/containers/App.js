import 'isomorphic-fetch';
import React from 'react';
import withStyle from 'react-jss';
import RouteContext from 'react-steersman/RouteContext';
import Route from 'react-steersman/Route';
import Helmet from 'react-helmet';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

import Home from './Home';
import About from './About';

const styles = theme => ({
  '@global': {
    'html, body, #app': {
      backgroundColor: theme.palette.background,
      color: theme.palette.text,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    '#app': {
      maxWidth: 800,
    },
  },
  content: {
    display: 'flex',
    flex: 1,
    width: '100%',
    ...theme.shadows.elevation4,
  }
});

const mapProps = ({ direction, status, ...props }) => ({
  ...props,
  transitionClass: `${direction}-${status}`,
});

export default withStyle(styles)(function App({ classes }) {
  return (
    <RouteContext transitionTimeout={1000} mapProps={mapProps}>
      <Nav />
      <div className={classes.content}>
        <Route exact path="/" children={Home} />
        <Route exact path="/about" children={About} />
      </div>
      <Footer />
      <Helmet
        htmlAttributes={{ lang: 'en', amp: undefined }} // amp takes no value
        titleTemplate="%s | React Starter Universal"
        titleAttributes={{ itemprop: 'name', lang: 'en' }}
        meta={[
          { name: 'charset', content: 'utf-8' },
          { name: 'description', content: 'React Starter Universal' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        ]}
      />
    </RouteContext>
  );
});
