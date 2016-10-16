export const INIT_ROUTES = 'INIT_ROUTES'
export const PUSH_ROUTE = 'PUSH_ROUTE'
export const POP_ROUTE = 'POP_ROUTE'
export const REPLACE_ROUTE = 'REPLACE_ROUTE'

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
