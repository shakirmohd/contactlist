import { v4 as uuidv4 } from 'uuid'

export const ADD_CONTACT = 'ADD_CONTACT'
export const EDIT_CONTACT = 'EDIT_CONTACT'
export const DELETE_CONTACT = 'DELETE_CONTACT'

export const addContact = (contact) => ({
  type: ADD_CONTACT,
  payload: contact, id: uuidv4(),
})

export const editContact = (contact) => ({
  type: EDIT_CONTACT,
  payload: contact,
})

export const deleteContact = (id) => ({
  type: DELETE_CONTACT,
  payload: id,
})
