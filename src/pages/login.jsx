import React, { useEffect, useState, FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { auth } from '../../firebase/index'
import { providerTwitter } from '../../firebase/index'

const Login = () => {
  const router = useRouter()

  const handleClickLogIn = async (e) => {
    auth.signInWithRedirect(providerTwitter);
    auth.getRedirectResult().then((credential) => {
      console.log(`cre${credential}`)
      router.back();
    })
  }

  return (
    <div className="wrapper">
      <button onClick={handleClickLogIn}>Twitter In</button>
      <Link href="/signup">
        <a className="auth-link">signup</a>
      </Link>
    </div>
  )
}

export default Login