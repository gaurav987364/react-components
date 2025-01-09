/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useRef } from "react";
const StopWatch = () => {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [millisecond, setMillisecond] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const startRef = useRef<number>(0);
    const stopTimeRef = useRef<number>(0);
    const intervalRef = useRef<number>(0);

    const handleUpdate = () => {
        const now = Date.now();
        const elapsedTime = stopTimeRef.current + (now - startRef.current);

        setMillisecond(Math.floor((elapsedTime % 1000) / 10));
        setSecond(Math.floor((elapsedTime / 1000) % 60));
        setMinute(Math.floor((elapsedTime / (1000 * 60)) % 60));
        setHour(Math.floor(elapsedTime / (1000 * 60 * 60)));
    };

    const startFun = () => {
        if (!isRunning) {
            setIsRunning(true);
            startRef.current = Date.now();
            intervalRef.current = setInterval(handleUpdate, 10);
        }
    };

    const stopFun = () => {
        if (isRunning) {
            setIsRunning(false);
            clearInterval(intervalRef.current);
            stopTimeRef.current += Date.now() - startRef.current;
        }
    };

    const resetFun = () => {
        setIsRunning(false);
        clearInterval(intervalRef.current);
        startRef.current = 0;
        stopTimeRef.current = 0;

        setMillisecond(0);
        setSecond(0);
        setMinute(0);
        setHour(0);
    };

    return (
        <div className="w-[25rem] h-[12rem] bg-purple-200 rounded-md shadow-lg shadow-pink-400 p-5">
            <p className="text-3xl font-bold italic text-center border border-black bg-gray-300 rounded-md">
                {`${String(hour).padStart(2, "0")} :
                ${String(minute).padStart(2, "0")} :
                ${String(second).padStart(2, "0")} :
                ${String(millisecond).padStart(2, "0")}`}
            </p>
            <div className="flex items-center justify-around mt-10">
                <button
                    onClick={stopFun}
                    className="px-4 py-2 bg-red-400 rounded-md text-xl font-semibold cursor-pointer"
                >
                    Stop.
                </button>
                <button
                    onClick={startFun}
                    className="px-4 py-2 bg-blue-400 rounded-md text-xl font-semibold cursor-pointer"
                >
                    Start.
                </button>
                <button
                    onClick={resetFun}
                    className="px-4 py-2 bg-green-400 rounded-md text-xl font-semibold cursor-pointer"
                >
                    Reset.
                </button>
            </div>

            <p className="text-center mt-2 font-semibold text-lg">
                {`Your time🕒 is ${stopTimeRef.current / 1000} ms`}
            </p>
        </div>
    );
};

export default StopWatch;
