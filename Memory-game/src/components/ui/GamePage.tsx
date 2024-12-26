import React from 'react'

const GamePage = ({data} : {data : number[][]}) => {
  return (
    <div>
      {data?.map((row,i)=>(
        <div key={i} className=' flex gap-1 items-center justify-center'>
          {row?.map((chip,j)=>(
            <span key={j}>
              <StyledChip chip={chip}/>
            </span>
          ))}
        </div>
      ))}
    </div>
  )
};


export const StyledChip = ({chip} :{chip : number})=>{
  return(
    <div className=' flex flex-wrap items-center justify-center bg-zinc-400/30 rounded w-[50px] mt-1 h-[50px] cursor-pointer text-neutral-50 font-semibold text-lg border-none'>
      {chip}
    </div>
  )
};

export default GamePage