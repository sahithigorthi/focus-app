import {useState} from 'react'
import TodoList from '@/app/components/todoList'

export default function SideBar(){
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () =>{
        console.log('opened');
        setIsOpen(!isOpen);
    }

    const handleClose = () => {
        console.log('closed');
        setIsOpen(!isOpen);
    }

    return(
        <div className = "relative w-full">
            <button onClick={handleOpen} className = "place-content-center flex w-full bg-blue-100 m-4 p-1 rounded-md text-blue-300 font-semibold cursor-pointer"> Task List </button>
            {isOpen &&
            <div className = "flex fixed bottom-0 left-0 w-1/3 bg-black opacity-80  h-screen text-white">
                <p className="absolute top-0 left-0 mx-4 my-2 text-2xl "> Task List </p>
                <button className="absolute top-0 right-0 mx-4 my-2 cursor-pointer" onClick={handleClose}> Close </button>
                <div className="absolute left-0 top-10">
                    <TodoList/>
                </div>
            </div>
            }
        </div>
    );
}