import {
  INIT_ROUTES,
  REPLACE_ROUTE,
  PUSH_ROUTE,
  POP_ROUTE
} from './types'

export const initRoutes = (route) => {
  return {type: INIT_ROUTES, route }
}

export const replaceRoute = (route) => {
  return {type: REPLACE_ROUTE, route }
}

export const pushRoute = (route) => {
  return {type: PUSH_ROUTE, route }
}

export const popRoute = () => {
  return {type: POP_ROUTE }
}
