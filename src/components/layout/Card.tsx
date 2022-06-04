import React from 'react'

enum BGCOLOR {
  amber = 'bg-amber-300',
  blue = 'bg-blue-300',
  red = 'bg-red-300'
}

enum TXTCOLOR {
  amber = 'text-amber-700',
  blue = 'text-blue-700',
  red = 'text-red-700'
}

interface Props {
    color: 'amber' | 'blue' | 'red'
    children: React.ReactNode
}

function Card({ color, children }: Props) {
  return (
    <div className={`w-20 flex font-semibold items-center justify-center rounded-xl px-2 py-0.5 text-sm text-white ${BGCOLOR[color]} ${TXTCOLOR[color]}`}>
        {children}
    </div>
  )
}

Card.defaultProps = {
    bgColor: 'bg-lime-500'
}

export default Card