import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import DemandesTable from '../demandesTable'

const AllDemandesNonTraitees = () => {
  //import
  const [demandes, setDemandes] = useState([])

  useEffect(() => {
    getDemandes()
  }, [])
  const getDemandes = () => {
    const list = []
    axios
      .get('/demandes')
      .then((res) => {
        const demandes = res.data
        demandes.map((demande) => {
          demande.status !== 'DONE' && list.push(demande)
        })
        if (list) {
          list.sort((a, b) => b.id - a.id)
        }
        setDemandes(list)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return demandes && <DemandesTable demandes={demandes} setDemandes={setDemandes} />
}

export default AllDemandesNonTraitees
