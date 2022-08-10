import React, { useEffect, useState } from 'react'
import { CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import axios from 'axios'

// eslint-disable-next-line react/prop-types
const UpdatePatient = ({ changeVisibility, id, nom, email, telephone, typePatient, isVisible }) => {
  const [visible, setVisible] = useState(isVisible)
  const initialValues = { nom: nom, email: email, telephone: telephone, typePatient: typePatient }
  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [patient, setPatient] = useState()

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleUpdate()
    }
  }, [formErrors])
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setFormErrors(validate(formValues))
    setIsSubmit(true)
  }
  const handleUpdate = (e) => {
    setIsSubmit(false)
    const patient = formValues
    axios
      .put(`/patients/${id}`, patient)
      .then((res) => {
        setPatient(res.data)
        setVisible(!visible)
      })
      .catch(function (error) {
        console.log(error.toJSON())
      })
  }
  const close = () => {
    changeVisibility(!isVisible, patient)
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
    if (!values.typePatient) {
      errors.typePatient = 'Type Patient must is required'
    }
    return errors
  }
  return (
    <CModal visible={visible} onClose={() => close()}>
      <CModalHeader>
        <CModalTitle>Edit Employe</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className="row g-3 needs-validation" onSubmit={handleSubmit}>
          <CCol md={6}>
            <CFormLabel htmlFor="nom">Nom</CFormLabel>
            <CFormInput type="text" name="nom" value={formValues.nom} valid={formErrors.nom ? false : true} invalid={formErrors.nom ? true : false} required onChange={handleChange} />
            <CFormFeedback invalid>{formErrors.nom}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="email">email</CFormLabel>
            <CFormInput type="email" name="email" value={formValues.email} valid={formErrors.email ? false : true} invalid={formErrors.email ? true : false} required onChange={handleChange} />
            <CFormFeedback invalid>{formErrors.email}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="telephone">Phone number</CFormLabel>
            <CFormInput type="text" name="telephone" value={formValues.telephone} valid={formErrors.telephone ? false : true} invalid={formErrors.telephone ? true : false} required onChange={handleChange} />
            <CFormFeedback invalid>{formErrors.telephone}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="typePatient">Type Patient</CFormLabel>
            <CFormSelect name="typePatient" valid={formErrors.typePatient ? false : true} invalid={formErrors.typePatient ? true : false} onChange={handleChange} value={formValues.typePatient}>
              <option disabled>Choose...</option>
              <option value="STAFF">STAFF</option>
              <option value="POSTBAC">POST BAC</option>
            </CFormSelect>
            <CFormFeedback invalid>{formErrors.typePatient}</CFormFeedback>
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
