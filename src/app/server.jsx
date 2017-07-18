import Fs from 'fs';
import Path from 'path';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';

import App from './containers/App';
import createStore from './redux/createStore';
import { appLoad } from './redux/actions';
import initialState from './redux/states';

const serverDir = Path.dirname(process.argv[1]);
process.chdir(serverDir);

const serverPort = parseInt(process.argv[2], 10) || 9090;

const staticMiddleware = Express.static('www');
const app = Express();
const router = Express.Router();

const indexHTML = Fs.readFileSync('./index.html', { encoding: 'utf8' });
const excludeExpr = /(\/|\/index\.html)$/;

function staticHandler(req, res, next) {
  if (excludeExpr.test(req.originalUrl)) {
    next();
  } else {
    staticMiddleware(req, res, next);
  }
}

function renderFullPage(html, state) {
  return indexHTML
    .replace('<!--CONTENT-->', html)
    .replace('<!--STATE-->', `<script> window.__INITIAL_STATE__ = ${JSON.stringify(state)};</script>`);
}

router.get('*', (req, res) => {
  const store = createStore(initialState);

  store.dispatch(appLoad())
    .then(() => {
      const context = {};

      const html = renderToString(
        <StaticRouter location={req.url} context={context}>
          <Provider store={store}>
            <App />
          </Provider>
        </StaticRouter>,
      );
      // context.url will contain the URL to redirect to if a <Redirect> was used
      if (context.url) {
        res.writeHead(302, {
          Location: context.url,
        });
        res.end();
      } else {
        const finalState = store.getState();
        res.status(200).send(renderFullPage(html, finalState));
      }
    })
    .catch((error) => {
      console.error(error); // eslint-disable-line no-console
      try {
        res.writeHead(500);
      } catch (e) {
        // headers already sent
      }
      res.end();
    });
});

app.use(staticHandler);
app.use('/', router);

app.listen(serverPort, () => {
  console.log(`Served from http://localhost:${serverPort}`); // eslint-disable-line no-console
});
