import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import Button2 from '../buttons/Button2'
import Textarea from '../inputs/Textarea'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'

interface Props {
    handleClick: React.MouseEventHandler<SVGElement>,
    handleSubmit: (text: string) => void
}

export function NoteModal({ handleClick, handleSubmit }: Props) {
    const [text, setText] = useState('')
    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        const { name, value } = e.target
        setText(value)
    }
    const handleNoteSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        if(!text.trim()) {
            toast.error('Please enter something', { autoClose: 3000 })
            return
        }
        handleSubmit(text)
    }
    return createPortal(
      <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50'>
        <div className='relative w-full flex flex-col gap-4 p-6 rounded-md animate__animated animate__slideInDown bg-stone-100 text-black'>
            <FaTimes className='absolute top-2 right-2 text-black box-content p-2 duration-150 rounded-full hover:bg-slate-200' onClick={handleClick} />
            <div className='w-fit font-semibold text-xl text-black text-center'>Add Note</div>
            <Textarea name='text' placeholder='Enter your note' value={text} handleChange={handleChange} />
            <Button2 fitWidth onClick={handleNoteSubmit}>Submit</Button2>
        </div>
      </div>,
      document.getElementById('modal')!
    )
}

export default NoteModal