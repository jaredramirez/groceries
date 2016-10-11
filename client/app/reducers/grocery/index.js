import {combineReducers} from 'redux'
import meta from './meta'
import lists from './lists'
import items from './items'

export default combineReducers({
  meta,
  lists,
  items,
})

// Equivenlant to:

// export default groceryReducer = (state = {}, action) => {
//   return {
//     meta: meta(state.meta, action),
//     lists: lists(state.lists, action),
//     items: items(state.items, action)
//   }
// }
