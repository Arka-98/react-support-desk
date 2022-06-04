import React, { useEffect } from 'react'
import { FaPlusSquare, FaTicketAlt, FaUserCheck, FaUsers } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/redux-hooks'
import Spinner from '../components/layout/Spinner'
import ButtonLink from '../components/links/ButtonLink'
import { getPendingApprovalCount } from '../features/authSlice'

function AdminHome() {
  const navigate = useNavigate()
  const { user, pendingCount, isLoading } = useAppSelector(state => state.auth)
  const reduxDispatch = useAppDispatch()

  useEffect(() => {
    if(user) {
      if(user.is_staff) {
        navigate('/staff-home')
      } else if(!user.is_admin) {
        navigate('/')
      }
    }
  }, [])

  useEffect(() => {
    reduxDispatch(getPendingApprovalCount())
  }, [])

  return isLoading ? <Spinner/> : (
    <>
        <header className='flex flex-col gap-4 items-center'>
            <div className='text-3xl font-bold text-center'>Admin Dashboard</div>
            <div className='text-xl font-bold text-slate-400 text-center'>Please choose from an option below</div>
        </header>
        <div className='mt-20 flex flex-col gap-5'>
          <ButtonLink to='/view-users?approved=true' invert>
            <FaUsers/>
            <p>View Staff Members</p>
          </ButtonLink>
          <ButtonLink to='/admin-view-tickets'>
            <FaTicketAlt/>
            <p>View All Tickets</p>
          </ButtonLink>
          <ButtonLink to='/view-users?approved=false' invert>
            {
              !!pendingCount && pendingCount > 0 &&
              <div className="absolute flex w-5 h-5 top-0 -right-5 -translate-x-1/2 -translate-y-1/2">
                <div className='absolute animate-ping w-full h-full bg-[#001278] opacity-70 rounded-full'></div>
                <div className="flex items-center justify-center w-full h-full text-sm bg-[#0026ff] rounded-full">{pendingCount}</div>
              </div>
            }
            <FaUserCheck/>
            <p>View Pending Approvals</p>
          </ButtonLink>
        </div>
    </>
  )
}

export default AdminHome