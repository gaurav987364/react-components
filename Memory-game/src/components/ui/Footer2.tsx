import React from "react"
import { toHHMMSS } from "../../utils/timeFormat";
import { IoPersonOutline } from "react-icons/io5";

interface FooterProps {
    numbOfPlayers: number;
    time: number;
    moves: number;
    currentPlayer: number;
    firstPlayerScore: number;
    secondPlayerScore: number;
}
const Footer2 : React.FC<FooterProps> = ({
    numbOfPlayers,
    time,
    moves,
    currentPlayer, // for css
    firstPlayerScore,
    secondPlayerScore,
}) => {
  return (
    <div className=" w-80 h-12  mx-auto mt-2">
        {numbOfPlayers === 1 ? (
            <div className="flex justify-around">
                <div className=" bg-gray-400/20 px-4 py-2 rounded-xl">
                    <span className=" text-gray-100/60">
                     Time : 
                    </span>
                    <span className=" font-semibold">{toHHMMSS(time)}</span>
                </div>
                <div className=" bg-gray-400/20 px-4 py-2 rounded-xl">
                    <span className=" text-gray-100/60">
                     Moves : 
                    </span>
                    <span className=" font-semibold">{moves}</span>
                </div>
            </div>
        ) : (
            <div className="flex justify-around">
                <div className={`bg-gray-400/10 px-7 py-1.5 rounded-xl flex flex-col ${currentPlayer === 1 ? "bg-green-500/40" : "..."}`}>
                    <span className=" flex items-center gap-1 text-gray-100/60">
                      Player 1 <IoPersonOutline/>
                    </span>
                    <span className=" font-semibold">
                        Score : {firstPlayerScore}
                    </span>
                </div>
                <div className={`  bg-gray-400/10 px-7 py-1.5 rounded-xl flex flex-col ${currentPlayer === 2 ? "bg-blue-500/40" : "..."} `}>
                    <span className=" flex items-center gap-1 text-gray-100/60">
                      Player 2 <IoPersonOutline/>
                    </span>
                    <span className=" font-semibold">
                        Score : {secondPlayerScore}
                    </span>
                </div>
            </div>
        )}
    </div>
  )
}

export default Footer2