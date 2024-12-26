import React from 'react'
import { toHHMMSS } from '../../utils/timeFormat';
interface FooterProps {
    numbOfPlayers: number;
    time: number;
    moves: number;
    currentPlayer: 1 | 2;
    firstPlayerScore: number;
    secondPlayerScore: number;
};
const Footer : React.FC<FooterProps> = ({
    numbOfPlayers,
    time,
    moves,
    currentPlayer,
    firstPlayerScore,
    secondPlayerScore,
}) => {
  return (
    <footer>
        {currentPlayer === 1 ? (
            <div>
                <div>
                    <span>Time</span>
                    <span>{toHHMMSS(time)}</span>
                </div>
                <div>
                    <span>Moves</span>
                    <span>{moves}</span>
                </div>
            </div>
        ) : (
            <div>
                <div>
                    <span>Player 1</span>
                    <p>{firstPlayerScore}</p>
                </div>
                <div>
                    <span>Player 2</span>
                    <p>{secondPlayerScore}</p>
                </div>
            </div>
        )}
    </footer>
  )
}

export default Footer