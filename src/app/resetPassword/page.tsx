'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function ResetPasswordPage() {
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // This triggers Supabase's default password reset email
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) setError(error.message);
    else setMessage('Check your email for the password reset link.');
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-blue-100">
        <div className="bg-white relative h-fit w-1/4 p-3 rounded-xl my-5">
        <p className="flex justify-center text-xl text-blue-500 font-semibold">Reset Password</p>

      <form onSubmit={handleReset} className="flex flex-col my-3">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <button type="submit" className="flex flex-col w-full p-2 rounded-md justify-center bg-blue-100 cursor-pointer my-5">
          Send Reset Email
        </button>
      </form>
      {message && <p className="text-blue-500 justify-center font-semibold text-sm flex">{message}</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}

{/* <div className="bg-white relative h-fit w-1/4 p-3 rounded-xl my-5">
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
        
      </div>
      
    </div> */}