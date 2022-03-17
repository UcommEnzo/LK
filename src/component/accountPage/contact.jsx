import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Input } from 'antd';
import { SaveButton, EditButton, DeleteButton } from './contactButtons';
import { editContact } from "../../redux/reducers/ActionCreators.ts";

const ContactTitle = ({
  firstname,
  isEdit,
  editedTitle,
  setEditedTitle,
  onExitEdit
}) => {

  const onChangeTitle = (e) => {
    setEditedTitle(e.currentTarget.value)
  }

  return (
    <>
      {isEdit
        ? <Input
          name="title"
          onChange={onChangeTitle}
          value={editedTitle}
        />
        : <div>{firstname}</div>
      }
    </>
  )
}

const ContactPhone = ({
  phone,
  editedPhone,
  setEditedPhone,
  isEdit,
  onExitEdit
}) => {

  const onChangePhone = (e) => {
    setEditedPhone(e.currentTarget.value)
  }

  return (
    <>
      {isEdit
        ? <Input
          name="phone"
          onChange={onChangePhone}
          value={editedPhone}
        />
        : <div>
          <span>Phone: </span>
          <span>{phone}</span>
        </div>
      }
    </>
  )
}

const Contact = ({
  contact,
  userLogin,
  contactId
}) => {

  const dispatch = useDispatch()
  const [editedTitle, setEditedTitle] = useState(contact.firstname)
  const [editedPhone, setEditedPhone] = useState(contact.phone)
  const [isEdit, setIsEdit] = useState(false)

  const onEditHandler = () => {
    setIsEdit(!isEdit)
  }

  return (
    <div className="Contact">
      <Card
        title={
          <ContactTitle
            firstname={contact.firstname}
            editedTitle={editedTitle}
            setEditedTitle={setEditedTitle}
            isEdit={isEdit}
            onExitEdit={onEditHandler}
          />
        }
        style={{ width: 300 }}
        actions={[
          (isEdit
            ? <SaveButton
              editedTitle={editedTitle}
              editedPhone={editedPhone}
              contactId={contact.id}
              onEditHandler={onEditHandler}
              userLogin={userLogin}
            />
            : <EditButton
              onEdit={onEditHandler}
              contactId={contact.id}
              userLogin={userLogin}
            />
          ),
          <DeleteButton
            contactId={contact.id}
            userLogin={userLogin}
          />
        ]}
      >
        <ContactPhone
          phone={contact.phone}
          editedPhone={editedPhone}
          setEditedPhone={setEditedPhone}
          isEdit={isEdit}
          onExitEdit={onEditHandler}
        />
      </Card>
    </div>
  )
}

export default Contact