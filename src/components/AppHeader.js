import React, { useEffect, useState } from 'react'
import { Navigate, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CContainer, CHeader, CHeaderDivider, CHeaderNav, CHeaderToggler, CNavLink, CNavItem, CBadge } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilMenu } from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import axios from 'axios'
const AppHeader = () => {
  const [newDemandes, setNewDemandes] = useState(null)
  const [today, setToday] = useState(new Date())
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const getNewDemande = () => {
    let nbrNewDemandes = 0
    axios
      .get(`/demandes`)
      .then((res) => {
        for (const dataObj of res.data) {
          if (new Date(dataObj.date).getDay() === today.getDay() && new Date(dataObj.date).getMonth() + 1 === today.getMonth() + 1 && new Date(dataObj.date).getFullYear() === today.getFullYear()) nbrNewDemandes += 1
        }
        setNewDemandes(nbrNewDemandes)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  useEffect(() => {
    getNewDemande()
  }, [])
  return (
    <>
      <CHeader position="sticky" className="mb-4">
        <CContainer fluid>
          <CHeaderToggler className="ps-1" onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}>
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <CHeaderNav className="d-none d-md-flex me-auto">
            <CNavItem>
              <CNavLink to="/" component={NavLink}>
                Home
              </CNavLink>
            </CNavItem>
          </CHeaderNav>
          <CHeaderNav>
            <CNavItem>
              <CNavLink href="#" aria-haspopup="true" aria-expanded="false">
                <CIcon icon={cilBell} size="lg" />
                {newDemandes && (
                  <CBadge color="danger" shape="rounded-pill">
                    {newDemandes}
                  </CBadge>
                )}
              </CNavLink>
            </CNavItem>
          </CHeaderNav>
          <CHeaderNav className="ms-3">
            <AppHeaderDropdown />
          </CHeaderNav>
        </CContainer>
        <CHeaderDivider />
        <CContainer fluid>
          <AppBreadcrumb />
        </CContainer>
      </CHeader>
    </>
  )
}

export default AppHeader
