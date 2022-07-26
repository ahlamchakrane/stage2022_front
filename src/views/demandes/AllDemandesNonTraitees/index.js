import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React from 'react'
// Containers

const AllDemandesNonTraitees = (props) => {
  const tableExample = [
    {
      user: {
        id: 1,
        name: 'Yiorgos Avraamu',
        date: '07/07/2022',
        status: 'PENDING',
      },
    },
  ]
  return (
    <CTable align="middle" className="mb-0 border" hover responsive>
      <CTableHead color="light">
        <CTableRow>
          <CTableHeaderCell>Demande</CTableHeaderCell>
          <CTableHeaderCell>Date</CTableHeaderCell>
          <CTableHeaderCell>Status</CTableHeaderCell>
          <CTableHeaderCell>Planifier</CTableHeaderCell>
          <CTableHeaderCell>Action</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {tableExample.map((item, index) => (
          <CTableRow v-for="item in tableItems" key={index}>
            <CTableDataCell>
              <div>#{item.user.id}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.user.date}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.user.status}</div>
            </CTableDataCell>
            <CTableDataCell>
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

export default AllDemandesNonTraitees
