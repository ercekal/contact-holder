import React, {useReducer} from 'react'
import axios from 'axios';
import {v4 as uuid} from "uuid";
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState)

  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts/')
      dispatch({ type: GET_CONTACTS, payload: res.data})
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg})
    }
  }

  const addContact = async contact => {
    try {
      const res = await axios.post('/api/contacts/', contact)
      dispatch({ type: ADD_CONTACT, payload: res.data})
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.data.msg})
    }
  }

  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact})
  }

  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact})
  }

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT})
  }

  const deleteContact = contactId => {
    dispatch({ type: DELETE_CONTACT, payload: contactId})
  }

  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text})
  }

  const clearFilter = text => {
    dispatch({ type: CLEAR_FILTER})
  }


  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        getContacts,
        addContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        deleteContact
      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState