import React from 'react'

interface Props {
    type: "button" | "submit" | "reset",
    isDisabled?: boolean,
    bgColor?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    children: React.ReactNode
}

function Button3({ type, isDisabled, bgColor, onClick, children }: Props) {
  return (
    <button type={type} disabled={isDisabled} onClick={onClick} className={`${bgColor} w-full py-1.5 px-3 flex justify-center items-center gap-2 border rounded-sm text-center text-white text-sm outline-none font-medium duration-150 ${isDisabled ? 'opacity-50' : 'hover:opacity-80 active:opacity-100'}`}>
        {children}
    </button>
  )
}

Button3.defaultProps = {
    type: 'button',
    isDisabled: false,
    bgColor: 'bg-green-500',
    onClick: null
}

export default Button3