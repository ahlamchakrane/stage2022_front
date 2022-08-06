import React, { useEffect, useState } from 'react'
import { CAvatar, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { cilLockLocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import axios from 'axios'

import avatar8 from './../../assets/images/avatars/8.jpg'
import ModalError from 'src/views/modals/modalError'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import UpdateEmploye from 'src/views/employes/updateEmploye'

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
          <CAvatar src={avatar8} size="md" />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem onClick={() => logout()}>
            <CIcon icon={cilLockLocked} className="me-2" />
            Log out
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </>
  )
}

export default AppHeaderDropdown
