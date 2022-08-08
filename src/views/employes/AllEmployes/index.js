import React, { useEffect, useState } from 'react'
import { cilEyedropper, cilSearch, cilTrash, cilUserPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CFormInput, CInputGroup, CInputGroupText, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
// Containers
import axios from 'axios'
import Pagination from 'src/views/Pagination'
import AddNewEmploye from '../AddNewEmploye'
import Cookies from 'js-cookie'
// Containers

const AllEmployes = (props) => {
  const UpdateEmploye = React.lazy(() => import('../updateEmploye'))
  const ModalError = React.lazy(() => import('src/views/modals/modalError'))
  const ModalSuccess = React.lazy(() => import('src/views/modals/modalSuccess'))
  const ModalConfirmation = React.lazy(() => import('src/views/modals/modalConfirmation'))

  const [employes, setEmployes] = useState([])
  const [employe, setEmploye] = useState([])
  const [visible, setVisible] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [clickDelete, setClickDelete] = useState(false)
  const [clickAdd, setClickAdd] = useState(false)
  const [id, setId] = useState(false)
  const [user, setUser] = useState({})
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
    getAllEmployes()
  })
  const getAllEmployes = () => {
    axios
      .get('/employes')
      .then((res) => {
        const employes = res.data
        setEmployes(employes)
      })
      .catch(function (error) {
        console.log(error.toJSON())
      })
  }

  const deleteEmploye = (id) => {
    roles === 'ADMIN'
      ? axios
          .delete(`/employes/${id}`)
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
          .get(`/employes/${id}`)
          .then((res) => {
            const employe = res.data
            setEmploye(employe)
            setVisible(!visible)
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
  const onClickAdd = () => {
    setClickAdd(true)
  }
  const changeClickAdd = (error, success) => {
    setClickAdd(false)
    setError(error)
    setSuccess(success)
  }
  const changeConfirmation = (confirmation) => {
    if (confirmation) deleteEmploye(id)
    setClickDelete(false)
  }
  //Get current page
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = employes.slice(indexOfFirstItem, indexOfLastItem)
  //change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  return (
    <>
      {success && <ModalSuccess changeVisibility={changeSuccess} isVisible={success} />}
      {error && <ModalError changeVisibility={changeError} isVisible={error} />}
      {clickDelete && <ModalConfirmation changeVisibility={changeConfirmation} />}
      {clickAdd && <AddNewEmploye changeVisibility={changeClickAdd} />}
      {isDisplayed ? (
        <>
          <CCol md={6}>
            <CInputGroup className="has-validation">
              <CInputGroupText
                style={{
                  backgroundColor: '#3C4B64',
                  color: '#fff',
                }}
              >
                <CIcon icon={cilSearch} />
              </CInputGroupText>
              <CFormInput type="text" placeholder="Search by status" onChange={(e) => setSearchTerm(e.target.value)} />
              <CInputGroupText
                style={{
                  backgroundColor: '#3C4B64',
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
                <CTableHeaderCell>Employe</CTableHeaderCell>
                <CTableHeaderCell className="text-center">email</CTableHeaderCell>
                <CTableHeaderCell>phone number</CTableHeaderCell>
                <CTableHeaderCell>Activity</CTableHeaderCell>
                {roles === 'ADMIN' && <CTableHeaderCell>Action</CTableHeaderCell>}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentItems
                .filter((employe) => employe.username.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((item, index) => (
                  <CTableRow v-for="item in tableItems" key={index}>
                    <CTableDataCell className="text-center">
                      <span>#{item.id}</span>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.username}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.email}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.telephone}</div>
                    </CTableDataCell>
                    <CTableDataCell>
                      <div>{item.active ? 'online' : 'offline '}</div>
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
              {visible && <UpdateEmploye changeVisibility={changeVisibility} id={employe.id} username={employe.username} email={employe.email} telephone={employe.telephone} isVisible={visible} />}
            </CTableBody>
          </CTable>
          <Pagination itemsPerPage={itemsPerPage} totalItems={employes.length} paginate={paginate} />
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
export default AllEmployes
