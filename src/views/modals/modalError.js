import React, { useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

// eslint-disable-next-line react/prop-types
const ModalError = ({ changeVisibility, isVisible }) => {
  const [visible, setVisible] = useState(isVisible)
  const close = () => {
    setVisible(!isVisible)
    changeVisibility(!isVisible)
  }
  return (
    <CModal alignment="center" visible={visible} onClose={() => close()}>
      <CModalHeader
        style={{
          backgroundColor: '#d9534f',
        }}
      >
        <CModalTitle>Error</CModalTitle>
      </CModalHeader>
      <CModalBody>Ooops ! Something went wrong</CModalBody>
      <CModalFooter>
        <CButton color="danger" onClick={() => close()}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
export default ModalError
