'use strict';

import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
//import offline from 'offline-plugin/runtime';
injectTapEventPlugin();
//offline.install();
import {Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import {IntlProvider} from 'react-intl';

import store from './redux/store';
import routes from './routes';
window.store = store;

render(
    <IntlProvider locale="en">
        <Provider store={store}>
            <Router history={browserHistory} routes={routes} />
        </Provider>
    </IntlProvider>,
    document.getElementById('app')
);