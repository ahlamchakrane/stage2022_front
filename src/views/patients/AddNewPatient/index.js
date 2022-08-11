import { CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// eslint-disable-next-line react/prop-types
const AddNewPatient = ({ changeVisibility, patients, setPatients }) => {
  const initialValues = { nom: null, email: null, telephone: null, typePatient: 'STAFF', genre: 'HOMME' }
  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleAdd()
    }
    if (error !== false || success !== false) close(error, success)
  }, [formErrors, error, success])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormErrors(validate(formValues))
    setIsSubmit(true)
  }
  const handleAdd = (e) => {
    setIsSubmit(false)
    const patient = formValues
    axios
      .post('/patients', patient)
      .then((res) => {
        // eslint-disable-next-line react/prop-types
        patients.push(res.data)
        setPatients(patients)
        setSuccess(!success)
      })
      .catch(function () {
        setError(!error)
      })
  }
  const validate = (values) => {
    const errors = {}
    if (!values.nom) {
      errors.nom = 'Name is required'
    } else if (values.nom.length < 2) {
      errors.nom = 'Name length is not suffisant'
    }
    if (!values.email) {
      errors.email = 'Email is required'
    }
    if (!values.telephone) {
      errors.telephone = 'Phone number is required'
    } else if (values.telephone.length < 9) {
      errors.telephone = 'Phone number is not correct'
    }
    if (!values.genre) {
      errors.genre = 'Gender is required'
    }
    if (!values.typePatient) {
      errors.typePatient = 'Type Patient is required'
    }
    return errors
  }
  const close = (error, success) => {
    changeVisibility(error, success, patients)
  }
  return (
    <CModal alignment="center" visible={true} onClose={() => close()}>
      <CModalHeader
        style={{
          backgroundColor: '#5eb85e',
        }}
      >
        <CModalTitle>Add</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className="row g-3 needs-validation" onSubmit={handleSubmit}>
          <CCol md={6}>
            <CFormLabel htmlFor="email">Email</CFormLabel>
            <CFormInput type="email" name="email" placeholder="test@gmail.com" valid={formErrors.email ? false : true} invalid={formErrors.email ? true : false} required onChange={handleChange} />
            <CFormFeedback invalid>{formErrors.email}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="nom">Nom</CFormLabel>
            <CInputGroup className="has-validation">
              <CInputGroupText>@</CInputGroupText>
              <CFormInput type="text" name="nom" aria-describedby="inputGroupPrepend03" valid={formErrors.nom ? false : true} invalid={formErrors.nom ? true : false} required onChange={handleChange} />
              <CFormFeedback invalid>{formErrors.nom}</CFormFeedback>
            </CInputGroup>
          </CCol>
          <CCol md={4}>
            <CFormLabel htmlFor="genre">Genre</CFormLabel>
            <CFormSelect name="genre" valid={formErrors.genre ? false : true} invalid={formErrors.genre ? true : false} onChange={handleChange}>
              <option disabled>Choose...</option>
              <option value="HOMME">Homme</option>
              <option value="FEMME">Femme</option>
            </CFormSelect>
            <CFormFeedback invalid>{formErrors.genre}</CFormFeedback>
          </CCol>
          <CCol md={4}>
            <CFormLabel htmlFor="telephone">Phone number</CFormLabel>
            <CFormInput type="text" name="telephone" valid={formErrors.telephone ? false : true} invalid={formErrors.telephone ? true : false} required onChange={handleChange} />
            <CFormFeedback invalid>{formErrors.telephone}</CFormFeedback>
          </CCol>
          <CCol md={4}>
            <CFormLabel htmlFor="typePatient">Type Patient</CFormLabel>
            <CFormSelect name="typePatient" valid={formErrors.typePatient ? false : true} invalid={formErrors.typePatient ? true : false} onChange={handleChange}>
              <option disabled>Choose...</option>
              <option value="STAFF">STAFF</option>
              <option value="POSTBAC">POST BAC</option>
            </CFormSelect>
            <CFormFeedback invalid>{formErrors.typePatient}</CFormFeedback>
          </CCol>
          <CModalFooter>
            <CButton color="success" type="submit">
              Submit
            </CButton>
          </CModalFooter>
        </CForm>
      </CModalBody>
    </CModal>
  )
}

export default AddNewPatient
