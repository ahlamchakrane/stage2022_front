import React, { useState } from 'react'
import { CButton, CForm, CFormTextarea, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import axios from 'axios'

// eslint-disable-next-line react/prop-types
const ModalRapport = ({ rapport, id, changeVisibility, isVisible }) => {
  const initialValues = { rapport: rapport }
  const [formValues, setFormValues] = useState(initialValues)
  const [visible, setVisible] = useState(isVisible)

  const close = () => {
    changeVisibility(!isVisible)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const patient = formValues
    axios
      .put(`/patients/${id}`, patient)
      .then((res) => {
        setVisible(!isVisible)
      })
      .catch(function (error) {
        console.log(error.toJSON())
      })
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }
  return (
    <CModal alignment="center" visible={visible} onClose={() => close()}>
      <CModalHeader className="btn btn-info">
        <CModalTitle>Rapport</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className="row g-1 needs-validation" onSubmit={handleSubmit}>
          <div className="mb-2">
            <CFormTextarea className="form-control" name="rapport" rows="20" value={formValues.rapport} required onChange={handleChange} />
          </div>
          <CModalFooter>
            <CButton color="info" onClick={() => close()}>
              Close
            </CButton>
            <CButton color="info" type="submit">
              save
            </CButton>
          </CModalFooter>
        </CForm>
      </CModalBody>
    </CModal>
  )
}
export default ModalRapport
