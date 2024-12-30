import React from 'react'
import clsx from "clsx";
interface Props extends React.PropsWithChildren{
    onClick?:()=>void;
    className?: string;
}
const Cell: React.FC<Props> = ({children,className,onClick}) => {
  return (
    <div 
        onClick={onClick} 
        className={clsx(" rounded h-12 flex items-center justify-center border",{" text-lg hover:text-gray-300 hover:bg-zinc-800 cursor-pointer":onClick}, className)}
    >
        {children}
    </div>
  )
}

export default Cell