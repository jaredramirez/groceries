import _ from 'lodash'
import _fp from 'lodash/fp'

export const updateObject = (oldObject, newValues) => _fp.assign(oldObject, newValues)

export const updateArray = (oldObject, newValues) => _.assign([], oldObject, newValues)

export const createReducer = (initialState, handlers) => {
  return reducer = (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
