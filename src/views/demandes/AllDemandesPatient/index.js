import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import DemandesTable from '../demandesTable'
const AllDemandesPatient = (props) => {
  const [demandes, setDemandes] = useState([])
  let { patientId } = useParams()
  useEffect(() => {
    getDemandesPatient()
  }, [])
  const getDemandesPatient = () => {
    axios
      .get(`/patients/${patientId}/demandes`)
      .then((res) => {
        const demandes = res.data
        if (demandes) {
          demandes.sort((a, b) => b.id - a.id)
        }
        setDemandes(demandes)
      })
      .catch(function (error) {
        console.log(error.toJSON())
      })
  }
  return <DemandesTable demandes={demandes} setDemandes={setDemandes} />
}
export default AllDemandesPatient
