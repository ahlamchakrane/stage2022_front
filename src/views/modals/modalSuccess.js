import React, { useEffect, useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

// eslint-disable-next-line react/prop-types
const ModalSuccess = ({ isSuccess }) => {
  const [success, setSuccess] = useState(isSuccess)
  return (
    <>
      <CModal alignment="center" visible={success} onClose={() => setSuccess(!isSuccess)}>
        <CModalHeader
          style={{
            backgroundColor: '#5eb85e',
          }}
        >
          <CModalTitle>Success</CModalTitle>
        </CModalHeader>
        <CModalBody>Everything is up good !</CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={() => setSuccess(!isSuccess)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default ModalSuccess
