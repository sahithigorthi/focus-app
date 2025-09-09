'use client';
import { useState, useContext } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { UsernameContext, SignedInContext } from './context';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default function SignupForm() {
  const { setUsername } = useContext(UsernameContext);
  const { setSignedIn } = useContext(SignedInContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!email || !password) return alert('Please enter both email and password');

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) return alert('Error creating account: ' + error.message);
    if (data.user) {
      setSignedIn(true);
      setUsername(email);
      alert('Check your email for a confirmation link!');
    }
  };

  return (
    <div className="bg-white relative h-fit w-1/4 p-3 rounded-xl my-5">
      <p className="flex justify-center text-xl text-blue-500 font-semibold">Create Account</p>
      <div>
        <p className="opacity-40 text-sm">Email</p>
        <input
          type="email"
          placeholder="example@email.com"
          className="bg-gray-100 w-full rounded-md p-2 outline-none"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col my-5">
        <p className="opacity-40 text-sm">Password</p>
        <input
          type="password"
          className="bg-gray-100 w-full rounded-md p-2 outline-none"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button
        className="flex w-full p-2 rounded-md justify-center bg-blue-100 cursor-pointer"
        onClick={handleSignup}
      >
        Sign Up
      </button>
    </div>
  );
}
