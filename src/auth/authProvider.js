import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../../firebase/index'

export const AuthContext = createContext(undefined)
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined)
  const [currentUserPhotoUrl, setCurrentUserPhotoUrl] = useState(undefined)
  const currentUser = {}

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUserName(user.displayName)
      setCurrentUserPhotoUrl(user.photoURL)
      console.log(user.emailVerified)
    })
  }, [])
  
  return (
    <AuthContext.Provider value={ currentUserName }>
      {children}
    </AuthContext.Provider>
  )
}
