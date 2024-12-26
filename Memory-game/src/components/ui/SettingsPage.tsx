import React from 'react'
import Button from './Button';
import { GoPeople } from 'react-icons/go';
import { IoMdTrendingUp } from 'react-icons/io';

interface SettingsProps {
  numOfplayers: number;
  difficulty:string;
  handelNewGame:()=>void;
  backToGame:()=>void;
}
const SettingsPage : React.FC<SettingsProps> = ({
  numOfplayers,
  difficulty,
  handelNewGame,
  backToGame
}) => {
  return (
    <div className=' w-full h-auto mx-auto flex items-center justify-center flex-col mt-5'>
      <div className=' flex items-center flex-col gap-2'>
        <span>Number Of Players :</span>
        <div className=' flex items-center gap-2'>
          <GoPeople size={25} fill='pink'/> 
          <Button variant='primary' onClick={()=>{}}>1 </Button>
          <Button variant='secondary' onClick={()=>{}}>2</Button>
        </div>
      </div>

      <div className=' flex items-center flex-col gap-2 mt-5'>
        <span>Difficulty :</span>
        <div className=' flex items-center gap-2'>
          <IoMdTrendingUp size={25} fill='pink' />
          <Button variant='primary' onClick={()=>{}}>4x4</Button>
          <Button variant='secondary' onClick={()=>{}}>6x6</Button>
        </div>
      </div>

      <p className=' w-[80%] text-sm text-red-300 mt-5'>Note : <strong>Changing any of the settings will cause a new game, click on back to game If you wish to go back to your game without changes.</strong></p>

      <div className=' flex gap-1 mt-5'>
        <Button variant='primary'>New Game</Button>
        <Button variant='secondary'>Back to game</Button>
      </div>
    </div>
  )
}

export default SettingsPage