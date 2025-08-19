'use client';
import { useEffect, useState, useRef, useContext, useCallback } from 'react';
import { MoneyContext, UsernameContext } from '@/app/components/context';
import { supabase } from '../../../lib/supabaseClient';

interface Props {
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  originalTimer: number;
}

export default function Timer({ seconds, setSeconds, originalTimer }: Props) {
  const { username } = useContext(UsernameContext);
  const { money, setMoney } = useContext(MoneyContext);

  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [hasIncremented, setHasIncremented] = useState(false);
  const endTimeRef = useRef<number | null>(null); // stores target deadline in ms

  const updateDatabaseMoney = useCallback(
    async (newAmount: number) => {
      const { error } = await supabase
        .from('userdata')
        .update({ money: newAmount })
        .eq('email', username)
        .single();

      if (error) {
        console.error('Error updating money in DB:', error.message);
      } else {
        console.log('Money successfully updated to:', newAmount);
      }
    },
    [username] // only recreate if username changes
  );

  // Interval effect — calculates time left based on actual wall clock
  useEffect(() => {
    if (!isActive) return;

    if (!endTimeRef.current) {
      endTimeRef.current = Date.now() + seconds * 1000;
    }

    const updateRemaining = () => {
      const remaining = Math.max(
        0,
        Math.floor((endTimeRef.current! - Date.now()) / 1000)
      );
      setSeconds(remaining);

      if (remaining === 0) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setIsActive(false);
      }
    };

    updateRemaining();
    intervalRef.current = setInterval(updateRemaining, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, seconds, setSeconds]);

  // Award money when timer hits 0
  useEffect(() => {
    if (seconds === 0 && !hasIncremented) {
      const newAmount = money + 2;
      setMoney(newAmount);
      setHasIncremented(true);
      updateDatabaseMoney(newAmount); // ✅ stable reference now
    }

    if (seconds !== 0) {
      setHasIncremented(false);
    }
  }, [seconds, hasIncremented, money, setMoney, updateDatabaseMoney]);

  // --- Controls ---
  function handleStart() {
    if (seconds > 0) {
      endTimeRef.current = Date.now() + seconds * 1000;
      setIsActive(true);
    }
  }

  function handlePause() {
    setIsActive(false);
    endTimeRef.current = null;
  }

  function handleReset() {
    setIsActive(false);
    setSeconds(originalTimer);
    endTimeRef.current = null;
    setHasIncremented(false);
  }

  // --- UI formatting ---
  const minutes = Math.floor(seconds / 60);
  const newSeconds = seconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
    newSeconds
  ).padStart(2, '0')}`;

  return (
    <div className="absolute place-content-center">
      <div className="col-span-3 relative flex place-content-center text-9xl text-blue-200 bottom-5">
        <b>{formattedTime}</b>
      </div>
      <div className="flex-row flex place-content-center">
        <div
          onClick={handleStart}
          className="cursor-pointer text-3xl mx-14 font-semibold text-blue-300 bg-blue-100 px-2 py-1 rounded-md"
        >
          Start
        </div>
        <div
          onClick={handlePause}
          className="cursor-pointer text-3xl font-semibold text-blue-300 px-2 bg-blue-100 py-1 rounded-md"
        >
          Pause
        </div>
        <div
          onClick={handleReset}
          className="cursor-pointer text-3xl mx-14 font-semibold text-blue-300 px-2 bg-blue-100 py-1 rounded-md"
        >
          Reset
        </div>
      </div>
    </div>
  );
}



interface timerProps{
    changeTimer: React.Dispatch<React.SetStateAction<number>>
    changeOriginalTimer: React.Dispatch<React.SetStateAction<number>>

}

export function ChangeTimer({changeTimer, changeOriginalTimer}:timerProps){
    const [timerMenu, setTimerMenu] = useState(false);

    function timer(){
        setTimerMenu(!timerMenu);
    }

    function handle25(){
        changeTimer(1500);
        changeOriginalTimer(1500);
    }
    function handle30(){
        changeTimer(1800);
        changeOriginalTimer(1800);
    }
    function handle45(){
        changeTimer(2700);
        console.log('45')
        changeOriginalTimer(2700);
    }


    return(
        <div className = "absolute top-0 left-0 h-screen flex">
            <button className="bg-blue-100 m-4 p-3 rounded-md text-blue-300 font-semibold cursor-pointer h-fit" onClick={timer}>
                Change Timer
            </button>

            {timerMenu &&
                <div className="z-0 fixed top-0 left-0 flex bg-black opacity-80 my-17 w-1/4 h-1/4 mx-4 rounded-lg text-white font-semibold">
                    
                    <p className="text-blue-300 text-lg mx-2 my-2">Edit Timer Duration</p>
                    <div className="absolute w-full flex h-full justify-evenly items-center">
                        <button className="cursor-pointer text-blue-900 bg-blue-300 h-fit relative p-3 px-4 rounded-full" onClick={handle25}>
                            25
                        </button>
                        <button className="cursor-pointer text-blue-900 bg-blue-300 h-fit relative p-3 px-4 rounded-full" onClick={handle30}>
                            30
                        </button>
                        <button className="cursor-pointer text-blue-900 bg-blue-300 h-fit relative p-3 px-4 rounded-full" onClick={handle45}>
                            45
                        </button>
                    </div>
                    
                </div>
            }
            
        </div>
    );

}