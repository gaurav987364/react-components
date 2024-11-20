/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";

interface Props {
    count: number;
}
const MyOtp = ({count} : Props) => {
    const [otps, setOtps] = useState<string[]>([]);

    //reflist
    // @ts-ignore
    const inputRef = useRef<HTMLInputElement>([]);
    const handelKeyUp = (index : number)=>{
        return (e: any)=>{
            const key = e.key;
            const allOtp = [...otps];


            if(key === "Backspace"){
                allOtp[index] = "";

                // @ts-ignore
                if(inputRef.current[index - 1]){
                    // @ts-ignore
                    inputRef.current[index - 1]?.focus();
                }

                setOtps(allOtp);
                return;
            }

           
            if(key === "ArrowRight"){
                moveFocusToRight(index);
                return;
            }

            if(key === "ArrowLeft"){
                moveFocusToLeft(index);
                return;
            }

            if(isNaN(key)){
                return;
            }
            allOtp[index] = key;
            setOtps(allOtp);
            moveFocusToLeft(index)
            moveFocusToRight(index);


            // @ts-ignore
            if(inputRef.current[index + 1]){
                // @ts-ignore
                inputRef.current[index + 1]?.focus();
            }
        }
    }

    function moveFocusToRight(index: number){

        // @ts-ignore
        if(inputRef.current[index + 1]){
            // @ts-ignore
            inputRef.current[index + 1]?.focus();
        }
    }
    function moveFocusToLeft(index: number){
        // @ts-ignore
        if(inputRef.current[index - 1]){
            // @ts-ignore
            inputRef.current[index - 1]?.focus();
        }
    }

    const handelLeftSelect = ()=>{
        return (e: any)=>{
            e.target.setSelectionRange(1,1)
        }
    }

    const copyPaste = ()=>{
        return (e: any)=>{
            const copyData = e.clipboardData.getData("Text").slice(0,4);


            if(!isNaN(copyData)){
                setOtps(copyData.split(""))
            }
        }
    }
  return (
    <div className=" w-[40rem] h-[15rem] bg-white rounded-md shadow-lg shadow-gray-400 max-sm:w-[30rem]">
         <h1 className=" text-center text-2xl font-semibold mt-1">
            Fill the OTP...
        </h1>
        <div className=" w-full flex items-center justify-center mt-5">
         {new Array(count).fill("").map((_,index)=>(
            <input 
              type="text"
              ref={(iRef)=>{
                // @ts-ignore
                inputRef.current[index] = iRef
              }}
              value={otps[index] ?? ""} 
              onKeyUp={handelKeyUp(index)}
              onClick={handelLeftSelect()}
              onPaste={copyPaste()}
              key={index}
              onChange={(e)=>console.log(e.target.value)}
              className=" w-[62px] h-[62px] bg-gray-400 m-1 rounded-sm max-sm:w-[52px] max-sm:h-[52px] max-sm:m-2 text-center font-semibold text-2xl border-[3px] focus:border-blue-600 focus:outline-none"
            />
         ))}
        </div>
    </div>
  )
}

export default MyOtp;