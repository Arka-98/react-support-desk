import React from 'react'

interface Props {
    id: string,
    name: string,
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    checked: boolean
}

function Radio({ name, id, value, onChange, checked }: Props) {
    return (
        <input type="radio" id={id} name={name} value={value} checked={checked} onChange={onChange} className='hidden' />
    )
}

export default Radio