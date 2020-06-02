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

export default (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      }
    case UPDATE_CONTACT:
      const newContacts = state.contacts.map(c => c.id === action.payload.id ? action.payload : c)
      return {
        ...state,
        contacts: newContacts
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      }
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(c => c.id !== action.payload)
      }
    case FILTER_CONTACTS:
      const filtereds = state.contacts.filter(c => Object.values(c).includes(action.payload))
      console.log('filtereds: ', filtereds);
      return {
        ...state,
        filtered: state.contacts.filter(c => Object.values(c).includes(action.payload))
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      }
    default:
      return state;
  }
}