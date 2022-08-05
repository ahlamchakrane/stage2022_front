import React, { useState } from 'react'
import { CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import axios from 'axios'

// eslint-disable-next-line react/prop-types
const UpdatePatient = ({ changeVisibility, id, nom, email, telephone, typePatient, isVisible }) => {
  const [visible, setVisible] = useState(isVisible)
  const [nomUpdated, setNomUpdated] = useState()
  const [emailUpdated, setEmailUpdated] = useState()
  const [telephoneUpdated, setTelephoneUpdated] = useState()
  const [typePatientUpdated, setTypePatient] = useState()

  const handleChange = (e) => {
    if (e.target.id === 'nom') setNomUpdated(e.target.value)
    if (e.target.id === 'email') setEmailUpdated(e.target.value)
    if (e.target.id === 'telephone') setTelephoneUpdated(e.target.value)
    if (e.target.id === 'typePatient') setTypePatient(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const patient = { nom: nomUpdated, email: emailUpdated, telephone: telephoneUpdated, typePatient: typePatientUpdated }
    axios
      .put(`/patients/${id}`, patient)
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
          <CCol md={6}>
            <CFormLabel htmlFor="nom">Nom</CFormLabel>
            <CFormInput type="text" id="nom" defaultValue={nom} valid required onChange={handleChange} />
            <CFormFeedback valid>Looks good!</CFormFeedback>
          </CCol>
          <CCol md={6}>
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
            <CFormLabel htmlFor="typePatient">Type Patient</CFormLabel>
            <CFormSelect id="typePatient" invalid onChange={handleChange} defaultValue={typePatient}>
              <option disabled>Choose...</option>
              <option value="STAFF">STAFF</option>
              <option value="POSTBAC">POST BAC</option>
            </CFormSelect>
            <CFormFeedback invalid>Please provide a valid gender.</CFormFeedback>
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
export default UpdatePatient
