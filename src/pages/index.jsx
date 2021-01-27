import { useEffect, FC, useState, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { auth } from '../../firebase/index'
import { useAuthNameContext, useAuthPhotoContext, useAuthUserContext } from '../auth/authProvider'



// export const getServerSideProps = async () => {
//   return
// }

const Home = (props) => {
  const userName = useAuthNameContext();
  const photoURL = useAuthPhotoContext();
  const userData = useAuthUserContext();
  const router = useRouter();

  const logOut = (e) => {
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
      <div>
        <pre>{}</pre>
      </div>
    </div>
  )
}

export default Home