import React from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

// eslint-disable-next-line react/prop-types
const ModalError = ({ changeVisibility, isVisible }) => {
  const close = () => {
    changeVisibility(!isVisible)
  }
  return (
    <CModal alignment="center" visible={true} onClose={() => close()}>
      <CModalHeader
        style={{
          backgroundColor: '#d9534f',
        }}
      >
        <CModalTitle>Error</CModalTitle>
      </CModalHeader>
      <CModalBody>Ooops ! Une erreur s est produite</CModalBody>
      <CModalFooter>
        <CButton color="danger" onClick={() => close()}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
export default ModalError
