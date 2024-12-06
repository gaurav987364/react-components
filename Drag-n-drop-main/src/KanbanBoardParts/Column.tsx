import { useState } from "react";
import Cards from "./Cards";
import DropIndicator from "./DropIndicator";

const Column = ({title,column,headingColor,cards,setCards}) => {
    const [active,setActive] = useState<boolean>(false);
    const filterCards = cards?.filter((c)=> c.column === column);

    const handelDragStart = (e , card)=>{
        e.dataTransfer.setData("cardId", card.id);
    };
    const onDragOver = (e)=>{
        e.preventDefault();
        highlightIndicator(e);
        setActive(true);
    };
    const onDrop = (e)=>{
        const cardId = e.dataTransfer.getData("cardId");
        setActive(false);
        clearHighlights();

        //extra stuff start here;
        const indicator = getIndicators();
        const {element} = getNearesIndicator(e,indicator);
        if(!element) return;
        const before  = element.dataset.before || "-1";
        //?we have to take shallow copy of main array
        if(before != cardId){
            let copy = [...cards];
            //find the card by id
            let cardToTransfer = copy.find((c)=> c.id === cardId);
            if(!cardToTransfer) return;
    
            cardToTransfer = {...cardToTransfer, column};
            copy = copy.filter((c) => c.id !== cardId);

            const moveToBack = before === "-1";
            if(moveToBack){
                copy.push(cardToTransfer);
            } else{
                const insertAtindex = copy.findIndex((el)=> el.id === before);
                if(insertAtindex === undefined) return;
                copy.splice(insertAtindex, 0, cardToTransfer);
            }
            setCards(copy);
        }
    };
    const onDragLeave = ()=>{
        setActive(false);
    };

    //?extra features;
    //! ye function hame indicateor dega ki kha kha hm apna item place kr skte hai it works when we start dragging item
    const getIndicators = ()=>{
        return Array.from(document.querySelectorAll(`[data-column=${column}]`))
    };

    const getNearesIndicator = (e,ind)=>{
        const DISTANCE = 50;
        const el = ind?.reduce((closest,child)=>{
            const box = child.getBoundingClientRect();
            console.log(box);

            const offset = e.clientY - (box.top + DISTANCE);
            console.log(offset);

            if(offset < 0 && offset > closest.offset){
                return {offset:offset, element: child}
            } else {
                return closest;
            }
        },
        {
            offset:Number.NEGATIVE_INFINITY,
            elemnet:ind[ind.length - 1]
        }
    );
    return el;
    };


    const clearHighlights = (els) => {
        const indicators = els || getIndicators();
    
        indicators.forEach((i) => {
          i.style.opacity = "0";
        });
      };
    
      const highlightIndicator = (e) => {
        const indicators = getIndicators();
    
        clearHighlights(indicators);
    
        const el = getNearesIndicator(e, indicators);
    
        el.element.style.opacity = "1";
      };
  return (
    <div className=" w-52 shrink-0 ml-2">
        <div className=" flex justify-between items-center">
            <span className={` ${headingColor} text-lg font-bold`}>{title}</span>
            <span className=" rounded text-gray-400 px-3">{filterCards?.length}</span>
        </div>

        <div
         onDragOver={onDragOver}
         onDragLeave={onDragLeave}
         onDrop={onDrop}
          className={`h-full w-full transition-colors ${
            active ? "bg-slate-800/50" : "bg-neutral-800/0"
          }`}
        >
            {filterCards?.map((item)=>(
                <div key={item.id}>
                    <Cards  {...item} handelDragStart={handelDragStart}/>
                </div>
            ))}
            <DropIndicator id={null} column={column}/>
        </div>
    </div>
  )
}

export default Column