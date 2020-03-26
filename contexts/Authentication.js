import React, { useState, createContext } from 'react'

export const AuthenticationContext = createContext()

const AuthenticationContextProvider = (props) => {
  const [isUserAuthenticated, setAuthentication] = useState(false)

  return (
    <AuthenticationContext.Provider value={{isUserAuthenticated, setAuthentication}}>
        {props.children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationContextProvider;