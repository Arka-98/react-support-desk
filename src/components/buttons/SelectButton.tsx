import React from 'react'

interface Props {
    type: "button" | "submit" | "reset",
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    name: string,
    value: string,
    active: boolean,
    children: React.ReactNode
}

function SelectButton({ type, name, value, active, onClick, children }: Props) {
  return (
    <button type={type} name={name} value={value} onClick={onClick} className={`w-fit py-1 px-3 flex justify-center items-center gap-2 border border-black rounded-full text-center text-xs outline-none font-semibold duration-150 ${active ? 'bg-black text-white' : 'bg-white text-black'}`}>
        {children}
    </button>
  )
}

SelectButton.defaultProps = {
    type: 'button',
    invert: false
}

export default SelectButton