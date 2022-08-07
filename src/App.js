import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import PrivateRoutes from './views/pages/PrivateRoutes'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login'))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="*" name="home" element={<DefaultLayout />} />
            <Route exact path="/" name="home" element={<DefaultLayout />} />
          </Route>
          <Route exact path="/login" name="Login Page" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
//          <Route path="*" name="home" element={<DefaultLayout />} />

export default App
