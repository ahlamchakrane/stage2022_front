import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import React, { useState } from 'react'
import axios from 'axios'

const AddNewPatient = (props) => {
  const ModalError = React.lazy(() => import('src/views/modals/modalError'))
  const ModalSuccess = React.lazy(() => import('src/views/modals/modalSuccess'))

  const [nom, setNom] = useState()
  const [email, setEmail] = useState()
  const [telephone, setTelephone] = useState()
  const [typePatient, setTypePatient] = useState('STAFF')
  const [genre, setGenre] = useState('HOMME')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    if (e.target.id === 'nom') setNom(e.target.value)
    if (e.target.id === 'email') setEmail(e.target.value)
    if (e.target.id === 'telephone') setTelephone(e.target.value)
    if (e.target.id === 'typePatient') setTypePatient(e.target.value)
    if (e.target.id === 'genre') setGenre(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const patient = { nom: nom, email: email, telephone: telephone, typePatient: typePatient, genre: genre }
    axios
      .post('/patients', patient)
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
  const validate = (values) => {
    const errors = {}
    if (!values.nom) {
      errors.nom = 'Name is required'
    }
    if (!values.email) {
      errors.email = 'Email is required'
    }
    if (!values.telephone) {
      errors.telephone = 'Phone number is required'
    }
    if (!values.genre) {
      errors.genre = 'Gender is required'
    }
    if (values.telephone.length < 9) {
      errors.telephone = 'Phone number is not correct'
    }
    if (!values.typePatient) {
      errors.password = 'Type Patient must is required'
    }
    return errors
  }
  return (
    <CRow>
      {success && <ModalSuccess changeVisibility={changeSuccess} isVisible={success} />}
      {error && <ModalError changeVisibility={changeError} isVisible={error} />}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>New</strong> <small>Patient</small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3 needs-validation" onSubmit={handleSubmit}>
              <CCol md={4}>
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput type="email" id="email" placeholder="ahlam@gmail.com" valid={formErrors.email ? false : true} invalid={formErrors.email ? true : false} required onChange={handleChange} />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="username">Nom</CFormLabel>
                <CInputGroup className="has-validation">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput type="text" id="nom" defaultValue="" aria-describedby="inputGroupPrepend03" valid={formErrors.nom ? false : true} invalid={formErrors.nom ? true : false} required onChange={handleChange} />
                  <CFormFeedback invalid>Please choose a username.</CFormFeedback>
                </CInputGroup>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="genre">Genre</CFormLabel>
                <CFormSelect id="genre" valid={formErrors.genre ? false : true} invalid={formErrors.genre ? true : false} onChange={handleChange}>
                  <option disabled>Choose...</option>
                  <option value="HOMME">Homme</option>
                  <option value="FEMME">Femme</option>
                </CFormSelect>
                <CFormFeedback invalid>Please provide a valid gender.</CFormFeedback>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="telephone">Phone number</CFormLabel>
                <CFormInput type="text" id="telephone" valid={formErrors.telephone ? false : true} invalid={formErrors.telephone ? true : false} required onChange={handleChange} />
                <CFormFeedback invalid>Please provide a valid number.</CFormFeedback>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="typePatient">Type Patient</CFormLabel>
                <CFormSelect id="typePatient" valid={formErrors.typePatient ? false : true} invalid={formErrors.typePatient ? true : false} onChange={handleChange}>
                  <option disabled>Choose...</option>
                  <option value="STAFF">STAFF</option>
                  <option value="POSTBAC">POST BAC</option>
                </CFormSelect>
                <CFormFeedback invalid>Please provide a valid type.</CFormFeedback>
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

export default AddNewPatient
