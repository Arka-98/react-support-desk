import React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

function Spinner() {
  return (
    <div className="flex items-center justify-center h-[70vh]">
        <AiOutlineLoading className='text-black text-5xl animate-spin'/>
    </div>
  )
}

export default Spinner