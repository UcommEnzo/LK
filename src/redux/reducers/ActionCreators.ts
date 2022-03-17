import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Contact } from '../../models/IContacts';
import { User } from '../../models/IUser'
import {
  AddContactPayload,
  AuthPayload,
  DeleteContactPayload,
  EditContactPayload
} from './../../models/IACPayload';


const baseUrl = 'http://localhost:3001/'
const getAccounts = async () => (await axios.get(`${baseUrl}users`)).data

export const createAccount = createAsyncThunk(
  'auth/createAccount',
  async (payload: AuthPayload, thunkAPI) => {
    try {
      const { setCookieIsAuth } = payload
      const { email, password } = payload.values
      const accounts = await getAccounts()
      const checkForExist = accounts.some(elem => elem.login === email)
      if (checkForExist) {
        throw new Error(`${email} already exist`)
      }
      const newAccount = {login: email, password: password, contacts: []}
      await axios.post(`${baseUrl}users`, newAccount)
      setCookieIsAuth({ email, password })
      return email
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const loginToAccount = createAsyncThunk(
  'auth/loginToAccount',
  async (payload: AuthPayload, thunkAPI) => {
    try {
      const { setCookieIsAuth } = payload
      const { email, password } = payload.values
      const accounts = await getAccounts()
      const auth = accounts.some(elem => elem.login === email && elem.password === password)
      if (!auth) {
        throw new Error(`wrong email or password`)
      }
      setCookieIsAuth && setCookieIsAuth({ email, password })

      return email
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async (payload: string, thunkAPI) => {
    try {
      const email = payload
      const accounts = await getAccounts()
      const contacts: Array<Contact> = []
      accounts.forEach(elem => {
        elem.login === email && contacts.push(elem.contacts)
      })
      return contacts[0]
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (payload: AddContactPayload, thunkAPI) => {
    try {
      const { values, userLogin } = payload
      const { name, phone } = values
      const accounts = await getAccounts()
      let userData: Array<User> = []
      accounts.forEach(elem => {
        elem.login === userLogin && userData.push(elem)
      })
      userData[0].contacts = [
        ...userData[0].contacts,
        {
          firstname: name,
          phone: phone,
          id: userData[0].contacts.length + 1
        }
      ]
      await axios.put(`${baseUrl}users/${userData[0].id}`, ...userData)
      return userData[0].contacts

    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (payload: DeleteContactPayload, thunkAPI) => {
    try {
      const { contactId, userLogin } = payload
      const accounts = await getAccounts()
      let userData: Array<User> = []
      accounts.forEach(elem => {
        elem.login === userLogin && userData.push(elem)
      })
      userData[0].contacts.splice(contactId - 1, 1)
      userData[0].contacts.map((contact, idx) => contact.id = idx + 1)
      await axios.put(`${baseUrl}users/${userData[0].id}`, ...userData)
      return userData[0].contacts

    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async (payload: EditContactPayload, thunkAPI) => {
    try {
      const { editedTitle, editedPhone, contactId, userLogin } = payload
      const accounts = await getAccounts()
      let userData: Array<User> = []
      accounts.forEach(elem => {
        elem.login === userLogin && userData.push(elem)
      })
      userData[0].contacts.map(contact => {
        if (contact.id === contactId) {
          contact.firstname = editedTitle
          contact.phone = editedPhone
        } else {
          return contact
        }
      })
      
      await axios.put(`${baseUrl}users/${userData[0].id}`, ...userData)
      return userData[0].contacts

    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)