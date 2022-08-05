import React, { useEffect, useState } from 'react'
import { CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import axios from 'axios'
export const EmployeContext = React.createContext()

// eslint-disable-next-line react/prop-types
const UpdateEmploye = ({ changeVisibility, id, username, email, telephone, isVisible }) => {
  const [visible, setVisible] = useState(isVisible)
  const [usernameUpdated, setUsernameUpdated] = useState()
  const [emailUpdated, setEmailUpdated] = useState()
  const [telephoneUpdated, setTelephoneUpdated] = useState()
  const [roleUpdated, setRoleUpdated] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [cPassword, setPassword] = useState(0)
  const [password, setCPassword] = useState(0)

  const handleChange = (e) => {
    if (e.target.id === 'username') setUsernameUpdated(e.target.value)
    if (e.target.id === 'email') setEmailUpdated(e.target.value)
    if (e.target.id === 'telephone') setTelephoneUpdated(e.target.value)
    if (e.target.id === 'password') setPassword(e.target.value)
    if (e.target.id === 'cPassword') setCPassword(e.target.value)
    if (e.target.id === 'roleUpdated') setRoleUpdated(e.target.value)
  }
  const getRoles = () => {
    const obj = { id: null, nom: null }
    axios
      .get('/roles')
      .then((res) => {
        const allRoles = res.data
        allRoles.map(async (r) => {
          // eslint-disable-next-line no-unused-expressions
          if (roleUpdated && r.nom === roleUpdated) {
            obj.id = r.id
            obj.nom = r.nom
          }
        })
        if (obj.id && obj.nom) setUserRole(obj)
      })
      .catch(function (error) {
        console.log(error.toJSON())
      })
  }
  useEffect(() => {
    getRoles()
  }, [roleUpdated])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== 0 && cPassword !== 0) {
      if (password !== cPassword) console.log('show err message')
    }
    const employe = { username: usernameUpdated, email: emailUpdated, telephone: telephoneUpdated, password: password }
    if (userRole) employe.roles = [userRole]
    axios
      .put(`/employes/${id}`, employe)
      .then((res) => {
        setVisible(!visible)
      })
      .catch(function (error) {
        console.log(error.toJSON())
      })
  }
  const close = () => {
    changeVisibility(!isVisible)
  }
  return (
    <CModal visible={visible} onClose={() => close()}>
      <CModalHeader>
        <CModalTitle>Edit Employés</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className="row g-3 needs-validation" onSubmit={handleSubmit}>
          <CCol md={5}>
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
            <CFormLabel htmlFor="roleUpdated">Roles</CFormLabel>
            <CFormSelect id="roleUpdated" invalid onChange={handleChange}>
              <option value="null">Choose...</option>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </CFormSelect>
            <CFormFeedback invalid>Please provide a valid gender.</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="password">Password</CFormLabel>
            <CFormInput type="password" id="password" valid onChange={handleChange} placeholder="not obligatory" />
            <CFormFeedback valid>Looks good!</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel>Confirm Password</CFormLabel>
            <CFormInput type="password" id="cPassword" valid onChange={handleChange} />
            <CFormFeedback valid>Looks good!</CFormFeedback>
          </CCol>
          <>
            <CModalFooter>
              <CButton color="success" type="submit" shape="rounded-pill">
                Save changes
              </CButton>
              <CButton color="secondary" onClick={() => close()} shape="rounded-pill">
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
