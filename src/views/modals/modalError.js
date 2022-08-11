import React from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

// eslint-disable-next-line react/prop-types
const ModalError = ({ body, color, changeVisibility, isVisible }) => {
  const close = () => {
    changeVisibility(!isVisible)
  }
  return (
    <CModal alignment="center" visible={true} onClose={() => close()}>
      <CModalHeader className={color ? 'btn btn-' + color : 'btn btn-danger'}>
        <CModalTitle>Error</CModalTitle>
      </CModalHeader>
      <CModalBody>{body ? body : 'Ooops ! Une erreur s est produite'}</CModalBody>
      <CModalFooter>
        <CButton color={color ? color : 'danger'} onClick={() => close()}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
export default ModalError
