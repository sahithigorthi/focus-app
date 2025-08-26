'use client';
import { useRouter } from 'next/navigation';
import {useState, useContext} from 'react';
import Timer from '@/app/components/timer';
import Image from 'next/image'
import QuoteDisplay from '@/app/components/quoteDisplay'
import {ChangeTimer} from '@/app/components/timer'
import Sidebar from '@/app/components/sidebar'
import Background from '@/app/components/background'
import { BackgroundContext, PuppyContext} from '@/app/components/context'
import Music from '@/app/components/music'
import Shop from '@/app/components/shop'

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function FocusPage(){
    const {image} = useContext(PuppyContext);
    const { background} = useContext(BackgroundContext);
    const router = useRouter();
    const [originalTimer, setOriginalTimer] = useState(1800);
    const [timer, setTimer] = useState(1800);
    return(
      <div className="h-screen flex w-screen items-center justify-center" style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
            <Timer seconds={timer} setSeconds={setTimer}  originalTimer={originalTimer}/>
            <div className="w-1/8 h-1/8 z-20 items-center justify-center flex absolute bottom-20 group">
            <Image src={`/${image}.png`} height={600} width={600} alt=''/>
                <div className="absolute bottom-full hidden group-hover:block bg-blue-300 text-white font-semibold text-xs rounded px-2 py-1 whitespace-nowrap left-45">
                  You Got This!
                </div>
            </div>
            <div className="flex absolute top-0 right-0 w-1/4">
                <QuoteDisplay/>
            </div>
            <div>
                <ChangeTimer changeTimer={setTimer} changeOriginalTimer={setOriginalTimer} />
            </div>
            <div className="flex absolute bottom-0 left-0">
            <Sidebar/>
            </div>

            <div className="absolute bottom-0 right-0 m-4 grid grid-cols-2 bg-blue-100 py-1 px-1.5 text-blue-300 font-semibold rounded-md">
              <div className="flex mx-3 hover:text-blue-600 cursor-pointer" onClick={()=>router.push('/')}>
                Home
              </div>
              <div className="flex mx-3 hover:text-blue-600 cursor-pointer" onClick={()=>router.push('/focusPage')}>
                Focus
              </div>
            </div>
            <div className="flex absolute bottom-10 right-0 m-4">
              <Background/>
            </div>
            <div className="absolute flex bottom-23 right-24.75 m-4">
              <Music/>
            </div>
            <div className="absolute flex bottom-23 right-38 m-4">
              <Shop/>
            </div>
        </div>
    );
}
