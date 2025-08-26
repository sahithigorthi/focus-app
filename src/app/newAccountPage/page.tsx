'use client';
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import Link from 'next/link';
import SignupForm from '@/app/components/login';

export default function NewAccountPage() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-blue-100">
      {/* Signup form handles all Supabase logic */}
      <SignupForm />

      {/* Remaining layout/content of the page */}
      <p className="text-sm font-semibold text-blue-500">Have an account?</p>
      <Link href="/accountPage" className="underline text-sm">
        Sign In
      </Link>
    </div>
  );
}
