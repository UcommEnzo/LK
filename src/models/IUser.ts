import { Contact } from "./IContacts";

export interface User {
  contacts: Array<Contact>
  id: number
  login: string
  password: string
}