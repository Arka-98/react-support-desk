import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa'
import StyledLink from '../links/StyledLink'
import { useAppDispatch, useAppSelector } from '../../app/redux-hooks'
import Button from '../buttons/Button'
import { logout } from '../../features/authSlice'

function Navbar() {
  const navigate = useNavigate()
  const { user: data } = useAppSelector(state => state.auth)
  const reduxDispatch = useAppDispatch()

  const logoutUser = () => {
    reduxDispatch(logout())
    navigate('/login')
  }

  return (
    <div className='sticky bg-white top-0 z-10 w-full py-4 px-3 sm:px-0 container mx-auto flex justify-between items-center border-b'>
        <Link to='/' className='text-xl font-normal'>Support Desk</Link>
        <div className="flex gap-6 w-fit">
          {
            data ? 
              <Button type='button' onClick={logoutUser}>
                <FaSignOutAlt/>
                <p className='text-sm'>Logout</p>
              </Button> :
              <>
                <StyledLink to='/login'>
                    <FaSignInAlt/>
                    <p className='text-base'>Login</p>
                </StyledLink>
                <StyledLink to='/register'>
                    <FaUserPlus/>
                    <p className='text-base'>Register</p>
                </StyledLink>
              </>
          }
        </div>
    </div>
  )
}

export default Navbar