import React from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

// eslint-disable-next-line react/prop-types
const ModalConfirmation = ({ changeVisibility }) => {
  const close = () => {
    changeVisibility(false)
  }
  const confirm = () => {
    changeVisibility(true)
  }
  return (
    <CModal alignment="center" visible={true} onClose={() => close()}>
      <CModalHeader
        style={{
          backgroundColor: '#f0ad4e',
        }}
      >
        <CModalTitle>Confirmation</CModalTitle>
      </CModalHeader>
      <CModalBody>Are you sure you want to delete this item ? It may delete other things</CModalBody>
      <CModalFooter>
        <CButton color="warning" onClick={() => confirm()}>
          Yes I want
        </CButton>
        <CButton color="warning" onClick={() => close()}>
          No, Thanks
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
export default ModalConfirmation
