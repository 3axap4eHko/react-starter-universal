import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { Helm } from '../components/HTML';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

import '../css/global.css';
import './App.css';

import Home from './Home';
import About from './About';

const App = ({ children }) => (
  <div className="site-wrapper-inner">
    <div className="cover-container">
      <Nav />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Footer />
      <Helm>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/css/index.css"/>
        <script src="/js/index.js"/>
      </Helm>
      {children}
    </div>
  </div>
);
export default withRouter(connect()(App));
