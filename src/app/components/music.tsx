import {useState, useRef} from 'react'

export default function Music(){
    const [musicButton, setMusicButton] = useState(false);

    return(
        <div className="absolute bg-blue-100 p-2 text-3xl rounded-md cursor-pointer">
            <button className="" onClick={()=>{setMusicButton(!musicButton)}}> 
                🎶 
            </button>
            {musicButton &&
                <div className="z-0 fixed bottom-29 right-0 flex bg-black opacity-80 w-1/6 h-1/2 mx-4 rounded-lg text-white font-semibold grid grid-cols-3 grid-rows-5 place-items-center">
                    <CustomAudioPlayer musicSource="lofimusic.mp3" title="Upbeat"/>
                    <CustomAudioPlayer musicSource="lofimusictrack2.mp3" title="Calming"/>
                    <CustomAudioPlayer musicSource="chillLofi.mp3" title="Chill"/>
                </div>
            
            
            }
        </div>
    );
}


interface MusicProps {
    musicSource: string;
    title: string;
    }

export function CustomAudioPlayer({musicSource, title}: MusicProps){    
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    function togglePlay(){
        const audio = audioRef.current;
        if (!audio) return;

        if (!isPlaying){
            audio.play();
            setIsPlaying(true);
        }else{
            audio.pause();
            setIsPlaying(false);
        }


    }

    return(
        <div className="flex items-center space-x-4 flex flex-col">
        <audio ref={audioRef} src={musicSource} />
        <button
            onClick={togglePlay}
            className="bg-cyan-100 text-cyan-700 text-sm py-1 px-3 rounded hover:bg-cyan-300 transition w-fit h-fit place-items-center flex mx-2"
        >
        {isPlaying ? "Pause" : "Play"}
        </button>
        <p className="text-xs items-center my-1"> {title} </p>
    </div>

    );
}