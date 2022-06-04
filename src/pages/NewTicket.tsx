import React, { useEffect } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAppDispatch, useAppSelector } from '../app/redux-hooks'
import Button from '../components/buttons/Button'
import useForm, { FORM_ACTIONS } from '../components/hooks/useForm'
import ReadOnlyInput from '../components/inputs/ReadOnlyInput'
import Select from '../components/inputs/Select'
import Textarea from '../components/inputs/Textarea'
import BackLink from '../components/links/BackLink'
import { createTicket, reset } from '../features/ticketSlice'

function NewTicket() {
    const navigate = useNavigate()
    const { user } = useAppSelector(state => state.auth)
    const { isLoading, isSuccess, isError, message } = useAppSelector(state => state.ticket)
    const reduxDispatch = useAppDispatch()
    const [state, dispatch] = useForm({ input: { product: 'iPhone', description: '' }, errors: { product: false, description: null }, isError: true })

    useEffect(() => {
        dispatch({ type: FORM_ACTIONS.CHECK_ERROR })
    }, [state.input, state.errors])

    useEffect(() => {
        if(isError) toast.error(message, { autoClose: 3000 })
        if(isSuccess) {
            navigate('/view-tickets')
            toast.success(message, { autoClose: 3000 })
        }
        reduxDispatch(reset())
    }, [isSuccess, isError])

    const handleChange: React.ChangeEventHandler<HTMLSelectElement | HTMLTextAreaElement> = (e) => {
        const { name, value } = e.target
        dispatch({ type: FORM_ACTIONS.SET_INPUT_AND_ERRORS, payload: { name, value } })
    }

    const handleBlur: React.FocusEventHandler<HTMLTextAreaElement> = (e) => {
        const { name, value } = e.target
        dispatch({ type: FORM_ACTIONS.TRIM_INPUT, payload: { name, value } })
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        reduxDispatch(createTicket(state.input))
    }

    return (
        <>
            <BackLink to='/'>
                <FaArrowCircleLeft className='text-xl'/>
                <p className="hidden md:inline-block font-semibold">Back</p>
            </BackLink>
            <header className='flex flex-col gap-4 items-center'>
                <div className='text-3xl font-bold flex gap-2 items-center'>
                    <p>Create new ticket</p>
                </div>
                <div className='text-xl font-bold text-slate-400'>Please fill out the form below</div>
            </header>
            <form onSubmit={handleSubmit} className='mt-10 flex flex-col gap-6'>
                <div className="max-w-md w-full mx-auto space-y-2">
                    <label className='text-sm'>Customer Name</label>
                    <ReadOnlyInput name='name' value={user?.name || ''}/>
                </div>
                <div className="max-w-md w-full mx-auto space-y-2">
                    <label className='text-sm'>Customer Email</label>
                    <ReadOnlyInput name='name' value={user?.email || ''}/>
                </div>
                <div className="max-w-md w-full mx-auto space-y-2">
                    <p className='text-sm'>Product</p>
                    <Select name='product' value={state.input.product!} options={['iPhone', 'iMac', 'Macbook Pro', 'iPad', 'Watch']} handleChange={handleChange} />
                </div>
                <div className="max-w-md w-full mx-auto space-y-2">
                    <p className='text-sm'>Description</p>
                    <Textarea name='description' value={state.input.description!} placeholder='Describe your issue' handleChange={handleChange} handleBlur={handleBlur} />
                </div>
                <Button type='submit' isDisabled={state.isError || isLoading}>
                    {
                        !isLoading ? <p>Submit</p> : <CgSpinner className='text-black text-xl animate-spin' />
                    }
                </Button>
            </form>
        </>
    )
}

export default NewTicket