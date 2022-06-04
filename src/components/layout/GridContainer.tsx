import React from 'react'

interface Props {
    gridCols: string,
    children: React.ReactNode
}

function GridContainer({ gridCols, children }: Props) {
  return (
    <div className={`${gridCols} grid-container gap-y-3 mt-10 grid w-full mx-auto`}>
        {children}
    </div>
  )
}

export default GridContainer