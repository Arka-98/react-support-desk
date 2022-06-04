import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../app/redux-hooks'

function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    const { user } = useAppSelector(state => state.auth)

    useEffect(() => {
      if(user) {
          setLoggedIn(true)
      } else {
          setLoggedIn(false)
      }
      setLoading(false)
    }, [user])
    
    return { loggedIn, loading }
}

export default useAuthStatus