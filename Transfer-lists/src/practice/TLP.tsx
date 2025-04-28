import React, { useState } from 'react';
import { TbArrowBadgeLeft, TbArrowBadgeLeftFilled, TbArrowBadgeRight, TbArrowBadgeRightFilled } from 'react-icons/tb';

//mock data
const LeftList = [
    "Gaurav",
    "Vikas",
    "Nakul",
    "Yash",
    "Suraj"
];
const RightList = [
    "Harshita",
    "Priya",
    "Sonal",
    "Jiya",
    "Tissa"
];
//function to convert object into array;
const ArrayToObj = (strings:string[])=>{
    return (
        strings.reduce((acc,label)=>{
            acc[label] = false;
            return acc;
        },{} as Record<string,boolean>)
    )
};

const TLP = () => {
    const [left,setLeft] = useState(ArrayToObj(LeftList));
    const [right,setRight] = useState(ArrayToObj(RightList));
  return (
    <div className=' w-[500px] max-h-[500px] border mx-auto flex items-center justify-evenly gap-5 overflow-hidden p-2'>
        {/* left list */}
        <CreateList item={left} setItems={setLeft}/>
        {/* Buttons  */}
        <Buttons
         itemLeft={left}
         itemRight={right}
         setItemLeft={setLeft}
         setItemRight={setRight}
        />
        {/* right list */}
        <CreateList item={right} setItems={setRight}/>
    </div>
  )
}




//Component to create lists;
interface ListProps{
    item:Record<string,boolean>;
    setItems:React.Dispatch<React.SetStateAction<Record<string,boolean>>>;
}
export const CreateList = ({
    item,
    setItems
}:ListProps)=>{
    return (
        <div className=' bg-gray-100 max-h-full p-5 space-y-2 overscroll-y-scroll'>
            {Object.entries(item).map(([key,value])=>(
                <div key={key} className=' flex items-center gap-2'>
                    <input 
                     type="checkbox" 
                     checked={value}
                     onChange={()=>{
                        if(setItems){
                            setItems(prev => ({
                                ...prev,
                                [key]:!prev[key]
                            }))
                        }
                     }}
                    />
                    <label htmlFor={key}>{key}</label>
                </div>
            ))}
        </div>
    )
};

//simply version of this  
// setItems(prev => ({
//     ...prev,
//     [key]:!prev[key]
// }));
//?==>> setItems(prev => ({...prev, [key]:!prev[key]}))  // means sabhi old values ko as it is rakho and sirfkey jo ki name hai uski value false ko !false means true krdo on change me;



//buttons component that handle all logic of transfers;
interface ButtonsProps {
    itemLeft:Record<string,boolean>;
    itemRight:Record<string,boolean>;
    setItemLeft:React.Dispatch<React.SetStateAction<Record<string,boolean>>>;
    setItemRight:React.Dispatch<React.SetStateAction<Record<string,boolean>>>;
};
interface MovedItemsProps {
    sourceList:Record<string,boolean>;
    sideToUpdate:React.Dispatch<React.SetStateAction<Record<string,boolean>>>;
    targetListSide:React.Dispatch<React.SetStateAction<Record<string,boolean>>>;
}
export const Buttons = ({
    itemLeft,
    setItemLeft,
    itemRight,
    setItemRight
}:ButtonsProps)=>{
    //move all list items from one to another;
    const movedAll = ({sourceList,sideToUpdate,targetListSide}:MovedItemsProps)=>{
        targetListSide(prev => ({...prev, ...sourceList}));
        sideToUpdate({});
    };

    //moved selected items;
    const moveSelectedItems = ({sourceList,sideToUpdate,targetListSide}:MovedItemsProps)=>{
        targetListSide(prev => ({
            // we recive items so spread krege, object meconvert krge after perform action on array, filter karege true value items ko or add kr dege ok
            ...Object.fromEntries(Object.entries(sourceList).filter(([,value])=> value)),
            ...prev
        }));
        sideToUpdate(prev => { 
            //jisme se items gye means us side me jo values bachi un par filter karke sirf falsee wali ko idhr rkahege;
            return Object.fromEntries(Object.entries(prev).filter(([,value])=> !value))
        })
    };
   
    const isDisabled = (item:Record<string,boolean>):boolean=>{
        return Object.values(item).every(value => !value)
    };
    return (
        <div className=' flex flex-col items-center justify-center gap-y-1.5'>
            <button 
            disabled={Object.keys(itemLeft).length === 0} 
            onClick={()=>movedAll({
                sourceList:itemLeft, 
                sideToUpdate:setItemLeft, 
                targetListSide:setItemRight
            })}
            className=' flex px-2 py-0.5 text-2xl bg-gray-200 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400'>
                <TbArrowBadgeRight />
                <TbArrowBadgeRight />
            </button>

            <button 
            disabled={isDisabled(itemLeft)}
            onClick={()=>moveSelectedItems({
                sourceList:itemLeft,
                sideToUpdate:setItemLeft,
                targetListSide:setItemRight
            })}  
            className=' flex px-2 py-0.5 text-xl bg-gray-200 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400'
            >
                <TbArrowBadgeRightFilled/>
            </button>

            <button 
            disabled={isDisabled(itemRight)} 
            onClick={()=>moveSelectedItems({
                sourceList:itemRight,
                sideToUpdate:setItemRight,
                targetListSide:setItemLeft
            })}   
            className=' flex px-2 py-0.5 text-xl bg-gray-200 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400'>
                <TbArrowBadgeLeftFilled/>
            </button>

            <button 
            disabled={Object.keys(itemRight).length === 0} 
            onClick={()=>movedAll({
                sourceList:itemRight, 
                sideToUpdate:setItemRight, 
                targetListSide:setItemLeft
            })}
            className=' flex px-2 py-0.5 text-2xl bg-gray-200 rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400'>
                <TbArrowBadgeLeft />
                <TbArrowBadgeLeft />
            </button>
        </div>
    )
};
export default TLP;