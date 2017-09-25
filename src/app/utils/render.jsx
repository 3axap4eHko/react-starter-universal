import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import Helmet from 'react-helmet';
import { fetch } from 'react-service';
import App from '../containers/App';
import createStore from '../redux/createStore';
import initialState from '../redux/states';

const isProd = process.env.NODE_ENV === 'production';

export default async function render(req, res, state) {
  const store = createStore({ ...initialState, ...state });

  const context = {};

  const app = (
    <StaticRouter location={req.url} context={context}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  );

  fetch(app)
    .then(() => {

      const content = renderToString(app);
      const helmet = Helmet.renderStatic();

      // context.url will contain the URL to redirect to if a <Redirect> was used
      if (context.url) {
        res.writeHead(302, {
          Location: context.url,
        });
        res.end();
      } else {
        res.status(200).send(
          `<!DOCTYPE html>
<html lang="en" ${helmet.htmlAttributes.toString()}>
<head>
${helmet.title.toString()}
${helmet.meta.toString()}
${helmet.link.toString()}
<link rel="stylesheet" href="/css/index.css" />
${helmet.style.toString()}
${helmet.base.toString()}
</head>
<body ${helmet.bodyAttributes.toString()}>
<div id="app" class="site-wrapper">${content}</div>
${helmet.script}
<!-- Transfer state of store -->
<script>window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}</script>
${isProd ? '<script src="/js/common.js"></script>' : ''}
<script src="/js/index.js"></script>
</body>
</html>`);
      }
    });
}
