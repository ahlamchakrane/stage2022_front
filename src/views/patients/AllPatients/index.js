import React, { useEffect, useState } from 'react'
import { cilDescription, cilEyedropper, cilPeople, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
// Containers

import axios from 'axios'
import UpdatePatient from '../updatePatient'
// Containers

const AllPatients = (props) => {
  const [patients, setPatients] = useState([])
  const [patient, setPatient] = useState([])
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    axios.get('/patients').then((res) => {
      const patients = res.data
      setPatients(patients)
    })
  }, [])

  const deletePatient = (id) => {
    axios.delete(`http://localhost:3000/patients/${id}`).then((res) => {
      console.log(res)
    })
  }
  const hundleUpdate = (id) => {
    axios.get(`http://localhost:3000/patients/${id}`).then((res) => {
      const patient = res.data
      setVisible(!visible)
      setPatient(patient)
    })
  }

  return (
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
                onClick={() => hundleUpdate(item.id)}
              >
                <CIcon icon={cilEyedropper} />
              </CButton>
              <CButton color="danger" shape="rounded-pill" onClick={() => deletePatient(item.id)}>
                <CIcon icon={cilTrash} />
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
        {visible && <UpdatePatient id={patient.id} nom={patient.nom} email={patient.email} telephone={patient.telephone} typePatient={patient.typePatient} isVisible={visible} />}
      </CTableBody>
    </CTable>
  )
}

export default AllPatients
