import React from 'react'

interface Props {
    customClass?: string,
    children: React.ReactNode
}

function GridItem({ customClass, children }: Props) {
  return (
    <div className={`py-1 px-2 flex items-center justify-center gap-2 text-center bg-stone-100 ${customClass}`}>
        {children}
    </div>
  )
}

GridItem.defaultProps = {
    customClass: ''
}

export default GridItem