import React from 'react'
import { cilPeople } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAvatar, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
// Containers
import avatar1 from 'src/assets/images/avatars/1.jpg'

// Containers

const AllPatients = (props) => {
  const tableExample = [
    {
      avatar: { src: avatar1 },
      user: {
        name: 'Yiorgos Avraamu',
        new: true,
        email: 'ahlamchakrane@hotmail.fr',
        registered: 'Jan 1, 2021',
        number: '067676767',
      },
    },
  ]
  return (
    <CTable align="middle" className="mb-0 border" hover responsive>
      <CTableHead color="light">
        <CTableRow>
          <CTableHeaderCell className="text-center">
            <CIcon icon={cilPeople} />
          </CTableHeaderCell>
          <CTableHeaderCell>Patients</CTableHeaderCell>
          <CTableHeaderCell className="text-center">email</CTableHeaderCell>
          <CTableHeaderCell>Phone number</CTableHeaderCell>
          <CTableHeaderCell className="text-center">Afficher</CTableHeaderCell>
          <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {tableExample.map((item, index) => (
          <CTableRow v-for="item in tableItems" key={index}>
            <CTableDataCell className="text-center">
              <CAvatar size="md" src={item.avatar.src} />
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.user.name}</div>
              <div className="small text-medium-emphasis">
                <span>Registered: {item.user.registered}</span>
              </div>
            </CTableDataCell>
            <CTableDataCell className="text-center">
              <div>{item.user.email}</div>
            </CTableDataCell>
            <CTableDataCell className="text-center">
              <div>{item.user.number}</div>
            </CTableDataCell>
            <CTableDataCell className="text-center">
              <button>Afficher</button>
            </CTableDataCell>
            <CTableDataCell>
              <button>delete</button>
              <button>update</button>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default AllPatients
