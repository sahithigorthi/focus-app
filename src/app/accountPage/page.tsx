'use client';
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import Link from 'next/link';
import LoginForm from '@/app/components/login';

export default function AccountPage() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-blue-100">
      {/* Login form handles all Supabase logic */}
      <LoginForm />

      {/* Remaining layout/content of the page */}
      <p className="text-sm font-semibold text-blue-500">Don&apos;t have an account?</p>
      <Link href="/newAccountPage" className="underline text-sm">
        Create Account
      </Link>
      <br/>
      <p className="text-sm font-semibold text-blue-500">
        Forgot Password? 
      </p>
      <Link href="/resetPassword"className="underline text-sm">
        Reset Password
      </Link>

    </div>
  );
}
