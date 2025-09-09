'use client';
import {useRouter} from 'next/navigation';
import {useContext} from 'react';
import {UsernameContext, SignedInContext} from '@/app/components/context';
import { supabase } from '../../../lib/supabaseClient';

export function AccountButton(){
    const router = useRouter();
    const {signedIn, setSignedIn} = useContext(SignedInContext)
    const {username, setUsername} = useContext(UsernameContext);

    const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setSignedIn(false);
      setUsername('');
      window.location.reload(); // redirect to home page
    } else {
      console.error('Logout error:', error.message);
    }
  };

    return(
        <div className="flex flex-col absolute top-0 right-0 w-fit h-1/24 mx-4 my-4 ">
            <button className="bg-blue-100 p-1 rounded-md font-semibold flex flex-col items-center w-fit whitespace-nowrap text-blue-300 cursor-pointer" 
            onClick={()=>{router.push('/accountPage')}}> {signedIn? username : 'Sign In'} </button>
            {signedIn &&
                <div className="absolute top-5 right-0  my-4 flex-col bg-blue-100 p-1 rounded-md font-semibold flex items center w-fit whitespace-nowrap text-blue-300 cursor-pointer">
                    <button onClick={handleLogout}> Log Out</button>
                </div>
            }
        </div>
    )

}

// export default function AccountButton(){
//     const router = useRouter();
//     const [SignedIn] = useState(false);

//     return(
//         <div className="flex absolute top-0 right-0 w-1/24 h-1/24 mx-4 my-4">
//             <button className="bg-blue-100 p-2 rounded-md font-semibold flex items-center text-blue-300 cursor-pointer"
//             onClick={()=>{router.push('/accountPage')}}> {SignedIn? 'Sign Out' : 'Sign In'} </button>
//             {SignedIn &&
//                 <div>
//                 </div>
//             }
//         </div>
//     )

// }