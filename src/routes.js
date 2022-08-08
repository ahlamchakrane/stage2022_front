import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//Deamndes
const AllDemandes = React.lazy(() => import('./views/demandes/AllDemandesTraitees'))
const AllDemandesNonTraitees = React.lazy(() => import('./views/demandes/AllDemandesNonTraitees'))
const AllDemandesTraitees = React.lazy(() => import('./views/demandes/AllDemandesTraitees'))
const AllDemandesPatient = React.lazy(() => import('./views/demandes/AllDemandesPatient'))
//Patients
const AllPatients = React.lazy(() => import('./views/patients/AllPatients'))
const AddNewPatient = React.lazy(() => import('./views/patients/AddNewPatient'))
//Employes
const AllEmployes = React.lazy(() => import('./views/employes/AllEmployes'))
const AddNewEmploye = React.lazy(() => import('./views/employes/AddNewEmploye'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/patients', name: 'Patients', element: AllPatients, exact: true },
  { path: '/patients/all-patients', name: 'All Patients', element: AllPatients },
  { path: '/patients/add-new-patient', name: 'Add new patient', element: AddNewPatient },
  { path: '/employes', name: 'Employes', element: AllEmployes, exact: true },
  { path: '/employes/all-employes', name: 'All Employes', element: AllEmployes },
  { path: '/employes/add-new-employe', name: 'Add new employe', element: AddNewEmploye },
  { path: '/demandes', name: 'Demands', element: AllDemandes, exact: true },
  { path: '/demandes/all-demandes-traitees', name: 'All Demands traitees', element: AllDemandesTraitees },
  { path: '/demandes/all-demandes-non-traitees', name: 'All Demands non traitees', element: AllDemandesNonTraitees },
  { path: '/demandes/all-demandes-patient/:patientId', name: 'All Demands Patient', element: AllDemandesPatient },
]

export default routes
