import { isDisabled } from '@testing-library/user-event/dist/utils'
import React from 'react'

interface Props {
    type: "button" | "submit" | "reset",
    isDisabled?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    invert?: boolean
    children: React.ReactNode
}

function Button({ type, isDisabled, invert, onClick, children }: Props) {
  return (
    <button type={type} disabled={isDisabled} onClick={onClick} className={`max-w-md w-full mx-auto py-1.5 px-3 flex justify-center items-center gap-2 border rounded-sm text-center text-sm outline-none font-semibold duration-150 hover:bg-white hover:text-black active:opacity-70 ${invert ? 'invert border-white' : 'border-black'} ${isDisabled ? 'bg-white text-black opacity-60 cursor-not-allowed' : 'bg-black text-white'}`}>
        {children}
    </button>
  )
}

Button.defaultProps = {
    type: 'button',
    isDisabled: false,
    invert: false
}

export default Button