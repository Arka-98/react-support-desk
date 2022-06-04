import React, { useRef, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

interface Props {
    name: string,
    value: string,
    error?: boolean | null,
    placeholder: string,
    note?: string
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    handleBlur?: React.FocusEventHandler<HTMLTextAreaElement>
}

function Textarea({ name, note, value, error, placeholder, handleChange, handleBlur }: Props) {
  return (
    <>
      <div className='relative'>
        <textarea name={name} placeholder={placeholder} value={value} onChange={handleChange} onBlur={handleBlur} className={`w-full py-1.5 px-2 text-sm font-semibold rounded-md border-solid outline-none duration-150 placeholder:text-slate-400 placeholder:font-normal placeholder:select-none hover:border-opacity-60 focus:border-2 focus:-m-[1px] ${error ? 'border-2 -m-[1px] border-red-500 focus:border-red-500' : 'border border-slate-300 focus:border-blue-600'}`} />
      </div>
      {
        note && <p className='text-xs -mt-4'>* {note}</p>
      }
    </>
  )
}

Textarea.defaultProps = {
  handleBlur: null,
  readOnly: false,
  handleChange: null,
  error: false
}

export default Textarea