import { useState } from "react"

interface Cards {
    id:number | string;
    text:string;
}
const DragBoard = () => {
    const [cards, setCards] = useState<Cards[]>([
        {id: 1, text: "Task 1"},
        {id: 2, text: "Task 2"},
        {id: 3, text: "Task 3"},
        {id: 4, text: "Task 4"},
        {id: 5, text: "Task 5"},
    ]);
    const [draggedItem, setDraggedItem] = useState<number | null>(null);
    const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

    const handelDragStart = (index:number)=>{
        setDraggedItem(index);
    };
    const handelDragOver = (index:number)=>{
        setHighlightIndex(index);
    };
    const handelDrop = (index:number)=>{
        const updatedCards = [...cards];
        const [draggedCard] = updatedCards.splice(draggedItem, 1);
        updatedCards.splice(index, 0, draggedCard);
        setCards(updatedCards);
        setDraggedItem(null);
        setHighlightIndex(null);
    };

    const handleDragLeave = () => {
        setHighlightIndex(null);
    };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="w-1/4 bg-white shadow-lg rounded-lg p-4">
         <h2 className="text-lg font-bold text-center mb-4">Drag and Drop</h2>
         <div className=" space-y-2">
            {cards?.map((card,index)=>(
                <div 
                    draggable="true" 
                    onDragStart={()=>handelDragStart(index)}
                    onDragOver={(e)=>{
                        e.preventDefault();
                        handelDragOver(index);
                    }}
                    onDrop={()=>handelDrop(index)}
                    onDragLeave={handleDragLeave}
                    key={card.id} 
                    className={`p-4 bg-blue-500 text-white rounded cursor-grab ${
                        highlightIndex === index ? "bg-blue-700" : " bg-green-600"
                    }`}
                >
                    {card?.text}
                </div>
            ))}
         </div>
        </div>
    </div>
  )
}

export default DragBoard