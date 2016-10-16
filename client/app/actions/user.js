import jwt_decode from 'jwt-decode'

export const REQUEST_USER = 'REQUEST_USER'
export const RECIEVE_USER_SUCCESS = 'RECIEVE_USER_SUCCESS'
export const RECIEVE_USER_ERROR = 'RECIEVE_USER_ERROR'

export const requestUser = () => {
  return{type: REQUEST_USER}
}

export const recieveUserSuccess = (data) => {
  return{type: RECIEVE_USER_SUCCESS, payload: { data: data } }
}

export const recieveUserError = (error) => {
  return{type: RECIEVE_USER_ERROR, error}
}

export const fetchUser = (token) => {
  let jwt = jwt_decode(token)

  return dispatch => {
    dispatch(requestUser())
    let fetchParams = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }
    return fetch(('http://localhost:3000/users/' + jwt.user.id), fetchParams)
      .then(response => response.json())
      .then(json => {
        if(json.error){
          dispatch(recieveUserError(json.error))
        } else {
          dispatch(recieveUserSuccess(json))
        }
      })
      .catch(error => dispatch(recieveUserError(error)))
  }
}
