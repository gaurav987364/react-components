import React from 'react'
import Cell from './ui/Cell'
import { EndOfMonth, format, getDaysInMonth, nextMonth, nextYear, prevMonth, prevYear, StartOfMonth } from '@/utils/util';
//import { differenceInDays, endOfMonth, startOfMonth } from 'date-fns';
const Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Props {
  value?:Date;
  onChange: (value: Date) => void;
}
const Calender:React.FC<Props> = ({onChange,value}) => {
  //?code from library util function
   //const start = startOfMonth(value!);
  // const end = endOfMonth(value!);
  // const numOfDaysInMonth = differenceInDays(end, start) + 1;
  //const prevMonth = onChange && onChange(sub(value,{month:1})); month-1
  // const nextMonth = onChange && onChange(add(value,{month:1})); month+1
  //{format(value,"LLLL yyyy")} Month 2024


  const start = StartOfMonth(value!);
  const end  = EndOfMonth(value!);
  //? we always get the num of days correct from end date of month; end.getDay();
  const numOfDaysInMonth = getDaysInMonth(value?.getFullYear(),value?.getMonth())

  //?prefix days means num.of days are passed of this month or means macth dates with real calendar;
  const prefixDays = start.getDay();

  //? now find suffix days-> aage kitne din empty hoge in calender
  const suffixDays = 6 - end.getDay();

  const handelPrev = ()=>{
    onChange(prevMonth(value!));
  };
  const handelNext = ()=>{
    onChange(nextMonth(value!));
  };
  const handelPrevYear = ()=>{
    onChange(prevYear(value!))
  };
  const handelNextYear = ()=>{
    onChange(nextYear(value!))
  };

  const {monthFormat} = format(value!);

  const setDate = (index:number)=>{
    //? we create new date object and set it to selected date
    const selected = new Date(value!.getFullYear(),value!.getMonth(),index);
    onChange(selected);
  }
  
  return (
    <div className=' w-[300px] border p-0.5 mt-5 shadow-md shadow-gray-400/30 rounded'>
      <div className=' grid grid-cols-7 items-center justify-center text-center'>
        {/* making header */}
        <Cell onClick={handelPrevYear}>{"<<"}</Cell>
        <Cell onClick={handelPrev}>{"<"}</Cell>
        <Cell className=' col-span-3 text-[salmon]'>{monthFormat}</Cell> 
        <Cell onClick={handelNext}>{">"}</Cell>
        <Cell onClick={handelNextYear}>{">>"}</Cell>

        {/* print sun,mon,tues,wed,etc. */}
        {Days?.map((day)=> <Cell className=' text-sm font-semibold text-[salmon]' key={day}>{day}</Cell>)}

        {/* matching day with real calender prefix*/}
        {Array.from({length:prefixDays}).map((_,i)=> <Cell key={i}></Cell>)}

        {/* print all days in month */}
        {Array.from({length:numOfDaysInMonth}).map((_,i)=>{
          const days = i+1;
          const isActive = value!.getDate() === days;
          return <Cell className={`${isActive ? " bg-[salmon] hover:bg-[salmon] hover:text-white" : " font-mono"}`}  key={i} onClick={()=>setDate(days)}>
            {days}
          </Cell>
        })}

        {/* matching day with real calender suffix */}
        {Array.from({length:suffixDays}).map((_,i)=> <Cell key={i}></Cell>)}
      </div>
    </div>
  )
}

export default Calender;