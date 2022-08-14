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
  { path: '/employees', name: 'Employees', element: AllEmployes, exact: true },
  { path: '/employees/all-employees', name: 'All Employees', element: AllEmployes },
  { path: '/employees/add-new-employee', name: 'Add new employee', element: AddNewEmploye },
  { path: '/appointments', name: 'Appointments', element: AllDemandes, exact: true },
  { path: '/Appointments/done', name: 'Done', element: AllDemandesTraitees },
  { path: '/Appointments/pending', name: 'Pending', element: AllDemandesNonTraitees },
  { path: '/Appointments/patient-appointments/:patientId', name: "Patient's Appointments", element: AllDemandesPatient },
]

export default routes
