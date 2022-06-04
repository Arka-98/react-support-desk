import React from 'react'

interface Props {
    customClass?: string,
    children: React.ReactNode
}

function GridHeader({ customClass, children }: Props) {
  return (
    <div className={`p-1 font-bold text-base text-center bg-stone-100 ${customClass}`}>
        {children}
    </div>
  )
}

GridHeader.defaultProps = {
    customClass: ''
}

export default GridHeader