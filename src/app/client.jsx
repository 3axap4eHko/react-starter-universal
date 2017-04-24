import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './containers/App';
import createStore from './redux/createStore';

injectTapEventPlugin();

const store = createStore(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle
if (DEBUG) {
  window.store = store;
}

render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('app'),
);
