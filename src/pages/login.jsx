import React, { useEffect, useState, FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { auth } from '../../firebase/index'
import { providerTwitter } from '../../firebase/index'
import { route } from 'next/dist/next-server/server/router'


const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedInUser, setLoggedInUser] = useState(null);

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if(!user) {
  //       const currentUser = auth.currentUser
        
  //     }
  //   })
  // }, [])

  const twitterLogIn = async (e) => {
    e.preventDefault()
    auth
    .signInWithRedirect(providerTwitter)
    .then((result) => {
      console.log(`logged in`);
      router.push('/');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`error! code:${errorCode},---msg:${errorMessage}`)
      console.log(`error`)
      router.push('/')
      })
  }

  return (
    <div className="wrapper">
      {/* <form className="auth" onSubmit={logIn}>
        <div>
          <label htmlFor="email" className="auth-label">
            Email:{' '}
          </label>
          <input
            id="email"
            className="auth-input"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="password" className="auth-label">
            Password:{' '}
          </label>
          <input
            id="password"
            className="auth-input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="auth-btn" type="submit">
          Login
        </button>
      </form> */}
      <button onClick={twitterLogIn}>Twitter In</button>
      <Link href="/signup">
        <a className="auth-link">signup</a>
      </Link>
    </div>
  )
}

export default Login