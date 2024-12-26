import { useState } from "react"
import Tabbaar from "./ui/Tabbaar";
import GamePage from "./ui/GamePage";
import SettingsPage from "./ui/SettingsPage";
import { generateGameboard } from "../utils/generateGameBoard";
import Footer2 from "./ui/Footer2";


export interface Chip{
    value: number;
    state: "hidden" | "selected" | "revealed";
}
export interface ChipData extends Chip {
    chipPosition : [number, number]
}
const Game2 = () => {
    const [mode,setMode] = useState<string>("game");
    const [time,setTime] = useState<number | Date>(0);
    const [moves,setMoves] = useState<number>(0);
    const [selectedChip,setSelectedChip] = useState<ChipData[]>([]);
    const [computedBoardState,setComputedBoardState] = useState<Chip[]>([]);





    
    const res = generateGameboard("4x4");

  return (
    <div className='text-neutral-50 bg-neutral-500/30 w-[60vw] h-[80vh] border rounded shadow-lg shadow-gray-300/40 max-sm:w-[90vw]'> 
        <h1 className='text-center mt-2 text-xl font-semibold text-neutral-50'>   
            Memory Game🎮 
        </h1> 
       <Tabbaar mode={mode} setMode={setMode}/>

       <section className=" mt-2">
        {mode === "game" ? (
            <div>
                <GamePage data={res}/>
            </div>
        ) : (
            <div>
                <SettingsPage/>
            </div>
        )}
       </section>


       {mode === "game" && (
        <section className=" mt-2">
            <Footer2 currentPlayer={1} time={Date.now()} firstPlayerScore={20} moves={10} secondPlayerScore={30} numbOfPlayers={1}/>
        </section>
       )}

    </div>
  )
}

export default Game2

