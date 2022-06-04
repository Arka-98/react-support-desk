import React, { Children } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function PageLayout() {
  return (
    <>
        <Navbar/>
        <div className='relative w-4/5 sm:w-3/4 mx-auto my-10'>
            <Outlet/>
        </div>
    </>
  )
}

export default PageLayout