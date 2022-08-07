import { CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Containers

// eslint-disable-next-line react/prop-types
const AddNewEmploye = ({ changeVisibility }) => {
  const initialValues = { username: null, email: null, telephone: null, password: null, genre: 'HOMME' }
  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [roles, setRoles] = useState('USER')
  const [userRole, setUserRole] = useState({ id: null, nom: 'USER' })
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
    if (e.target.id === 'roles') setRoles(e.target.value)
  }
  useEffect(() => {
    getRoles()
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleUpdate()
    }
    if (error !== false || success !== false) close(error, success)
  }, [roles, formErrors, error, success])

  const getRoles = () => {
    const obj = { id: null, nom: null }
    axios
      .get('/roles')
      .then((res) => {
        const allRoles = res.data
        allRoles.map(async (r) => {
          // eslint-disable-next-line no-unused-expressions
          if (r.nom === roles) {
            obj.id = r.id
            obj.nom = r.nom
          }
        })
        if (obj.id && obj.nom) setUserRole(obj)
      })
      .catch(function (error) {
        console.log(error.toJSON())
      })
  }
  const handleUpdate = (e) => {
    setIsSubmit(false)
    const employe = formValues
    employe.roles = [userRole]
    axios
      .post('/api/register', employe)
      .then(() => {
        setSuccess(!success)
      })
      .catch(function () {
        setError(!error)
      })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setFormErrors(validate(formValues))
    setIsSubmit(true)
  }
  const validate = (values) => {
    const errors = {}
    if (!values.username) {
      errors.username = 'Username is required'
    } else if (values.username.length < 3) {
      errors.username = 'Username length is not suffisant'
    }
    if (!values.email) {
      errors.email = 'Email is required'
    }
    if (!values.telephone) {
      errors.telephone = 'Phone number is required'
    }
    if (!values.genre) {
      errors.genre = 'Gender is required'
    }
    if (values.telephone.length < 9) {
      errors.telephone = 'Phone number is not correct'
    }
    if (values.password && values.password.length < 6) {
      errors.password = 'password must be more than 6 characters'
    }
    return errors
  }
  const close = (error, success) => {
    changeVisibility(error, success)
  }
  return (
    <CModal alignment="center" visible={true} onClose={() => close()}>
      <CModalHeader
        style={{
          backgroundColor: '#5eb85e',
        }}
      >
        <CModalTitle>Add</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className="row g-3 needs-validation" onSubmit={handleSubmit}>
          <CCol md={6}>
            <CFormLabel htmlFor="email">Email</CFormLabel>
            <CFormInput type="text" name="email" placeholder="test@gmail.com" valid={formErrors.email ? false : true} invalid={formErrors.email ? true : false} required onChange={handleChange} />
            <CFormFeedback invalid>{formErrors.email}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="username">Username</CFormLabel>
            <CInputGroup className="has-validation">
              <CInputGroupText>@</CInputGroupText>
              <CFormInput type="text" name="username" defaultValue="" aria-describedby="inputGroupPrepend03" valid={formErrors.username ? false : true} invalid={formErrors.username ? true : false} required onChange={handleChange} />
              <CFormFeedback invalid>{formErrors.username}</CFormFeedback>
            </CInputGroup>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="telephone">Phone number</CFormLabel>
            <CFormInput type="text" name="telephone" valid={formErrors.telephone ? false : true} invalid={formErrors.telephone ? true : false} required onChange={handleChange} />
            <CFormFeedback invalid>{formErrors.telephone}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="genre">Genre</CFormLabel>
            <CFormSelect name="genre" valid={formErrors.genre ? false : true} invalid={formErrors.genre ? true : false} onChange={handleChange}>
              <option disabled>Choose...</option>
              <option value="HOMME">Homme</option>
              <option value="Femme">Femme</option>
            </CFormSelect>
            <CFormFeedback invalid>{formErrors.genre}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="password">Password</CFormLabel>
            <CFormInput type="password" name="password" valid={formErrors.password ? false : true} invalid={formErrors.password ? true : false} required onChange={handleChange} />
            <CFormFeedback invalid>{formErrors.password}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="cPassword">Repeat Password</CFormLabel>
            <CFormInput type="password" id="cPassword" valid={formErrors.password ? false : true} invalid={formErrors.password ? true : false} required onChange={handleChange} />
            <CFormFeedback invalid>{formErrors.password}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="roles">Role</CFormLabel>
            <CFormSelect name="roles" valid onChange={handleChange}>
              <option disabled>Choose...</option>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </CFormSelect>
            <CFormFeedback invalid>{formErrors.role}</CFormFeedback>
          </CCol>
          <CModalFooter>
            <CButton color="success" type="submit">
              Submit
            </CButton>
          </CModalFooter>
        </CForm>
      </CModalBody>
    </CModal>
  )
}

export default AddNewEmploye
