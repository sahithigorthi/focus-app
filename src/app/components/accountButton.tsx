'use client';
import {useRouter} from 'next/navigation';
import {useContext} from 'react';
import {UsernameContext, SignedInContext} from '@/app/components/context';

export function AccountButton(){
    const router = useRouter();
    const {signedIn} = useContext(SignedInContext)
    const {username} = useContext(UsernameContext);

    return(
        <div className="flex absolute top-0 right-0 w-fit h-1/24 mx-4 my-4 ">
            <button className="bg-blue-100 p-2 rounded-md font-semibold flex items-center w-fit whitespace-nowrap text-blue-300 cursor-pointer" 
            onClick={()=>{router.push('/accountPage')}}> {signedIn? username : 'Sign In'} </button>
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