import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ModalSuccess from 'src/views/modals/modalSuccess'
import ModalError from 'src/views/modals/modalError'

// Containers

const AddNewEmploye = (props) => {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [telephone, setTelephone] = useState()
  const [genre, setGenre] = useState('HOMME')
  const [password, setPassword] = useState()
  const [roles, setRoles] = useState('USER')
  const [userRole, setUserRole] = useState({ id: null, nom: 'USER' })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    if (e.target.id === 'username') setUsername(e.target.value)
    if (e.target.id === 'email') setEmail(e.target.value)
    if (e.target.id === 'telephone') setTelephone(e.target.value)
    if (e.target.id === 'genre') setGenre(e.target.value)
    if (e.target.id === 'password') setPassword(e.target.value)
    if (e.target.id === 'roles') setRoles(e.target.value)
  }
  useEffect(() => {
    getRoles()
  }, [roles, success, error])

  const getRoles = () => {
    const obj = { id: null, nom: null }
    axios
      .get('/roles')
      .then((res) => {
        const allRoles = res.data
        allRoles.map(async (r) => {
          // eslint-disable-next-line no-unused-expressions
          if (r.nom === roles) {
            obj.id = r.id
            obj.nom = r.nom
          }
        })
        setUserRole(obj)
      })
      .catch(function (error) {
        console.log(error.toJSON())
      })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const employe = { username: username, email: email, telephone: telephone, genre: genre, password: password, roles: [userRole] }
    axios
      .post('/api/register', employe)
      .then(() => {
        setSuccess(!success)
      })
      .catch(function () {
        setError(!error)
      })
  }
  const changeSuccess = (isVisible) => {
    setSuccess(isVisible)
  }
  const changeError = (isVisible) => {
    setError(isVisible)
  }
  return (
    <CRow>
      {success && <ModalSuccess changeVisibility={changeSuccess} isVisible={success} />}
      {error && <ModalError changeVisibility={changeError} isVisible={error} />}
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
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
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
