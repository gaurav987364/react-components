import { useEffect, useState } from 'react'

export const useProgressInc = (
    duration : number,
    steps : number,
) => {
    const [progress, setProgress] = useState<number>(0);

    const calculateProgress = (duration : number,steps:number) => {
        let progress = 0;
        if(duration <=0 || steps <=0) return;
        const interval = duration / 100;
        const intervalId = setInterval(() => {
            progress += steps;
            setProgress(progress);
            if (progress > 99) {
                clearInterval(intervalId);
                return;
            }
        },interval);
        return intervalId;
    }
    useEffect(()=>{
        const intervalId = calculateProgress(duration, steps);
        return ()=> clearInterval(intervalId);
    },[duration,steps]);

    return progress;
};



// working 
// recieve two arguments from the user, duration and steps;
// calculate the interval based on the duration and steps;
// duration means time in ms and steps means how much value added in progress;
// increment the progress by steps;
// clear the interval when progress is greater than 99;
// return the progress value;
// cleanup the interval when the component is unmounted;
// return the progress value;