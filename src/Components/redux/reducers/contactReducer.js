import { v4 as uuidv4 } from 'uuid'

import { ADD_CONTACT, EDIT_CONTACT, DELETE_CONTACT } from '../actions/contactActions'

const initialState = {
  contacts: [
    { id: uuidv4(), name: 'John Doe', type: 'business', gender: 'male', email: 'john@example.com', phone: '123-456-7890' },
    { id: uuidv4(), name: 'Jane Smith', type: 'personal', gender: 'female', email: 'jane@example.com', phone: '098-765-4321' },
    { id: uuidv4(), name: 'Alice Johnson', type: 'business', gender: 'female', email: 'alice@example.com', phone: '987-654-3210'},
  ],
}

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return { ...state, contacts: [...state.contacts, action.payload] }
    case EDIT_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact => 
          contact.id === action.payload.id ? action.payload : contact
        ),
      }
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload),
      }
    default:
      return state
  }
}

export default contactReducer
