import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../../firebase/index'

export const AuthNameContext = createContext(undefined)
export const AuthPhotoContext = createContext(undefined)
export const useAuthNameContext = () => useContext(AuthNameContext);
export const useAuthPhotoContext = () => useContext(AuthPhotoContext);

export const AuthProvider = ({ children }) => {
  const [currentUserName, setCurrentUserName] = useState("... oops! not signed in")
  const [currentUserPhotoUrl, setCurrentUserPhotoUrl] = useState(undefined)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserName(user.displayName)
        setCurrentUserPhotoUrl(user.photoURL)
        console.log(user.emailVerified)
      }
    })
  }, [])
  
  return (
    <AuthNameContext.Provider value={ currentUserName }>
      <AuthPhotoContext.Provider value= { currentUserPhotoUrl }>
        {children}
      </AuthPhotoContext.Provider>
    </AuthNameContext.Provider>
  )
}
