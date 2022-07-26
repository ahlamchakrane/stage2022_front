import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import React from 'react'

// Containers

const AddNewPatient = (props) => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>New</strong> <small>Patient</small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3 needs-validation">
              <CCol md={4}>
                <CFormLabel htmlFor="validationServer01">Email</CFormLabel>
                <CFormInput type="text" id="validationServer01" defaultValue="Mark" valid required />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="validationServerUsername">Username</CFormLabel>
                <CInputGroup className="has-validation">
                  <CInputGroupText id="inputGroupPrepend03">@</CInputGroupText>
                  <CFormInput type="text" id="validationServerUsername" defaultValue="" aria-describedby="inputGroupPrepend03" invalid required />
                  <CFormFeedback invalid>Please choose a username.</CFormFeedback>
                </CInputGroup>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="validationServer04">Genre</CFormLabel>
                <CFormSelect id="validationServer04" invalid>
                  <option disabled>Choose...</option>
                  <option value="HOMME">Homme</option>
                  <option value="Femme">Femme</option>
                </CFormSelect>
                <CFormFeedback invalid>Please provide a valid gender.</CFormFeedback>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="validationServer03">Phone number</CFormLabel>
                <CFormInput type="number" id="validationServer03" invalid required />
                <CFormFeedback invalid>Please provide a valid number.</CFormFeedback>
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
