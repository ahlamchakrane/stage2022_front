/* eslint-disable react/prop-types */
import { cilCalendar, cilCloudDownload, cilEyedropper, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CBadge, CButton, CCol, CFormInput, CInputGroup, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from 'src/views/Pagination'
import Cookies from 'js-cookie'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import UpdateDemande from '../updateDemande'
const DemandesTable = ({ demandes, setDemandes }) => {
  //import
  const ModalError = React.lazy(() => import('src/views/modals/modalError'))
  const ModalSuccess = React.lazy(() => import('src/views/modals/modalSuccess'))
  const ModalConfirmation = React.lazy(() => import('src/views/modals/modalConfirmation'))
  const UpdateRendezVous = React.lazy(() => import('src/views/rendezVous/updateRendezVous'))

  const [visible, setVisible] = useState(false)
  const [demande, setDemande] = useState({})
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [clickDelete, setClickDelete] = useState(false)
  const [id, setId] = useState(false) //to delete
  const [isDisplayed, setIsDisplayed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [planifier, setPlanifier] = useState(false)
  const [today, setToday] = useState(new Date())
  const [idPlanifier, setIdPlanifier] = useState(new Date())
  const [roles, setRoles] = useState([])

  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  useEffect(() => {
    setInterval(() => {
      setIsDisplayed(true)
    }, 700)
    setRoles(Cookies.get('ROLE'))
  }, [])
  const deleteDemande = (id) => {
    roles === 'ADMIN'
      ? axios
          .delete(`/demandes/${id}`)
          .then(() => {
            //delete from front
            let index = demandes.findIndex((demande) => {
              return demande.id === id
            })
            demandes.splice(index, 1)
            setDemandes(demandes)
            setSuccess(!success)
          })
          .catch(function (error) {
            setError(!error)
          })
      : setError(!error)
  }
  const handleUpdate = (id) => {
    roles === 'ADMIN'
      ? axios
          .get(`/demandes/${id}`)
          .then((res) => {
            const demande = res.data
            setDemande(demande)
            setVisible(!visible)
          })
          .catch(function (error) {
            setError(!error)
          })
      : setError(!error)
  }
  const onClickPlanifier = (id) => {
    setPlanifier(true)
    setIdPlanifier(id)
  }
  const changePlanifier = (error, success, demande) => {
    setPlanifier(false)
    setError(error)
    setSuccess(success)
    updates(null, demande)
  }
  const onClickDelete = (id, isVisible) => {
    setId(id)
    setClickDelete(!isVisible)
  }
  const changeConfirmation = (confirmation) => {
    if (confirmation) deleteDemande(id)
    setClickDelete(false)
  }
  const getBadgeValue = (item) => {
    if (new Date(item.date).getDay() === today.getDay() && new Date(item.date).getMonth() + 1 === today.getMonth() + 1 && new Date(item.date).getFullYear() === today.getFullYear()) return 'new'
  }
  const onDownload = () => {
    const pdf = new jsPDF('p', 'pt', 'a4')
    const columns = ['Id', 'status', 'date']
    var rows = []

    for (let i = 0; i < demandes.length; i++) {
      var temp = [demandes[i].id, demandes[i].status, demandes[i].date]
      rows.push(temp)
    }
    pdf.text(235, 40, 'Health-Center-Demandes')
    pdf.autoTable(columns, rows, {
      startY: 65,
      theme: 'grid',
      styles: {
        font: 'times',
        halign: 'center',
        cellPadding: 3.5,
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        textColor: [0, 0, 0],
      },
      headStyles: {
        textColor: [0, 0, 0],
        fontStyle: 'normal',
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        fillColor: [166, 204, 247],
      },
      alternateRowStyles: {
        fillColor: [212, 212, 212],
        textColor: [0, 0, 0],
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
      },
      rowStyles: {
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
      },
      tableLineColor: [0, 0, 0],
    })
    pdf.save('appointments')
  }
  const updates = (isVisible, error, success, demande) => {
    setError(error)
    setSuccess(success)
    if (demande) setDemandes(demandes.map((d) => (d.id === demande.id ? demande : d)))
    setVisible(isVisible)
  }
  //Get current page
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  let currentItems = null
  if (searchTerm) currentItems = demandes
  else {
    currentItems = demandes.slice(indexOfFirstItem, indexOfLastItem)
  }
  //change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  return (
    <>
      {success && <ModalSuccess changeVisibility={setSuccess} isVisible={success} />}
      {planifier && <UpdateRendezVous id={idPlanifier} changeVisibility={changePlanifier} isVisible={planifier} />}
      {error && <ModalError changeVisibility={setError} isVisible={error} />}
      {clickDelete && <ModalConfirmation changeVisibility={changeConfirmation} />}
      {visible && <UpdateDemande changeVisibility={updates} date={demande.date} status={demande.status} isVisible={visible} id={demande.id} />}
      {isDisplayed ? (
        <>
          <CRow>
            <CCol md={8}>
              <CInputGroup className="has-validation">
                <CFormInput type="text" placeholder="Search by name" onChange={(e) => setSearchTerm(e.target.value)} />
              </CInputGroup>
            </CCol>
            <CCol md={2} style={{ marginLeft: 170 }}>
              <CButton color="dark" shape="rounded-pill" className="mr-2" onClick={() => onDownload()}>
                <CIcon icon={cilCloudDownload} />
              </CButton>
            </CCol>
          </CRow>
          <br />
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>Appointments</CTableHeaderCell>
                <CTableHeaderCell>Date</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Planification</CTableHeaderCell>
                {roles === 'ADMIN' && <CTableHeaderCell>Action</CTableHeaderCell>}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentItems
                .filter((demande) => demande.status.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((item, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell>
                      <CBadge
                        color="danger"
                        shape="rounded-pill"
                        style={{
                          marginRight: 5,
                        }}
                      >
                        {getBadgeValue(item)}
                      </CBadge>
                      #{item.id}
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.date}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.status}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton color="info" shape="rounded-pill" onClick={() => onClickPlanifier(item.id)}>
                        <CIcon icon={cilCalendar} />
                      </CButton>
                    </CTableDataCell>
                    {roles === 'ADMIN' && (
                      <CTableDataCell>
                        <CButton
                          color="warning"
                          shape="rounded-pill"
                          style={{
                            marginRight: 5,
                          }}
                          onClick={() => handleUpdate(item.id)}
                        >
                          <CIcon icon={cilEyedropper} />
                        </CButton>
                        <CButton color="danger" shape="rounded-pill" onClick={() => onClickDelete(item.id, clickDelete)}>
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </CTableDataCell>
                    )}
                  </CTableRow>
                ))}
            </CTableBody>
          </CTable>
          <Pagination itemsPerPage={itemsPerPage} totalItems={demandes.length} paginate={paginate} />
        </>
      ) : (
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-warning" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
    </>
  )
}

export default DemandesTable
