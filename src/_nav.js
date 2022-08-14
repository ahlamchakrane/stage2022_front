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
    ],
  },
  {
    component: CNavGroup,
    name: 'Employees',
    to: '/employees',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'All Employees',
        to: '/employees/all-employees',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Appointments',
    to: '/Appointments/all-Appointments',
    icon: <CIcon icon={cilEnvelopeOpen} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'DONE',
        to: '/Appointments/done',
      },
      {
        component: CNavItem,
        name: 'PENDING',
        to: '/Appointments/pending',
      },
    ],
  },
]

export default _nav
