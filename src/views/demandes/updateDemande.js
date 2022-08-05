import React, { createContext, useEffect, useState } from 'react'
import { CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import axios from 'axios'
export const DemandeContext = createContext()

// eslint-disable-next-line react/prop-types
const UpdateDemande = ({ changeVisibility, date, status, isVisible, id }) => {
  const initialValues = { date: date, status: status }
  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [visible, setVisible] = useState(isVisible)
  const [isSubmit, setIsSubmit] = useState(false)

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
    const demande = formValues
    axios
      .put(`/demandes/${id}`, demande)
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
  const validate = (values) => {
    const errors = {}
    if (!values.date) errors.date = 'Date is required'
    if (!values.status) errors.status = 'Status od demand is required'
    return errors
  }
  return (
    <CModal visible={visible} onClose={() => close()}>
      <CModalHeader>
        <CModalTitle>Edit Demandes</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className="row g-3 needs-validation" onSubmit={handleSubmit}>
          <CCol md={7}>
            <CFormLabel htmlFor="date">Date</CFormLabel>
            <CFormInput type="text" name="date" value={formValues.date} valid={formErrors.date ? false : true} invalid={formErrors.date ? true : false} required onChange={handleChange} />
            <CFormFeedback>{formErrors.date}</CFormFeedback>
          </CCol>
          <CCol md={5}>
            <CFormLabel htmlFor="status">Status</CFormLabel>
            <CFormSelect name="status" valid={formErrors.status ? false : true} invalid={formErrors.status ? true : false} onChange={handleChange} value={formValues.status}>
              <option disabled>Choose...</option>
              <option value="CANCELED">CANCLED</option>
              <option value="PENDING">PENDING</option>
              <option value="DONE">DONE</option>
            </CFormSelect>
            <CFormFeedback>{formErrors.status}</CFormFeedback>
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
export default UpdateDemande
