import React from 'react'
import { createPortal } from 'react-dom'
import Button2 from '../buttons/Button2'

interface Props {
  text: string,
  handleClick: React.MouseEventHandler<HTMLButtonElement>,
  handleClose: React.MouseEventHandler<HTMLButtonElement>
}

export function ConfirmationModal({ text, handleClick, handleClose }: Props) {
    return createPortal(
      <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-fit z-50'>
        <div className='flex flex-col gap-4 p-6 items-center rounded-md animate__animated animate__slideInDown bg-stone-100 text-black'>
            <div className='font-semibold text-xl text-black text-center'>Confirmation</div>
            <div className='text-base text-center'>{text}</div>
            <div className="w-full flex gap-6 justify-center">
              <Button2 onClick={handleClick}>Yes</Button2>
              <Button2 invert onClick={handleClose}>No</Button2>
            </div>
        </div>
      </div>,
      document.getElementById('modal')!
    )
}

export default ConfirmationModal