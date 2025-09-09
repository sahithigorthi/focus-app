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
  redirectTo: 'https://main.dski32q1h5uoo.amplifyapp.com/updatePassword'
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
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-blue-100 space-y-3">
      <p className="text-lg font-semibold text-blue-500">Reset Password</p>
      <p className="text-sm font-semibold text-blue-500">
        Enter your email to receive a password reset link.
      </p>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="example@email.com"
        className="bg-gray-100 w-1/4 rounded-md p-2 outline-none"
      />

      <button
        className="mt-2 p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
        onClick={sendPasswordReset}
      >
        Send Reset Link
      </button>

      {message && <p className="text-sm text-gray-700 mt-2">{message}</p>}
    </div>
  )
}
