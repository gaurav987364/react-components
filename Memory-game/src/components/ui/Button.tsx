import React from 'react'
interface ButtonProps {
    onClick?: (event : React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode
    variant: 'primary' | 'secondary';
}

const Button :React.FC<ButtonProps> = ({onClick,children,variant}) => {
  return (
    <button className={` cursor-pointer
        ${variant === "primary" ? " px-4 py-1  w-fit rounded bg-blue-600 hover:bg-blue-800 shadow-sm shadow-gray-300"
         : 
         " bg-gray-300/80 w-fit rounded px-3 "} 
         ${variant === "secondary" ? "px-4 py-1  w-fit rounded bg-purple-600 hover:bg-purple-800 shadow-sm shadow-gray-300 outline-none " : 
         "..."}`
        } 
        onClick={onClick}
    >
        {children}
    </button>
  )
}

export default Button