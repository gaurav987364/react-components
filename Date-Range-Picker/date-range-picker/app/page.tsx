"use client"
// import DateRangePicker from '@/components/DateRangePicker'
import Calender from '@/components/Calender';
import React, { useState } from 'react';

const App = () => {
  // const [currentDate,setCurrentDate] = useState(new Date());
  // const {fullFormat} = format(currentDate);
  // const setToday = ()=>{
  //   setCurrentDate(new Date());
  // }

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleRangeChange = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <div className=' mt-16 flex items-center justify-center flex-col p-2'>
      {/* <DateRangePicker/> */}
      <div className=' flex items-center justify-center flex-col gap-2'>
        {/* <p className=' text-xl font-semibold'>Selected Date : {fullFormat}</p>
        <button className=' px-4 py-2 bg-[salmon] hover:bg-[#f76453da] rounded-md text-sm font-semibold cursor-pointer' onClick={setToday}>Reset </button> */}
      </div>
      <Calender 
        value={selectedDate}
        onChange={handleDateChange}
        startDate={startDate!}
        endDate={endDate!}
        onRangeChange={handleRangeChange}
      />
       <div className="mt-4 text-center">
          <p>
            <strong>Selected Date:</strong>{" "}
            {selectedDate ? selectedDate.toDateString() : "None"}
          </p>
          <p>
            <strong>Start Date:</strong>{" "}
            {startDate ? startDate.toDateString() : "None"}
          </p>
          <p>
            <strong>End Date:</strong> {endDate ? endDate.toDateString() : "None"}
          </p>
        </div>
    </div>
  )
}

export default App