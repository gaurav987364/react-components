
import { Chip, ChipData } from '../../hooks/useGameBoard';
import { GameType } from '../../utils/generateGameBoard';
interface GameScreenProps {
    computedBoardState: Chip[][] | undefined;
    onChipClick: (_: React.MouseEvent<HTMLSpanElement, MouseEvent>, data: ChipData) => void;
    difficulty: GameType;
}
  
// interface ChipProps {
//     state: Chip["state"];
//     difficulty: GameType;
// }
const GameScreen = ({computedBoardState,difficulty,onChipClick}:GameScreenProps) => {
  return (
    <div>
        {computedBoardState?.map((row,i)=>(
            <div className=' row' key={i}>
                {row?.map((chip,j)=>(
                    <span 
                    key={j} 
                    onClick={(event)=> onChipClick(event,{chipPosition : [i,j],...chip})}
                    state={chip?.state}
                    difficulty={difficulty}
                    >
                        {chip.state === "hidden" ? null : chip.value}
                    </span>
                ))}
            </div>
        ))}
    </div>
  )
}

export default GameScreen