import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import myBusinesses from './myBusinesses'
import business from './business'
import categories from './categories'
import slot from './slot'
import appointment from './appointment'
const reducer = combineReducers({user, myBusinesses, business, categories, slot, appointment})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './myBusinesses'
export * from './business'
export * from './categories'
export * from './appointment'
export * from './slot'