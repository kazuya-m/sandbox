import { FC, useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { providerTwitter } from '../../firebase/index';

import { auth } from '../../firebase/index';
import { AuthContext } from '../auth/authProvider';

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && router.push('/');
    });
  }, []);

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithRedirect(providerTwitter);
      router.push('/login');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="wrapper">
      <form className="auth" onSubmit={createUser}>
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
          SignUp
        </button>
      </form>
      <Link href="/login">
        <a className="auth-link">Login</a>
      </Link>
    </div>
  );
};

export default SignUp;
