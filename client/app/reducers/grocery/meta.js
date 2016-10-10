import { SET_CURRENT_GROCERY_LIST, CREATE_GROCERY_LIST, CREATE_GROCERY_ITEM } from './../../actions/types'
import { updateObject, createReducer } from './../utility'

const setCurrentGroceryList = (state, action) => updateObject(state, { currentListId: action.id })

const createGroceryList = (state, action) =>
  updateObject(state, {
    ...state,
    listId: state.listId += 1
  })

const createGroceryItem = (state, action) =>
  updateObject(state, {
    ...state,
    itemId: state.itemId += 1
  })

const initialState = {
  currentListId: 0,
  listId: 1,
  itemId: 4
}

export default createReducer(initialState, {
  SET_CURRENT_GROCERY_LIST : setCurrentGroceryList,
  CREATE_GROCERY_LIST      : createGroceryList,
  CREATE_GROCERY_ITEM      : createGroceryItem,
})
