import React, { useEffect, useState } from 'react'
import { CButton, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import axios from 'axios'
export const EmployeContext = React.createContext()

// eslint-disable-next-line react/prop-types
const UpdateEmploye = ({ changeVisibility, id, username, email, telephone, isVisible }) => {
  const [visible, setVisible] = useState(isVisible)
  const [roles, setRoles] = useState(null)
  const initialValues = { username: username, email: email, telephone: telephone, roles, password: null }
  const [formValues, setFormValues] = useState(initialValues)
  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
    if (e.target.id === 'roles') setRoles(e.target.value)
  }
  const getRoles = () => {
    const obj = { id: null, nom: null }
    axios
      .get('/roles')
      .then((res) => {
        const allRoles = res.data
        allRoles.map(async (r) => {
          if (roles && r.nom === roles) {
            obj.id = r.id
            obj.nom = r.nom
          }
        })
        if (obj.id && obj.nom) setRoles(obj)
      })
      .catch(function (error) {
        console.log(error.toJSON())
      })
  }
  useEffect(() => {
    getRoles()
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      handleUpdate()
    }
  }, [formErrors, roles])

  const handleUpdate = () => {
    // if (password !== 0 && cPassword !== 0) {
    //   if (password !== cPassword) console.log('show err message')
    // }
    const employe = formValues
    if (roles) employe.roles = [roles]
    axios
      .put(`/employes/${id}`, employe)
      .then((res) => {
        setVisible(!visible)
      })
      .catch(function (error) {
        console.log(error.toJSON())
      })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setFormErrors(validate(formValues))
    setIsSubmit(true)
  }
  const close = () => {
    changeVisibility(!isVisible)
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
    if (values.telephone.length < 9) {
      errors.telephone = 'Phone number is not correct'
    }
    if (values.password && values.password.length < 6) {
      errors.password = 'password must be more than 6 characters'
    }
    return errors
  }
  return (
    <CModal visible={visible} onClose={() => close()}>
      <CModalHeader>
        <CModalTitle>Edit Employés</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm className="row g-3 needs-validation" onSubmit={handleSubmit}>
          <CCol md={5}>
            <CFormLabel htmlFor="username">Username</CFormLabel>
            <CFormInput type="text" name="username" value={formValues.username} valid={formErrors.username ? false : true} invalid={formErrors.username ? true : false} required onChange={handleChange} />
            <CFormFeedback>{formErrors.username}</CFormFeedback>
          </CCol>
          <CCol md={7}>
            <CFormLabel htmlFor="email">email</CFormLabel>
            <CFormInput type="email" name="email" value={formValues.email} valid={formErrors.email ? false : true} invalid={formErrors.email ? true : false} required onChange={handleChange} />
            <CFormFeedback>{formErrors.email}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="telephone">Phone number</CFormLabel>
            <CFormInput type="text" name="telephone" value={formValues.telephone} valid={formErrors.telephone ? false : true} invalid={formErrors.telephone ? true : false} required onChange={handleChange} />
            <CFormFeedback>{formErrors.telephone}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="roles">Roles</CFormLabel>
            <CFormSelect id="roles" onChange={handleChange}>
              <option value="null" invalid="true">
                Choose...
              </option>
              <option value="USER" valid="true">
                USER
              </option>
              <option value="ADMIN" valid="tre">
                ADMIN
              </option>
            </CFormSelect>
          </CCol>
          <CCol md={6}>
            <CFormLabel htmlFor="password">Password</CFormLabel>
            <CFormInput type="password" name="password" valid={formErrors.password ? false : true} invalid={formErrors.password ? true : false} onChange={handleChange} placeholder="not obligatory" />
            <CFormFeedback>{formErrors.password}</CFormFeedback>
          </CCol>
          <CCol md={6}>
            <CFormLabel>Confirm Password</CFormLabel>
            <CFormInput type="password" name="cPassword" valid={formErrors.password ? false : true} invalid={formErrors.password ? true : false} onChange={handleChange} />
            <CFormFeedback>{formErrors.password}</CFormFeedback>
          </CCol>
          <>
            <CModalFooter>
              <CButton color="success" type="submit" shape="rounded-pill">
                Save changes
              </CButton>
              <CButton color="secondary" onClick={() => close()} shape="rounded-pill">
                Close
              </CButton>
            </CModalFooter>
          </>
        </CForm>
      </CModalBody>
    </CModal>
  )
}
export default UpdateEmploye
