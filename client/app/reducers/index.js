import {combineReducers} from 'redux'
import auth from './auth'
import grocery from './grocery'
import nav from './nav'
import ui from './ui'
import user from './user'

export default combineReducers({
  auth,
  grocery,
  nav,
  ui,
  user
})

/* Equivenlant to: */

// export default rootReducer = (state = {}, action) => {
//   return {
//     auth: auth(state.auth, action),
//     grocery: grocery(state.grocery, action),
//     user: user(state.user, action),
//     ui: ui(state.ui, action),
//     nav: nav(state.nav, action),
//   }
// }
