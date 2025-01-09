import { useEffect, useRef, useState } from "react";
import Box from "./Box";

interface ModalProps{
    title : string;
    content: string;
}

const Model = ({title, content}: ModalProps) => {
    const [open, setOpen] = useState(false);
    const modelRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        console.log("clicked")
        setOpen((open)=>!open);
    }

    useEffect(()=>{
        const ousideClick = (e : Event)=>{
            console.log("click")
            if(modelRef.current && !modelRef.current.contains(e.target as Node)){
                setOpen(false);
            }
        }
        document.addEventListener("click", ousideClick);
        return ()=>{
            document.removeEventListener("click", ousideClick);
        }
    },[modelRef]);
  return (
    <div ref={modelRef}>
        <h2 
        onClick={handleToggle}
        className={`  w-fit bg-gray-200 px-2 py-2.5 rounded-md font-semibold shadow-lg shadow-gray-300 cursor-pointer pointer-events-auto ${open ? "border border-blue-400" : "border-none"}`}
        >
            {title}
        </h2>

        {open && (
            <div className=" absolute"
            style={{transform : "translate(-45%,-50%)"}}
            >
                <Box content={content}/>
            </div>
        )}
    </div>
  )
}

export default Model;