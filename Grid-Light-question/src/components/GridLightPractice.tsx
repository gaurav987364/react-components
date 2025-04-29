import React, { useState } from 'react';

const GRID = [
    [1,0,1],
    [0,1,1],
    [1,1,0],
]

const GridLightPractice = () => {
    const [stack,setStack] = useState(new Map());
    const [isTurningOff,setIsTurningOff] = useState(false);

    const handleClick = (rowId:number,colId:number)=>{
        if(isTurningOff) return; // prevent clicks while off

        const newStack = new Map(stack);
        const key = `${rowId}-${colId}`;

        if(newStack.get(key) || !GRID[rowId][colId]){
            return
        } else {
            newStack.set(key,true)
            setStack(newStack)
        }


        //totals no.of lights;
        const totalLights = GRID.flat().reduce((a,b)=> a+b,0);

        if(totalLights === newStack.size){
            turnOff();
            setIsTurningOff(true);
        }
    };

    const turnOff = ()=>{
        const intervalId = setInterval(() => {
            setStack(prev => {
                const lastItem = Array.from(prev.keys()).pop();
                const newStack = new Map(prev);
                newStack.delete(lastItem)
                
                if(newStack.size === 0){
                    clearInterval(intervalId)
                    setIsTurningOff(false)
                }
                return newStack;
            })
        }, 1000);
    };
  return (
    <div style={{width:"400px", height:"400px", border:"1px solid gray", display:"flex", justifyContent:"space-around", flexDirection:"column", gap:"1px"}}>
        {GRID?.map((row,rowIndex)=>(
            <div key={rowIndex} style={{display:'flex', justifyContent:"space-around", width:"100%", height:"100%", }}>
                {row?.map((cell,cellIndex)=>{
                    const key = `${rowIndex}-${cellIndex}`;
                    const lightOff = stack.has(key) ? "light-on" : cell === 0 ? "light-off" : "";
                    
                    return (
                        <div key={cellIndex} style={{display:"flex", alignItems:"center", justifyContent:"center",border:"1px solid gray",width:"100%", height:"100%", }}
                        className={`cell ${lightOff}`}
                        onClick={()=>handleClick(rowIndex,cellIndex)}
                        >
                            {cell}
                        </div>
                    )
                })}
            </div>
        ))}
    </div>
  )
}

export default GridLightPractice;