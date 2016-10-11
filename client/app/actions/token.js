import jwt_decode from 'jwt-decode'
import {
  REQUEST_TOKEN,
  RECIEVE_TOKEN_SUCCESS,
  RECIEVE_TOKEN_ERROR,
  DELETE_TOKEN
} from './types'

import { recieveUserSuccess } from './user'

export const requestToken = () => {
  return {type: REQUEST_TOKEN}
}

export const recieveTokenSuccess = (data) => {
  return {type: RECIEVE_TOKEN_SUCCESS, payload: { data: data } }
}

export const recieveTokenError = (error) => {
  return {type: RECIEVE_TOKEN_ERROR, error}
}

export const fetchToken = (user) => {
  return dispatch => {
    dispatch(requestToken())
    let fetchParams = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        passwordHash: user.password,
      })
    }
    return fetch('http://localhost:3000/users/login', fetchParams)
      .then(response => response.json())
      .then(json => {
        if(json.error){
          dispatch(recieveTokenError(json.error))
        } else {
          dispatch(recieveTokenSuccess(json))
          dispatch(recieveUserSuccess( jwt_decode(json.token).user ))
        }
      })
      .catch(error => dispatch(recieveTokenError(error)))
  }
}

export const deleteToken = () => {
  return { type: DELETE_TOKEN }
}
