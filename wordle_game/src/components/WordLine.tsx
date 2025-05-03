import React from 'react';
import Letter from './Letter';

interface Props {
    word: string;
    correctWord: string;
    correctLetterObj: Record<string, number>;
    revealed: boolean;
}

const WordLine: React.FC<Props> = ({
    word = "",
    correctLetterObj = {},
    correctWord = "",
    revealed
}) => {
    const guess = word.padEnd(5, ' ').toUpperCase();
    const target = correctWord.padEnd(5, ' ').toUpperCase();
    const statuses = new Array(5).fill('gray');
    const availableLetters = { ...correctLetterObj };

    if (revealed) {
        // First pass: Green check
        guess.split('').forEach((letter, i) => {
            if (letter === target[i]) {
                statuses[i] = 'green';
                availableLetters[letter]--;
            }
        });

        // Second pass: Yellow check
        guess.split('').forEach((letter, i) => {
            if (statuses[i] === 'green') return;
            if (availableLetters[letter] > 0) {
                statuses[i] = 'yellow';
                availableLetters[letter]--;
            }
        });
    }

    return (
        <div className='flex flex-row space-x-1 p-0.5'>
            {guess.split('').map((letter, i) => (
                <Letter
                    key={i}
                    letter={letter}
                    green={statuses[i] === 'green'}
                    yellow={statuses[i] === 'yellow'}
                />
            ))}
        </div>
    );
};
export default WordLine;