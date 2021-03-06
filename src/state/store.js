import {
  applyMiddleware, 
  compose, 
  createStore
} from 'redux'
import createSagaMiddleware from 'redux-saga'

import {sagas} from './sagas'
import { 
  middleware as routesMiddleware, 
  enhancer as routesEnhancer
} from './modules/routing'
import { reducers } from './rootReducer'

const sagasMiddleware = createSagaMiddleware()

const composeMiddlewares = applyMiddleware(routesMiddleware, sagasMiddleware)

// Use Redux DevTools Extension if available and not in production.
const composeEnhancers = ((process.env.NODE_ENV !== 'production') && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export const store = createStore(
  reducers,
  composeEnhancers(routesEnhancer, composeMiddlewares)
)

sagasMiddleware.run(sagas)
