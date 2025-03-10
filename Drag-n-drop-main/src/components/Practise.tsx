import { useState } from "react"
interface Tasks {
    id:number;
    text:string;
}
const Practise = () => {
    const [tasks,setTask] = useState<Tasks[]>([
        {id:1,text:"My name is gaurav and im 24 years old"},
        {id:2,text:"i am belog to india and i m very proud."},
        {id:3,text:"ha thiak hai game me noob hu mkc ."}
    ]);
    const [draggedItem, setDraggedItem] = useState<number | null>(null);
    const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

    const handelDragStart = (item:number)=>{
        setDraggedItem(item)
    };
    const handelDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault();
        setHighlightIndex(index);
    };
    const handelDragLeave = ()=>{
        setHighlightIndex(null);
        setDraggedItem(null);
    };

    const handelDrop = (index:number)=>{
        const copy = [...tasks];
        if (draggedItem !== null) {
            const [draggedCard] = copy.splice(draggedItem, 1);
            copy.splice(index, 0, draggedCard);
        }
        setTask(copy);
        setDraggedItem(null);
        setHighlightIndex(null);
    }
  return (
    <div className=" w-80 h-auto bg-pink-400 shrink-0 p-5 space-y-2">
        <h2 className=" text-black italic font-bold text-2xl">Swap the text...</h2>
        {tasks?.map((t,index)=>(
            <div 
            draggable="true" 
            onDragStart={()=>handelDragStart(index)}
            onDragLeave={handelDragLeave}
            onDragOver={(e)=>handelDragOver(e,index)}
            onDrop={()=>handelDrop(index)}
            className={` w-full cursor-grab ${highlightIndex ? "" : ""}`}>
                <p className=" mt-1 font-bold line-clamp-1">{t.text}</p>
            </div>
        ))}
    </div>
  )
}

export default Practise