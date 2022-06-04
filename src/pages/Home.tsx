import React, { useEffect } from 'react'
import { FaPlusSquare, FaTicketAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/redux-hooks'
import ButtonLink from '../components/links/ButtonLink'

function Home() {
  const navigate = useNavigate()
  const { user } = useAppSelector(state => state.auth)

  useEffect(() => {
    if(user) {
      if(user.is_admin) {
        navigate('/admin-home')
      } else if(user.is_staff) {
        navigate('/staff-home')
      }
    }
  }, [])

  return (
    <>
        <header className='flex flex-col gap-4 items-center'>
            <div className='text-3xl font-bold text-center'>What do you need help with?</div>
            <div className='text-xl font-bold text-slate-400 text-center'>Please choose from an option below</div>
        </header>
        <div className='mt-20 flex flex-col gap-5'>
          <ButtonLink to='/new-ticket' invert>
            <FaPlusSquare/>
            <p>Create New Ticket</p>
          </ButtonLink>
          <ButtonLink to='/view-tickets'>
            <FaTicketAlt/>
            <p>View My Tickets</p>
          </ButtonLink>
        </div>
    </>
  )
}

export default Home