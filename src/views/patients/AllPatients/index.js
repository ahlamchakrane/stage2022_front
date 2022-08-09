import React, { useEffect, useState } from 'react'
import { cilDescription, cilEyedropper, cilFolderOpen, cilPeople, cilSearch, cilTrash, cilUserPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CFormInput, CInputGroup, CInputGroupText, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
// Containers
import axios from 'axios'
import Pagination from 'src/views/Pagination'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
// Containers

const AllPatients = (props) => {
  const UpdatePatient = React.lazy(() => import('../updatePatient'))
  const ModalError = React.lazy(() => import('src/views/modals/modalError'))
  const ModalSuccess = React.lazy(() => import('src/views/modals/modalSuccess'))
  const ModalConfirmation = React.lazy(() => import('src/views/modals/modalConfirmation'))
  const AddNewPatient = React.lazy(() => import('../AddNewPatient'))
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
            setVisible(!visible)
            setPatient(patient)
          })
          .catch(function (error) {
            setError(!error)
          })
      : setError(!error)
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
  const getListDemandes = (id) => {
    setId(id)
    setGetDemandes(true)
  }
  const changeConfirmation = (confirmation) => {
    if (confirmation) deletePatient(id)
    setClickDelete(false)
  }
  const onClickAdd = () => {
    setClickAdd(true)
  }
  const changeClickAdd = (error, success) => {
    setClickAdd(false)
    setError(error)
    setSuccess(success)
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
      {success && <ModalSuccess changeVisibility={changeSuccess} isVisible={success} />}
      {error && <ModalError changeVisibility={changeError} isVisible={error} />}
      {clickDelete && <ModalConfirmation changeVisibility={changeConfirmation} />}
      {getDemandes && <Navigate replace to={`/demandes/all-demandes-patient/${id}`} />}
      {clickAdd && <AddNewPatient changeVisibility={changeClickAdd} />}
      {isDisplayed ? (
        <>
          <CCol md={6}>
            <CInputGroup className="has-validation">
              <CInputGroupText
                style={{
                  backgroundColor: '#4f5d73',
                  color: '#fff',
                }}
              >
                <CIcon icon={cilSearch} />
              </CInputGroupText>
              <CFormInput type="text" placeholder="Search by status" onChange={(e) => setSearchTerm(e.target.value)} />
              <CInputGroupText
                style={{
                  backgroundColor: '#4f5d73',
                  color: '#fff',
                }}
              >
                Search
              </CInputGroupText>
            </CInputGroup>
          </CCol>
          <br />
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">
                  {roles === 'ADMIN' && (
                    <CButton
                      color="primary"
                      shape="rounded-pill"
                      style={{
                        margin: 5,
                      }}
                      onClick={() => onClickAdd()}
                    >
                      <CIcon icon={cilUserPlus} />
                    </CButton>
                  )}
                </CTableHeaderCell>
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
                      <CButton
                        color="info"
                        shape="rounded-pill"
                        style={{
                          marginRight: 5,
                        }}
                      >
                        <CIcon icon={cilDescription} />
                      </CButton>
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
              {visible && <UpdatePatient changeVisibility={changeVisibility} id={patient.id} nom={patient.nom} email={patient.email} telephone={patient.telephone} typePatient={patient.typePatient} isVisible={visible} />}
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
