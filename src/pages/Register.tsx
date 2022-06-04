import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import Button from '../components/buttons/Button'
import useForm, { FORM_ACTIONS } from '../components/hooks/useForm'
import Input from '../components/inputs/Input'
import { FaCheck, FaUserPlus } from 'react-icons/fa'
import { CgSpinner } from 'react-icons/cg'
import { useAppDispatch, useAppSelector } from '../app/redux-hooks'
import { useSelector } from 'react-redux'
import { register, reset } from '../features/authSlice'
import { useNavigate } from 'react-router-dom'
import Radio from '../components/inputs/Radio'
import Label from '../components/label/Label'

function Register() {
    const navigate = useNavigate()
    const [state, dispatch] = useForm({ input: { name: '', email: '', password: '', confPassword: '', type: 'customer' }, errors: { name: null, email: null, password: null, confPassword: null }, isError: true })
    const { user, isError, isSuccess, isLoading, message } = useAppSelector(state => state.auth)
    const reduxDispatch = useAppDispatch()

    useEffect(() => {
        if(user) {
          if(user.is_admin) {
            navigate('/admin-home')
          } else if(user.is_staff) {
            navigate('/staff-home')
          } else {
            navigate('/')
          }
        }
      }, [])

    useEffect(() => {
        dispatch({ type: FORM_ACTIONS.CHECK_ERROR })
    }, [state.input, state.errors])

    useEffect(() => {
        if(isError) {
            toast.error(message, { autoClose: 3000 })
        }
        if(isSuccess) {
            navigate('/login')
            if(state.input.type === 'staff') {
                toast.info('Access will be provided after admin approval', { autoClose: false })
            } else {
                toast.success(message, { autoClose: 3000 })
            }
        }
        reduxDispatch(reset())
    }, [isError, isSuccess])

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target
        dispatch({ type: FORM_ACTIONS.SET_INPUT, payload: { name, value } })
        dispatch({ type: FORM_ACTIONS.VALIDATE_INPUT, payload: { name, value } })
        if (name === 'password' || name === 'confPassword') {
            dispatch({ type: FORM_ACTIONS.CHECK_PASSWORDS, payload: {name, value} })
        }
    }
    const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target
        dispatch({ type: FORM_ACTIONS.TRIM_INPUT, payload: {name, value} })
        dispatch({ type: FORM_ACTIONS.VALIDATE_INPUT, payload: {name, value} })
    }
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        if(state.input.password !== state.input.confPassword) {
            toast.error('Passwords do not match', { autoClose: 3000 })
            return
        }
        const { confPassword, ...user } = state.input
        user.is_staff = state.input.type === 'staff' ? true : false
        reduxDispatch(register(user))
    }
    return (
        <>
            <header className='flex flex-col gap-4 items-center'>
                <div className='text-3xl font-bold flex gap-2 items-center'>
                    <FaUserPlus/>
                    <p>Register</p>
                </div>
                <div className='text-xl font-bold text-slate-400'>Please create an account</div>
            </header>
            <form onSubmit={handleSubmit} className='mt-10 flex flex-col gap-6'>
                <Input name='name' value={state.input.name!} error={state.errors.name} placeholder='Enter your name' handleChange={handleChange} handleBlur={handleBlur} />
                <Input name='email' value={state.input.email!} error={state.errors.email} placeholder='Enter your email' handleChange={handleChange} handleBlur={handleBlur} />
                <Input name='password' type='password' note='Password should be alphanumeric and at least 8 characters long' error={state.errors.password} value={state.input.password!} placeholder='Enter a password' handleChange={handleChange} handleBlur={handleBlur} />
                <Input name='confPassword' type='password' error={state.errors.confPassword} value={state.input.confPassword!} placeholder='Confirm password' handleChange={handleChange} handleBlur={handleBlur} />
                <div className="max-w-md w-full mx-auto flex gap-3 items-center justify-start">
                    <Radio name='type' id='customer' value='customer' checked={state.input.type === 'customer'} onChange={handleChange} />
                    <Label htmlFor='customer' active={state.input.type === 'customer'}>
                        {
                        state.input.type === 'customer' && <FaCheck className='text-white'/>
                        }
                        As Customer
                    </Label>
                    <Radio name='type' id='staff' value='staff' checked={state.input.type === 'staff'} onChange={handleChange} />
                    <Label htmlFor='staff' active={state.input.type === 'staff'}>
                        {
                        state.input.type === 'staff' && <FaCheck className='text-white'/>
                        }
                        As Staff
                    </Label>
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

export default Register