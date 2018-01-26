import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { JssProvider, ThemeProvider, SheetsRegistry } from 'react-jss';
import Steersman from 'react-steersman/Steersman';
import createMemoryHistory from 'react-steersman/createMemoryHistory';
import Helmet from 'react-helmet';
import CleanCSS from 'clean-css';
import App from '../containers/App';
import createStore from '../redux/createStore';
import theme from '../theme';
import initialState from '../redux/states';
import loadAssets from './assets';

const cleanCSS = new CleanCSS({});

export default async function render(req, res, state) {
  const { css, js } = await loadAssets();
  const sheets = new SheetsRegistry();

  const store = createStore({ ...initialState, ...state });

  const context = {};
  const history = createMemoryHistory({ initialEntries: [req.url] });

  const app = (
    <Provider store={store}>
      <JssProvider registry={sheets}>
        <ThemeProvider theme={theme}>
          <Steersman history={history}>
            <App />
          </Steersman>
        </ThemeProvider>
      </JssProvider>
    </Provider>
  );
  const content = renderToString(app);

  // context.url will contain the URL to redirect to if a <Redirect> was used
  if (context.url) {
    res.writeHead(302, {
      Location: context.url,
    });
    res.end();
  } else {
    const helmet = Helmet.renderStatic();
    const styles = cleanCSS.minify(sheets.toString()).styles;

    res.status(200).send(
      `<!DOCTYPE html>
<html lang="en" ${helmet.htmlAttributes.toString()}>
<head>
${helmet.title.toString()}
${helmet.meta.toString()}
${helmet.link.toString()}
${css}
<link rel="manifest" href="/manifest.json"/>
${helmet.style.toString()}
${helmet.base.toString()}
<style type="text/css" id="ssr-styles">${styles}</style>
<script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=es6,fetch"></script>
</head>
<body ${helmet.bodyAttributes.toString()}>
<div id="app" class="app-root">${content}</div>
${helmet.script}
<!-- Transfer config -->
<script>window.__CONFIG__ = ${JSON.stringify({}).replace(/</g, '\\u003c')}</script>
<!-- Transfer state of store -->
<script>window.__INITIAL_STATE__ = ${JSON.stringify(store.getState()).replace(/</g, '\\u003c')}</script>
${js}
</body>
</html>`);
  }
}
