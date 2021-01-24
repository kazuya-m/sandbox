import { useEffect, FC, useState, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { auth, providerTwitter } from '../../firebase/index'
import { useAuthNameContext, useAuthPhotoContext } from '../auth/authProvider'

const Home = (props) => {
  const userName = useAuthNameContext();
  const photoURL = useAuthPhotoContext();
  
  const logOut = () => {
    auth.signOut(providerTwitter)
    .catch ((error) => {
      alert(error.message)
    })
  }

  let handleButton;
  if (userName !== undefined) {
    handleButton = (
      <button onClick={()=>{logOut()}}>Logout</button>
    )
  } else {
    handleButton = (
      <Link href='/login'>
        <button>LogIn</button>
      </Link>
    )
  }

  return (
    <div>
      <h1>You are signed in as <img src={photoURL} alt="prof" />{userName}</h1>
      <div>
        {handleButton}
      </div>
    </div>
  )
}

export default Home