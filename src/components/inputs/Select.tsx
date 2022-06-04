import React from 'react'
import { Product } from '../hooks/useForm'

interface Props {
    name: string,
    value: string,
    options: Product[],
    handleChange: React.ChangeEventHandler<HTMLSelectElement>
}

function Select({ name, value, options, handleChange }: Props) {
  return (
    <select name={name} value={value} onChange={handleChange} className='w-full rounded-md outline-none border border-slate-300 text-sm font-semibold py-1.5 px-2 duration-150 hover:border-opacity-60 focus:border-2 focus:-m-[1px] focus:border-blue-600'>
        {
            options.map(option => <option key={option} value={option}>{option}</option>)
        }
    </select>
  )
}

export default Select