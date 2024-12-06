import DropIndicator from "./DropIndicator";

interface Props{
    title:string;
    id:string;
    column:string;
}
const Cards = ({title,id,column,handelDragStart}:Props) => {
  return (
    <>
    <DropIndicator id={id} column={column}/>
    <div draggable="true" onDragStart={(e)=>handelDragStart(e, {title,id,column})} className=" cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing">
        <p className=" text-sm">{title}</p>
    </div>
    </>
  )
}

export default Cards