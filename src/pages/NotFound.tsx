import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='flex flex-col items-center gap-2'>
      <div className='text-4xl font-semibold'>
        Not Found. <p className='text-red-600 font-bold inline'>404</p>
      </div>
      <Link to='/' className='font-medium text-slate-700 border-b-2 duration-200 hover:border-slate-500'>Back to Home</Link>
    </div>
  )
}

export default NotFound