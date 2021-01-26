import React, { useEffect, useState, FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { auth } from '../../firebase/index'
import { providerTwitter } from '../../firebase/index'

const Login = () => {
  const router = useRouter()
  const [currentToken, setCurrentToken] = useState(null);
  const [currentSecret, setCurrentSecret] = useState(null);
  

  const handleClickLogIn = async (e) => {
    auth.signInWithRedirect(providerTwitter).then(() => {
      auth.getRedirectResult().then((result) => {
        if(result.credential) {
          const token = credential.accessToken;
          const secret = credential.secret;
          setCurrentToken(token);
          setCurrentSecret(secret)
        } else {
          alert('nothing to show')
        }
        // router.back();
      })
    })
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