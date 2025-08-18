'use client';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

export default function AccountButton(){
    const router = useRouter();
    const [SignedIn, setSignedIn] = useState(false);

    return(
        <div className="flex absolute top-0 right-0 w-1/24 h-1/24 mx-4 my-4 w-fit">
            <button className="bg-blue-100 p-2 rounded-md font-semibold flex items-center text-blue-300 cursor-pointer" 
            onClick={()=>{router.push('/accountPage')}}> {SignedIn? 'Sign Out' : 'Sign In'} </button>
            {SignedIn && 
                <div>
                    
                </div>
            }
        </div>
    )

}