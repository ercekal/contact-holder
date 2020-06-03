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
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      }
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        loading: false
      }
    case UPDATE_CONTACT:
      const newContacts = state.contacts.map(c => c._id === action.payload._id ? action.payload : c)
      return {
        ...state,
        contacts: newContacts,
        loading: false
      }
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
        loading: false
      }
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
        loading: false
      }
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(c => c._id !== action.payload),
        loading: false
      }
    case FILTER_CONTACTS:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contact.name.match(regex) || contact.email.match(regex);
        }),
        loading: false
      }
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
        loading: false
      }
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        loading: false,
        filtered: null,
        error: null,
        current: null
      }
    default:
      return state;
  }
}