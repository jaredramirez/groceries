import { UI_TOGGLE_DRAWER } from './../../actions/types'
// import * as ActionTypes from './../../actions/types'
import { updateObject, createReducer } from './../utility'

const uiToggleDrawer = (state, action) => {
  let tmp = updateObject(state, { drawerIsOpen: !state.drawerIsOpen })
  return tmp
}

const initialState = {
  drawerIsOpen: false
}

export default createReducer(initialState, {
  UI_TOGGLE_DRAWER: uiToggleDrawer
})
