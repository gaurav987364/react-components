import { useEffect, useRef, useState } from "react";

export const useProgressDec = (duration: number, shouldRun:boolean) => {
    const [progress, setProgress] = useState<number>(100);
    const interval = duration / 100;
    const startTimerRef = useRef(Date.now());

    useEffect(()=>{
        if(!shouldRun || duration <=0) return;

        const intervalId = setInterval(() => {
            const elapsedTime = Date.now() - startTimerRef.current;
            const remainingTime = Math.max(duration - elapsedTime, 0);
    
            setProgress((remainingTime / duration) * 100);

            if(remainingTime <= 0){
                clearInterval(intervalId);
                setProgress(0);
            }
        }, interval);

        return () => {
            clearInterval(intervalId);
        }
    },[shouldRun, duration,interval]);
    return Math.floor(progress);
};