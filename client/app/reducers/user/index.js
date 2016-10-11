import {
  REQUEST_USER,
  RECIEVE_USER_SUCCESS,
  RECIEVE_USER_ERROR,
  DELETE_TOKEN
} from './../../actions/types'
import { updateObject, createReducer } from './../utility'

const requestUser = (state, action) =>
  updateObject(state, {
    isFetching: true
  })

const recieveUserSuccess = (state, action) =>
  updateObject(state, {
    id: action.payload.data.id,
    email: action.payload.data.email,
    createdAt: action.payload.data.createdAt,
    updatedAt: action.payload.data.updatedAt,

    isFetching: false
  })

const recieveUserError = (state, action) =>
  updateObject(state, {
    isFetching: false,
    message: action.error.message
  })

const deleteToken = (state, action) =>
  updateObject(state, {
    id: null,
    email: null,
    createdAt: null,
    updatedAt: null
  })

const initialState = {
  id: null,
  email: null,
  createdAt: null,
  updatedAt: null,

  isFetching: false,
  message: null
}

export default createReducer(initialState, {
  REQUEST_USER: requestUser,
  RECIEVE_USER_SUCCESS: recieveUserSuccess,
  RECIEVE_USER_ERROR: recieveUserError,
  DELETE_TOKEN: deleteToken
})
