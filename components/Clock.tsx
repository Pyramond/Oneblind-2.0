"use client";

import { ReactNode, useEffect, useState } from "react";

export default function Clock(): ReactNode {

    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTime(new Date());
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    if (!time) return null;

    return (
        <span className={"text-zinc-900 dark:text-white text-xl font-semibold"}> {time.toLocaleTimeString('fr-FR')} </span>
    );

}