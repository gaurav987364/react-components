import React from 'react'

const Dp = () => {
  return (
    <div className=' w-full h-full bg-blue-200'>
       <button>Open</button>
       <div className=' w-[400px] h-[200px] flex flex-col overflow-y-scroll border border-black'>
        {Array.from({length:50}, (v,i)=>(
            <span>{i+1}</span>
        ))}
       </div>
    </div>
  )
}

export default Dp