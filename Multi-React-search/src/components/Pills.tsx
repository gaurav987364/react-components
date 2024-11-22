interface Props{
    image: string;
    text: string;
    onClick : ()=>void;
}
const Pills = ({image, text, onClick} :Props) => {
  return (
    <span onClick={onClick} className=" flex items-center bg-slate-300 w-fit px-2 py-1 rounded-full justify-center cursor-pointer">
        <img src={image} alt={text} className="w-4 h-4 mr-2" />
        <span  className="text-sm font-medium hover:text-blue-400">{text} &times;</span>
    </span>
  )
}

export default Pills