import React, { useEffect, useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

// eslint-disable-next-line react/prop-types
const ModalSuccess = ({ changeVisibility, isVisible }) => {
  const [visible, setVisible] = useState(isVisible)
  const close = () => {
    setVisible(!isVisible)
    changeVisibility(!isVisible)
  }
  return (
    <>
      <CModal alignment="center" visible={visible} onClose={() => close()}>
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
