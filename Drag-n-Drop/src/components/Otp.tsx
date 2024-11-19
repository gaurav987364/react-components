/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRef, useState } from "react"

interface Props {
    count: number
}
const Otp = ({count} : Props) => {
    const [allOtp, setAllOtp] = useState<string[]>([]);
    const inputRefs = useRef<HTMLInputElement[]>([]);
    let validateCount;
    if(count > 6){
        validateCount = 6;
    } else {
        validateCount = count;
    }

    function handelKeyUp(index: number){
        //? we used currying conecpt here
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (event : any)=>{
            const key = event.key;
            
            const oldAllOtp = [...allOtp];

            // implment backspace
            if(key === "Backspace"){
                oldAllOtp[index] = ""; // when user press backspace set the value in the index empty;

                // sent focus to previous box if box available
                if(inputRefs.current[index - 1]){
                    inputRefs.current[index - 1]?.focus();
                }

                // set the value (updated value) in the index
                setAllOtp(oldAllOtp);
                return; // return is most important becoz code age ni run krna
            };

            // move focus using right arrow key
            if(key === 'ArrowRight'){
                moveFocusToRight(index);
                return;
            }
            if(key === 'ArrowLeft'){
                moveFocusToLeft(index);
                return;
            }

             // check for string or key press value
             if(isNaN(key)){
                return;
             }


            oldAllOtp[index] = key;
            setAllOtp(oldAllOtp);
            moveFocusToRight(index);
            moveFocusToLeft(index);

            // sent focus to next box if box available
            if(inputRefs.current[index + 1]){
                inputRefs.current[index + 1]?.focus();
            }
        }
    }

    function handelLeftSelect(){
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (event: any)=>{
            event.target.setSelectionRange(1,1)
            // if we give 0,1 range it select our emelmnt but we give 1,1 so there is only one element so when we click left of the our elemnt value cursor automaticallly goes right
        }
    }

    function handelCopyPaste(){
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (event: any)=>{
           const pastedData = event.clipboardData.getData("Text").slice(0,4);
           if(!isNaN(pastedData)){
            console.log(pastedData);
            setAllOtp(pastedData.split(""))
           }
        }
    }


    function moveFocusToRight(index: number){
        if(inputRefs.current[index + 1]){
            inputRefs.current[index + 1]?.focus();
        }
    }
    function moveFocusToLeft(index: number){
        if(inputRefs.current[index - 1]){
            inputRefs.current[index - 1]?.focus();
        }
    }
  return (
    <div className=" w-[40rem] h-[15rem] bg-white rounded-md shadow-lg shadow-gray-400 max-sm:w-[30rem]">
        <h1 className=" text-center text-2xl font-semibold mt-1">
            Fill the OTP...
        </h1>
        <div className=" w-full flex items-center justify-center mt-5">
        {new Array(validateCount).fill("").map((_,i)=>(
            <input 
                type="text" 
                value={allOtp[i] ?? ""} // make sure to remmbr this val[i]
                onKeyUp={handelKeyUp(i)}
                onClick={handelLeftSelect()}
                //onChange={(e)=>console.log(e.target.value)}
                inputMode="numeric" // get numeric keybord on 📱
                autoComplete="one-time-code" // get otp at keybord top 
                onPaste={handelCopyPaste()}
                key={i}
                ref={(iRef)=> {
                    // @ts-ignore
                    inputRefs.current[i] = iRef;
                }}
                className=" w-[62px] h-[62px] bg-gray-400 m-1 rounded-sm max-sm:w-[52px] max-sm:h-[52px] max-sm:m-2 text-center font-semibold text-2xl border-[3px] focus:border-blue-600 focus:outline-none"
            />
        ))}
        </div>

        <div className=" w-full flex justify-center items-center mt-2 flex-col">
        <button
            onClick={() => console.log("Submitted OTP:", allOtp.join(""))}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
            Submit
        </button>
        </div>
    </div>
  )
}

export default Otp