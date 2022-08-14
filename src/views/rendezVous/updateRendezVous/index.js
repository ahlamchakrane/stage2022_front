import React, { useEffect, useState } from 'react'
import { CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import axios from 'axios'
import emailjs from 'emailjs-com'
// eslint-disable-next-line react/prop-types
const UpdateRendezVous = ({ id, changeVisibility, isVisible }) => {
  const initialValues = { status: 'DONE', date: new Date() }
  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [demande, setDemande] = useState()
  const [isSubmit, setIsSubmit] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [target, setTarget] = useState()
  const [nom, setNom] = useState(false)
  const [email, setEmail] = useState(false)
  useEffect(() => {
    getPatient()
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleUpdate()
    }
    if (error !== false || success !== false) close(error, success)
  }, [formErrors, error, success])
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setTarget(e.target)
    setFormErrors(validate(formValues))
    setIsSubmit(true)
  }
  const sendMessage = () => {
    emailjs
      .sendForm('service_valmmxj', 'template_7q25tak', target, '7930BMTsDzgge1bhm')
      .then(() => {
        setSuccess(true)
      })
      .catch(function (error) {
        setError(true)
      })
  }
  const getPatient = () => {
    let patient = null
    axios
      .get('/patients')
      .then((res) => {
        const lengthPatients = res.data.length
        for (let i = 0; i < lengthPatients; i++) {
          patient = res.data[i]
          if (patient.demandes) {
            for (let j = 0; j < patient.demandes.length; j++) {
              if (patient.demandes[j].id === id) {
                setEmail(patient.email)
                setNom(patient.nom)
              }
            }
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const handleUpdate = () => {
    setIsSubmit(false)
    const demande = formValues
    axios
      .put(`/demandes/${id}`, demande)
      .then((res) => {
        setDemande(res.data)
        sendMessage()
        setSuccess(true)
      })
      .catch(function (error) {
        setError(true)
      })
  }
  const validate = (values) => {
    const errors = {}
    if (!values.date) {
      errors.date = 'Date is required'
    }
    return errors
  }
  const close = () => {
    changeVisibility(error, success, demande)
  }
  return (
    <CModal alignment="center" visible={true} onClose={() => close()}>
      <CModalHeader className="text-white bg-dark">
        <CModalTitle>Planification</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className="row g-3 needs-validation" onSubmit={handleSubmit}>
          <CFormInput type="text" name="nom" value={nom} hidden />
          <CFormInput type="email" name="email" value={email} hidden />
          <CCol md={6}>
            <CFormInput type="datetime-local" name="date" value={formValues.date} valid={formErrors.date ? false : true} invalid={formErrors.date ? true : false} required className="form-control" onChange={handleChange} />
            <CFormFeedback invalid>{formErrors.date}</CFormFeedback>
          </CCol>
          <CModalFooter>
            <CButton className="bg-dark" onClick={() => close()}>
              Close
            </CButton>
            <CButton className="bg-dark" type="submit">
              Submit
            </CButton>
          </CModalFooter>
        </CForm>
      </CModalBody>
    </CModal>
  )
}
export default UpdateRendezVous
