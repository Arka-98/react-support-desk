import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface Props {
    children: React.ReactNode,
    to: string
}

function StyledLink({ children, to }: Props) {
    const location = useLocation()
    const matchRoute = (path: string) => (location.pathname === path) ? true : false
    return (
        <Link to={to} className={`flex gap-2 items-center duration-150 hover:opacity-60 ${matchRoute(to) && 'opacity-60'}`}>
            {children}
        </Link>
    )
}

export default StyledLink