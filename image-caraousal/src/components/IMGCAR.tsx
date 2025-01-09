import React, { useState } from "react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
interface Props extends React.PropsWithChildren{
    title?: string;
    image?: string;
    description?: string;
}

const IMGCAR : React.FC<Props> = ({children:slides}) => {
    const [curr,setCurr] = useState<number>(0);

    const handelPrev = ()=>{
        setCurr((c)=>(c === 0 ? slides.length -1 : curr-1))
    };
    const handelNext = ()=>{
        setCurr((c)=>(c === slides.length -1? 0 : curr+1))
    };
  return (
    <div className=" w-[30vw] h-[30vw] border relative overflow-hidden">
        <h2 className=" flex w-full transition-transform ease-out duration-500" style={{transform:`translateX(-${curr*100}%)`}}>{slides}</h2>

        <div className=" absolute inset-0 flex items-center justify-between">
            <button onClick={handelPrev}><BiChevronLeft fill="black" size={40} className=" p-2 bg-gray-100/60 rounded-full"/></button>
            <button onClick={handelNext}><BiChevronRight fill="black" size={40} className=" p-2 bg-gray-100/60 rounded-full"/></button>
        </div>
        <div>
        </div>
    </div>
  )
}

export default IMGCAR;