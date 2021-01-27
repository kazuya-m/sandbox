import React, { useEffect, useState, FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { auth } from '../../firebase/index'
import { providerTwitter } from '../../firebase/index'

const Login = () => {
  const router = useRouter()
  const [currentToken, setCurrentToken] = useState(null);
  const [currentSecret, setCurrentSecret] = useState(null);
  

  useEffect(() => {
    auth.getRedirectResult().then((result) => {
        if(result.credential) {
          console.log(result.credential)
          const credential = result.credential;
          const token = credential.accessToken;
          const secret = credential.secret;
          console.log(token)
          console.log(secret)
          setCurrentToken(credential.accessToken);
          setCurrentSecret(secret);
          console.log(currentToken)
          console.log(currentSecret)
        } else {
          alert('nothing to show')
        }
      })
  },[])


  const handleClickLogIn = async (e) => {
    await auth.signInWithRedirect(providerTwitter);
  }

  return (
    <div className="wrapper">
      <button onClick={handleClickLogIn}>Twitter In</button>
      <Link href="/signup">
        <a className="auth-link">signup</a>
      </Link>
      <h2>{currentToken}</h2>
      <h2>{currentSecret}</h2>
    </div>
  )
}

export default Login