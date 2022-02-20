import React from "react"
import { useDispatch } from "react-redux";
import { EditTwoTone, DeleteTwoTone, SaveTwoTone } from '@ant-design/icons';
import { deleteContact, editContact } from "../../redux/reducers/ActionCreators";


export const EditButton = ({ onEdit }) => {

  const onEditContact = () => {
    onEdit()
  }

  return (
    <div onClick={onEditContact}>
      <span>Edit </span>
      <EditTwoTone />
    </div>
  )
}

export const DeleteButton = ({ contactId, userLogin }) => {

  const dispatch = useDispatch()
  const onDeleteContact = () => {
    dispatch(deleteContact({ contactId, userLogin }))
  }

  return (
    <div onClick={onDeleteContact}>
      <span>Delete </span>
      <DeleteTwoTone />
    </div>
  )
}

export const SaveButton = ({
  contactId,
  userLogin,
  editedTitle,
  editedPhone,
  onEditHandler,
}) => {
  
  const dispatch = useDispatch()
  const onSaveContact = () => {
    onEditHandler()
    dispatch(editContact({ editedTitle, editedPhone, contactId, userLogin }))
  }

  return (
    <div onClick={onSaveContact}>
      <span>Save </span>
      <SaveTwoTone />
    </div>
  )
}