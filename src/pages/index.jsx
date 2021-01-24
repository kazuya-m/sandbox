import { useEffect, FC, useState, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { auth } from '../../firebase/index'
import { useAuthContext } from '../auth/authProvider'

const Home = (props) => {
  const [currentUserImg, setCurrentUserImg] = useState("")
  const router = useRouter()
  const userName = useAuthContext();
  const userPhoto = useAuthContext();

  useEffect(() => {
    var user = auth.currentUser;

    if (user != null) {
      user.providerData.forEach(function (profile) {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
        setCurrentUserImg(profile.photoURL);
      });
    }
  }, [userName])

  const logOut = async () => {
    try {
      await auth.signOut()
      router.push('/')
      
    } catch (error) {
      alert(error.message)
    }
  }

  let handleButton;
  if (currentUserImg !== "") {
    handleButton = (
      <button onClick={logOut}>Logout</button>
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
      <h1>You are signed in as <img src={currentUserImg} alt="prof" />{userName}</h1>
      <div>
        {handleButton}
      </div>
    </div>
  )
}

export default Home