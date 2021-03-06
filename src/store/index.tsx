import { createStore, applyMiddleware, Store, AnyAction } from 'redux';
import reducers, {CombinedState} from './reducers'
import logger from 'redux-logger'
import thunk, {ThunkDispatch, ThunkAction} from 'redux-thunk'
import promise from 'redux-promise'
import {routerMiddleware} from 'connected-react-router'
import history from './history'
let store:Store<CombinedState, AnyAction> = createStore <CombinedState, AnyAction, {}, {}>(
  reducers,
  applyMiddleware(thunk, routerMiddleware(history), promise, logger)
)
export default store
