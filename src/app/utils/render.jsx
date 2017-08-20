import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';

import { Head, Body, renderStatic } from '../components/HTML';
import App from '../containers/App';
import createStore from '../redux/createStore';
import { appLoad } from '../redux/actions';
import initialState from '../redux/states';

export default function render(req, res, state) {
  const store = createStore({ ...initialState, ...state });

  store
    .dispatch(appLoad())
    .then(() => {
      const context = {};

      const content = renderToString(
        <StaticRouter location={req.url} context={context}>
          <Provider store={store}>
            <App />
          </Provider>
        </StaticRouter>,
      );

      const helm = renderStatic(store);

      // context.url will contain the URL to redirect to if a <Redirect> was used
      if (context.url) {
        res.writeHead(302, {
          Location: context.url,
        });
        res.end();
      } else {
        res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
${helm.title}
${helm.meta}
${helm.link}
${helm.style}
</head>
<body>
<div id="app" class="site-wrapper">${content}</div>
${helm.script}
</body>
</html>
        `);
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
}
