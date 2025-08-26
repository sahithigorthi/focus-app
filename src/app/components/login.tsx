'use client';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import { UsernameContext, SignedInContext } from './context';

export default function LoginForm() {
  const router = useRouter();
  const { setUsername } = useContext(UsernameContext);
  const { setSignedIn } = useContext(SignedInContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) return alert('Please enter both email and password');

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return alert('Invalid login credentials.');
    if (data.user) {
      setSignedIn(true);
      setUsername(email);
      router.push('/');
    }
  };

  return (
    <div className="bg-white relative h-fit w-1/4 p-3 rounded-xl my-5">
      <p className="flex justify-center text-xl text-blue-500 font-semibold">Log In</p>
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
        onClick={handleLogin}
      >
        Log In
      </button>
    </div>
  );
}

export function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email and password');
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    alert('Signup successful! Please check your email to confirm.');
    router.push('/accountPage');
  };

  return (
    <div className="bg-white relative h-fit w-1/4 p-3 rounded-xl my-5">
      <p className="flex justify-center text-xl text-blue-500 font-semibold">Create Account</p>
      <form onSubmit={handleSignUp}>
        <div>
          <p className="opacity-40 text-sm">Email</p>
          <input
            type="email"
            placeholder="example@email.com"
            className="bg-gray-100 w-full rounded-md p-2 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col my-5">
          <p className="opacity-40 text-sm">Password</p>
          <input
            type="password"
            className="bg-gray-100 w-full rounded-md p-2 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMsg && <p className="text-red-500 text-sm mb-2">{errorMsg}</p>}
        <button className="flex w-full p-2 rounded-md justify-center bg-blue-100 cursor-pointer">
          Create Account
        </button>
      </form>
    </div>
  );
}
