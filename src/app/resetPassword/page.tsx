'use client'
import { useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  async function sendPasswordReset() {
    if (!email) {
      setMessage('Please enter your email')
      return
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://main.dski32q1h5uoo.amplifyapp.com/updatePassword',
    })

    if (error) {
      console.error('Error sending reset email:', error.message)
      setMessage(error.message)
    } else {
      console.log('Reset email sent!')
      setMessage('Check your email for the reset link.')
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white relative h-fit w-1/4 p-5 rounded-xl">
        <p className="flex justify-center text-xl text-blue-500 font-semibold mb-4">
          Reset Password
        </p>

        <div className="mb-5">
          <p className="opacity-40 text-sm">Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="bg-gray-100 w-full rounded-md p-2 outline-none"
          />
        </div>

        <button
          className="flex w-full p-2 rounded-md justify-center bg-blue-100 cursor-pointer hover:bg-blue-200"
          onClick={sendPasswordReset}
        >
          Send Reset Link
        </button>

        {message && (
          <p className="text-sm text-gray-700 mt-3 text-center">{message}</p>
        )}
      </div>
    </div>
  )
}
