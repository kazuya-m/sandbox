import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../../firebase/index'

export const AuthNameContext = createContext(undefined)
export const AuthPhotoContext = createContext(undefined)
export const AuthUserContext = createContext(undefined)
export const useAuthNameContext = () => useContext(AuthNameContext);
export const useAuthPhotoContext = () => useContext(AuthPhotoContext);
export const useAuthUserContext = () => useContext(AuthUserContext);

export const AuthProvider = ({ children }) => {
  const [currentUserName, setCurrentUserName] = useState("... oops! not signed in")
  const [currentUserPhotoUrl, setCurrentUserPhotoUrl] = useState(undefined)
  const [currentUserData, setCurrentUserData] = useState(undefined)
  const router = useRouter()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserName(user.displayName)
        setCurrentUserPhotoUrl(user.photoURL)
        setCurrentUserData(user)
      }
    })
  }, [])
  
  return (
    <AuthNameContext.Provider value={ currentUserName }>
      <AuthPhotoContext.Provider value= { currentUserPhotoUrl }>
        <AuthUserContext.Provider value= { currentUserData }>
          {children}
        </AuthUserContext.Provider>
      </AuthPhotoContext.Provider>
    </AuthNameContext.Provider>
  )
}
