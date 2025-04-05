import { FaGreaterThan, FaLessThan } from 'react-icons/fa'

interface Props {
    leftItems: Record<string, boolean>;
    rightItems: Record<string, boolean>;
    setLeftItems: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    setRightItems: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
};

interface MoveAllItemsParams {
    items: Record<string, boolean>;
    setItemSrc: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
    setItemsDst: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
};





const Buttons = ({leftItems, rightItems,setLeftItems,setRightItems}:Props) => {

    // Function to handle the transfer of items between lists
    const moveAllItemsToright = ({ items, setItemSrc, setItemsDst }: MoveAllItemsParams): void => {
        setItemsDst((prev) => ({ ...prev, ...items }));
        setItemSrc({});
    };

    // Function to handle the transfer of items between lists only selected once.
    const moveSelectedItems = ({ items, setItemSrc, setItemsDst }: MoveAllItemsParams): void => {
        setItemsDst((prev)=>({
            ...Object.fromEntries(Object.entries(items).filter(([,value])=> value)),
            ...prev
        }));
        setItemSrc((prev)=>{
            return Object.fromEntries(Object.entries(prev).filter(([,value])=> !value))
        })
    };

    //disabled button function when no items are selected
    const isDisabled = (items: Record<string, boolean>):boolean => {
        // Check if all items are unchecked or there is any true value in the items object
        return Object.values(items).every((value) => !value);
    };


  return (
    <div className=' w-fit h-full flex flex-col justify-center items-center gap-2'>
        <button 
            onClick={()=>moveAllItemsToright({ items: leftItems, setItemSrc: setLeftItems, setItemsDst: setRightItems })} 
            disabled={Object.keys(leftItems).length === 0} 
            role='button' 
            className=' text-gray-800 px-2 py-1 rounded-md flex border bg-gray-200 hover:bg-gray-300 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400'
        >
            <FaGreaterThan size={14}/>
            <FaGreaterThan size={14}/>
        </button>

        <button 
            onClick={()=>moveSelectedItems({ items: leftItems, setItemSrc: setLeftItems, setItemsDst: setRightItems })}
            disabled={isDisabled(leftItems)} 
            role='button' 
            className=' text-gray-800 px-2 py-1 rounded-md  border bg-gray-200 hover:bg-gray-300 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400'
        >
            <FaGreaterThan size={14}/>
        </button>

        <button 
            onClick={()=>moveSelectedItems({ items: rightItems, setItemSrc: setRightItems, setItemsDst: setLeftItems })}
            disabled={isDisabled(rightItems)} 
            role='button' 
            className=' text-gray-800 px-2 py-1 rounded-md  border bg-gray-200 hover:bg-gray-300 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400'
        >
            <FaLessThan size={14}/>
        </button>

        <button 
            onClick={()=>moveAllItemsToright({ items: rightItems, setItemSrc: setRightItems, setItemsDst: setLeftItems })} 
            disabled={Object.keys(rightItems).length === 0} 
            role='button' 
            className=' text-gray-800 px-2 py-1 rounded-md flex border bg-gray-200 hover:bg-gray-300 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400'
        >
            <FaLessThan size={14}/>
            <FaLessThan size={14}/>
        </button>
    </div>
  )
}

export default Buttons