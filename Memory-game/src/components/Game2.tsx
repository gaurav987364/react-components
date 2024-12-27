/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { GameType, generateGameboard } from "../utils/generateGameBoard";

import Tabbaar from "./ui/Tabbaar";
import GamePage from "./ui/GamePage";
import SettingsPage from "./ui/SettingsPage";
import Footer2 from "./ui/Footer2";

import { FaRegPauseCircle, FaRegPlayCircle } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";
import { IoPeopleOutline } from "react-icons/io5";

//! Omit<Types,Keys> means   agar hamare pass ek phlele se bana hue koi interface ya type hai to hm simply usko alag alag jagah par use kranna chatae hai taki hme bar bar na banana pade but usme jo property phle use hui vo hm 2nd time use nhi krna chate means all properties usme se ek  propertyy hme hatani hai to udhar ye Omit use me ata hai jese niche smjao interface hai OnClickArgs jo first function me use hua hai or 3 properties use hui hai but on 2nd function hme sirf 2 use krni hai to hmne onmit ki help se jo use nhi hai usko "exclude" krdiya 
export interface Chip{
    value: number;
    state: "hidden" | "selected" | "revealed";
}
export interface ChipData extends Chip {
    chipPosition : [number, number]
}

interface OnClicksArgs {
    data: ChipData;
    chipPosition: [number, number];
    value: number;
}

