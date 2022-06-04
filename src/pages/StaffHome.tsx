import React, { useEffect } from 'react'
import { FaPlusSquare, FaTicketAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../app/redux-hooks'
import Spinner from '../components/layout/Spinner'
import ButtonLink from '../components/links/ButtonLink'
import { getTicketCountByStatus, resetExceptTickets } from '../features/ticketSlice'

function StaffHome() {
  const navigate = useNavigate()
  const { user } = useAppSelector(state => state.auth)
  const { count, isLoading, isSuccess, isError, message } = useAppSelector(state => state.ticket)
  const reduxDispatch = useAppDispatch()

  useEffect(() => {
    if(user) {
      if(user.is_admin) {
        navigate('/admin-home')
      } else if(!user.is_staff) {
        navigate('/')
      }
    }
  }, [])

  useEffect(() => {
    if(isError) {
      toast.error(message, { autoClose: 3000 })
      reduxDispatch(resetExceptTickets())
    }
  }, [isError])

  useEffect(() => {
    console.log('called')
    reduxDispatch(getTicketCountByStatus('new'))
  }, [])

  return isLoading ? <Spinner/> : (
    <>
        <header className='flex flex-col gap-4 items-center'>
            <div className='text-3xl font-bold text-center'>Welcome {user?.name}</div>
            <div className='text-xl font-bold text-slate-400 text-center'>Please choose from an option below</div>
        </header>
        <div className='mt-20 flex flex-col gap-5'>
          <ButtonLink to='/staff-view-tickets?resolved=true' invert>
            <FaPlusSquare/>
            <p>View Resolved Tickets</p>
          </ButtonLink>
          <ButtonLink to='/staff-view-tickets?resolved=false'>
            {
              !!count && count > 0 &&
              <div className="absolute flex w-5 h-5 top-0 -right-5 -translate-x-1/2 -translate-y-1/2">
                <div className='absolute animate-ping w-full h-full bg-sky-400 opacity-70 rounded-full'></div>
                <div className="flex items-center justify-center w-full h-full text-sm bg-blue-600 rounded-full">{count}</div>
              </div>
            }
            <FaTicketAlt/>
            <p>View Unresolved Tickets</p>
          </ButtonLink>
        </div>
    </>
  )
}

export default StaffHome