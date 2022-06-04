import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuthStatus from '../hooks/useAuthStatus'
import Spinner from '../layout/Spinner'

function PrivateRoute() {
  const { loggedIn, loading } = useAuthStatus()
  if(loading) return <Spinner/>
  return loggedIn ? <Outlet/> : <Navigate to='/login' />
}

export default PrivateRoute