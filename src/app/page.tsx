'use client';
import {useState, useContext} from 'react';
import CurrentTime from '@/app/components/currentTime'
import Sidebar from '@/app/components/sidebar'
import Background from '@/app/components/background'
import { useRouter } from 'next/navigation';
import { BackgroundContext, UsernameContext, PuppyContext } from '@/app/components/context';
import {AccountButton} from '@/app/accountPage/page'
import Music from '@/app/components/music'
import Shop from '@/app/components/shop'
import Streak from '@/app/components/streak'
import {Money} from '@/app/components/streak'

export default function Home(){
  const { background} = useContext(BackgroundContext);
  const {username} = useContext(UsernameContext);
  const {image} = useContext(PuppyContext);
  const router = useRouter();

  return(
    <div
    style={{
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
      className="h-screen w-screen bg-black"
    >
        <div className = "flex flex-col h-full w-full items-center justify-center z-10">
          {/* current time */}
          <div className = "flex text-blue-200 font-bold z-10" style={{fontSize:"200px"}}> 
            <CurrentTime/>
          </div>
          <div className="w-1/8 h-1/8 z-20 items-center justify-center flex absolute bottom-20 group">
              <img src={`${image}.png`}/> 
                <div className="absolute bottom-full hidden group-hover:block bg-blue-300 text-white font-semibold text-xs rounded px-2 py-1 whitespace-nowrap left-45">
                  Let's Get Started!
                </div>
            </div>
          {/* sidebar */}
          <div className="flex absolute bottom-0 left-0 z-20">
            <Sidebar/>
          </div>
          
          {/* bottom navigation */}
          <div className="flex absolute bottom-0 right-0 m-4 grid grid-cols-2 bg-blue-100 py-1 px-1.5 text-blue-300 font-semibold rounded-md">
            <div className="flex mx-3 hover:text-blue-600 cursor-pointer" onClick={()=>router.push('/')}>
              Home
            </div>
            <div className="flex mx-3 hover:text-blue-600 cursor-pointer" onClick={()=>router.push('/focusPage')}>
              Focus
            </div>
          </div>
          </div>

          {/* background settings */}
          <div className="flex absolute bottom-10 right-0 m-4">
            <Background/>
          </div>
          <div>
            <AccountButton/>
          </div>
          <div className="absolute flex bottom-23 right-24.75 m-4">
            <Music/>
          </div>
          <div className="absolute flex m-4 bottom-23 right-38">
            <Shop/>
          </div>
          <div className="absolute flex top-0 left-0 --z-10">
            <Streak/>
          </div>
          <div className="absolute flex z-10 top-0 left-12 m-4 flex-col place-items-center font-semibold text-blue-300 ">
            <Money/>
          </div>

    </div>
  );
} 