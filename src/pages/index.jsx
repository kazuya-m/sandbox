import { useEffect, FC, useState, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { auth, providerTwitter } from '../../firebase/index'
import { useAuthNameContext, useAuthPhotoContext } from '../auth/authProvider'

const Home = (props) => {
  const userName = useAuthNameContext();
  const photoURL = useAuthPhotoContext();
  const router = useRouter();

  const logOut = (e) => {
    auth.signOut().then(() => {
      alert(`signed out`)
      router.reload();
    }).catch ((error) => {
      alert(error.message)
    })
  }

  // auth.getRedirectResult().then((result) => {
  //   alert('log in')
  //   console.log(result);
  //   router.back();
  // }).catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   alert(`error! code:${errorCode},---msg:${errorMessage}`)
  //   console.log(`error`)
  // })


  let handleButton;
  if (userName !== "... oops! not signed in") {
    handleButton = (
      <>
        <button onClick={(e)=>{logOut(e)}}>Logout</button>
      </>
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