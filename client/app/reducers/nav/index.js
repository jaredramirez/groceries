import _ from 'lodash'

import { INIT_ROUTES, REPLACE_ROUTE, PUSH_ROUTE, POP_ROUTE } from './../../actions/types'
import { updateObject, createReducer } from './../utility'

const initRoutes = (state, action) =>
  updateObject(state, {
    routes: [action.route],
    current: action.route
  })

const replaceRoute = (state, action) =>
  updateObject(state, {
    routes: [...state.routes.slice(0, state.routes.length - 1), action.route],
    current: action.route
  })

const pushRoute = (state, action) =>
  updateObject(state, {
    routes: [...state.routes, action.route],
    current: action.route
  })

const popRoute = (state, action) => {
  let routes = [...state.routes.slice(0, state.routes.length - 1)]
  return updateObject(state, {
    routes,
    current: _.last(routes)
  })
}

const initial = {
  routes: [],
  current: null
}

export default createReducer(initial, {
  INIT_ROUTES   : initRoutes,
  REPLACE_ROUTE : replaceRoute,
  PUSH_ROUTE    : pushRoute,
  POP_ROUTE     : popRoute
})
