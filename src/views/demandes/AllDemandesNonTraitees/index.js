import { cilCalendar, cilEyedropper, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UpdateDemande from '../updateDemande'
// Containers

const AllDemandesNonTraitees = (props) => {
  const [demandes, setDemandes] = useState([])
  const [visible, setVisible] = useState(false)
  const [demande, setDemande] = useState({})

  useEffect(() => {
    const list = []
    axios.get('demandes').then((res) => {
      const demandes = res.data
      demandes.map(async (demande) => {
        demande.status !== 'DONE' && list.push(demande)
      })
      setDemandes(list)
    })
  }, [])
  const handleUpdate = (id, index) => {
    axios.get(`http://localhost:3000/demandes/${id}`).then((res) => {
      const demande = res.data
      setVisible(!visible)
      setDemande(demande)
    })
  }
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
        {demandes.map((item, index) => (
          <CTableRow v-for="item in tableItems" key={index}>
            <CTableDataCell>
              <div>#{item.id}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.date}</div>
            </CTableDataCell>
            <CTableDataCell>
              <div>{item.status}</div>
            </CTableDataCell>
            <CTableDataCell>
              <CButton color="info" shape="rounded-pill">
                <CIcon icon={cilCalendar} />
              </CButton>
            </CTableDataCell>
            <CTableDataCell>
              <CButton
                color="warning"
                shape="rounded-pill"
                style={{
                  marginRight: 5,
                }}
                onClick={() => handleUpdate(item.id, index)}
              >
                <CIcon icon={cilEyedropper} />
              </CButton>
              <CButton color="danger" shape="rounded-pill">
                <CIcon icon={cilTrash} />
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
        {visible && <UpdateDemande id={demande.id} date={demande.date} status={demande.status} isVisible={visible} demandes={demandes} />}
      </CTableBody>
    </CTable>
  )
}

export default AllDemandesNonTraitees
