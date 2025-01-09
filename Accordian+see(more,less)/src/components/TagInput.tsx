
// not more that 3 tags allowed
// not repetaed tags allowed
// not  add empty strings allowed
// not more than 12 characters allowed

import { useState } from "react";


const TagInput = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');

    const handelAddTags = ()=>{
        const data = inputValue.trim();

        if(!inputValue || data === ""){
            setInputValue('');
            return null;
        }

        if(tags.includes(data)){
            alert("Tag already exists");
            setInputValue('');
            return null;
        }

        if(data.length > 12){
            alert("Tag length should not exceed 12 characters");
            setInputValue('');
            return null;
        }

        if(tags.length >= 3){
            alert("You can't add more than 3 tags");
            setInputValue('');
            return null;
        }

        setTags([...tags, inputValue])
        setInputValue('');
    }

    const handeldelete = (idx : number): void=>{
        const del = tags.filter((_, index)=> index !== idx)
        setTags(del)
    }
  return (
    <>
        <div className=" bg-red-200 w-[30rem] h-[10rem] flex items-center justify-center flex-col gap-1">
           <section>
            <input 
                    type="text"  
                    value={inputValue}
                    onChange={(e)=> setInputValue(e.target.value)}
                    placeholder="Enter your tags"
                    className=" border border-black px-2.5 py-1 rounded-md"
                />
                <button onClick={handelAddTags} className=" px-3 py-1 bg-blue-400 rounded-lg cursor-pointer">
                    Add
                </button>
           </section>
            <div className=" flex">
                {tags?.map((tag, index)=>(
                   <div key={index} className=" flex justify-between">
                     <span className=" text-lg font-semibold bg-gray-100 rounded-md px-4 py-1 ml-1 ">#{tag}
                     <button className=" cursor-pointer" onClick={()=>handeldelete(index)}>❌</button>
                     </span>

                   </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default TagInput;