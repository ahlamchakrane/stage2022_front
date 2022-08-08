import React, { useEffect, useState } from 'react'
import { CDropdown, CDropdownToggle } from '@coreui/react'
import { cilAccountLogout } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from 'axios'

import ModalError from 'src/views/modals/modalError'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const AppHeaderDropdown = () => {
  const [error, setError] = useState(false)
  const [employe, setEmploye] = useState()
  const navigate = useNavigate()

  const UpdateEmploye = () => {
    employe.active = false
    employe.password = null
    axios.put(`/employes/${employe.id}`, employe).catch(function (error) {
      setError(!error)
    })
  }
  const getEmploye = () => {
    axios
      .get('/api/employe')
      .then((response) => {
        let user = response.data
        setEmploye(user)
      })
      .catch(function (error) {
        setError(!error)
      })
  }
  useEffect(() => {
    getEmploye()
  }, [])
  const logout = () => {
    UpdateEmploye()
    Cookies.remove('ROLE')
    axios
      .post('/api/logout')
      .then(() => {
        navigate('/login')
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
      <CDropdown variant="nav-item">
        <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
          <CIcon icon={cilAccountLogout} size="lg" onClick={() => logout()} />
        </CDropdownToggle>
      </CDropdown>
    </>
  )
}

export default AppHeaderDropdown