export type mode = "game" | "settings";
const Game2 = () => {
    const [mode,setMode] = useState<mode>("game");
    const [gameboard,setGameboard] = useState<number[][]>(generateGameboard("4x4"));
    const [selectedChip,setSelectedChip] = useState<ChipData[]>([]);
    const [computedBoardState,setComputedBoardState] = useState<Chip[][]>([]);
    const [firstPlayerScore, setFirstPlayerScore] = useState<number>(0);
    const [secondPlayerScore, setSecondPlayerScore] = useState<number>(0);
    const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
    const [boardFreeze, setBoardFreeze] = useState(false);
    const [startTimer, setStartTimer] = useState(false);
    const [time, setTime] = useState<number>(0);
    const [moves, setMoves] = useState<number>(0);
    const [difficulty, setDifficulty] = useState<GameType>("4x4");
    const [numberOfPlayers, setNumberOfPlayers] = useState<number>(1);
    

    const isGameFinished = useMemo(
        ()=>computedBoardState?.every((row)=>row.every((cell)=>cell.state === "revealed"))
    ,[computedBoardState]);

    const onFirstChipClick = useCallback(({data,chipPosition,value}:OnClicksArgs)=>{
        setComputedBoardState((prev)=>{
            const stateCopy = prev?.map((row)=>row?.map((cell)=> cell));
            

            if(stateCopy){
                stateCopy[chipPosition[0]][chipPosition[1]] = {value, state:"selected"}
                return stateCopy;
            }
            return prev;
        });
        setSelectedChip((prev)=>[...prev,data]);
    },[])

    const onSecondChipClick = useCallback(({value,chipPosition}:Omit<OnClicksArgs,"data">)=>{
        const firstSelectedChip = selectedChip[0];
        if(selectedChip[0].value === value){
            //@ts-ignore
            setComputedBoardState((prev)=>{
                const stateCopy = prev?.map((row)=>row?.map((cell)=> cell));

                if(stateCopy){
                    stateCopy[chipPosition[0]][chipPosition[1]] = {value, state:"revealed"};
                    stateCopy[firstSelectedChip.chipPosition[0]][firstSelectedChip.chipPosition[1]] = {
                        value,
                        state: "revealed",
                    };
                    return stateCopy;
                }
            });

            setSelectedChip([]); // empty array after match chip
            if(currentPlayer === 1){
                setFirstPlayerScore((prev)=> prev + 1);
            } else {
                setSecondPlayerScore((prev)=> prev + 1);
            }
        } else {
            setBoardFreeze(true);
            //@ts-ignore
            setComputedBoardState((prev)=>{
                const stateCopy = prev?.map((row)=> row?.map((cell)=>cell));

                if(stateCopy){
                    stateCopy[chipPosition[0]][chipPosition[1]] = {value, state:"selected"};
                    stateCopy[firstSelectedChip.chipPosition[0]][firstSelectedChip.chipPosition[1]] = {
                        value:firstSelectedChip.value,
                        state: "selected",
                    }
                    return stateCopy;
                }
            });

            setTimeout(() => {
                //@ts-ignore
                setComputedBoardState((prev)=>{
                    const stateCopy = prev?.map((row)=>row?.map((cell)=> cell));

                    if(stateCopy){
                        stateCopy[chipPosition[0]][chipPosition[1]] = {value, state:"hidden"};
                        stateCopy[firstSelectedChip.chipPosition[0]][firstSelectedChip.chipPosition[1]] = {
                            value: firstSelectedChip.value,
                            state: "hidden",
                        }
                        return stateCopy;
                    }
                });
                setSelectedChip([]);
                setBoardFreeze(false);
                setCurrentPlayer(currentPlayer === 1? 2 : 1); // give chance to another player
            }, 1000);
        } 
    },[selectedChip,boardFreeze,firstPlayerScore,setSecondPlayerScore,currentPlayer]);

    const onChipClick = useCallback((_:React.MouseEvent<HTMLSpanElement,MouseEvent>, data:ChipData)=>{
        const {chipPosition, state, value} = data;

        //? if there is no selectionof chip
        if(!computedBoardState){
            return;
        };

        //? if borad freze means if board is freeze dont click work
        if(boardFreeze){
            return;
        }

        //start time
        if(startTimer === false){
            setStartTimer(true);
        };

        //? if there is no selected chips call first function
        if(selectedChip.length === 0){
            if(state === "hidden"){
                onFirstChipClick({data,chipPosition,value});
            }
        } else if(selectedChip.length === 1){
            if(state === "hidden"){
                onSecondChipClick({value, chipPosition});
                setMoves((prev)=> prev + 1);
            }
        }
    },[selectedChip,computedBoardState]);


    //?onrestat
    const onRestart = useCallback(()=>{
        setComputedBoardState((prev)=>
            prev?.map((row)=> row?.map((cell)=> ({...cell,state:"hidden"})))
        );
        setSelectedChip([]);

    },[computedBoardState]);

    const onNewGame = useCallback((difficulty:GameType)=>{
        setGameboard(generateGameboard(difficulty));
        setComputedBoardState(gameboard?.map((row)=>row?.map((chip)=>({value:chip,state:"hidden"}))));
        setSelectedChip([]);
    },[gameboard, computedBoardState]);


    //? setting the iniially  board
    useEffect(()=>{
        setComputedBoardState(gameboard?.map((row)=>{
            return row?.map((chip)=>({value:chip,state:"hidden"}))
        }))
    },[gameboard]);


    //? update difficulty
    useEffect(()=>{
       setGameboard(generateGameboard(difficulty));
    },[difficulty]);


    //? managing the time based on start chip click
    useEffect(()=>{
        let timeInterval : number | undefined;
        if(startTimer){
            timeInterval = setInterval(()=>{
                setTime((prev)=> prev + 1);
            },1000);
        } else {
            clearInterval(timeInterval);
        }

        if(isGameFinished){
            clearInterval(timeInterval);
        } 
        return ()=>{
            clearInterval(timeInterval);
        }
    },[startTimer])


    const onNumOfplayerChange = (e : Event,num: number)=>{
        setNumberOfPlayers(num);
    };
    const onDiffsChange = (e : Event,d:GameType)=>{
        setDifficulty(d);
    }
  return (
    <div className='text-neutral-50 bg-neutral-500/30 w-[60vw] h-[80vh] border rounded shadow-lg shadow-gray-300/40 max-sm:w-[90vw] max-sm:h-[78vh]'> 
       <div className=" flex items-center justify-between px-16">
            <h1 onClick={()=>setMode("game")} className=' mt-2 text-xl font-semibold text-neutral-50 cursor-pointer'>   
                Memory Game 🎮 
            </h1> 
            <span className=" flex items-center gap-1 mt-4 border px-2 rounded">
                <strong className=" text-red-500 text-lg ">{numberOfPlayers}</strong> : <IoPeopleOutline size={21}/> ,
                <strong className={` text-lg text-green-500`}>
                    {difficulty}
                </strong>
            </span>
       </div>
       <Tabbaar mode={mode} setMode={setMode}/>

       <section className=" mt-2">
        {mode === "game" ? (
            <div>
                <GamePage 
                // data={res}
                computedBoardState={computedBoardState}
                onChipClick={onChipClick}
                difficulty={difficulty}
                />
            </div>
        ) : (
            <div>
                <SettingsPage 
                  backToGame={()=>setMode("game")}
                  handelNewGame={()=>{}}
                  onDifficultyChange={onDiffsChange}
                  onNumOfplayerChange={onNumOfplayerChange}
                />
            </div>
        )}
       </section>


       {mode === "game" && (
        <section className=" mt-2">
            <Footer2 
                currentPlayer={currentPlayer} 
                time={time} 
                firstPlayerScore={firstPlayerScore} 
                moves={moves} 
                secondPlayerScore={secondPlayerScore} 
                numbOfPlayers={numberOfPlayers}
            />
        </section>
       )}

       {mode === "game" && (
        <section className=" mt-5 w-full flex items-center gap-10 justify-center cursor-pointer">
            <FaRegPlayCircle size={30} className=" hover:text-blue-400"/>
            <FaRegPauseCircle size={30} className=" hover:text-blue-400"/>
            <RiResetLeftFill size={30} className=" hover:text-blue-400"/>
        </section>
       )}
    </div>
  )
}

export default Game2;


//play,pause,restart ko work krwana hai;
//hme onNewGame or reset function banana hai jo whole game ko reset kre;
//player 1 ko bhi score dikhana hai;
//after complete game hme gameboard hatakr congratulation with score dikhana hai;
// time system ko sahi krna hai 
//optimize krna hai code ko for reusablity;
// code spliting krna hai 
// Theme system banana hai;
