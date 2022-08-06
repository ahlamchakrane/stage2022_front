import React from 'react'
import CIcon from '@coreui/icons-react'
// eslint-disable-next-line no-unused-vars
import { cilAddressBook, cilEnvelopeOpen, cilGroup, cilPeople } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'

const _nav = [
  {
    component: CNavGroup,
    name: 'Patients',
    to: '/patients',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Patients',
        to: '/patients/all-patients',
      },
      {
        component: CNavItem,
        name: 'New Patient',
        to: '/patients/add-new-patient',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Employes',
    to: '/employes',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Employes',
        to: '/employes/all-employes',
      },
      {
        component: CNavItem,
        name: 'New Employe',
        to: '/employes/add-new-employe',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Demandes',
    to: '/demandes/all-demandes',
    icon: <CIcon icon={cilEnvelopeOpen} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Demandes traitées',
        to: '/demandes/all-demandes-traitees',
      },
      {
        component: CNavItem,
        name: 'Demandes pas traitées',
        to: '/demandes/all-demandes-non-traitees',
      },
    ],
  },
]

export default _nav
