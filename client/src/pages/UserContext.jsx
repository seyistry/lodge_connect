import React, { useState, useEffect } from 'react'
import { createContext } from 'react'
import {users} from "./data.js"

export const userContext = createContext({})

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    useEffect(()=>{
      setUser(users[0])
    },
    [])
  return (

    <userContext.Provider value = {{user,setUser}} >
        {children}
    </userContext.Provider>
  )
}

