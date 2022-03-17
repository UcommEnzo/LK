import { getContacts } from './../redux/reducers/ActionCreators';
export interface EmailPassword {
  email: string
  password: string
}

export interface NewContact {
  name: string
  phone: string
}

export interface AuthPayload {
  setCookieIsAuth: Function
  values: EmailPassword
}

export interface GetContactsPayload {
  
}

export interface AddContactPayload {
  userLogin: string
  values: NewContact
}

export interface DeleteContactPayload {
  userLogin: string
  contactId: number
}

export interface EditContactPayload {
  userLogin: string
  contactId: number
  editedTitle: string
  editedPhone: string
}