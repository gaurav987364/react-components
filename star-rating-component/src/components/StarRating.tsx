/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import SpanUi from "./SpanUi";

interface Props {
    color:string;
    size:number;
    length:number;
    onRate: (count: number) => void;
    ratingCount: number;
}

const StarRating = ({color, size,length, onRate=f=>f, ratingCount} : Props) => {
    const [isRated, setIsRated] = useState(0);
    const [hovered, setHovered] = useState(0);
    
    let checklength;
    if (length > 7 || length < 1) {
        return <SpanUi/>
    } else {
        checklength = length;
    }

    const handleRating = (count: number) => {
        setIsRated(count);
        onRate(count);
    }
  return (
    <div className=" w-[40rem] h-[20rem] bg-zinc-500 rounded-xl flex items-center justify-center gap-2 flex-col max-sm:w-[30rem] max-sm:h-[20rem]">
        <h1 className=" font-bold text-2xl text-white/100">Ratings Card</h1>
        <div className=" w-[20rem] h-[5rem] border rounded-xl max-sm:w-[20rem] flex items-center justify-center gap-1">

            {Array.from({length}, (_,i)=> (
                <div key={i} className={`cursor-pointer hover:text-yellow-500`}>
                    <BsFillStarFill  
                        size={size} 
                        onClick={()=>handleRating(i + 1)}
                        onDoubleClick={()=>handleRating(0)}
                        onMouseEnter={()=>setHovered(i + 1)}
                        onMouseLeave={()=>setHovered(0)}
                        color={isRated >= i + 1? color : hovered >= i + 1? color : "white"}
                    />
                </div>
            ))}
            
        </div>
        <h1 className=" font-bold text-2xl text-white/100 mt-2">You give : {ratingCount} Ratings</h1>
    </div>
  )
}

export default StarRating;