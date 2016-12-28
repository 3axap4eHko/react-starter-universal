'use strict';

import Fs from 'fs';
import Path from 'path';
import Express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import {match, RouterContext} from 'react-router';

import routes from './routes';
import store from './redux/store';

const serverDir = Path.dirname(process.argv[1]);
process.chdir(serverDir);

const serverPort = parseInt(process.argv[2]) || 9090;


const staticMiddleware = Express.static('www');
const App = Express();
const router = Express.Router();

const indexHTML = Fs.readFileSync('./index.html', {encoding: 'utf8'});
const excludeExpr = /(\/|\/index\.html)$/;

function staticHandler(req, res, next) {
    if (excludeExpr.test(req.originalUrl)) {
        next();
    } else {
        staticMiddleware(req, res, next);
    }
}

function renderFullPage(html, initialState) {
    return indexHTML
        .replace('<!--CONTENT-->', html)
        .replace('<!--STATE-->', `<script> window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>`);
}

router.get('*', function (req, res) {
    const location = req.originalUrl.split('index.html')[0];
    match({routes, location}, (error, redirectLocation, renderProps) => {
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

App.listen(serverPort, function () {
    console.log(`Served from http://localhost:${serverPort}`); // eslint-disable-line no-console
});