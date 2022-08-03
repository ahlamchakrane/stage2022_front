import React, { useState } from 'react'
import { CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import axios from 'axios'
export const EmployeContext = React.createContext()

// eslint-disable-next-line react/prop-types
const UpdateEmploye = ({ id, username, email, telephone, isVisible }) => {
  const [visible, setVisible] = useState(isVisible)
  const [usernameUpdated, setUsernameUpdated] = useState()
  const [emailUpdated, setEmailUpdated] = useState()
  const [telephoneUpdated, setTelephoneUpdated] = useState()
  const [cPassword, setPassword] = useState(0)
  const [password, setCPassword] = useState(0)

  const handleChange = (e) => {
    if (e.target.id === 'username') setUsernameUpdated(e.target.value)
    if (e.target.id === 'email') setEmailUpdated(e.target.value)
    if (e.target.id === 'telephone') setTelephoneUpdated(e.target.value)
    if (e.target.id === 'password') setPassword(e.target.value)
    if (e.target.id === 'cPassword') setCPassword(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== 0 && cPassword !== 0) {
      if (password !== cPassword) console.log('show err message')
    }
    const employe = { username: usernameUpdated, email: emailUpdated, telephone: telephoneUpdated, password: password }
    axios
      .put(`employes/${id}`, employe)
      .then((res) => {
        setVisible(!visible)
      })
      .catch(function (error) {
        console.log(error.toJSON())
      })
  }
  return (
    <CModal visible={visible} onClose={() => setVisible(!isVisible)}>
      <CModalHeader>
        <CModalTitle>Edit Employés</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className="row g-3 needs-validation" onSubmit={handleSubmit}>
          <CCol md={4}>
            <CFormLabel htmlFor="username">Username</CFormLabel>
            <CFormInput type="text" id="username" defaultValue={username} valid required onChange={handleChange} />
            <CFormFeedback valid>Looks good!</CFormFeedback>
          </CCol>
          <CCol md={7}>
            <CFormLabel htmlFor="email">email</CFormLabel>
            <CFormInput type="email" id="email" defaultValue={email} valid required onChange={handleChange} />
            <CFormFeedback valid>Looks good!</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="telephone">Phone number</CFormLabel>
            <CFormInput type="text" id="telephone" defaultValue={telephone} valid required onChange={handleChange} />
            <CFormFeedback valid>Looks good!</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="password">Password</CFormLabel>
            <CFormInput type="password" id="password" valid required onChange={handleChange} />
            <CFormFeedback valid>Looks good!</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel>Confirm Password</CFormLabel>
            <CFormInput type="password" id="cPassword" valid required onChange={handleChange} />
            <CFormFeedback valid>Looks good!</CFormFeedback>
          </CCol>
          <>
            <CModalFooter>
              <CButton color="success" type="submit" shape="rounded-pill">
                Save changes
              </CButton>
              <CButton color="secondary" onClick={() => setVisible(!isVisible)} shape="rounded-pill">
                Close
              </CButton>
            </CModalFooter>
          </>
        </CForm>
      </CModalBody>
    </CModal>
  )
}
export default UpdateEmploye
