import React from 'react'

interface Props {
  type: "button" | "submit" | "reset",
  isDisabled?: boolean,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  invert?: boolean,
  customClass?: string,
  fitWidth?: boolean,
  children: React.ReactNode
}

function Button2({ type, isDisabled, invert, customClass, fitWidth, onClick, children }: Props) {
  return (
    <button type={type} disabled={isDisabled} onClick={onClick} className={`${fitWidth ? 'w-fit' : 'w-full'} py-1.5 px-3 flex justify-center items-center gap-2 border rounded-sm text-center text-sm outline-none font-semibold duration-150 shadow-md active:opacity-70 ${customClass} ${invert ? 'invert border-white hover:shadow-slate-400' : 'border-black hover:shadow-slate-700'} ${isDisabled ? 'bg-white text-black opacity-60 cursor-not-allowed' : 'bg-black text-white'}`}>
        {children}
    </button>
  )
}

Button2.defaultProps = {
    type: 'button',
    isDisabled: false,
    onClick: null,
    customClass: '',
    fitWidth: false,
    invert: false
}

export default Button2