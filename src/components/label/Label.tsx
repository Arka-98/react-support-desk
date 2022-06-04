import React from 'react'

interface Props {
    htmlFor: string,
    active: boolean,
    children: React.ReactNode
}

function Label({ htmlFor, active, children }: Props) {
  return (
    <label htmlFor={htmlFor} className={`w-fit cursor-pointer select-none py-1 px-3 flex justify-center items-center gap-2 border border-black rounded-full text-center text-xs outline-none font-semibold duration-150 ${active ? 'bg-black text-white' : 'bg-white text-black'}`}>
        {children}
    </label>
  )
}

Label.defaultProps = {
    type: 'button',
    invert: false
}

export default Label