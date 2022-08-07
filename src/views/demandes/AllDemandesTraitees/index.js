import { cilCalendar, cilEyedropper, cilSearch, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CFormInput, CInputGroup, CInputGroupText, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from 'src/views/Pagination'

// Containers

const AllDemandesTraitees = (props) => {
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
  const [user, setUser] = useState({})
  const [roles, setRoles] = useState([])
  const [isDisplayed, setIsDisplayed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  useEffect(() => {
    setInterval(() => {
      setIsDisplayed(true)
    }, 500)
    getUser()
    getDemandes()
  }, [])

  const getDemandes = () => {
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
  }
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
  async function getUser() {
    axios
      .get('/api/employe')
      .then((res) => {
        const id = res.data.id
        setUser(res.data)
        getRolesUser(id)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  async function getRolesUser(id) {
    axios
      .get(`/employes/${id}/roles`)
      .then((res) => {
        const roles = res.data
        if (roles) {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].nom === 'ADMIN') {
              setRoles('ADMIN')
              return
            } else if (roles[i].nom === 'USER') {
              setRoles('USER')
              return
            }
          }
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const handleUpdate = (id) => {
    roles === 'ADMIN'
      ? axios
          .get(`/demandes/${id}`)
          .then((res) => {
            const demande = res.data
            setVisible(!visible)
            setDemande(demande)
          })
          .catch(function (error) {
            console.log(error.toJSON())
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
                <CTableHeaderCell>Demande</CTableHeaderCell>
                <CTableHeaderCell>Date</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Planifier</CTableHeaderCell>
                {roles === 'ADMIN' && <CTableHeaderCell>Action</CTableHeaderCell>}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentItems
                .filter((demande) => demande.status.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((item, index) => (
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
                          {visible && <UpdateDemande date={item.date} />}
                          <CIcon icon={cilEyedropper} />
                        </CButton>
                        <CButton color="danger" shape="rounded-pill" onClick={() => onClickDelete(item.id, clickDelete)}>
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </CTableDataCell>
                    )}
                  </CTableRow>
                ))}
              {visible && <UpdateDemande changeVisibility={changeVisibility} id={demande.id} date={demande.date} status={demande.status} isVisible={visible} />}
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

export default AllDemandesTraitees
