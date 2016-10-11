import _fp from 'lodash/fp'
import { CREATE_GROCERY_LIST, REMOVE_GROCERY_LIST, CREATE_GROCERY_ITEM, REMOVE_GROCERY_ITEM } from './../../actions/types'

import { updateArray, createReducer } from './../utility'

const createGroceryList = (state, action) =>
  updateArray(state, [
    ...state,
    {
      ...action.list
    }
  ])

const removeGroceryList = (state, action) => state.filter(list => list.id !== action.id)

const createGroceryItem = (state, action) => {
  let index = _fp.findIndex(list => list.id === action.currentListId)(state)

  let itemIndex = _fp.findIndex(itemId => itemId === action.item.id)(state[index].itemIds)
  if(itemIndex !== -1) {
    return state
  }

  return updateArray(state, {
    ...state,
    [index]: {
      ...state[index],
      itemIds: [
        ...state[index].itemIds,
        action.item.id
      ]
    }
  })
}

const removeGroceryItem = (state, action) => {
  let index = _fp.findIndex(list => list.id === action.currentListId)(state)
  let itemIds = state[index].itemIds.filter(id => id !== action.item.id)

  return updateArray(state, {
    ...state,
    [index]: {
      ...state[index],
      itemIds
    }
  })
}

const initialState = [
  {
    id: 0,
    name: 'Groceries',
    itemIds: [0, 1]
  },
  {
    id: 1,
    name: 'Cleaning Supplies',
    itemIds: [2, 3, 4]
  }
]

export default createReducer(initialState, {
    CREATE_GROCERY_LIST : createGroceryList,
    REMOVE_GROCERY_LIST : removeGroceryList,
    CREATE_GROCERY_ITEM : createGroceryItem,
    REMOVE_GROCERY_ITEM : removeGroceryItem
})
