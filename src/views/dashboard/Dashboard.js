import React, { useEffect, useState } from 'react'

import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { CChartPie, CChartPolarArea } from '@coreui/react-chartjs'
import axios from 'axios'

import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {
  const [demandes, setDemandes] = useState()
  const [patients, setPatients] = useState()
  const [employes, setEmployes] = useState()
  const [pending, setPending] = useState()
  const [canceled, setCanceled] = useState()
  const [done, setDone] = useState()
  const [femme, setFemme] = useState()
  const [homme, setHomme] = useState()
  const [isDisplayed, setIsDisplayed] = useState(false)
  const [staff, setStaff] = useState()
  const [postBac, setPostBac] = useState()

  const getGenrePatient = () => {
    let femmes = 0
    let hommes = 0
    axios
      .get(`/patients`)
      .then((res) => {
        for (const dataObj of res.data) {
          if (dataObj.genre === 'FEMME') {
            femmes += 1
          } else if (dataObj.genre === 'HOMME') {
            hommes += 1
          }
        }
        setHomme(femmes)
        setFemme(hommes)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const getEmployes = () => {
    let lengthEmploye = 0
    axios
      .get(`/employes`)
      .then((res) => {
        lengthEmploye = res.data.length
        if (lengthEmploye !== 0) {
          setEmployes(lengthEmploye)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const getTypePatient = () => {
    let staff = 0
    let postBac = 0
    let lengthPatient = 0
    axios
      .get(`/patients`)
      .then((res) => {
        lengthPatient = res.data.length
        if (lengthPatient !== 0) {
          for (const dataObj of res.data) {
            if (dataObj.typePatient === 'STAFF') {
              staff += 1
            } else if (dataObj.typePatient === 'POSTBAC') {
              postBac += 1
            }
          }
          setPatients(lengthPatient)
          setStaff(staff)
          setPostBac(postBac)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const getStatusDemandes = () => {
    let nbrPending = 0
    let nbrDone = 0
    let nbrCanceled = 0
    let lengthDemandes = 0
    axios
      .get(`/demandes`)
      .then((res) => {
        lengthDemandes = res.data.length
        if (lengthDemandes !== 0) {
          for (const dataObj of res.data) {
            if (dataObj.status === 'DONE') {
              nbrDone += 1
            } else if (dataObj.status === 'PENDING') {
              nbrPending += 1
            } else if (dataObj.status === 'CANCELED') {
              nbrCanceled += 1
            }
          }
          setDemandes(lengthDemandes)
          setPending(nbrPending)
          setDone(nbrDone)
          setCanceled(nbrCanceled)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  useEffect(() => {
    setInterval(() => {
      setIsDisplayed(true)
    }, 800)
    getStatusDemandes()
    getGenrePatient()
    getTypePatient()
    getEmployes()
  }, [])
  return (
    <>
      {isDisplayed ? (
        <>
          <WidgetsDropdown demandes={demandes} patients={patients} employes={employes} />
          <CRow>
            <CCol xs={6}>
              <CCard className="mb-4">
                <CCardHeader>In numbers</CCardHeader>
                <CCardBody>
                  <CChartPolarArea
                    data={{
                      labels: ['Appointments', 'Employees', 'Patients'],
                      datasets: [
                        {
                          data: [demandes, employes, patients],
                          backgroundColor: ['#cadefc', '#dfd3c3', '#cca8e9'],
                        },
                      ],
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={6}>
              <CCard className="mb-4">
                <CCardHeader>Types of Patients</CCardHeader>
                <CCardBody>
                  <CChartPolarArea
                    data={{
                      labels: ['DONE', 'CANCELED', 'PENDING'],
                      datasets: [
                        {
                          data: [done, canceled, pending],
                          backgroundColor: ['#efd510', '#4BC0C0', '#cecece'],
                        },
                      ],
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={6}>
              <CCard className="mb-4">
                <CCardHeader>Status of Appointments</CCardHeader>
                <CCardBody>
                  <CChartPie
                    data={{
                      labels: ['POSTBAC', 'STAFF'],
                      datasets: [
                        {
                          data: [postBac, staff],
                          backgroundColor: ['#e1ffcf', '#e3c878'],
                          hoverBackgroundColor: ['#49beb7', '#de703c'],
                        },
                      ],
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={6}>
              <CCard className="mb-4">
                <CCardHeader>Gender</CCardHeader>
                <CCardBody>
                  <CChartPie
                    data={{
                      labels: ['FEMALE', 'MALE'],
                      datasets: [
                        {
                          data: [femme, homme],
                          backgroundColor: ['#efd510', '#acc6aa'],
                          hoverBackgroundColor: ['#ecffa3', '#79d1c3'],
                        },
                      ],
                    }}
                  />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
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

export default Dashboard
