export interface Contact {
  id: number
  firstname: string
  phone: string
}

export interface ContactsState {
  contacts: Array<Contact>

  getContactsInProgress: boolean
  getContactsError: string

  addContactInProgress: boolean,
  addContactError: string

  deleteContactInProgress: boolean,
  deleteContactError: string

  editContactInProgress: boolean,
  editContactError: string
}