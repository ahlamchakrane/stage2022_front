import React, { useState } from 'react'
import { CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import axios from 'axios'

// eslint-disable-next-line react/prop-types
const UpdateDemande = ({ date, status, isVisible, id }) => {
  const [dateUpdated, setDateUpdated] = useState(date)
  const [statusUpdated, setStatusUpdated] = useState(status)
  const [visible, setVisible] = useState(isVisible)
  const handleChange = (e) => {
    if (e.target.id === 'status') setStatusUpdated(e.target.value)
    if (e.target.id === 'date') setDateUpdated(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const demande = { date: dateUpdated, status: statusUpdated }
    axios
      .put(`demandes/${id}`, demande)
      .then((res) => {
        console.log('')
        setVisible(!visible)
      })
      .catch(function (error) {
        console.log(error.toJSON())
      })
  }
  return (
    <CModal visible={visible} onClose={() => setVisible(!isVisible)}>
      <CModalHeader>
        <CModalTitle>Edit Demandes</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className="row g-3 needs-validation" onSubmit={handleSubmit}>
          <CCol md={7}>
            <CFormLabel htmlFor="date">Date</CFormLabel>
            <CFormInput type="text" id="date" defaultValue={date} valid required onChange={handleChange} />
            <CFormFeedback valid>Looks good!</CFormFeedback>
          </CCol>
          <CCol md={5}>
            <CFormLabel htmlFor="status">Status</CFormLabel>
            <CFormSelect id="status" invalid onChange={handleChange} defaultValue={status}>
              <option disabled>Choose...</option>
              <option value="CANCELED">CANCLED</option>
              <option value="PENDING">PENDING</option>
              <option value="DONE">DONE</option>
            </CFormSelect>
            <CFormFeedback invalid>Please provide a valid gender.</CFormFeedback>
          </CCol>
          <>
            <CModalFooter>
              <CButton color="success" type="submit" shape="rounded-pill">
                Save changes
              </CButton>
              <CButton color="secondary" onClick={() => setVisible(!isVisible)} shape="rounded-pill">
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
