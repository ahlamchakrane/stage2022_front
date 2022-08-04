import React, { useEffect, useState } from 'react'
import { cilDescription, cilEyedropper, cilPeople, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
// Containers
import axios from 'axios'
// Containers

const AllPatients = (props) => {
  const UpdatePatient = React.lazy(() => import('../updatePatient'))
  const ModalError = React.lazy(() => import('src/views/modals/modalError'))
  const ModalSuccess = React.lazy(() => import('src/views/modals/modalSuccess'))

  const [patients, setPatients] = useState([])
  const [patient, setPatient] = useState([])
  const [visible, setVisible] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    axios
      .get('/patients')
      .then((res) => {
        const patients = res.data
        setPatients(patients)
      })
      .catch(function () {})
  }, [])

  const deletePatient = (id) => {
    axios.delete(`/patients/${id}`).then((res) => {
      console.log(res)
    })
  }
  const handleUpdate = (id) => {
    axios
      .get(`/patients/${id}`)
      .then((res) => {
        const patient = res.data
        setVisible(!visible)
        setPatient(patient)
      })
      .catch(function (error) {
        console.log(error.toJSON())
      })
  }
  const changeVisibility = (isVisible) => {
    setVisible(isVisible)
  }
  return (
    <>
      {success && <ModalSuccess />}
      {error && <ModalError />}
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">
              <CIcon icon={cilPeople} />
            </CTableHeaderCell>
            <CTableHeaderCell>Patients</CTableHeaderCell>
            <CTableHeaderCell className="text-center">email</CTableHeaderCell>
            <CTableHeaderCell>Phone number</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {patients.map((item, index) => (
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
                <CButton color="danger" shape="rounded-pill" onClick={() => deletePatient(item.id)}>
                  <CIcon icon={cilTrash} />
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
          {visible && <UpdatePatient changeVisibility={changeVisibility} id={patient.id} nom={patient.nom} email={patient.email} telephone={patient.telephone} typePatient={patient.typePatient} isVisible={visible} />}
        </CTableBody>
      </CTable>
    </>
  )
}

export default AllPatients
