import React, { useReducer } from 'react';
import axios from 'axios';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import {

} from '../types';

const AlertState = props => {
  const initialState = [];

  const [state, dispatch] = useReducer(alertReducer, initialState)

  return (
    <AlertContext.Provider
      value={{

      }}
    >
      {props.children}
    </AlertContext.Provider>
  )
}
export default AlertState
