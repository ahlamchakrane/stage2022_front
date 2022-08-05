import React from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

// eslint-disable-next-line react/prop-types
const ModalSuccess = ({ changeVisibility, isVisible }) => {
  const close = () => {
    changeVisibility(!isVisible)
  }
  return (
    <>
      <CModal alignment="center" visible={true} onClose={() => close()}>
        <CModalHeader
          style={{
            backgroundColor: '#5eb85e',
          }}
        >
          <CModalTitle>Success</CModalTitle>
        </CModalHeader>
        <CModalBody>Everything is up good !</CModalBody>
        <CModalFooter>
          <CButton color="visible" onClick={() => close()}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default ModalSuccess
