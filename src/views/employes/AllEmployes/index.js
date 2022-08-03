import React, { useEffect, useState } from 'react'
import { cilEyedropper, cilPeople, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CAvatar, CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
// Containers
import avatar1 from 'src/assets/images/avatars/1.jpg'
import axios from 'axios'
import UpdateEmploye from '../updateEmploye'
import ModalSuccess from 'src/views/modals/modalSuccess'
import ModalError from 'src/views/modals/modalError'
export const EmployeContext = React.createContext()
// Containers

const AllEmployes = (props) => {
  const [employes, setEmployes] = useState([])
  const [employe, setEmploye] = useState([])
  const [visible, setVisible] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    axios
      .get('employes')
      .then((res) => {
        const employes = res.data
        setEmployes(employes)
      })
      .catch(function (error) {
        console.log(error.toJSON())
      })
    console.log(visible)
  }, [visible])
  const deleteEmploye = (id) => {
    // axios.delete(`http://localhost:3000/employes/${id}`).then((res) => {
    //   const employes = res.data
    //   console.log(employes)
    // })
  }
  const handleUpdate = (id) => {
    axios
      .get(`employes/${id}`)
      .then((res) => {
        const employe = res.data
        setEmploye(employe)
        setVisible(!visible)
      })
      .catch(function (error) {
        console.log(error.toJSON())
      })
  }
  return (
    <>
      {success && <ModalSuccess isSuccess={success} />}
      {error && <ModalError isError={error} />}
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
          {employes.map((item, index) => (
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
                  onClick={() => setVisible(!visible)}
                  onMouseEnter={() => handleUpdate(item.id)}
                >
                  <CIcon icon={cilEyedropper} />
                </CButton>
                <CButton color="danger" shape="rounded-pill" onClick={() => deleteEmploye(item.id)}>
                  <CIcon icon={cilTrash} />
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
          {visible && <UpdateEmploye id={employe.id} username={employe.username} email={employe.email} telephone={employe.telephone} isVisible={visible} />}
        </CTableBody>
      </CTable>
    </>
  )
}

export default AllEmployes
