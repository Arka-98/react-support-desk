import React, { useEffect, useRef, useState } from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { useLocation, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../app/redux-hooks'
import GridContainer from '../components/layout/GridContainer'
import GridHeader from '../components/layout/GridHeader'
import GridItem from '../components/layout/GridItem'
import Spinner from '../components/layout/Spinner'
import BackLink from '../components/links/BackLink'
import Button2 from '../components/buttons/Button2'
import { approveUser, deleteUser, getUsers, getUsersPendingApproval, reset } from '../features/authSlice'
import Backdrop from '../components/layout/Backdrop'
import ConfirmationModal from '../components/modals/ConfirmationModal'

function ViewUsers() {
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false)
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)
    const { users, isError, isLoading, isSuccess, message } = useAppSelector(state => state.auth)
    const reduxDispatch = useAppDispatch()

    const approved = searchParams.get('approved') === 'true'
    const currentUserId = useRef<number>()

    useEffect(() => {
        if(isSuccess) {
            reduxDispatch(reset())
        }
        if(isError) {
            toast.error(message, { autoClose: 3000 })
            reduxDispatch(reset())
        }
    }, [isSuccess, isError])

    useEffect(() => {
        if(approved) {
            reduxDispatch(getUsers({ is_staff: true, is_admin: false }))
        } else {
            reduxDispatch(getUsersPendingApproval())
        }
    }, [])

    const handleApproveClick = (userId: number) => {
        setIsApproveModalOpen(true)
        currentUserId.current = userId
    }

    const handleRejectClick = (userId: number) => {
        setIsRejectModalOpen(true)
        currentUserId.current = userId
    }

    const handleApproval = async () => {
        await reduxDispatch(approveUser({ userId: currentUserId.current!, approve: true }))
        await reduxDispatch(getUsersPendingApproval())
        setIsApproveModalOpen(false)
    }

    const handleRejection = async () => {
        await reduxDispatch(deleteUser(currentUserId.current!))
        if(approved) {
            await reduxDispatch(getUsers({ is_staff: true, is_admin: false }))
        } else {
            await reduxDispatch(getUsersPendingApproval())
        }
        setIsRejectModalOpen(false)
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
                    approved ? `${users?.length} staff ${users?.length === 1 ? 'member' : 'members'}` :
                    (users?.length || 0) > 0 ? `${users?.length} pending ${users?.length === 1 ? 'approval' : 'approvals'}` : `No pending approvals`
                }
                </p>
                </div>
            </header>
            <GridContainer gridCols={approved ? 'grid-cols-5' : 'grid-cols-4'}>
                <GridHeader customClass='rounded-l-md'>Date</GridHeader>
                <GridHeader>Name</GridHeader>
                <GridHeader>Email</GridHeader>
                {
                    approved ?
                    <>
                        <GridHeader>Tickets</GridHeader>
                        <GridHeader customClass='rounded-r-md'>Action</GridHeader>
                    </> :
                    <GridHeader customClass='rounded-r-md'>Action</GridHeader>
                }
                {
                    users?.map(user => (
                        <React.Fragment key={user.id}>
                            <GridItem customClass='rounded-l-md'>{new Date(user.createdat).toLocaleString()}</GridItem>
                            <GridItem>{user.name}</GridItem>
                            <GridItem>{user.email}</GridItem>
                            {
                                approved ?
                                <>
                                    <GridItem customClass='font-medium'>{user.ticket_count}</GridItem>
                                    <GridItem customClass='rounded-r-md'>
                                        <Button2 onClick={() => handleRejectClick(user.id)} customClass='text-[#26e2ff]' invert>Remove</Button2>
                                    </GridItem>
                                </> :
                                <GridItem customClass='rounded-r-md'>
                                    <Button2 onClick={() => handleApproveClick(user.id)} customClass='text-[#ff3dfb]' invert>Approve</Button2>
                                    <Button2 onClick={() => handleRejectClick(user.id)} customClass='text-[#26e2ff]' invert>Reject</Button2>
                                </GridItem>
                            }
                        </React.Fragment>
                    ))
                }
            </GridContainer>
            {
                isApproveModalOpen &&
                <>
                    <Backdrop handleClick={() => setIsApproveModalOpen(false)}/>
                    <ConfirmationModal text='Are you sure you want to approve?' handleClose={() => setIsApproveModalOpen(false)} handleClick={handleApproval} />
                </>
            }
            {
                isRejectModalOpen &&
                <>
                    <Backdrop handleClick={() => setIsRejectModalOpen(false)}/>
                    <ConfirmationModal text={`Are you sure you want to ${approved ? 'remove this staff member' : 'reject'}?`} handleClose={() => setIsRejectModalOpen(false)} handleClick={handleRejection} />
                </>
            }
        </>
    )
}

export default ViewUsers