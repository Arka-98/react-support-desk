import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import PageLayout from './components/layout/PageLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import NewTicket from './pages/NewTicket';
import ViewTickets from './pages/ViewTickets';
import PrivateRoute from './components/private-routes/PrivateRoute';
import Ticket from './pages/Ticket';
import { useAppDispatch, useAppSelector } from './app/redux-hooks';
import { logout } from './features/authSlice';
import StaffHome from './pages/StaffHome';
import StaffViewTickets from './pages/StaffViewTickets';
import AdminHome from './pages/AdminHome';
import 'animate.css'
import 'react-toastify/dist/ReactToastify.css';
import ViewUsers from './pages/ViewUsers';
import AdminViewTickets from './pages/AdminViewTickets';

let logoutTimer: NodeJS.Timeout

function App() {
  const reduxDispatch = useAppDispatch()
  const { user, token, expiration } = useAppSelector(state => state.auth)

  useEffect(() => {
    if(token && expiration) {
      logoutTimer = setTimeout(() => {
        reduxDispatch(logout())
        toast.info('Session expired!', { autoClose: 3000 })
      }, expiration - new Date().getTime())
    } else {
      clearTimeout(logoutTimer)
    }
    return () => clearTimeout(logoutTimer)
  }, [token, expiration])

  return (
    <>
      <Router>
        <Routes>
          <Route element={<PageLayout/>}>
            <Route index element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route element={<PrivateRoute/>}>
              <Route path='/admin-view-tickets' element={<AdminViewTickets/>}/>
              <Route path='/staff-view-tickets' element={<StaffViewTickets/>}/>
              <Route path='/staff-home' element={<StaffHome/>}/>
              <Route path='/admin-home' element={<AdminHome/>}/>
              <Route path='/new-ticket' element={<NewTicket/>}/>
              <Route path='/view-tickets' element={<ViewTickets/>}/>
              <Route path='/view-users' element={<ViewUsers/>}/>
              <Route path='/ticket/:ticketId' element={<Ticket/>}/>
            </Route>
            <Route path='*' element={<NotFound/>}/>
          </Route>
        </Routes>
      </Router>
      <ToastContainer/>
    </>
  );
}

export default App;