import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Containers

const AddNewEmploye = (props) => {
  const ModalError = React.lazy(() => import('src/views/modals/modalError'))
  const ModalSuccess = React.lazy(() => import('src/views/modals/modalSuccess'))

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
  }, [roles, formErrors, success, error])

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
  const changeSuccess = (isVisible) => {
    setSuccess(isVisible)
  }
  const changeError = (isVisible) => {
    setError(isVisible)
  }
  const validate = (values) => {
    const errors = {}
    if (!values.username) {
      errors.username = 'Username is required'
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
  return (
    <CRow>
      {success && <ModalSuccess changeVisibility={changeSuccess} isVisible={success} />}
      {error && <ModalError changeVisibility={changeError} isVisible={error} />}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>New</strong> <small>Employe</small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3 needs-validation" onSubmit={handleSubmit}>
              <CCol md={4}>
                <CFormLabel htmlFor="email">Email</CFormLabel>
                <CFormInput type="text" name="email" placeholder="ahlam@gmail.com" valid={formErrors.email ? false : true} invalid={formErrors.email ? true : false} required onChange={handleChange} />
                <CFormFeedback>{formErrors.email}</CFormFeedback>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="username">Username</CFormLabel>
                <CInputGroup className="has-validation">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput type="text" name="username" defaultValue="" aria-describedby="inputGroupPrepend03" valid={formErrors.username ? false : true} invalid={formErrors.username ? true : false} required onChange={handleChange} />
                  <CFormFeedback>{formErrors.username}</CFormFeedback>
                </CInputGroup>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="genre">Genre</CFormLabel>
                <CFormSelect name="genre" valid={formErrors.genre ? false : true} invalid={formErrors.genre ? true : false} onChange={handleChange}>
                  <option disabled>Choose...</option>
                  <option value="HOMME">Homme</option>
                  <option value="Femme">Femme</option>
                </CFormSelect>
                <CFormFeedback>{formErrors.genre}</CFormFeedback>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="password">Password</CFormLabel>
                <CFormInput type="password" name="password" valid={formErrors.password ? false : true} invalid={formErrors.password ? true : false} required onChange={handleChange} />
                <CFormFeedback>{formErrors.password}</CFormFeedback>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="cPassword">Repeat Password</CFormLabel>
                <CFormInput type="password" id="cPassword" valid={formErrors.password ? false : true} invalid={formErrors.password ? true : false} required onChange={handleChange} />
                <CFormFeedback>{formErrors.password}</CFormFeedback>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="telephone">Phone number</CFormLabel>
                <CFormInput type="text" name="telephone" valid={formErrors.telephone ? false : true} invalid={formErrors.telephone ? true : false} required onChange={handleChange} />
                <CFormFeedback>{formErrors.telephone}</CFormFeedback>
              </CCol>
              <CCol md={3}>
                <CFormLabel htmlFor="roles">Role</CFormLabel>
                <CFormSelect name="roles" valid onChange={handleChange}>
                  <option disabled>Choose...</option>
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </CFormSelect>
                <CFormFeedback>{formErrors.role}</CFormFeedback>
              </CCol>
              <CCol xs={12}>
                <CButton color="primary" type="submit">
                  Submit
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddNewEmploye
