import React from 'react'

interface Props {
  items: Record<string, boolean>;
  setItems?: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  className?: string;
}
const ItemsList:React.FC<Props> = ({items, setItems, className}) => {
  return (
    <div className={className}>
      {Object.entries(items).map(([key, value], index) => (
        <div key={index} className='flex items-center gap-2'>
          <input 
            type="checkbox" 
            checked={value} 
            onChange={()=>{
              if (setItems) {
                setItems((prev) => ({
                  ...prev,
                  [key]: !prev[key]
                }));
              }
            }} 
            className='w-4 h-4 cursor-pointer'
          />
          <label htmlFor={key}>{key}</label>
        </div>
      ))}
    </div>
  )
}

export default ItemsList