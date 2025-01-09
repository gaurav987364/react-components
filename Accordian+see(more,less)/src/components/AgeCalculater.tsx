/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react"

const AgeCalculater = () => {
    const [date, setDate] = useState("");
    const [age, setAge] = useState(0)

    const calculateAge = ()=>{
        const today = new Date();
        const birthDate = new Date(date);
        // @ts-ignore
        setAge( Math.floor((today - birthDate) / (1000*60*60*24*365)))
    }

  return (
    <div className=" w-[25rem] h-[12rem] bg-indigo-200 rounded-md shadow-lg shadow-gray-400">
        <h1 className="text-2xl font-bold text-center">Age Calculator</h1>
        <p className=" text-center text-3xl font-semibold mt-2 text-red-400">You'r {age} Year's old</p>
        <div className="flex flex-col space-y-1 items-center justify-center mt-5 gap-1">
          <input
            type="date"
            value={date}
            className="w-1/2 px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-400"
            placeholder="Enter your age"
            onChange={(e)=>setDate(e.target.value)}
          />
          <button onClick={calculateAge} className="w-1/2 py-2 rounded-md bg-blue-400 text-white font-semibold">Calculate</button>
        </div>
      </div>
  )
}

export default AgeCalculater;