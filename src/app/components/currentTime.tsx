'use client';

import { useEffect, useState } from 'react';

export default function CurrentTime() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
    const interval = setInterval(() => {
        setTime(new Date());
    }, 60000);

    return () => clearInterval(interval); 
    }, []);

    return (
    <div>
        {time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        })}
    </div>
    );
}