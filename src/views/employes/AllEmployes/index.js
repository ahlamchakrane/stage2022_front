import React, { useEffect, useState } from 'react'
import { cilEyedropper, cilPeople, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAvatar, CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
// Containers
import avatar1 from 'src/assets/images/avatars/1.jpg'
import axios from 'axios'
import Pagination from 'src/views/Pagination'
export const EmployeContext = React.createContext()
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
  const [id, setId] = useState(false)
  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  useEffect(() => {
    axios
      .get('/employes')
      .then((res) => {
        const employes = res.data
        setEmployes(employes)
      })
      .catch(function (error) {
        console.log(error.toJSON())
      })
  }, [])
  const deleteEmploye = (id) => {
    axios
      .delete(`/employes/${id}`)
      .then((res) => {
        setSuccess(!success)
      })
      .catch(function (error) {
        setError(!error)
      })
  }
  const handleUpdate = (id) => {
    axios
      .get(`/employes/${id}`)
      .then((res) => {
        const employe = res.data
        setEmploye(employe)
        setVisible(!visible)
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
      {Object.keys(employes).length !== 0 ? (
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
            {currentItems.map((item, index) => (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center">
                  <CAvatar size="md" src={avatar1} status={item.active ? 'success' : 'danger'} />
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
              </CTableRow>
            ))}
            {visible && <UpdateEmploye changeVisibility={changeVisibility} id={employe.id} username={employe.username} email={employe.email} telephone={employe.telephone} isVisible={visible} />}
          </CTableBody>
        </CTable>
      ) : (
        ''
      )}
      <Pagination itemsPerPage={itemsPerPage} totalItems={employes.length} paginate={paginate} />
    </>
  )
}

export default AllEmployes
