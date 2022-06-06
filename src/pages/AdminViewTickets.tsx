import React, { useEffect } from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { useLocation, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../app/redux-hooks'
import Card from '../components/layout/Card'
import GridContainer from '../components/layout/GridContainer'
import GridHeader from '../components/layout/GridHeader'
import GridItem from '../components/layout/GridItem'
import Spinner from '../components/layout/Spinner'
import BackLink from '../components/links/BackLink'
import ButtonLink from '../components/links/ButtonLink'
import { getTicketsByStaffId, getTicketsByUserId, getTicketsWithUserAndStaffName, reset, resetExceptTickets } from '../features/ticketSlice'

function AdminViewTickets() {
    const location = useLocation()
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
        reduxDispatch(getTicketsWithUserAndStaffName())
    }, [])

    const countTickets = (status: string[]): number => {
        let count = 0
        tickets?.forEach(ticket => status.includes(ticket.status) && count++ )
        return count
    }

    return isLoading ? <Spinner/> : (
        <>
            <BackLink to='/admin-home'>
                <FaArrowCircleLeft className='text-xl'/>
                <p className="hidden md:inline-block font-semibold">Back</p>
            </BackLink>
            <header className='flex flex-col gap-4 items-center'>
                <div className='text-3xl font-bold flex gap-2 items-center'>
                <p>
                {
                    (countTickets(['new'])! > 0) ? `${countTickets(['new', 'open'])} Unresolved, ${countTickets(['new'])} New ${countTickets(['new']) === 1 ? 'Ticket' : 'Tickets'}` :
                    ((countTickets(['new', 'open']) || 0) > 0) ? `${countTickets(['new', 'open'])} Unresolved ${countTickets(['new', 'open']) === 1 ? 'Ticket' : 'Tickets'}` :
                    `All tickets resolved!`
                }
                </p>
                </div>
            </header>
            <GridContainer gridCols='grid-cols-6'>
                <GridHeader customClass='rounded-l-md'>Date</GridHeader>
                <GridHeader>Product</GridHeader>
                <GridHeader>Status</GridHeader>
                <GridHeader>Created by</GridHeader>
                <GridHeader>Assigned to</GridHeader>
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
                    <GridItem>{ticket.user_name}</GridItem>
                    <GridItem>{ticket.staff_name}</GridItem>
                    <GridItem customClass='rounded-r-md'>
                        <ButtonLink to={`/ticket/${ticket.id}`} state={{ prevPath: location.search }} invert>View</ButtonLink>
                    </GridItem>
                    </React.Fragment>
                ))
                }
            </GridContainer>
        </>
    )
}

export default AdminViewTickets