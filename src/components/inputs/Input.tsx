import React, { useRef, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

interface Props {
    name: string,
    value: string,
    type?: React.HTMLInputTypeAttribute,
    error?: boolean | null,
    placeholder: string,
    note?: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleBlur?: React.FocusEventHandler<HTMLInputElement>
}

function Input({ name, type, note, value, error, placeholder, handleChange, handleBlur }: Props) {
  const [inputType, setInputType] = useState(type)
  return (
    <>
      <div className='relative max-w-md w-full mx-auto'>
        <input type={inputType} name={name} placeholder={placeholder} value={value} onChange={handleChange} onBlur={handleBlur} className={`w-full justify-self-center py-1.5 px-2 text-sm font-semibold rounded-md border-solid outline-none duration-150 placeholder:text-slate-400 placeholder:font-normal placeholder:select-none hover:border-opacity-60 focus:border-2 focus:-m-[1px] ${error ? 'border-2 -m-[1px] border-red-500 focus:border-red-500' : 'border border-slate-300 focus:border-blue-600'}`} />
        {
          type === 'password' && (
            inputType === 'password' ?
              <FaEye className='absolute text-sm p-1.5 rounded-full box-content right-1.5 top-1 duration-100 hover:bg-slate-200' onClick={() => setInputType('text')}/> :
            inputType === 'text' &&
              <FaEyeSlash className='absolute text-sm p-1.5 rounded-full box-content right-1.5 top-1 duration-100 hover:bg-slate-200' onClick={() => setInputType('password')}/>
          )
        }
        {
          note && <p className='text-xs mt-1.5'>* {note}</p>
        }
      </div>
    </>
  )
}

Input.defaultProps = {
  type: 'text',
  handleBlur: null,
  readOnly: false,
  handleChange: null,
  error: false
}

export default Input