import 'isomorphic-fetch';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

import '../css/global.css';
import './App.css';

import Home from './Home';
import About from './About';
import Article from './Article';

export default function App() {
  return (
    <div className="site-wrapper-inner">
      <div className="cover-container">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/:article" component={Article} />
        </Switch>
        <Footer />
        <Helmet
          htmlAttributes={{lang: "en", amp: undefined}} // amp takes no value
          titleTemplate="%s | React Starter Universal"
          titleAttributes={{itemprop: "name", lang: "en"}}
          meta={[
            {name: "charset", content: "utf-8"},
            {name: "description", content: "React Starter Universal"},
            {name: "viewport", content: "width=device-width, initial-scale=1"},
          ]}
        />
      </div>
    </div>
  );
}
