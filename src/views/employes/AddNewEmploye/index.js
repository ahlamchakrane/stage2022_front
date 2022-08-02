import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import React, { useState } from 'react'
import axios from 'axios'

// Containers

const AddNewEmploye = (props) => {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [telephone, setTelephone] = useState()
  const [genre, setGenre] = useState()
  const [password, setPassword] = useState()
  const [roles, setRoles] = useState({})

  const handleChange = (e) => {
    if (e.target.id === 'username') setUsername(e.target.value)
    if (e.target.id === 'email') setEmail(e.target.value)
    if (e.target.id === 'telephone') setTelephone(e.target.value)
    if (e.target.id === 'genre') setGenre(e.target.value)
    if (e.target.id === 'password') setPassword(e.target.value)
    if (e.target.id === 'roles') setRoles(e.target.value)
  }
  const handleSubmit = (e) => {
    const employe = { username: username, email: email, telephone: telephone, genre: genre, password: password, roles: roles }
    console.log(employe)
    axios.post(`employes`, employe).then((res) => {
      console.log(res)
    })
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>New</strong> <small>Employe</small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3 needs-validation" onSubmit={handleSubmit}>
              <CCol md={4}>
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput type="text" id="email" placeholder="ahlam@gmail.com" valid required onChange={handleChange} />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="username">Username</CFormLabel>
                <CInputGroup className="has-validation">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput type="text" id="username" defaultValue="" aria-describedby="inputGroupPrepend03" invalid required onChange={handleChange} />
                  <CFormFeedback invalid>Please choose a username.</CFormFeedback>
                </CInputGroup>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="genre">Genre</CFormLabel>
                <CFormSelect id="genre" invalid onChange={handleChange}>
                  <option disabled>Choose...</option>
                  <option value="HOMME">Homme</option>
                  <option value="Femme">Femme</option>
                </CFormSelect>
                <CFormFeedback invalid>Please provide a valid gender.</CFormFeedback>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="password">Password</CFormLabel>
                <CFormInput type="password" id="password" invalid required onChange={handleChange} />
                <CFormFeedback invalid>Please provide a valid password.</CFormFeedback>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="cPassword">Repeat Password</CFormLabel>
                <CFormInput type="password" id="cPassword" invalid required onChange={handleChange} />
                <CFormFeedback invalid>Please provide a valid password.</CFormFeedback>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="telephone">Phone number</CFormLabel>
                <CFormInput type="text" id="telephone" invalid required onChange={handleChange} />
                <CFormFeedback invalid>Please provide a valid number.</CFormFeedback>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="roles">Role</CFormLabel>
                <CFormSelect id="roles" invalid onChange={handleChange}>
                  <option disabled>Choose...</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="USER">USER</option>
                </CFormSelect>
                <CFormFeedback invalid>Please provide a valid role.</CFormFeedback>
              </CCol>
              <CCol xs={12}>
                <CButton color="primary" type="submit">
                  Submit
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddNewEmploye
