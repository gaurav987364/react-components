/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Chip, ChipData } from "../Game2";
import { GameType } from "../../utils/generateGameBoard";

interface GamePageProps {
  computedBoardState : Chip[][] | undefined;
  onChipClick: (_:React.MouseEvent<HTMLSpanElement,MouseEvent>,data:ChipData)=> void;
  difficulty:GameType;
}

interface ChipProps {
  state: Chip["state"];
  difficulty: GameType;
  children:React.ReactNode;
  onClick: (e:any)=> void;
}

const GamePage = ({
  computedBoardState,
  onChipClick,
  difficulty,
} : GamePageProps) => {
  return (
    <div>
      {computedBoardState?.map((row,i)=>(
        <div key={i} className=' flex gap-1 items-center justify-center'>
          {row?.map((chip,j)=>(
            <Chippp key={j} state={chip.state} difficulty={difficulty} onClick={(e)=>onChipClick(e,{chipPosition:[i,j],...chip})}>
              {chip.state === "hidden" ? null : chip.value}
            </Chippp>
          ))}
        </div>
      ))}
    </div>
  )
};


const getBackgroundColor = (state:any) => {
  if (state === "hidden") return `bg-[#31485abd]`;
  if (state === "selected") return "bg-orange-500";
  return "bg-[#3bb86dbd]";
};

const getHoverBackgroundColor = (state:any) => {
  if (state === "hidden") return "hover:bg-[#c1abc7]";
  if (state === "selected") return "hover:bg-orange-500";
  return "hover:bg-[#bcceda]";
};

export const Chippp = ({ state, difficulty, onClick, children } : ChipProps) => {
  const size = difficulty === "4x4" ? "w-16 h-16" : "w-12 h-12"; // Tailwind classes for 70px or 50px
  const baseClasses =
    "flex items-center justify-center rounded-lg mt-1 cursor-pointer text-[#f5f9fa] text-2xl font-bold border-none";

  return (
    <span
      className={`${baseClasses} ${size} ${getBackgroundColor(
        state
      )} ${getHoverBackgroundColor(state)}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
};


export default GamePage