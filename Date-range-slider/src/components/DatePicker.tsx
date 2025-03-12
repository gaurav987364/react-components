import React, { memo, useState } from 'react'
import { CellProps, DatePickerProps } from '../utils/types';
import clsx from 'clsx';
import { EndOfMonth, format, getDaysInMonth, NextMonth, NextYear, PrevMonth, PrevYear, StartOfMonth } from '../utils/helper';

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DatePicker :React.FC<DatePickerProps> = ({
    className = "",
    dualCalendar = false,
    endDate,
    startDate,
    todaysDate,
    rangeColor = "",
    onChange,
    onRangeSelected,
    themeColor = "",
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(todaysDate || new Date());
  const [nextMonthDate, setNextMonthDate] = useState<Date>(NextMonth(selectedDate)); // Right-side calendar

  // console.log(selectedDate,nextMonthDate);

  //making header buttons working
  const nextMonth = ()=>{
    setSelectedDate(NextMonth(selectedDate));
    if(dualCalendar) setNextMonthDate(NextMonth(nextMonthDate));
  };
  const prevMonth = ()=>{
    setSelectedDate(PrevMonth(selectedDate));
    if(dualCalendar) setNextMonthDate(PrevMonth(nextMonthDate));
  };
  const nextYear = ()=>{
    setSelectedDate(NextYear(selectedDate));
    if(dualCalendar) setNextMonthDate(NextYear(nextMonthDate));
  };
  const prevYear = ()=>{
    setSelectedDate(PrevYear(selectedDate));
    if(dualCalendar) setNextMonthDate(PrevYear(nextMonthDate));
  };

  const setDate = (date:Date)=>{
    // const selectedDate = new Date(todaysDate!.getFullYear(), todaysDate!.getMonth(),index);
    if(onRangeSelected){
      if (!startDate || (startDate && endDate)) {
        onRangeSelected?.(date, null);// Set startDate if no range is selected
      } else if (date >= startDate) {
        onRangeSelected?.(startDate, date);// Set endDate if selecting a later date
      } else {
        onRangeSelected?.(date, null); // Reset startDate if selecting an earlier date
      }
    } else {
      onChange?.(date);
    }
  }

  //recursion of function
  const renderCalender = (calenderDate:Date)=>{
    const MonthStartDate = StartOfMonth(calenderDate!);
    const MonthEndDate = EndOfMonth(calenderDate!);
    const totalDays = getDaysInMonth(calenderDate?.getFullYear(), calenderDate?.getMonth());
    const prefixDays = MonthStartDate.getDay();
    const suffixDays = 6 - MonthEndDate.getDay();
    const {monthFormat} = format(calenderDate!);

    return (
      <div className={`w-full sm:w-[300px] max-h-[350px] border rounded ${className}`}>
      <div className=' grid grid-cols-7 items-center justify-center text-center'>
        {/* {Making Header} */}
        <Cell onClick={prevYear} className=' text-lg border-b'>&lt;&lt;</Cell>
        <Cell onClick={prevMonth} className=' text-lg border-b'>&lt;</Cell>
        <Cell className=' col-span-3 border-b border-black' style={{color:`${themeColor}`}}>{monthFormat}</Cell>
        <Cell onClick={nextMonth} className=' text-lg border-b'>&gt;</Cell>
        <Cell onClick={nextYear} className=' text-lg border-b'>&gt;&gt;</Cell>

        {/* Printing Sunday, Monday, Tuesday, etc. */}
        {weekDays.map((day)=> <Cell key={day} className=' border-b text-sm'>{day}</Cell>)}

        {/* Printing Days Before the Start of the Month */}
        {Array.from({length: prefixDays}).map((_,i)=> <Cell key={i}></Cell>)}

        {/* Printing Days */}
        {Array.from({length: totalDays}).map((_,i)=> {
          const days = i+1;

          const isToday = calenderDate!.getDate() === days;
          console.log(isToday)

          const currentDate = new Date(calenderDate!.getFullYear(),calenderDate!.getMonth(),days);

          const isStart = startDate && currentDate.getTime() === startDate.getTime();

          const isEnd = endDate && currentDate.getTime() === endDate.getTime();

          const isInRange = startDate && endDate && currentDate > startDate && currentDate < endDate;

          return (
            <Cell 
            key={i+1} 
            className={clsx(
              "relative text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer mt-0.5",
              {
                "bg-gray-900 text-white font-bold rounded-full": isToday, // Today’s Date
                "hover:bg-gray-100 hover:text-black": !isInRange && !isStart && !isEnd, // Default Hover
              }
            )}
            style={{
              background: isInRange 
                ? rangeColor || "linear-gradient(to right, #fca5a5, #fecaca)"
                : isStart || isEnd 
                ? themeColor || "#f87171"
                : undefined,
              color: isStart || isEnd ? "#fff" : undefined, 
              borderRadius: isStart ? "10px 0 0 10px" : isEnd ? "0 10px 10px 0" : undefined,
              padding: isStart || isEnd ? "0 2px" : undefined, 
            }}
            onClick={()=>setDate(currentDate)}
            >
              {days}
            </Cell>
          )
        })}

        {/* Printing Days After the End of the Month */}
        {Array.from({length: suffixDays}).map((_,i)=> <Cell key={i}></Cell>)}
      </div>
    </div>
    )
  }
  return (
    <div className=' flex gap-0'>
      {renderCalender(selectedDate)}
      {dualCalendar && renderCalender(nextMonthDate)}
    </div>
  )
};




//** Cell Component */
export const Cell : React.FC<CellProps> = ({
  className = "",
  onClick,
  children,
  ...props
})=>{
  return (
    <div 
      onClick={onClick} 
      className={clsx(" h-10 flex font-semibold items-center justify-center",{" text-lg hover:text-gray-200 hover:bg-zinc-800/80 cursor-pointer":onClick}, className)}
      {...props}
    > 
      {children}
    </div>
  )
};

export default memo(DatePicker);


//? changes in below code for dual-feature

// import React, { memo } from 'react'
// import { CellProps, DatePickerProps } from '../utils/types';
// import clsx from 'clsx';
// import { EndOfMonth, format, getDaysInMonth, NextMonth, NextYear, PrevMonth, PrevYear, StartOfMonth } from '../utils/helper';

// const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// const DatePicker :React.FC<DatePickerProps> = ({
//     className = "",
//     dualCalendar = false,
//     endDate,
//     startDate,
//     todaysDate,
//     rangeColor = "",
//     onChange,
//     onRangeSelected,
//     themeColor = "",
// }) => {
//   const MonthStartDate = StartOfMonth(todaysDate!);
//   const MonthEndDate = EndOfMonth(todaysDate!);
//   const totalDays = getDaysInMonth(todaysDate?.getFullYear(), todaysDate?.getMonth());
//   const prefixDays = MonthStartDate.getDay();
//   const suffixDays = 6 - MonthEndDate.getDay();
//   const {monthFormat} = format(todaysDate!);

//   //making header buttons working
//   const nextMonth = ()=>{
//     onChange?.(NextMonth(todaysDate!));
//   };
//   const prevMonth = ()=>{
//     onChange?.(PrevMonth(todaysDate!));
//   };
//   const nextYear = ()=>{
//     onChange?.(NextYear(todaysDate!));
//   };
//   const prevYear = ()=>{
//     onChange?.(PrevYear(todaysDate!));
//   };

//   const setDate = (index:number)=>{
//     const selectedDate = new Date(todaysDate!.getFullYear(), todaysDate!.getMonth(),index);
//     if (onRangeSelected) {
//       if (!startDate || (startDate && endDate)) {
//         onRangeSelected(selectedDate, null);
//       } else if (startDate && !endDate && selectedDate >= startDate) {
//         onRangeSelected(startDate, selectedDate);
//       } else {
//         onRangeSelected(selectedDate, null);
//       }
//     } else {
//       onChange?.(selectedDate);
//     }
//   }
//   return (
//     <div className={`w-[350px] max-h-[400px] border p-1 rounded ${className}`}>
//       <div className=' grid grid-cols-7 items-center justify-center text-center'>
//         {/* {Making Header} */}
//         <Cell onClick={prevYear} className=' text-lg border-b'>&lt;&lt;</Cell>
//         <Cell onClick={prevMonth} className=' text-lg border-b'>&lt;</Cell>
//         <Cell className=' col-span-3 border-b border-black' style={{color:`${themeColor}`}}>{monthFormat}</Cell>
//         <Cell onClick={nextMonth} className=' text-lg border-b'>&gt;</Cell>
//         <Cell onClick={nextYear} className=' text-lg border-b'>&gt;&gt;</Cell>

//         {/* Printing Sunday, Monday, Tuesday, etc. */}
//         {weekDays.map((day)=> <Cell key={day} className=' border-b text-sm'>{day}</Cell>)}

//         {/* Printing Days Before the Start of the Month */}
//         {Array.from({length: prefixDays}).map((_,i)=> <Cell key={i}></Cell>)}

//         {/* Printing Days */}
//         {Array.from({length: totalDays}).map((_,i)=> {
//           const days = i+1;

//           const isToday = todaysDate!.getDate() === days;

//           const currentDate = new Date(todaysDate!.getFullYear(),todaysDate!.getMonth(),days);

//           const isStart = startDate && currentDate.getTime() === startDate.getTime();

//           const isEnd = endDate && currentDate.getTime() === endDate.getTime();

//           const isInRange = startDate && endDate && currentDate > startDate && currentDate < endDate;

//           return (
//             <Cell 
//             key={i+1} 
//             className={clsx(
//               "relative text-sm font-medium transition-all duration-200 ease-in-out cursor-pointer mt-0.5",
//               {
//                 "bg-gray-900 text-white font-bold rounded-full": isToday, // Today’s Date
//                 "hover:bg-gray-100 hover:text-black": !isInRange && !isStart && !isEnd, // Default Hover
//               }
//             )}
//             style={{
//               background: isInRange 
//                 ? rangeColor || "linear-gradient(to right, #fca5a5, #fecaca)"
//                 : isStart || isEnd 
//                 ? themeColor || "#f87171"
//                 : undefined,
//               color: isStart || isEnd ? "#fff" : undefined, 
//               borderRadius: isStart ? "20px 0 0 20px" : isEnd ? "0 20px 20px 0" : undefined,
//               padding: isStart || isEnd ? "0 2px" : undefined, 
//             }}
//             onClick={()=>setDate(days)}
//             >
//               {days}
//             </Cell>
//           )
//         })}

//         {/* Printing Days After the End of the Month */}
//         {Array.from({length: suffixDays}).map((_,i)=> <Cell key={i}></Cell>)}
//       </div>
//     </div>
//   )
// };




// //** Cell Component */
// export const Cell : React.FC<CellProps> = ({
//   className = "",
//   onClick,
//   children,
//   ...props
// })=>{
//   return (
//     <div 
//       onClick={onClick} 
//       className={clsx(" h-10 flex font-semibold items-center justify-center",{" text-lg hover:text-gray-200 hover:bg-zinc-800/80 cursor-pointer":onClick}, className)}
//       {...props}
//     > 
//       {children}
//     </div>
//   )
// };

// export default memo(DatePicker);