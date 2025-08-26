'use client';
import {useState, useContext} from 'react';
import CurrentTime from '@/app/components/currentTime'
import Sidebar from '@/app/components/sidebar'
import Background from '@/app/components/background'
import { useRouter } from 'next/navigation';
import { BackgroundContext, PuppyContext } from '@/app/components/context';
import {AccountButton} from '@/app/components/accountButton'
import Music from '@/app/components/music'
import Shop from '@/app/components/shop'
import Streak from '@/app/components/streak'
import {Money} from '@/app/components/streak'
import Image from 'next/image'

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Home(){
  const { background} = useContext(BackgroundContext);
  const [isOpen, setIsOpen] = useState(false);
  const {image} = useContext(PuppyContext);
  const router = useRouter();

  function handleTutorial(){
    setIsOpen(!isOpen);
  }

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
              <Image src={`/${image}.png`} height={600} width={600} alt=''/>
                <div className="absolute bottom-full hidden group-hover:block bg-blue-300 text-white font-semibold text-xs rounded px-2 py-1 whitespace-nowrap left-45">
                  Lets Get Started!
                </div>
            </div>
          {/* sidebar */}
          <div className="flex absolute bottom-0 left-0 z-20">
            <Sidebar/>
          </div>
          {/* bottom navigation */}
          <div className=" absolute bottom-0 right-0 m-4 grid grid-cols-2 bg-blue-100 py-1 px-1.5 text-blue-300 font-semibold rounded-md">
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

          <div className="bg-blue-100 text-blue-300 font-semibold m-4 px-4 py-2 rounded-3xl absolute top-0 left-0 whitespace-nowrap ">
            <button onClick={handleTutorial}> Tutorial </button>
            {isOpen &&
            <div className="z-0 fixed top-0 left-0 flex bg-black opacity-80 my-17 w-1/6 h-1/2 mx-4 rounded-lg text-white font-semibold">
              <div className="m-2 overflow-y-auto whitespace-normal font-light ">
                <p className="font-semibold"> Welcome to Focus Pet!  </p> <br/>
                Here you can find various tools and resources to create your best digital study space! <br/> <br/>
                In the tutorial, learn how to use a variety of our features!
                <br/>
                <br/>
                <p className="font-semibold"> Tabs  </p>
                <p> Focus Pet has two tabs, found on the bottom right corner. Switch between your home page and your focus page by navigating between the bottom bar. The home page will have your money and streak display, while the focus page has all the tools needed for a productive study session.</p>
                <br/>
                <p className="font-semibold"> Streak  </p>
                <p> Streak measures how many consecutive days you have studied on the website! Keep studying consistently for higher streaks!</p>

                <br/>
                <p className="font-semibold"> Money  </p>
                <p> Money is earned by studying and can be used to purchase various items in the shop! Currency in Focus Pet is denoted with c! </p>
                <br/>
                <p className="font-semibold"> Task List  </p>
                <p> The task list helps you keep track of what you need to study! Add tasks to your list and check them off as you complete them! You can also add the difficulty or the subject. </p>

                <br/>
                <p className="font-semibold"> Shop  </p>
                <p> The shop allows you to purchase various outfits for your pet! Equip the oufits you have bought by pressing Equip once you have bought the outfit! </p>

                <br/>
                <p className="font-semibold"> Music  </p>
                <p> Music can be played in the background while you study! Choose from a variety of tracks to help you focus and stay motivated!</p>

                <br/>
                <p className="font-semibold"> Background  </p>
                <p> Change the background of your digital study space! Choose from a variety of themes and colors to create a comfortable and inspiring environment for your studies.</p>

                <br/>
                <p className="font-semibold"> Change Timer  </p>
                <p> This feature is located in the focus page! Change the duration of the default timer to a study session most comfortable for you. Click on the button to open the menu of timer choices!</p>

                <br/>
                <p className="font-semibold"> Timer  </p>
                <p> This feature is located in the focus page! The timer has Start, Reset, and Pause buttons to control your study sessions.</p>

                <br/>
                <p className="font-semibold"> Quotes  </p>
                <p> Quotes are motivational phrases that can inspire you during your study sessions! Regenerate for new quotes to help you stay focused and positive!</p>

              </div>
            </div>
            }
          </div>



          <div className="absolute flex top-0 left-24 --z-10">
            <Streak/>
          </div>
          <div className="absolute flex z-10 top-0 left-34 m-4 flex-col place-items-center font-semibold text-blue-300 ">
            <Money/>
          </div>


    </div>
  );
}