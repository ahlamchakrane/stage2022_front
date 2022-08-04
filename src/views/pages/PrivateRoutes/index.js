import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Navigate, Outlet } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const PrivateRoutes = () => {
  const GetCookie = (cookiename) => {
    return Cookies.get(cookiename) ? true : false
  }
  let jwt = { value: GetCookie('jwt') }
  return jwt.value ? <Outlet /> : <Navigate to="/login" />
}
export default PrivateRoutes
