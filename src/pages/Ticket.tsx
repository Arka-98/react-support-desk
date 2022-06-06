import React, { useEffect, useState } from 'react'
import { FaArrowCircleLeft, FaCheck } from 'react-icons/fa'
import { useLocation, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../app/redux-hooks'
import Button2 from '../components/buttons/Button2'
import Button3 from '../components/buttons/Button3'
import Backdrop from '../components/layout/Backdrop'
import Card from '../components/layout/Card'
import Spinner from '../components/layout/Spinner'
import BackLink from '../components/links/BackLink'
import ConfirmationModal from '../components/modals/ConfirmationModal'
import { createNote, getNotesByTicketId, resetExceptNotes } from '../features/noteSlice'
import { changeTicketStatus, closeTicket, getTicketById, resetExceptTickets } from '../features/ticketSlice'
import { FaPlus } from 'react-icons/fa'
import NoteModal from '../components/modals/NoteModal'

interface CustomLocationState {
    prevPath: string
}

function Ticket() {
    const location = useLocation()
    const { ticketId } = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)
    const { user } = useAppSelector(state => state.auth)
    const { ticket, isError, isLoading, isSuccess, message } = useAppSelector(state => state.ticket)
    const { notes, isError: isNoteError, isSuccess: isNoteSuccess, isLoading: isNoteLoading, message: noteMessage } = useAppSelector(state => state.note)
    const reduxDispatch = useAppDispatch()

    const state = location.state as CustomLocationState

    useEffect(() => {
        if(isError) {
            toast.error(message, { autoClose: 3000 })
        } else if(isNoteError) {
            toast.error(noteMessage, { autoClose: 3000 })
        }
        reduxDispatch(resetExceptTickets())
        reduxDispatch(resetExceptNotes())
    }, [isSuccess, isNoteSuccess, isNoteError, isError])

    useEffect(() => {
        reduxDispatch(getTicketById(parseInt(ticketId!))).then(() => {
            reduxDispatch(getNotesByTicketId(parseInt(ticketId!)))
        })
    }, [])

    const handleClose: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        await reduxDispatch(closeTicket(parseInt(ticketId!)))
        await reduxDispatch(getTicketById(parseInt(ticketId!)))
        setIsModalOpen(false)
        toast.success('Ticket closed', { autoClose: 3000 })
    }

    const handleNoteSubmit = async (text: string) => {
        await reduxDispatch(createNote({ text }))
        await reduxDispatch(getNotesByTicketId(parseInt(ticketId!)))
        if((user?.is_staff || user?.is_admin) && ticket?.status === 'new') {
            reduxDispatch(changeTicketStatus('open'))
        }
        setIsNoteModalOpen(false)
        toast.success('Note added', { autoClose: 3000 })
    }

    return (isLoading || isNoteLoading) ? <Spinner/> : (
        <>
            <BackLink to={user?.is_staff ? '/staff-view-tickets' + state.prevPath : user?.is_admin ? '/admin-view-tickets' : '/view-tickets'}>
                <FaArrowCircleLeft className='text-xl'/>
                <p className="hidden md:inline-block font-semibold">Back</p>
            </BackLink>
            <header className='pt-16 flex flex-col gap-3 items-start'>
                <div className='w-full text-2xl font-bold flex justify-between items-center'>
                    <p>Ticket #{ticketId}</p>
                    <Card color={`${ticket?.status === 'new' ? 'amber' : ticket?.status === 'open' ? 'blue' : 'red'}`}>
                        {ticket?.status}
                    </Card>
                </div>
                <div className='text-xl font-semibold text-slate-500'>Date Submitted: {new Date(ticket?.createdat || '').toLocaleString()}</div>
                <div className='text-xl font-semibold text-slate-500'>Product: {ticket?.product}</div>
                {
                    user?.is_staff ?
                    <div className='text-xl font-semibold text-slate-500'>Created by: {ticket?.user_name}</div> :
                    <div className='text-xl font-semibold text-slate-500'>Assigned to: {ticket?.staff_name}</div>
                }
            </header>
            <hr className='my-8 border-solid border-black w-full' />
            <section className='flex flex-col gap-5 items-start'>
                <div className="w-full flex flex-col gap-3 rounded-md p-4 bg-slate-200">
                    <p className="text-xl font-bold">Description</p>
                    <p className="font-medium">{ticket?.description}</p>
                </div>
                <div className="text-2xl font-bold">Notes</div>
                <Button2 fitWidth onClick={() => setIsNoteModalOpen(true)}>
                    <FaPlus className=''/>
                    <p className='font-semibold'>Add Note</p>
                </Button2>
                <div className="w-full flex flex-col gap-3">
                {
                    notes?.map(note => (
                        <div key={note.id} className={`w-full flex flex-col items-start gap-2 p-4 border-solid border-2 rounded-md ${note.is_staff ? 'bg-slate-600 text-white' : note.is_admin && 'bg-black text-white'}`}>
                            <div className="w-full flex justify-between">
                                {
                                    note.is_staff ?
                                    <div className='flex gap-2 items-center'>
                                        <p className='font-semibold'>{note.user_name.split(' ')[0]}</p>
                                        <p className='text-xs font-normal underline underline-offset-2'>Support Executive</p>
                                    </div> :
                                    note.is_admin ? 
                                    <div className="flex gap-2 items-center">
                                        <p className='font-semibold'>{note.user_name.split(' ')[0]}</p>
                                        <div className="flex py-0.5 px-1.5 text-xs rounded-full w-fit items-center gap-1 bg-white">
                                            <p className="text-black font-semibold">Admin</p>
                                            <FaCheck className='text-black'/>
                                        </div>
                                    </div> :
                                    <p className='font-semibold'>
                                        Note from {note.user_name.split(' ')[0]}
                                    </p>
                                }
                                <p className='text-sm font-medium'>{new Date(note.createdat).toLocaleString()}</p>
                            </div>
                            <div className='text-sm'>{note.text.trim()}</div>
                        </div>
                    ))
                }
                </div>
                <Button3 bgColor='bg-red-500' isDisabled={ticket?.status === 'closed'} onClick={() => setIsModalOpen(true)}>Close ticket</Button3>
            </section>
            {
                isModalOpen &&
                <>
                    <Backdrop handleClick={() => setIsModalOpen(false)}/>
                    <ConfirmationModal text='Are you sure you want to close this ticket?' handleClose={() => setIsModalOpen(false)} handleClick={handleClose} />
                </>
            }
            {
                isNoteModalOpen &&
                <>
                    <Backdrop handleClick={() => setIsNoteModalOpen(false)}/>
                    <NoteModal handleClick={() => setIsNoteModalOpen(false)} handleSubmit={handleNoteSubmit} />
                </>
            }
        </>
    )
}

export default Ticket