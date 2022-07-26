import React from 'react'
import { cilPeople } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAvatar, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
// Containers
import avatar6 from 'src/assets/images/avatars/6.jpg'

// Containers

const AllEmployes = (props) => {
  const tableExample = [
    {
      avatar: { src: avatar6, status: 'success' },
      user: {
        name: 'Friderik Dávid',
        new: true,
        email: 'ahlamchakrane@gmail.com',
        number: '0767488367',
        registered: 'Jan 1, 2021',
      },
      activity: 'Online',
    },
  ]
  return (
    <CTable align="middle" className="mb-0 border" hover responsive>
      <CTableHead color="light">
        <CTableRow>
          <CTableHeaderCell className="text-center">
            <CIcon icon={cilPeople} />
          </CTableHeaderCell>
          <CTableHeaderCell>Employe</CTableHeaderCell>
          <CTableHeaderCell className="text-center">email</CTableHeaderCell>
          <CTableHeaderCell>phone number</CTableHeaderCell>
          <CTableHeaderCell>Activity</CTableHeaderCell>
          <CTableHeaderCell>Action</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {tableExample.map((item, index) => (
          <CTableRow v-for="item in tableItems" key={index}>
            <CTableDataCell className="text-center">
              <CAvatar size="md" src={item.avatar.src} status={item.avatar.status} />
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.user.name}</div>
              <div className="small text-medium-emphasis">
                <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered: {item.user.registered}
              </div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.user.email}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.user.number}</div>
            </CTableDataCell>
            <CTableDataCell>
              <strong>{item.activity}</strong>
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

export default AllEmployes
