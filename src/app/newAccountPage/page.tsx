'use client';
import Link from 'next/link'
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import { supabase } from '../../../lib/supabaseClient'


export default function newAccount(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');
    
        if (!email || !password) {
            setErrorMsg('Please enter both email and password');
            return;
        }
    
        const { data, error } = await supabase.auth.signUp({ email, password });
    
        if (error) {
            setErrorMsg(error.message);
            return;
        }
    
        alert('Signup successful! Please check your email to confirm.');
        router.push('/accountPage');
        };

    
    return(
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-blue-100">
            <div className="bg-white relative h-fit w-1/4 p-3 rounded-xl my-5"> 
                <p className="flex justify-center text-xl text-blue-500 font-semibold"> Create Account </p>
                <form onSubmit={handleSignUp}>
                <div>
                    <p className="opacity-40 text-sm">Email</p>
                        <input 
                            type="email" 
                            placeholder="example@email.com" 
                            className="bg-gray-100 w-full rounded-md p-2 outline-none"
                            onChange={(e)=>setEmail(e.target.value)}
                            />
                    
                </div>

                <div className="flex flex-col my-5">
                    <p className="opacity-40 text-sm">Password</p>
                    
                        <input 
                            type="password" 
                            className="bg-gray-100 w-full rounded-md p-2 outline-none"
                            onChange={(e)=>setPassword(e.target.value)}
                            />
                    
                </div>
                <button className="flex w-full p-2 rounded-md justify-center bg-blue-100" >Create Account</button>  
                </form>
            </div>
            <p className="text-sm font-semibold text-blue-500">Have an account?</p> 
            <Link href="/accountPage" className="underline text-sm">Sign In</Link> 


        </div>
    );
}