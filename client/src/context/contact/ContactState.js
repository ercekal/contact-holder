import React, {useReducer} from 'react'
// import uuid from 'uuid'
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
    contacts: [
      {
        id: 1,
        name: 'Jill john',
        email: 'jill@gmail.com',
        phone: '111 111',
        type: 'personal'
      },
      {
        id: 2,
        name: 'jane john',
        email: 'jane@gmail.com',
        phone: '222 222',
        type: 'personal'
      },
      {
        id: 3,
        name: 'Duane john',
        email: 'Duane@gmail.com',
        phone: '3333 3333',
        type: 'professional'
      },
    ],
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState)
  const addContact = contact => {
    contact.id = uuid()
    dispatch({ type: ADD_CONTACT, payload: contact})
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