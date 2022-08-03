import React, { useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

// eslint-disable-next-line react/prop-types
const ModalError = ({ isError }) => {
  const [error, setError] = useState(isError)
  return (
    <>
      <CModal alignment="center" visible={error} onClose={() => setError(!isError)}>
        <CModalHeader
          style={{
            backgroundColor: '#d9534f',
          }}
        >
          <CModalTitle>Error</CModalTitle>
        </CModalHeader>
        <CModalBody>Ooops ! Something went wrong</CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => setError(!isError)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default ModalError
