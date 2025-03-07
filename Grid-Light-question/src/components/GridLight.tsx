import { useState } from 'react';

const Grid = [
  [1, 1, 0],
  [0, 1, 1],
  [1, 0, 1],
];

const GridLight = () => {
  const [stack, setStack] = useState(new Map());
  const [isTurningOff, setIsTurningOff] = useState(false);

  const handleClick = (rowIndex: number, cellIndex: number) => () => {
    if (isTurningOff) return; // Prevent clicks during the turning off phase
    const newStack = new Map(stack);
    const key = `${rowIndex}-${cellIndex}`;

    if (newStack.get(key) || !Grid[rowIndex][cellIndex]) {
      return;
    } else {
      newStack.set(key, true);
    }
    setStack(newStack);

    //find the total number of lights selected
    const totalLightsSelected = Grid.flat().reduce((a,b)=> a+b,0);
    // 6===6
    if(totalLightsSelected === newStack.size){
    //   alert('You have won the game');
        setIsTurningOff(true); // Set isTurningOff to true
        doLightOff()
    }
  };

  const doLightOff = ()=>{
    const intervalId = setInterval(() => {
        setStack((prev)=>{
            // Remove the last item from the stack (which is the last selected light) and decrement the size of the stack
            const lastItem = Array.from(prev.keys()).pop();
            const newStack = new Map(prev);
            newStack.delete(lastItem);

            if(newStack.size === 0){
                clearInterval(intervalId);
                setIsTurningOff(false); // Set isTurningOff to false
            }
            return newStack;
        })
    }, 1000);
  };

  return (
    <div className="container">
      {Grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => {
            const key = `${rowIndex}-${cellIndex}`;
            const lightClass = stack.has(key) ? 'light-on' : cell === 0 ? 'light-off' : '';
            return (
              <div
                onClick={handleClick(rowIndex, cellIndex)}
                key={cellIndex}
                className={`cell ${lightClass}`}
              >
                {/* {cell} */}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default GridLight;
