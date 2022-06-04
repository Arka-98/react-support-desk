import React, { useRef, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

interface Props {
    name: string,
    value: string,
    type?: React.HTMLInputTypeAttribute,
    error?: boolean | null
}

function ReadOnlyInput({ name, type, value, error }: Props) {
  return (
    <>
        <input type={type} name={name} value={value} readOnly={true} className={`w-full py-1.5 px-2 text-sm font-semibold rounded-md border-solid outline-none duration-150 bg-slate-200 placeholder:text-slate-400 placeholder:font-normal hover:border-opacity-60`} />
    </>
  )
}

ReadOnlyInput.defaultProps = {
  type: 'text',
  error: false
}

export default ReadOnlyInput