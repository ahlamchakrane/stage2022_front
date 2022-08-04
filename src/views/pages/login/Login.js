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
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState(false)
  const [user, setUser] = useState({})
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    if (e.target.id === 'email') setEmail(e.target.value)
    if (e.target.id === 'password') setPassword(e.target.value)
  }
  const getUser = () => {
    let user = null
    axios
      .get('api/employe')
      .then((response) => {
        user = response.data
      })
      .catch(function (error) {
        setError(!error)
      })
    setUser(user)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const employe = { email: email, password: password }
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
  useEffect(() => {
    Cookies.remove('jwt')
  }, [])
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
                        <CFormInput placeholder="Email" autoComplete="email" id="email" onChange={handleChange} />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput type="password" placeholder="Password" autoComplete="current-password" id="password" onChange={handleChange} />
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
