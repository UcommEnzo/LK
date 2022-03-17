import React, { useEffect, useState } from 'react';
import { Input, Button, Card, Avatar } from 'antd';
import './index.scss';
import AddContactForm from './AddContactForm';
import { logout } from '../../redux/reducers/AuthReducer.ts';
import { getContacts } from '../../redux/reducers/ActionCreators.ts';
import Contact from './contact';
import noData from '../../assets/images/noData.png'
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';

const EmptyContacts = ({ }) => {

  const { Meta } = Card

  return (
    <div>
      <Card
        style={{ width: 300 }}
        bordered={false}
        cover={
          <img
            alt="No Data"
            src={noData}
          />
        }
      >
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/jabala"/>}
          title="Contacts not found"
        />
      </Card>
    </div>
  )
}


const Contacts = ({ userLogin, editableContacts }) => {

  const dispatch = useAppDispatch()
  const { isAuth } = useAppSelector(state => state.AuthReducer)

  useEffect(() => {
    isAuth && dispatch(getContacts(userLogin))
  }, [userLogin])


  return (
    <div className='ContactsContainer'>
      {editableContacts.length
        ? editableContacts.map(contact =>
          <Contact
            key={contact.id}
            contactId={contact.id}
            contact={contact}
            userLogin={userLogin}
          />)
        : <EmptyContacts />
      }
    </div>
  )
}


const AccountPage = ({ setCookieIsAuth }) => {

  const dispatch = useAppDispatch()
  const { userLogin } = useAppSelector(state => state.AuthReducer)
  const contacts = useAppSelector(state => state.ContactsReducer.contacts) || []
  const [editableContacts, setEditableContacts] = useState(contacts)
  const [filter, setFilter] = useState('')
  const isPhone = Number(filter) * 0 === 0
  const filteredContacts = editableContacts.filter(contact => {
    if (isPhone) {
      if (contact.phone.includes(filter)) return contact
    } else {
      if (contact.firstname.includes(filter)) return contact
    }
  }) || []
  const onSearchChange = (e) => {
    setFilter(e.currentTarget.value)
  }

  const resetFilter = () => {
    setFilter('')
  }

  useEffect(() => {
    setEditableContacts(contacts)
  }, [contacts])

  const userLogout = () => {
    dispatch(logout())
    setCookieIsAuth('')
  }

  return (
    <div className='AccountWrapper'>
      <div className='Header'>
        <div className='SearchContainer'>
          <Input
            className='SearchContact'
            placeholder='Search Contact'
            onChange={onSearchChange}
            value={filter}
          />
          <Button onClick={resetFilter}>
            Reset
          </Button>
        </div>
        <div className='Logout'>
          <span className='Login'>{userLogin}</span>
          <Button onClick={userLogout}>
            Logout
          </Button>
        </div>
      </div>
      <div className='AccountContainer'>
        <Contacts
          userLogin={userLogin}
          editableContacts={filter ? filteredContacts : editableContacts}
        />
        <div className='AddContactContainer'>
          <AddContactForm
            userLogin={userLogin}
          />
        </div>
      </div>
    </div>
  )
}

export default AccountPage;