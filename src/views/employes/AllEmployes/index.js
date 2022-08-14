import React, { useEffect, useReducer, useState } from 'react'
import { cilCloudDownload, cilEyedropper, cilTrash, cilUserPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CFormInput, CInputGroup, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
// Containers
import axios from 'axios'
import Pagination from 'src/views/Pagination'
import AddNewEmploye from '../AddNewEmploye'
import Cookies from 'js-cookie'
import jsPDF from 'jspdf'
import UpdateEmploye from '../updateEmploye'
// Containers

const AllEmployes = (props) => {
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
  }, [])
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
            //delete from front
            let index = employes.findIndex((employe) => {
              return employe.id === id
            })
            employes.splice(index, 1)
            setEmployes(employes)
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
  const onClickDelete = (id, isVisible) => {
    setId(id)
    setClickDelete(!isVisible)
  }
  const changeClickAdd = (error, success, employes) => {
    setEmployes(employes)
    setClickAdd(false)
    setError(error)
    setSuccess(success)
  }
  const changeConfirmation = (confirmation) => {
    if (confirmation) deleteEmploye(id)
    setClickDelete(false)
  }
  const updates = (isVisible, error, success, employe) => {
    setError(error)
    setSuccess(success)
    if (employe) setEmployes(employes.map((e) => (e.id === employe.id ? employe : e)))
    setVisible(isVisible)
  }
  const onDownload = () => {
    const pdf = new jsPDF('p', 'pt', 'a4')
    const columns = ['Id', 'username', 'email', 'telephone']
    var rows = []

    for (let i = 0; i < employes.length; i++) {
      var temp = [employes[i].id, employes[i].username, employes[i].email, employes[i].telephone]
      rows.push(temp)
    }
    pdf.text(235, 40, 'Health-Center-Employes')
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
    pdf.save('employees')
  }
  //Get current page
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  let currentItems = null
  if (searchTerm) currentItems = employes
  else {
    currentItems = employes.slice(indexOfFirstItem, indexOfLastItem)
  }
  //change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  return (
    <>
      {success && <ModalSuccess changeVisibility={setSuccess} isVisible={success} />}
      {error && <ModalError changeVisibility={setError} isVisible={error} />}
      {clickDelete && <ModalConfirmation changeVisibility={changeConfirmation} />}
      {clickAdd && <AddNewEmploye changeVisibility={changeClickAdd} employes={employes} setEmployes={setEmployes} />}
      {visible && <UpdateEmploye changeVisibility={updates} id={employe.id} username={employe.username} email={employe.email} telephone={employe.telephone} isVisible={visible} />}

      {isDisplayed ? (
        <>
          <CRow>
            <CCol md={8}>
              <CInputGroup className="has-validation">
                <CFormInput type="text" placeholder="Search by username" onChange={(e) => setSearchTerm(e.target.value)} />
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
                  onClick={() => setClickAdd(true)}
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
                <CTableHeaderCell className="text-center"></CTableHeaderCell>
                <CTableHeaderCell>Employee</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Email</CTableHeaderCell>
                <CTableHeaderCell>Phone number</CTableHeaderCell>
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
