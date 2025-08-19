'use client'
import {useState, useContext} from 'react';
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {UsernameContext} from '@/app/components/context'
import { SignedInContext } from '@/app/components/context';
import { supabase } from '../../../lib/supabaseClient'


export default function AccountPage(){
    const router = useRouter();
    const [email, setEmail] = useState('')
    const {setUsername} = useContext(UsernameContext);
    const {setSignedIn} = useContext(SignedInContext)
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            alert('Invalid login credentials.');
        } else if (data.user) {
            setSignedIn(true);
            setUsername(email);
            router.push('/');
        }
    };

    return(
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-blue-100">
            <div className="bg-white relative h-fit w-1/4 p-3 rounded-xl my-5">
                <p className="flex justify-center text-xl text-blue-500 font-semibold"> Log In </p>
                <div>
                    <p className="opacity-40 text-sm">Email</p>
                        <input
                            type="email"
                            placeholder="example@email.com"
                            className="bg-gray-100 w-full rounded-md p-2 outline-none"
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                            />
                </div>
                <div className="flex flex-col my-5">
                    <p className="opacity-40 text-sm">Password</p>
                        <input
                            type="password"
                            className="bg-gray-100 w-full rounded-md p-2 outline-none"
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                            />
                </div>
                <button className="flex w-full p-2 rounded-md justify-center bg-blue-100 cursor-pointer" onClick={handleLogin}>Log In</button>  
            </div>
            <p className="text-sm font-semibold text-blue-500">Don&apos;t have an account?</p>
            <Link href="/newAccountPage" className="underline text-sm">Create Account</Link>

        </div>
    )
}