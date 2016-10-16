export const SET_CURRENT_GROCERY_LIST = 'SET_CURRENT_GROCERY_LIST'
export const CREATE_GROCERY_LIST = 'CREATE_GROCERY_LIST'
export const REMOVE_GROCERY_LIST = 'REMOVE_GROCERY_LIST'
export const CREATE_GROCERY_ITEM = 'CREATE_GROCERY_ITEM'
export const TOGGLE_GROCERY_ITEM = 'TOGGLE_GROCERY_ITEM'
export const REMOVE_GROCERY_ITEM = 'REMOVE_GROCERY_ITEM'

export const setCurrentGroceryList = (id) => {
  return {type: SET_CURRENT_GROCERY_LIST, id }
}

export const createGroceryList = (list) => {
  return {type: CREATE_GROCERY_LIST, list }
}

export const removeGroceryList = (list) => {
  return {type: REMOVE_GROCERY_LIST, list }
}

export const createGroceryItem = (currentListId, item) => {
  return {type: CREATE_GROCERY_ITEM, currentListId, item }
}

export const toggleGroceryItem = (currentListId, item) => {
  return {type: TOGGLE_GROCERY_ITEM, currentListId, item }
}

export const removeGroceryItem = (currentListId, item) => {
  return {type: REMOVE_GROCERY_ITEM, currentListId, item }
}
