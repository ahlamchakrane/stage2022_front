import { cilCalendar, cilEyedropper, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import Pagination from 'src/views/Pagination'
// Containers

// eslint-disable-next-line react/prop-types
const AllDemandesPatient = (props) => {
  const UpdateDemande = React.lazy(() => import('../updateDemande'))
  const ModalError = React.lazy(() => import('src/views/modals/modalError'))
  const ModalSuccess = React.lazy(() => import('src/views/modals/modalSuccess'))
  const ModalConfirmation = React.lazy(() => import('src/views/modals/modalConfirmation'))

  const [demandes, setDemandes] = useState([])
  const [visible, setVisible] = useState(false)
  const [demande, setDemande] = useState({})
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [clickDelete, setClickDelete] = useState(false)
  const [id, setId] = useState(false)
  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)

  let { patientId } = useParams()
  useEffect(() => {
    const list = []
    axios
      .get(`/patients/${patientId}/demandes`)
      .then((res) => {
        const demandes = res.data
        setDemandes(demandes)
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
  const onClickDelete = (id, isVisible) => {
    setId(id)
    setClickDelete(!isVisible)
  }
  const changeConfirmation = (confirmation) => {
    if (confirmation) deleteDemande(id)
    setClickDelete(false)
  }
  //Get current page
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = demandes.slice(indexOfFirstItem, indexOfLastItem)
  //change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  return (
    <>
      {success && <ModalSuccess changeVisibility={changeSuccess} isVisible={success} />}
      {error && <ModalError changeVisibility={changeError} isVisible={error} />}
      {clickDelete && <ModalConfirmation changeVisibility={changeConfirmation} />}
      {Object.keys(demandes).length !== 0 ? (
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
            {currentItems.map((item, index) => (
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
                  <CButton color="danger" shape="rounded-pill" onClick={() => onClickDelete(item.id, clickDelete)}>
                    <CIcon icon={cilTrash} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
            {visible && <UpdateDemande changeVisibility={changeVisibility} id={demande.id} date={demande.date} status={demande.status} isVisible={visible} />}
          </CTableBody>
        </CTable>
      ) : (
        ''
      )}
      <Pagination itemsPerPage={itemsPerPage} totalItems={demandes.length} paginate={paginate} />
    </>
  )
}

export default AllDemandesPatient
