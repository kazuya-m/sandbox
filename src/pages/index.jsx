import { useEffect, FC, useState, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { auth } from '../../firebase/index'
import { useAuthNameContext, useAuthPhotoContext, useAuthUserContext, useAuthCredentialContext } from '../auth/authProvider'



// export const getServerSideProps = async () => {
//   return
// }

const Home = (props) => {
  const userName = useAuthNameContext();
  const photoURL = useAuthPhotoContext();
  const userData = useAuthUserContext();
  const credential = useAuthCredentialContext();
  const router = useRouter();

  const signOut = () => {
    auth.signOut().then(() => {
      alert(`signed out`)
      router.reload();
    }).catch ((error) => {
      alert(error.message)
    })
  }


  let handleButton;
  if (userName !== "... oops! not signed in") {
    handleButton = (
      <>
        <button onClick={()=>{signOut()}}>Logout</button>
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
      <div>
        <p>{credential.accessToken}</p>
        <pre>{userData}</pre>
      </div>
    </div>
  )
}

export default Home