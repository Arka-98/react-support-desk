import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
    to: string,
    state?: object,
    children: React.ReactNode
}

function BackLink({ to, state, children }: Props) {
  return (
    <Link to={to} state={state} className='absolute top-0 flex gap-2 items-center w-fit p-2 box-content duration-150 hover:bg-slate-200 rounded-full'>
        {children}
    </Link>
  )
}

export default BackLink