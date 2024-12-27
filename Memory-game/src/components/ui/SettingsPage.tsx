/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Button from './Button';
import { GoPeople } from 'react-icons/go';
import { IoMdTrendingUp } from 'react-icons/io';
import { GameType } from '../../utils/generateGameBoard';

interface SettingsProps {
  handelNewGame:()=>void;
  backToGame:()=>void;
  onDifficultyChange:(e:Event,d:GameType)=>void;
  onNumOfplayerChange:(e:Event,num:number)=>void;
}
const SettingsPage : React.FC<SettingsProps> = ({
  handelNewGame,
  backToGame,
  onDifficultyChange,
  onNumOfplayerChange
}) => {

  const handelPlayerChange = (e : any,num : number)=>{
    onNumOfplayerChange(e,num);
    //:todo hme after setting these user ko re direct krna hai on game board
  }
  const handelDifficultyChange = (e : any,d: GameType)=>{
    onDifficultyChange(e,d);
    //:todo hme after setting these user ko re direct krna hai on game board
  }
  return (
    <div className=' w-full h-auto mx-auto flex items-center justify-center flex-col mt-5'>
      <div className=' flex items-center flex-col gap-2'>
        <span className=' ml-2'>Number Of Players :</span>
        <div className=' flex items-center justify-between w-full gap-2'>
          <GoPeople size={25} fill='pink'/> 
          <Button variant='primary' onClick={(e)=>handelPlayerChange(e,1)}>1 </Button>
          <Button variant='secondary' onClick={(e)=>handelPlayerChange(e,2)}>2</Button>
        </div>
      </div>

      <div className=' flex items-center flex-col gap-2 mt-5'>
        <span className=' -ml-16'>Difficulty :</span>
        <div className=' flex items-center gap-2 justify-between w-full'>
          <IoMdTrendingUp size={25} fill='pink' />
          <Button variant='primary' onClick={(e)=>handelDifficultyChange(e,"4x4")}>4x4</Button>
          <Button variant='secondary' onClick={(e)=>handelDifficultyChange(e,"6x6")}>6x6</Button>
        </div>
      </div>

      <p className=' w-[80%] text-sm text-red-300 mt-5'>Note : <strong>Changing any of the settings will cause a new game, click on back to game If you wish to go back to your game without changes.</strong></p>

      <div className=' flex gap-1 mt-5'>
        <Button variant='primary' onClick={handelNewGame}>New Game</Button>
        <Button variant='secondary' onClick={backToGame}>Back to game</Button>
      </div>
    </div>
  )
}

export default SettingsPage