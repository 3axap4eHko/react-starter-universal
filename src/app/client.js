import React from 'react';
import { hydrate as render } from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'react-jss';
import Steersman from 'react-steersman/Steersman';
import createBrowserHistory from 'react-steersman/createBrowserHistory';
import App from './containers/App';
import createStore from './redux/createStore';
import theme from './theme';

const store = createStore(window.__INITIAL_STATE__); // eslint-disable-line no-underscore-dangle
if (DEBUG) {
  window.store = store;
}

function AppContainer() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Steersman history={createBrowserHistory()}>
          <App />
        </Steersman>
      </ThemeProvider>
    </Provider>
  );
}

render(<AppContainer />, document.getElementById('app'));