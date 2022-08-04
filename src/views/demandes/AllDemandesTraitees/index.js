import { cilCalendar, cilEyedropper, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
// Containers

const AllDemandesTraitees = (props) => {
  const UpdateDemande = React.lazy(() => import('../updateDemande'))
  const ModalError = React.lazy(() => import('src/views/modals/modalError'))
  const ModalSuccess = React.lazy(() => import('src/views/modals/modalSuccess'))

  const [demandes, setDemandes] = useState([])
  const [visible, setVisible] = useState(false)
  const [demande, setDemande] = useState({})
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const list = []
    axios
      .get('/demandes')
      .then((res) => {
        const demandes = res.data
        demandes.map(async (demande) => {
          demande.status === 'DONE' && list.push(demande)
        })
        setDemandes(list)
      })
      .catch(function (error) {
        console.log(error.toJSON())
      })
  }, [])
  const deleteDemande = (id) => {
    axios
      .delete(`/demandes/${id}`)
      .then((res) => {
        setSuccess(!success)
      })
      .catch(function (error) {
        setError(!error)
      })
  }
  const handleUpdate = (id) => {
    axios
      .get(`/demandes/${id}`)
      .then((res) => {
        const demande = res.data
        setVisible(!visible)
        setDemande(demande)
      })
      .catch(function (error) {
        console.log(error.toJSON())
      })
  }
  const changeVisibility = (isVisible) => {
    setVisible(isVisible)
  }
  const changeSuccess = (isVisible) => {
    setSuccess(isVisible)
  }
  const changeError = (isVisible) => {
    setError(isVisible)
  }
  return (
    <>
      {success && <ModalSuccess changeVisibility={changeSuccess} isVisible={success} />}
      {error && <ModalError changeVisibility={changeError} isVisible={error} />}
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
                  onClick={() => handleUpdate(item.id)}
                >
                  {visible && <UpdateDemande date={item.date} />}
                  <CIcon icon={cilEyedropper} />
                </CButton>
                <CButton color="danger" shape="rounded-pill" onClick={() => deleteDemande(item.id)}>
                  <CIcon icon={cilTrash} />
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
          {visible && <UpdateDemande changeVisibility={changeVisibility} id={demande.id} date={demande.date} status={demande.status} isVisible={visible} />}
        </CTableBody>
      </CTable>
    </>
  )
}

export default AllDemandesTraitees
