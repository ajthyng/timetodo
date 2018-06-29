import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger';

const logger = createLogger({
  collapsed: true
})

import thunk from 'redux-thunk'
import rootReducer from './reducers/index'

const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk, logger))

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store
}

export default configureStore