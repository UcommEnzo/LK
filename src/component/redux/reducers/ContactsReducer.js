import { createSlice } from "@reduxjs/toolkit"
import {
  getContacts,
  addContact,
  deleteContact,
  editContact
} from './ActionCreators';


const initialState = {
  contacts: [],

  getContactsInProgress: false,
  getContactsError: '',

  addContactInProgress: false,
  addContactError: '',

  deleteContactInProgress: false,
  deleteContactError: '',

  editContactInProgress: false,
  editContactError: '',
}

export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: {
    [getContacts.pending.type]: (state) => {
      state.getContactsInProgress = true
    },
    [getContacts.fulfilled.type]: (state, action) => {
      state.getContactsInProgress = false
      state.getContactsError = ''
      state.contacts = action.payload
    },
    [getContacts.rejected.type]: (state, action) => {
      state.loginInProgress = false
      state.loginError = action.payload
    },

    [addContact.pending.type]: (state) => {
      state.addContactInProgress = true
    },
    [addContact.fulfilled.type]: (state, action) => {
      state.addContactInProgress = false
      state.addContactError = ''
      state.contacts = action.payload
    },
    [addContact.rejected.type]: (state, action) => {
      state.addContactInProgress = false
      state.addContactError = action.payload
    },

    [deleteContact.pending.type]: (state) => {
      state.deleteContactInProgress = true
    },
    [deleteContact.fulfilled.type]: (state, action) => {
      state.deleteContactInProgress = false
      state.deleteContactError = ''
      state.contacts = action.payload
    },
    [deleteContact.rejected.type]: (state, action) => {
      state.deleteContactInProgress = false
      state.deleteContactError = action.payload
    },

    [editContact.pending.type]: (state) => {
      state.editContactInProgress = true
    },
    [editContact.fulfilled.type]: (state, action) => {
      state.editContactInProgress = false
      state.editContactError = ''
      state.contacts = action.payload
    },
    [editContact.rejected.type]: (state, action) => {
      state.editContactInProgress = false
      state.editContactError = action.payload
    }
  }
})

export default contactSlice.reducer