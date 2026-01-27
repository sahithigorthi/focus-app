'use client';
import {useState, useContext, ReactNode} from 'react';
import { BackgroundContext } from '@/app/components/context';

export default function Background(){
    const [backgroundBar, setBackgroundBar] = useState(false);
    const { setBackground } = useContext(BackgroundContext);

    function handleChange(){
        setBackgroundBar(!backgroundBar);
    }

    function handleOcean(){
        setBackground('/oceanview.jpeg')
    }

    function handleMountainScenery(){
        setBackground('/mountainscenery.jpg')
    }

    function handleJapanTrain(){
        setBackground('/japantrain.jpg')
    }

    function handleLibrary(){
        setBackground('/library.jpg')
    }

    function handleCherryBlossom(){
        setBackground('/cherryblossom.jpg')
    }

    function handleDefault(){
        setBackground('white.png');
    }

    function handleUniversity(){
        setBackground('universitybuilding.jpg');
    }

    function handleGazebo(){
        setBackground('gazebo.jpg');
    }

    function handleCountry(){
        setBackground('countryside.jpg');
    }

    function handleCity(){
        setBackground('cityview.jpg');
    }

    function handleFerrisWheel(){
        setBackground('ferriswheel.jpg');
    }

    function handleStudy(){
        setBackground('study.jpg');
    }

    function handlePeach(){
        setBackground('peachred.png')
    }

    return(
        <div>
            <button className="text-blue-300 bg-blue-100 p-2 text-3xl font-semibold rounded-md cursor-pointer " onClick={handleChange}> 🖼️ </button>
            {backgroundBar &&
                <div className="z-0 fixed bottom-29 right-0 bg-black opacity-80 w-1/6 h-1/2 mx-4 rounded-lg text-white font-semibold grid grid-cols-3 overflow-y-auto">
                    {/* first row */}
                    <div className="flex relative m-4 flex-col">
                        <button onClick={handleDefault} className="py-3 px-4 bg-blue-400 rounded-md opacity-100 cursor-pointer place-content-center">
                        ⚪️
                        </button>
                        <p className="text-blue-200 place-content-center flex text-sm"> Default </p>
                    </div>
                    <div className="relative flex m-4 flex-col">
                        <button onClick={handleOcean} className="p-3 bg-blue-400 rounded-md opacity-100 cursor-pointer">
                        🌊
                        </button>
                        <p className="text-blue-200 flex-col text-sm"> Ocean </p>
                    </div>
                    <div className="relative flex m-4 flex-col">
                        <button onClick={handleMountainScenery} className="py-3 px-4 bg-blue-400 rounded-md opacity-100 cursor-pointer">
                        🗻
                        </button>
                        <p className="text-blue-200 place-content-center flex text-sm"> Mountain </p>
                    </div>
                    <div className="relative flex m-4 flex-col">
                        <button onClick={handleJapanTrain} className="py-3 px-4 bg-blue-400 rounded-md opacity-100 cursor-pointer">
                        🚞
                        </button>
                        <p className="text-blue-200 place-content-center flex text-sm"> Train </p>
                    </div>
                    <div className="relative flex m-4 flex-col">
                        <button onClick={handleLibrary} className="py-3 px-4 bg-blue-400 rounded-md opacity-100 cursor-pointer">
                        📚
                        </button>
                        <p className="text-blue-200 place-content-center flex text-sm"> Library </p>
                    </div>
                    <div className="relative flex m-4 flex-col">
                        <button onClick={handleCherryBlossom} className="py-3 px-4 bg-blue-400 rounded-md opacity-100 cursor-pointer">
                        🌸
                        </button>
                        <p className="text-blue-200 place-content-center flex text-sm"> Sakura </p>
                    </div>
                    <div className="relative flex m-4 flex-col">
                        <button onClick={handleUniversity} className="py-3 px-4 bg-blue-400 rounded-md opacity-100 cursor-pointer">
                        🎓
                        </button>
                        <p className="text-blue-200 place-content-center flex text-sm"> University </p>
                    </div>
                    <div className="relative flex m-4 flex-col">
                        <button onClick={handleGazebo} className="py-3 px-4 bg-blue-400 rounded-md opacity-100 cursor-pointer">
                        🪴
                        </button>
                        <p className="text-blue-200 place-content-center flex text-sm"> Gazebo </p>
                    </div>
                    <div className="relative flex m-4 flex-col">
                        <button onClick={handleCountry} className="py-3 px-4 bg-blue-400 rounded-md opacity-100 cursor-pointer">
                        🌾
                        </button>
                        <p className="text-blue-200 place-content-center flex text-sm"> Country </p>
                    </div>
                    <div className="relative flex m-4 flex-col">
                        <button onClick={handleCity} className="py-3 px-4 bg-blue-400 rounded-md opacity-100 cursor-pointer">
                        🌆
                        </button>
                        <p className="text-blue-200 place-content-center flex text-sm"> City </p>
                    </div>
                    <div className="relative flex m-4 flex-col">
                        <button onClick={handleFerrisWheel} className="py-3 px-4 bg-blue-400 rounded-md opacity-100 cursor-pointer">
                        🎡
                        </button>
                        <p className="text-blue-200 place-content-center flex text-sm items-center"> Ferris </p>
                    </div>
                    <div className="relative flex m-4 flex-col">
                        <button onClick={handleStudy} className="py-3 px-4 bg-blue-400 rounded-md opacity-100 cursor-pointer">
                        🖥️
                        </button>
                        <p className="text-blue-200 place-content-center flex text-sm"> Desk </p>
                    </div>
                    <div className="relative flex m-4 flex-col">
                        <button onClick={handlePeach} className="py-3 px-4 bg-blue-400 rounded-md opacity-100 cursor-pointer">
                        🍑
                        </button>
                        <p className="text-blue-200 place-content-center flex text-sm"> Peach </p>
                    </div>

                </div>
            }
        </div>

    );

}

type Props = {
    children: ReactNode
}
    export  function BackgroundContainer({ children }:Props) {
    const { background } = useContext(BackgroundContext);

    return (
        <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${background})`,
        }}
      />

      {/* Black Overlay */}
      <div
        className="absolute inset-0 z-10 bg-black"
        style={{
          opacity: 0.6, // You can use Tailwind: bg-opacity-60, but this is more direct
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
    );
    }