import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../../firebase/index'

export const AuthNameContext = createContext(undefined)
export const AuthPhotoContext = createContext(undefined)
export const AuthUserContext = createContext(undefined)
export const AuthCredential = createContext(undefined)
export const useAuthNameContext = () => useContext(AuthNameContext);
export const useAuthPhotoContext = () => useContext(AuthPhotoContext);
export const useAuthUserContext = () => useContext(AuthUserContext);
export const useAuthCredentialContext = () => useContext(AuthCredential);

export const AuthProvider = ({ children }) => {
  const [currentUserName, setCurrentUserName] = useState("... oops! not signed in")
  const [currentUserPhotoUrl, setCurrentUserPhotoUrl] = useState(undefined)
  const [currentUserData, setCurrentUserData] = useState()
  const [credential, setCredential] = useState({})
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

  useEffect(() => {
    auth.getRedirectResult().then((result) => {
        if(result.credential) {
          const credential = result.credential;
          setCredential({credential});
          // const token = credential.accessToken;
          // const secret = credential.secret;
          // console.log(token)
          // console.log(secret)
          // setCurrentToken(credential.accessToken);
          // setCurrentSecret(secret);
          // console.log(currentToken)
          // console.log(currentSecret)
        } else {
          alert('nothing to show')
        }
      })
  },[])

  
  return (
    <AuthNameContext.Provider value={ currentUserName }>
      <AuthPhotoContext.Provider value= { currentUserPhotoUrl }>
        <AuthUserContext.Provider value= { currentUserData }>
          <AuthCredential.Provider value= { credential }>
            {children}
          </AuthCredential.Provider>
        </AuthUserContext.Provider>
      </AuthPhotoContext.Provider>
    </AuthNameContext.Provider>
  )
}
