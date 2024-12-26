import React from 'react'
import { GameType } from '../../utils/generateGameBoard';
import Button from '../ui/Button';

interface SettingsProps {
    onDifficultyChange : (_:React.MouseEvent<HTMLButtonElement, MouseEvent>, gameType:GameType)=>void;
    onNumbeOfPlayerChange : (_:React.MouseEvent<HTMLButtonElement, MouseEvent>, players : 1 | 2)=>void;
    numberOfPlayers : 1 | 2;
    difficulty : GameType;
    handelBackToGame : () => void;
    handelNewGame : () => void;
}
const GameSetting : React.FC<SettingsProps> = ({
    onDifficultyChange,
    onNumbeOfPlayerChange,
    numberOfPlayers,
    difficulty,
    handelBackToGame,
    handelNewGame,
}) => {
  return (
    <div>
        <div>
            <h1>Number Of Players.</h1>
        </div>

        <div>
            <Button variant='primary' onClick={(event)=> onNumbeOfPlayerChange(event,1)}>1</Button>
        </div>
        <div>
            <Button variant="secondary" onClick={(event)=> onNumbeOfPlayerChange(event,2)}>2</Button>
        </div>

        <div>
            <h2>Difficulty</h2>
        </div>
        <div>
            <div>
                <Button variant='primary' onClick={(event)=> onDifficultyChange(event, "4x4")}>4x4</Button>
            </div>
            <div>
                <Button variant='primary' onClick={(event)=> onDifficultyChange(event, "6x6")}>6x6</Button>
            </div>
        </div>

        <div>
            <p>Changing any of the settings will cause a new game, click on back to game if you wish to
            go back to your game without changes</p>
        </div>
        <div>
            <Button variant='primary' onClick={handelNewGame}>New Game</Button>
        </div>
        <div>
            <Button variant='secondary' onClick={handelBackToGame}>Back To Game</Button>
        </div>
    </div>
  )
}

export default GameSetting