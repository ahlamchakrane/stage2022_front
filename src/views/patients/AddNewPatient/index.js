import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import React, { useState } from 'react'
import axios from 'axios'
import ModalSuccess from 'src/views/modals/modalSuccess'
import ModalError from 'src/views/modals/modalError'

const AddNewPatient = (props) => {
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
      .post(`patients`, patient)
      .then(() => {
        setSuccess(!success)
      })
      .catch(function () {
        setError(!error)
      })
  }
  return (
    <CRow>
      {success && <ModalSuccess isSuccess={success} />}
      {error && <ModalError isError={error} />}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>New</strong> <small>Patient</small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3 needs-validation" onSubmit={handleSubmit}>
              <CCol md={4}>
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput type="email" id="email" placeholder="ahlam@gmail.com" valid required onChange={handleChange} />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="username">Nom</CFormLabel>
                <CInputGroup className="has-validation">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput type="text" id="nom" defaultValue="" aria-describedby="inputGroupPrepend03" invalid required onChange={handleChange} />
                  <CFormFeedback invalid>Please choose a username.</CFormFeedback>
                </CInputGroup>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="genre">Genre</CFormLabel>
                <CFormSelect id="genre" invalid onChange={handleChange}>
                  <option disabled>Choose...</option>
                  <option value="HOMME">Homme</option>
                  <option value="FEMME">Femme</option>
                </CFormSelect>
                <CFormFeedback invalid>Please provide a valid gender.</CFormFeedback>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="telephone">Phone number</CFormLabel>
                <CFormInput type="text" id="telephone" invalid required onChange={handleChange} />
                <CFormFeedback invalid>Please provide a valid number.</CFormFeedback>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="typePatient">Type Patient</CFormLabel>
                <CFormSelect id="typePatient" invalid onChange={handleChange}>
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
