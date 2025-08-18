'use client';
import {useState, createContext, ReactNode, useContext} from 'react';
import { supabase } from '../../../lib/supabaseClient'


type Props = {
    children: ReactNode
}

export const BackgroundContext = createContext({
    background: 'white.png',
    setBackground: (background:string) => {},
})

export function BackgroundProvider({children}:Props) {
    const [background, setBackground] = useState('white.png');

    return (
    <BackgroundContext.Provider value={{background, setBackground}}>
        {children}
    </BackgroundContext.Provider>
    )}

export const UsernameContext = createContext({
    username: "",
    setUsername: (username: string) => {},
})

export function UsernameProvider({children}:Props){
    const [username, setUsername] = useState('');

    return (
        <UsernameContext.Provider value={{username, setUsername}}>
            {children}
        </UsernameContext.Provider>
    )
}

export const SignedInContext = createContext({
    signedIn: false,
    setSignedIn: (signedIn: boolean) => {},
})

export function SignedInProvider({children}: Props){
    const [signedIn, setSignedIn] = useState(false);

    return (
        <SignedInContext.Provider value={{signedIn, setSignedIn}}>
            {children}
        </SignedInContext.Provider>
    )
}

export const MoneyContext = createContext({
    money: 0,
    setMoney: (money:number)=> {}
})

export function MoneyContextProvider({children}: Props){
    const [money, setMoney] = useState(0);

    return (
        <MoneyContext.Provider value={{money, setMoney}}>
            {children}
        </MoneyContext.Provider>
    )
}

export const PuppyContext = createContext({
    image: 'defaultpuppy.png',
    setImage:(image:string)=>{}
})

export function PuppyContextProvider({children}: Props){
    const [image, setImage] = useState('defaultpuppy')

    return (
        <PuppyContext.Provider value={{image, setImage}}>
            {children}
        </PuppyContext.Provider>
    )
}