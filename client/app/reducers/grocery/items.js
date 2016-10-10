import { CREATE_GROCERY_ITEM, TOGGLE_GROCERY_ITEM, REMOVE_GROCERY_ITEM } from './../../actions/types'
import { updateObject, updateArray, createReducer } from './../utility'

const createGroceryItem = (state, action) =>
  updateArray(state, [
    ...state,
    {
      ...action.item
    }
  ])

const toggleGroceryItem = (state, action) =>
  updateArray(state, state.map((item, index, array) => {
    if(item.id !== action.item.id)
      return item
    return updateObject(item, { isCompleted: !item.isCompleted})
  }))

const removeGroceryItem = (state, action) => state.filter(item => item.id !== action.item.id)

const initialState = [
  { id: 0, name: 'Xantham Gum', quantity: 2, isCompleted: false },
  { id: 1, name: 'Flour',       quantity: 2, isCompleted: false },
  { id: 2, name: 'Mop',         quantity: 1, isCompleted: false },
  { id: 3, name: 'Bucket',      quantity: 1, isCompleted: false },
  { id: 4, name: 'Detergent',   quantity: 1, isCompleted: false }
]

export default createReducer(initialState, {
  CREATE_GROCERY_ITEM : createGroceryItem,
  TOGGLE_GROCERY_ITEM : toggleGroceryItem,
  REMOVE_GROCERY_ITEM : removeGroceryItem,
})
