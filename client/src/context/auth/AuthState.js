import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
// import setAuthToken from '../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState)

  // register user
  const registerUser = ({name, email, password}) => {
    axios.post('api/users/', {name, email, password})
      .then(res => dispatch({ type: REGISTER_SUCCESS, payload: res.data}))
      .catch(err => dispatch({ type: REGISTER_FAIL, payload: err.message}))
  }

  // login user
  const login = ({email, password}) => {
    axios.post('api/auth/', {email, password})
      .then(res => {
        console.log('res: ', res);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data})
      })
      .catch(err => dispatch({ type: LOGIN_FAIL, payload: err.message}))
  }
// load user
// logout
// clear errors



  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        registerUser,
        login
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
export default AuthState
