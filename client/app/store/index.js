import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { autoRehydrate } from 'redux-persist'

import rootReducer from './../reducers'

const middleware = applyMiddleware(thunk, createLogger())
const store = compose(autoRehydrate(), middleware)(createStore)(rootReducer)
export default store
