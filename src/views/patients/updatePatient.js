import React, { useState } from 'react'
import { CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import axios from 'axios'

// eslint-disable-next-line react/prop-types
const UpdatePatient = ({ changeVisibility, id, nom, email, telephone, typePatient, isVisible }) => {
  const [visible, setVisible] = useState(isVisible)
  const initialValues = { nom: nom, email: email, telephone: telephone, typePatient: typePatient }
  const [formValues, setFormValues] = useState(initialValues)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const patient = formValues
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
            <CFormInput type="text" name="nom" value={formValues.nom} valid required onChange={handleChange} />
            <CFormFeedback valid>Looks good!</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="email">email</CFormLabel>
            <CFormInput type="email" name="email" value={formValues.email} valid required onChange={handleChange} />
            <CFormFeedback valid>Looks good!</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="telephone">Phone number</CFormLabel>
            <CFormInput type="text" name="telephone" value={formValues.telephone} valid required onChange={handleChange} />
            <CFormFeedback valid>Looks good!</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="typePatient">Type Patient</CFormLabel>
            <CFormSelect name="typePatient" invalid onChange={handleChange} value={formValues.typePatient}>
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
