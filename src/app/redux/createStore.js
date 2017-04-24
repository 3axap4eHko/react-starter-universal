import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers';

const loggerMiddleware = createLogger({
  stateTransformer(state) {
    return state;
  },
  actionTransformer(action) {
    return { ...action, type: `${action.type}_${action.status}` };
  },
  collapsed: true,
});

const middleware = [
  thunkMiddleware,
  DEBUG && loggerMiddleware,
].filter(Boolean);

export default function create(initialState) {
  const store = createStore(reducers,
    initialState,
    applyMiddleware(...middleware));

  store.dispatchAll = function dispatchAll(actions) {
    return Promise.all(actions.map(action => store.dispatch(action())));
  };

  return store;
}
