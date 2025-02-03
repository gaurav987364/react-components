


interface ButtonProps{
    lable: string;
    onClick?: ()=> void;
    disabled?: boolean;
}

const Button = ({lable,onClick}:ButtonProps) => {
  return (
    <div>
        <button 
         onClick={onClick}
         className=" px-5 py-1 bg-purple-600 text-white font-semibold text-md"
         >
            {lable}
        </button>
    </div>
  )
}

export default Button