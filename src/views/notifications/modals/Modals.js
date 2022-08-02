import React, { useState } from 'react'
import { CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

const LiveDemo = () => {
  const [visible, setVisible] = useState(false)
  console.log(visible)
  return (
    <>
      <CButton onClick={() => setVisible(!visible)}>Launch demo modal</CButton>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Edit Demandes</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="row g-3 needs-validation">
            <CCol md={7}>
              <CFormLabel htmlFor="validationServer01">Date</CFormLabel>
              <CFormInput type="text" id="validationServer01" valid required />
              <CFormFeedback valid>Looks good!</CFormFeedback>
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="validationServer04">Status</CFormLabel>
              <CFormSelect id="validationServer04" invalid>
                <option disabled>Choose...</option>
                <option value="CANCELED">CANCLED</option>
                <option value="PENDING">PENDING</option>
                <option value="DONE">DONE</option>
              </CFormSelect>
              <CFormFeedback invalid>Please provide a valid gender.</CFormFeedback>
            </CCol>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default LiveDemo
