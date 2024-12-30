"use client"
// import DateRangePicker from '@/components/DateRangePicker'
import Calender from '@/components/Calender'
import { format } from '@/utils/util';
import React, { useState } from 'react'

const App = () => {
  const [currentDate,setCurrentDate] = useState(new Date("2024-10-4"));
  const {fullFormat} = format(currentDate);
  const setToday = ()=>{
    setCurrentDate(new Date());
  }
  return (
    <div className=' mt-16 flex items-center justify-center flex-col p-2'>
      {/* <DateRangePicker/> */}
      <div className=' flex items-center justify-center flex-col gap-2'>
        <p className=' text-xl font-semibold'>Selected Date : {fullFormat}</p>
        <button className=' px-4 py-2 bg-[salmon] hover:bg-[#f76453da] rounded-md text-sm font-semibold cursor-pointer' onClick={setToday}>Reset </button>
      </div>
      <Calender value={currentDate} onChange={setCurrentDate}/>
    </div>
  )
}

export default App