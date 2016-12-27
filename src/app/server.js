'use strict';

import Fs from 'fs';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';

import routes from './routes';
import store from './redux/store';

const App = Express();
const router = Express.Router();
const staticMiddleware = Express.static('www');
const indexHTML = Fs.readFileSync('./www/index.html', {encoding: 'utf8'});
const indexHTMLExpr = /(\/|\/index\.html)$/;


function staticHandler(req, res, next) {
    if (indexHTMLExpr.test(req.originalUrl)) {
        next();
    } else {
        staticMiddleware(req, res, next);
    }
}

function renderFullPage(html, initialState) {
    return indexHTML
        .replace('<!--CONTENT-->',html)
        .replace('<!--STATE-->',`<script> window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>`);
}

router.get('*', function (req, res) {
    const location = req.originalUrl.split('index.html')[0];
    match({ routes, location }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {

            const html = renderToString(
                <Provider store={store}>
                    <RouterContext {...renderProps} />
                </Provider>
            );

            const finalState = store.getState();
            res.status(200).send(renderFullPage(html, finalState));
        }
    });
});
App.use(staticHandler);
App.use('/', router);

App.listen(9090, function () {
    console.log('Served from http://localhost:9090'); // eslint-disable-line no-console
});