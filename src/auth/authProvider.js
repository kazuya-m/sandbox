import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../../firebase/index'

export const AuthNameContext = createContext(undefined)
export const AuthPhotoContext = createContext(undefined)
export const AuthTokenContext = createContext(undefined)
export const AuthSecretContext = createContext(undefined)
export const useAuthNameContext = () => useContext(AuthNameContext);
export const useAuthPhotoContext = () => useContext(AuthPhotoContext);
export const useAuthTokenContext = () => useContext(AuthTokenContext);
export const useAuthSecretContext = () => useContext(AuthSecretContext);

export const AuthProvider = ({ children }) => {
  const [currentUserName, setCurrentUserName] = useState("... oops! not signed in")
  const [currentUserPhotoUrl, setCurrentUserPhotoUrl] = useState(undefined)
  const [currentToken, setCurrentToken] = useState(undefined)
  const [currentSecret, setCurrentSecret] = useState(undefined)
  const router = useRouter()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUserName(user.displayName)
        setCurrentUserPhotoUrl(user.photoURL)
      }
    })
  }, [])

  useEffect(() => {
    auth.getRedirectResult().then((result) => {
        if(result.credential) {
          const credential = result.credential;
          const token = credential.accessToken;
          const secret = credential.secret;
          console.log(token)
          console.log(secret)
          setCurrentToken(token);
          setCurrentSecret(secret);
        } else {
          alert('nothing to show')
        }
      })
  },[])

  
  return (
    <AuthNameContext.Provider value={ currentUserName }>
      <AuthPhotoContext.Provider value= { currentUserPhotoUrl }>
        <AuthTokenContext.Provider value= { currentToken }>
          <AuthSecretContext.Provider value= { currentSecret }>
            {children}
          </AuthSecretContext.Provider>
        </AuthTokenContext.Provider>
      </AuthPhotoContext.Provider>
    </AuthNameContext.Provider>
  )
}
