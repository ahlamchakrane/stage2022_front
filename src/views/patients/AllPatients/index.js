import React, { useEffect, useState } from 'react'
import { cilCloudDownload, cilDescription, cilEyedropper, cilFolderOpen, cilTrash, cilUserPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CFormInput, CInputGroup, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
// Containers
import axios from 'axios'
import Pagination from 'src/views/Pagination'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import autoTable from 'jspdf-autotable'
import jsPDF from 'jspdf'
import AddNewPatient from '../AddNewPatient'
import UpdatePatient from '../updatePatient'

// Containers

const AllPatients = (props) => {
  const ModalError = React.lazy(() => import('src/views/modals/modalError'))
  const ModalSuccess = React.lazy(() => import('src/views/modals/modalSuccess'))
  const ModalConfirmation = React.lazy(() => import('src/views/modals/modalConfirmation'))
  const [patients, setPatients] = useState([])
  const [patient, setPatient] = useState([])
  const [visible, setVisible] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [clickDelete, setClickDelete] = useState(false)
  const [id, setId] = useState(false)
  const [getDemandes, setGetDemandes] = useState(false)
  const [clickAdd, setClickAdd] = useState(false)
  const [roles, setRoles] = useState([])
  const [isDisplayed, setIsDisplayed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  useEffect(() => {
    setInterval(() => {
      setIsDisplayed(true)
    }, 700)
    setRoles(Cookies.get('ROLE'))
    getAllPatients()
  }, [])
  const getAllPatients = () => {
    axios
      .get('/patients')
      .then((res) => {
        const patients = res.data
        setPatients(patients)
      })
      .catch(function () {})
  }
  const deletePatient = (id) => {
    roles === 'ADMIN'
      ? axios
          .delete(`/patients/${id}`)
          .then((res) => {
            //delete from front
            let index = patients.findIndex((patient) => {
              return patient.id === id
            })
            patients.splice(index, 1)
            setPatients(patients)
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
          .get(`/patients/${id}`)
          .then((res) => {
            const patient = res.data
            setPatient(patient) //the order is important so we set the patient then we show the modal
            setVisible(!visible)
          })
          .catch(function (error) {
            setError(!error)
          })
      : setError(!error)
  }
  const onClickDelete = (id, isVisible) => {
    setId(id)
    setClickDelete(!isVisible)
  }
  const getListDemandes = (id) => {
    setId(id)
    setGetDemandes(true)
  }
  const onClickAdd = () => {
    setClickAdd(true)
  }
  const changeClickAdd = (error, success, patients) => {
    setPatients(patients)
    setClickAdd(false)
    setError(error)
    setSuccess(success)
  }
  const changeConfirmation = (confirmation) => {
    if (confirmation) deletePatient(id)
    setClickDelete(false)
  }
  const updates = (isVisible, patient) => {
    if (patient) setPatients(patients.map((p) => (p.id === patient.id ? patient : p)))
    setVisible(isVisible)
  }
  const onDownload = () => {
    const pdf = new jsPDF('p', 'pt', 'a4')
    const columns = ['Id', 'nom', 'email', 'telephone', 'typePatient']
    var rows = []

    for (let i = 0; i < patients.length; i++) {
      var temp = [patients[i].id, patients[i].nom, patients[i].email, patients[i].telephone, patients[i].typePatient]
      rows.push(temp)
    }
    pdf.text(235, 40, 'Health-Center-Patients')
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
    pdf.save('patients')
  }
  //Get current page
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = patients.slice(indexOfFirstItem, indexOfLastItem)
  //change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  return (
    <>
      {success && <ModalSuccess changeVisibility={setSuccess} isVisible={success} />}
      {error && <ModalError changeVisibility={setError} isVisible={error} />}
      {clickDelete && <ModalConfirmation changeVisibility={changeConfirmation} />}
      {getDemandes && <Navigate replace to={`/demandes/all-demandes-patient/${id}`} />}
      {clickAdd && <AddNewPatient changeVisibility={changeClickAdd} />}
      {visible && <UpdatePatient changeVisibility={updates} id={patient.id} nom={patient.nom} email={patient.email} telephone={patient.telephone} typePatient={patient.typePatient} isVisible={visible} />}
      {isDisplayed ? (
        <>
          <CRow>
            <CCol md={8}>
              <CInputGroup className="has-validation">
                <CFormInput type="text" placeholder="Search by name" onChange={(e) => setSearchTerm(e.target.value)} />
              </CInputGroup>
            </CCol>
            <CCol md={2} style={{ marginLeft: 170 }}>
              {roles === 'ADMIN' && (
                <CButton
                  color="dark"
                  shape="rounded-pill"
                  style={{
                    margin: 5,
                  }}
                  onClick={() => onClickAdd()}
                >
                  <CIcon icon={cilUserPlus} />
                </CButton>
              )}
              <CButton color="dark" shape="rounded-pill" className="mr-2" onClick={() => onDownload()}>
                <CIcon icon={cilCloudDownload} />
              </CButton>
            </CCol>
          </CRow>
          <br />
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell></CTableHeaderCell>
                <CTableHeaderCell>Patients</CTableHeaderCell>
                <CTableHeaderCell className="text-center">email</CTableHeaderCell>
                <CTableHeaderCell>Phone number</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentItems
                .filter((patient) => patient.nom.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((item, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell className="text-center">
                      <span>#{item.id}</span>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.nom}</div>
                      <div className="small text-medium-emphasis">
                        <span>{item.typePatient}</span>
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{item.email}</div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div>{item.telephone}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      {roles === 'ADMIN' && (
                        <>
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
                          <CButton
                            color="danger"
                            shape="rounded-pill"
                            style={{
                              marginRight: 5,
                            }}
                            onClick={() => onClickDelete(item.id, clickDelete)}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </>
                      )}
                      <CButton color="success" shape="rounded-pill" onClick={() => getListDemandes(item.id)}>
                        <CIcon icon={cilFolderOpen} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
            </CTableBody>
          </CTable>
          <Pagination itemsPerPage={itemsPerPage} totalItems={patients.length} paginate={paginate} />
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

export default AllPatients
