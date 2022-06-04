import React from 'react'
import { createPortal } from 'react-dom'

interface Props {
  handleClick: React.MouseEventHandler<HTMLDivElement>,
  customClass: string
}

function Backdrop({ handleClick, customClass }: Props) {
  return createPortal(
    <div className={`bg-slate-400 fixed animate__animated animate__fadeIn duration-300 backdrop-blur-sm bg-opacity-60 z-40 w-screen h-screen ${customClass}`} onClick={handleClick} />,
    document.getElementById('backdrop')!
  )
}

Backdrop.defaultProps = {
  customClass: ''
}

export default Backdrop