'use strict';

import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import AppContainer from '../containers/App';
import Home from '../containers/Home';
import About from '../containers/About';

export default (
    <Router history={browserHistory}>
        <Route path="/" component={AppContainer}>
            <IndexRoute component={Home} />
            <Route path="/" component={Home} />
            <Route path="/index.html" component={Home} />
            <Route path="about" component={About} />
        </Route>
    </Router>
);