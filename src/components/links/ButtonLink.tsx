import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
    to: string,
    state?: object,
    invert?: boolean,
    children: React.ReactNode
}

function ButtonLink({ to, state, invert, children }: Props) {
  return (
    <Link to={to} state={state} className={`relative w-full sm:w-4/5 lg:w-3/5 mx-auto py-1.5 px-3 flex justify-center items-center gap-2 border rounded-sm text-center text-sm outline-none font-semibold duration-150 bg-black text-white shadow-md active:opacity-70 ${invert ? 'invert border-white hover:shadow-slate-400' : 'border-black hover:shadow-slate-700'}`}>
        {children}
    </Link>
  )
}

ButtonLink.defaultProps = {
    type: 'button',
    isDisabled: false,
    onClick: null,
    invert: false
}

export default ButtonLink