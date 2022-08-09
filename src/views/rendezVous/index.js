import React, { useEffect, useState } from 'react'
import { CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import axios from 'axios'
import emailjs from 'emailjs-com'
// eslint-disable-next-line react/prop-types
const RendezVous = ({ changeVisibility }) => {
  const initialValuesDemande = { status: 'PENDING', date: new Date() }
  const initialValuesPatient = { nom: null, email: null, telephone: null, typePatient: 'STAFF', genre: 'HOMME', demandes: [] }
  const [formDemande, setFormDemande] = useState(initialValuesDemande)
  const [formPatient, setFormPatient] = useState(initialValuesPatient)
  const [formErrorsPatient, setFormErrorsPatient] = useState({})
  const [formErrorsDemande, setFormErrorsDemande] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    if (Object.keys(formErrorsPatient).length === 0 && Object.keys(formErrorsDemande).length === 0 && isSubmit) {
      handleAdd()
    }
    if (error !== false || success !== false) close(error, success)
  }, [formErrorsPatient, formErrorsDemande, error, success])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormPatient({ ...formPatient, [name]: value })
  }
  const handleChangeDemande = (e) => {
    const { name, value } = e.target
    setFormDemande({ ...formDemande, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setFormErrorsPatient(validatePatient(formPatient))
    setFormErrorsDemande(validateDemande(formDemande))
    setIsSubmit(true)
  }
  const handleAdd = () => {
    setIsSubmit(false)
    const demande = formDemande
    const patient = formPatient
    axios
      .post('/demandes', demande)
      .then((res) => {
        patient.demandes = [res.data]
        addPatient(patient)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const addPatient = (patient) => {
    axios
      .post('/patients', patient)
      .then(() => {
        setSuccess(true)
      })
      .catch(function (error) {
        setError(true)
      })
  }

  const validatePatient = (values) => {
    const errors = {}
    if (!values.nom) {
      errors.nom = 'Name is required'
    } else if (values.nom.length < 2) {
      errors.nom = 'Name length is not suffisant'
    }
    if (!values.email) {
      errors.email = 'Email is required'
    }
    if (!values.telephone) {
      errors.telephone = 'Phone number is required'
    } else if (values.telephone.length < 9) {
      errors.telephone = 'Phone number is not correct'
    }
    if (!values.genre) {
      errors.genre = 'Gender is required'
    }
    if (!values.typePatient) {
      errors.typePatient = 'Type is required'
    }
    return errors
  }
  const validateDemande = (values) => {
    const errors = {}
    if (!values.date) {
      errors.date = 'Date is required'
    }
    return errors
  }
  const close = () => {
    changeVisibility(error, success)
  }
  return (
    <CModal alignment="center" visible={true} onClose={() => close()}>
      <CModalHeader className="text-white bg-primary">
        <CModalTitle>Get your ... </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className="row g-3 needs-validation" onSubmit={handleSubmit}>
          <CCol md={6}>
            <CFormLabel htmlFor="email">Email</CFormLabel>
            <CFormInput type="email" name="email" placeholder="test@gmail.com" valid={formErrorsPatient.email ? false : true} invalid={formErrorsPatient.email ? true : false} required onChange={handleChange} />
            <CFormFeedback invalid>{formErrorsPatient.email}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="nom">Nom</CFormLabel>
            <CInputGroup className="has-validation">
              <CInputGroupText>@</CInputGroupText>
              <CFormInput type="text" name="nom" defaultValue="" aria-describedby="inputGroupPrepend03" valid={formErrorsPatient.nom ? false : true} invalid={formErrorsPatient.nom ? true : false} required onChange={handleChange} />
              <CFormFeedback invalid>{formErrorsPatient.nom}</CFormFeedback>
            </CInputGroup>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="genre">Genre</CFormLabel>
            <CFormSelect name="genre" valid={formErrorsPatient.genre ? false : true} invalid={formErrorsPatient.genre ? true : false} onChange={handleChange}>
              <option disabled>Choose...</option>
              <option value="HOMME">Homme</option>
              <option value="FEMME">Femme</option>
            </CFormSelect>
            <CFormFeedback invalid>{formErrorsPatient.genre}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="telephone">Phone number</CFormLabel>
            <CFormInput type="text" name="telephone" valid={formErrorsPatient.telephone ? false : true} invalid={formErrorsPatient.telephone ? true : false} required onChange={handleChange} />
            <CFormFeedback invalid>{formErrorsPatient.telephone}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="typePatient">Type</CFormLabel>
            <CFormSelect name="typePatient" valid={formErrorsPatient.typePatient ? false : true} invalid={formErrorsPatient.typePatient ? true : false} onChange={handleChange}>
              <option disabled>Choose...</option>
              <option value="STAFF">STAFF</option>
              <option value="POSTBAC">POST BAC</option>
            </CFormSelect>
            <CFormFeedback invalid>{formErrorsPatient.typePatient}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="typePatient">Date rendez-vous</CFormLabel>
            <CFormInput type="datetime-local" name="date" value={formDemande.date} valid={formErrorsDemande.date ? false : true} invalid={formErrorsDemande.date ? true : false} required className="form-control" onChange={handleChangeDemande} />
            <CFormFeedback invalid>{formErrorsDemande.date}</CFormFeedback>
          </CCol>
          <CModalFooter>
            <CButton color="primary" onClick={() => close()}>
              Close
            </CButton>
            <CButton color="primary" type="submit">
              Submit
            </CButton>
          </CModalFooter>
        </CForm>
      </CModalBody>
    </CModal>
  )
}
export default RendezVous
