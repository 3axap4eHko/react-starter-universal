import React from 'react';
import { hydrate as render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Body, Head } from './components/HTML';
import App from './containers/App';
import createStore from './redux/createStore';

const store = createStore(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle
if (DEBUG) {
  window.store = store;
}

render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('app'),
);