import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked } from '@coreui/icons'
import axios from 'axios'
import ModalError from 'src/views/modals/modalError'
import DefaultLayout from 'src/layout/DefaultLayout'
import Cookies from 'js-cookie'

const Login = () => {
  const navigate = useNavigate()
  const initialValues = { email: null, password: null }
  const [formValues, setFormValues] = useState(initialValues)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }
  const getUser = () => {
    axios
      .get('/api/employe')
      .then((res) => {
        const id = res.data.id
        getRolesUser(id)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const getRolesUser = (id) => {
    axios
      .get(`/employes/${id}/roles`)
      .then((res) => {
        console.log('he')
        const roles = res.data
        if (roles) {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].nom === 'ADMIN') {
              Cookies.set('ROLE', 'ADMIN')
              return
            } else if (roles[i].nom === 'USER') {
              Cookies.set('ROLE', 'USER')
              return
            }
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const employe = formValues
    axios
      .post('/api/login', employe)
      .then(() => {
        setSuccess(!success)
        navigate('/dashboard')
        getUser()
      })
      .catch(function (error) {
        setError(!error)
      })
  }
  const changeError = (isVisible) => {
    setError(isVisible)
  }
  return (
    <>
      {error && <ModalError changeVisibility={changeError} isVisible={error} />}
      {success && <NavLink to={<DefaultLayout />} />}

      <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm onSubmit={handleSubmit}>
                      <h1>Login</h1>
                      <p className="text-medium-emphasis">Sign In to your account</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>@</CInputGroupText>
                        <CFormInput placeholder="Email" autoComplete="email" name="email" onChange={handleChange} />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput type="password" placeholder="Password" autoComplete="current-password" name="password" onChange={handleChange} />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton color="primary" className="px-4" type="submit">
                            Login
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  </CCardBody>
                </CCard>
                <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h3>Welcome to</h3>
                      <br />
                      <h2>Health Center Application</h2>
                    </div>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    </>
  )
}

export default Login
