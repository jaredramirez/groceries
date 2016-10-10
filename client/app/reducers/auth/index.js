import { REQUEST_TOKEN, RECIEVE_TOKEN_SUCCESS, RECIEVE_TOKEN_ERROR, DELETE_TOKEN } from './../../actions/types'
import { updateObject, createReducer } from './../utility'

const requestToken = (state, action) => updateObject(state, { isFetching: true })

const recieveTokenSuccess = (state, action) =>
  updateObject(state, {
    token: action.payload.data.token,
    isFetching: false,
    isAuthenticated: true,
    message: null
  })

const recieveTokenError = (state, action) =>
  updateObject(state, {
    isFetching: false,
    isAuthenticated: false,
    message: action.error.message
  })

const deleteToken = (state, action) =>
  updateObject(state, {
    token: null,
    isAuthenticated: false,
    message: null
  })

const initialState = {
  token: null,
  isFetching: false,
  isAuthenticated: false,
  message: null
}

export default createReducer(initialState, {
  REQUEST_TOKEN            : requestToken,
  RECIEVE_TOKEN_SUCCESS    : recieveTokenSuccess,
  RECIEVE_TOKEN_ERROR      : recieveTokenError,
  DELETE_TOKEN             : deleteToken
})
