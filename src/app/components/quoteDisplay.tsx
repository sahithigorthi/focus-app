import {useState} from 'react';

const quotes = [
    '"Failure is simply the opportunity to begin again, this time more intelligently"', 
    '"Strive for progress, not perfection"',
    '"Perseverance is not a long race; it is many short races one after the other"',
    '"If you can dream it, you can do it"'
                ]

type QuoteDisplayProps = {
    quotes:string[];
}

export default function QuoteDisplay(){
    const [currentIndex,setCurrentIndex] = useState(0);

    function chooseRandomQuote(){
        let randomIndex = Math.floor(Math.random()*quotes.length);
        while (randomIndex == currentIndex){
            randomIndex = Math.floor(Math.random()*quotes.length);
        }
        setCurrentIndex(randomIndex)
    }

    return(
        <div className = "flex flex-col">
            <div className="font-semibold italic text-blue-300 text-lg m-4 flex flex-col relative">
                {quotes[currentIndex]}
            </div>
            <div>
                <button onClick={chooseRandomQuote} className="mx-8 absolute right-0 text-blue-300 font-semibold bg-blue-100 rounded-md py-1 px-2 cursor-pointer flex">
                    Regenerate Quote
                </button>
            </div>
        </div>
        

    )

}