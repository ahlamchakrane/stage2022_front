import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AddNewPatient = (props) => {
  const ModalError = React.lazy(() => import('src/views/modals/modalError'))
  const ModalSuccess = React.lazy(() => import('src/views/modals/modalSuccess'))
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
      handleUpdate()
    }
  }, [formErrors])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormErrors(validate(formValues))
    setIsSubmit(true)
  }
  const handleUpdate = (e) => {
    setIsSubmit(false)
    const patient = formValues
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
      errors.typePatient = 'Type Patient must is required'
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
                <CFormInput type="email" name="email" placeholder="test@gmail.com" valid={formErrors.email ? false : true} invalid={formErrors.email ? true : false} required onChange={handleChange} />
                <CFormFeedback invalid>{formErrors.email}</CFormFeedback>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="nom">Nom</CFormLabel>
                <CInputGroup className="has-validation">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput type="text" name="nom" defaultValue="" aria-describedby="inputGroupPrepend03" valid={formErrors.nom ? false : true} invalid={formErrors.nom ? true : false} required onChange={handleChange} />
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
