'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Supabase fires "PASSWORD_RECOVERY" when the user comes back from the reset email link
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setReady(true)
        setMessage('Please enter your new password.')
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  async function handleUpdatePassword() {
    if (!password) {
      setMessage('Password cannot be empty.')
      return
    }

    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Password updated successfully! You can now log in.')
      setPassword('');
    }
  }

  if (!ready) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-blue-100">
        <p className="text-blue-500 font-semibold">Checking reset link…</p>
      </div>
    )
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white relative h-fit w-1/4 p-5 rounded-xl shadow-md">
        <p className="flex justify-center text-xl text-blue-500 font-semibold mb-4">
          Set a New Password
        </p>

        <div className="mb-5">
          <p className="opacity-40 text-sm">New Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="bg-gray-100 w-full rounded-md p-2 outline-none"
          />
        </div>

        <button
          onClick={handleUpdatePassword}
          className="flex w-full p-2 rounded-md justify-center bg-blue-100 cursor-pointer hover:bg-blue-200"
        >
          Update Password
        </button>

        {message && (
          <p className="text-sm text-gray-700 mt-3 text-center">{message}</p>
        )}
      </div>
    </div>
  )
}
