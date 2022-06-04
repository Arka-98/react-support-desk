import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import Button from '../components/buttons/Button'
import useForm, { FORM_ACTIONS } from '../components/hooks/useForm'
import Input from '../components/inputs/Input'
import { FaSignInAlt } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '../app/redux-hooks'
import { login, reset } from '../features/authSlice'
import { CgSpinner } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import Label from '../components/label/Label'
import Radio from '../components/inputs/Radio'

function Login() {
  const navigate = useNavigate()
  const [state, dispatch] = useForm({ input: { email: '', password: '', type: 'customer' }, errors: { email: null, password: null }, isError: true })
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
      if(user?.is_staff) {
        navigate('/staff-home')
      } else if(user?.is_admin) {
        navigate('/admin-home')
      } else {
        navigate('/')
      }
    }
    reduxDispatch(reset())
  }, [isError, isSuccess])

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target
    dispatch({ type: FORM_ACTIONS.SET_INPUT_AND_ERRORS, payload: { name, value } })
  }
  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target
    dispatch({ type: FORM_ACTIONS.TRIM_INPUT, payload: {name, value} })
  }
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const userInput = {
      email: state.input.email,
      password: state.input.password,
      is_staff: state.input.type === 'staff' ? true : false,
      is_admin: state.input.type === 'admin' ? true : false
    }
    reduxDispatch(login(userInput))
  }
  return (
    <>
        <header className='flex flex-col gap-4 items-center'>
            <div className='text-3xl font-bold flex gap-2 items-center'>
              <FaSignInAlt/>
              <p>Login</p>
            </div>
            <div className='text-xl font-bold text-slate-400'>Please login to get support</div>
        </header>
        <form onSubmit={handleSubmit} className='mt-10 flex flex-col gap-6'>
            <Input name='email' value={state.input.email!} error={state.errors.email} placeholder='Enter your email' handleChange={handleChange} handleBlur={handleBlur} />
            <Input name='password' type='password' error={state.errors.password} value={state.input.password!} placeholder='Enter your password' handleChange={handleChange} handleBlur={handleBlur} />
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
              <Radio name='type' id='admin' value='admin' checked={state.input.type === 'admin'} onChange={handleChange} />
              <Label htmlFor='admin' active={state.input.type === 'admin'}>
                {
                  state.input.type === 'admin' && <FaCheck className='text-white'/>
                }
                As Admin
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

export default Login