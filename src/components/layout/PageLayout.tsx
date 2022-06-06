import React, { Children } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { FaQuestionCircle } from 'react-icons/fa'
import Navbar from './Navbar'

function PageLayout() {
  return (
    <>
        <Navbar/>
        <div className='relative w-4/5 sm:w-3/4 mx-auto my-10'>
            <Outlet/>
        </div>
        <Link to='/about' className='fixed right-3 bottom-3 duration-200 hover:opacity-75'>
          <FaQuestionCircle className='text-3xl'/>
        </Link>
    </>
  )
}

export default PageLayout