import React, { useEffect } from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../app/redux-hooks'
import Button from '../components/buttons/Button'
import Card from '../components/layout/Card'
import GridContainer from '../components/layout/GridContainer'
import GridHeader from '../components/layout/GridHeader'
import GridItem from '../components/layout/GridItem'
import Spinner from '../components/layout/Spinner'
import BackLink from '../components/links/BackLink'
import ButtonLink from '../components/links/ButtonLink'
import { getTicketsByUserId, reset, resetExceptTickets } from '../features/ticketSlice'

function ViewTickets() {
  const navigate = useNavigate()
  const { user } = useAppSelector(state => state.auth)
  const { tickets, isError, isLoading, isSuccess, message } = useAppSelector(state => state.ticket)
  const reduxDispatch = useAppDispatch()

  useEffect(() => {
    if(isSuccess) {
        reduxDispatch(resetExceptTickets())
    }
    if(isError) {
        toast.error(message, { autoClose: 3000 })
        reduxDispatch(resetExceptTickets())
    }
}, [isSuccess, isError])

  useEffect(() => {
    if(user?.is_staff) {
      navigate('/')
    }
    reduxDispatch(getTicketsByUserId())
  }, [])

  return isLoading ? <Spinner/> : (
    <>
      <BackLink to='/'>
        <FaArrowCircleLeft className='text-xl'/>
        <p className="hidden md:inline-block font-semibold">Back</p>
      </BackLink>
      <header className='flex flex-col gap-4 items-center'>
        <div className='text-3xl font-bold flex gap-2 items-center'>
          <p>My tickets</p>
        </div>
      </header>
      <GridContainer gridCols='grid-cols-4'>
        <GridHeader customClass='rounded-l-md'>Date</GridHeader>
        <GridHeader>Product</GridHeader>
        <GridHeader>Status</GridHeader>
        <GridHeader customClass='rounded-r-md'>View</GridHeader>
        {
          tickets?.map(ticket => (
            <React.Fragment key={ticket.id}>
              <GridItem customClass='rounded-l-md'>{new Date(ticket.createdat).toLocaleString()}</GridItem>
              <GridItem>{ticket.product}</GridItem>
              <GridItem>
                <Card color={`${ticket.status === 'new' ? 'amber' : ticket.status === 'open' ? 'blue' : 'red'}`}>
                  {ticket.status}
                </Card>
              </GridItem>
              <GridItem customClass='rounded-r-md'>
                <ButtonLink to={`/ticket/${ticket.id}`} invert>View</ButtonLink>
              </GridItem>
            </React.Fragment>
          ))
        }
      </GridContainer>
    </>
  )
}

export default ViewTickets