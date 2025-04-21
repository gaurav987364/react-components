import React, { FC, useRef, useState } from 'react';

interface TabType {
    lable:string;
    id:number;
    Component:FC;
}
interface Props {
    tablist:TabType[];
    defaultTab?:number;
}



const Tab:React.FC<Props> = ({
    tablist = [],
    defaultTab = 1
}) => {
    const [item,setItem] = useState<number>(defaultTab || 1);
    const [focusedIndex, setFocusedIndex] = useState<number>(defaultTab - 1);
    const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

    //get component based on id number;
    const Component = tablist[item-1].Component;

    const handleTabChange = (index:number)=>{
        setItem(index+1);
        setFocusedIndex(index);
    };

    //space enter right-left arrow key;
    const handleKeyPress = (event:React.KeyboardEvent<HTMLButtonElement>,index:number)=>{
        const endTab = tablist.length-1;
        if(event.key === "ArrowRight"){
           //next index
           const nextIndex = index = endTab ? 0 : index+1;
           //set focus to next tab
           setFocusedIndex(nextIndex);
           //set the focus over element
           buttonRefs.current[nextIndex]?.focus();

        }

        if(event.key === "ArrowRight"){
            const prevIndex = index === 0 ? endTab : index-1;
            setFocusedIndex(prevIndex);
            buttonRefs.current[prevIndex]?.focus();
        }

        //set focus on enter or space
        if (event.key === 'Enter' || event.key === ' ') {
            setItem(index + 1);
        }
    };
    //state persist across tab change;
  return (
    <div className=' w-96 h-10 rounded-xl bg-slate-200 dark:bg-slate-700'>
        <div role='tablist' className=' w-full h-full flex items-center justify-evenly'>
            {tablist?.map((tabItem:TabType, index:number)=>{
                const isActive = tabItem?.id === item;
                return (
                    <button 
                    key={tabItem?.id}
                    role='tab'
                    aria-selected={isActive} 
                    data-selected={isActive}
                    onClick={()=>handleTabChange(index)}
                    onKeyDown={(e)=>handleKeyPress(e,index)}
                    ref={(el) => {
                        buttonRefs.current[index] = el;
                    }}
                    tabIndex={focusedIndex === index ? 0 : -1}
                    className={` w-full h-full  px-4 py-1 rounded-xl cursor-pointer capitalize transition-all duration-300 ${isActive ? "bg-gray-300 dark:bg-slate-800 font-semibold text-gray-900 dark:text-gray-50" : "font-thin dark:text-gray-50"}`}
                    >
                        {tabItem?.lable}
                    </button>
                )
            })}
        </div>
        <div role='tabpanel' className=' p-4 w-full h-full mx-auto'>
            <Component/>
        </div>
    </div>
  )
}

export default Tab;